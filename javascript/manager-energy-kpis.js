/* Energy KPIs (R): chỉ số hiệu suất năng lượng tháng này */
buildLayout('manager-energy-kpis.html', 'Chỉ số hiệu suất năng lượng (Energy KPIs)', 'KPI, ngân sách và phát thải', 'Manager: Quản lý cơ sở');

var PRICE = 2200;            // đồng / kWh
var CO2_PER_KWH = 0.85;      // kg CO2 / kWh
var BUDGET = 1050000000;     // ngân sách điện tháng (đồng)
var DEFAULT_AREA = { 'Office Tower A': 20000, 'Lobby Area': 4000, 'Data Center': 1500, 'Chiller Plant': 1000 };

function getArea(zone) {
  if (zone.areaM2) { return zone.areaM2; }
  if (DEFAULT_AREA[zone.name]) { return DEFAULT_AREA[zone.name]; }
  return 2000;
}
function renderStats(zones) {
  var monthKwh = getMonthKwh(), totalArea = 0, totalLoad = 0, bad = 0;
  for (var i = 0; i < zones.length; i++) { totalArea += getArea(zones[i]); totalLoad += zones[i].loadKw; }
  var eui = Math.round(monthKwh * 12 / totalArea);                 // kWh / m2 / năm
  var cost = monthKwh * PRICE, percent = Math.round(cost / BUDGET * 100);
  var co2Tons = Math.round(monthKwh * CO2_PER_KWH / 1000);
  for (var j = 0; j < zones.length; j++) { if (zones[j].loadKw > zones[j].baselineKw * 1.1 * 1.1) { bad++; } }
  var statusText = 'Đạt mục tiêu', statusColor = 'v-green', budgetColor = 'v-green';
  if (bad > 0) { statusText = 'Cần cải thiện'; statusColor = 'v-rose'; }
  if (percent > 100) { budgetColor = 'v-rose'; }
  document.getElementById('stats').innerHTML = statCard('Cường độ năng lượng (EUI)', eui + ' <small>kWh/m²/năm</small>', 'v-sky') +
    statCard('Chi phí so với ngân sách', percent + '%', budgetColor) + statCard('Phát thải CO₂ tháng này', formatNumber(co2Tons) + ' <small>tấn</small>', 'v-amber') +
    statCard('Trạng thái KPI', statusText, statusColor);
  document.getElementById('budgetText').textContent = formatNumber(Math.round(cost)) + ' ₫ / ' + formatNumber(BUDGET) + ' ₫';
  document.getElementById('budgetBar').style.width = Math.min(100, percent) + '%';
}
function renderTrend() {   // mỗi tháng 2 cột: thực tế (xanh lá) và mục tiêu (xanh dương)
  var html = '';
  for (var m = 0; m < 12; m++) {
    html += '<div class="month"><div class="pair"><div class="actual" style="height:' + (SEED.kpi.actual[m] / 5) + '%" title="Thực tế: ' + SEED.kpi.actual[m] + '"></div>' +
      '<div class="target" style="height:' + (SEED.kpi.target[m] / 5) + '%" title="Mục tiêu: ' + SEED.kpi.target[m] + '"></div></div><span>T' + (m + 1) + '</span></div>';
  }
  document.getElementById('trend').innerHTML = html;
}
function renderTable(zones) {
  var factor = getMonthKwh() / sumLoad(zones), html = '';
  for (var i = 0; i < zones.length; i++) {
    var z = zones[i];
    var actual = Math.round(z.loadKw * factor), target = Math.round(z.baselineKw * 1.1 * factor);   // mục tiêu = 110% baseline
    var diff = Math.round((actual - target) / target * 1000) / 10, label = '', cls = '';
    if (diff <= 0) { label = 'Tốt (' + Math.abs(diff) + '% dưới mục tiêu)'; cls = 'badge-resolved'; }
    else if (diff <= 10) { label = 'Chấp nhận (+' + diff + '%)'; cls = 'badge-pending'; }
    else { label = 'Cần cải thiện (+' + diff + '%)'; cls = 'badge-priority-high'; }
    html += '<tr><td><strong>' + escapeHtml(z.name) + '</strong></td><td>' + formatNumber(target) + '</td><td>' + formatNumber(actual) + '</td><td><span class="badge ' + cls + '">' + label + '</span></td></tr>';
  }
  if (html === '') { html = '<tr><td colspan="4"><div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Không có khu vực nào đang hoạt động.</p></div></td></tr>'; }
  document.getElementById('rows').innerHTML = html;
}
function sumLoad(zones) {
  var total = 0;
  for (var i = 0; i < zones.length; i++) { total += zones[i].loadKw; }
  return total;
}
startPage(function () {
  var zones = getActiveZones();
  renderStats(zones); renderTrend(); renderTable(zones);
});
