/* Energy Monitor (R): xem phụ tải theo khu vực */
buildLayout('operator-energy-monitor.html', 'Tổng quan năng lượng', 'Energy Operations Center');
var zones = [];

function statusOf(z) {   // đánh giá trạng thái theo % công suất thiết kế
  var ratio = z.loadKw / z.ratedKw;
  if (ratio > 0.9) { return { text: 'Quá tải', cls: 'badge-priority-high', card: 'z-bad' }; }
  if (ratio > 0.8) { return { text: 'Peak load', cls: 'badge-pending', card: 'z-warn' }; }
  return { text: 'Bình thường', cls: 'badge-resolved', card: 'z-ok' };
}
function renderStats() {
  var total = 0, base = 0, open = 0, alerts = loadData('alerts');
  for (var i = 0; i < zones.length; i++) { total += zones[i].loadKw; base += zones[i].baselineKw; }
  for (var j = 0; j < alerts.length; j++) { if (alerts[j].status !== 'resolved' && alerts[j].status !== 'dismissed') { open++; } }
  var efficiency = Math.min(100, Math.round(base / total * 100));
  document.getElementById('stats').innerHTML =
    statCard('Khu vực giám sát', zones.length, 'v-sky') + statCard('Tổng công suất', formatNumber(total) + ' kW', 'v-sky') +
    statCard('Cảnh báo đang mở', open, open > 0 ? 'v-rose' : 'v-green') + statCard('Hiệu suất so với baseline', efficiency + '%', 'v-green');
}
function renderZoneCards() {
  var html = '';
  for (var i = 0; i < zones.length; i++) {
    var z = zones[i], s = statusOf(z), percent = Math.round(z.loadKw / z.ratedKw * 100);
    html += '<article class="card ' + s.card + '"><h3>' + escapeHtml(z.name) + '</h3>' +
      '<div class="stat-value">' + formatNumber(z.loadKw) + ' <small>kW</small></div>' +
      '<div class="progress"><i style="width:' + percent + '%"></i></div>' +
      '<p class="stat-label">' + percent + '% thiết kế · <span class="badge ' + s.cls + '">' + s.text + '</span></p></article>';
  }
  document.getElementById('zoneGrid').innerHTML = html;
}
function renderBars() {   // 24 cột, mỗi cột là một giờ trong ngày
  var html = '';
  for (var h = 0; h < 24; h++) { html += '<div title="' + h + 'h: ' + SEED.load24[h] + ' kW" style="height:' + (SEED.load24[h] / 10) + '%"></div>'; }
  document.getElementById('chart').innerHTML = '<div class="bars">' + html + '</div><p class="stat-label">Phụ tải theo giờ (0h → 23h), đơn vị kW</p>';
}
function renderTable() {   // áp dụng bộ lọc tìm kiếm + trạng thái
  var keyword = document.getElementById('q').value.toLowerCase();
  var wanted = document.getElementById('fs').value, html = '';
  for (var i = 0; i < zones.length; i++) {
    var z = zones[i], s = statusOf(z);
    if (z.name.toLowerCase().indexOf(keyword) === -1) { continue; }
    if (wanted !== '' && s.text !== wanted) { continue; }
    html += '<tr><td><strong>' + escapeHtml(z.name) + '</strong></td><td>' + escapeHtml(z.floor) + '</td><td>' + escapeHtml(z.type) + '</td>' +
      '<td>' + formatNumber(z.ratedKw) + ' kW</td><td>' + formatNumber(z.loadKw) + ' kW</td><td><span class="badge ' + s.cls + '">' + s.text + '</span></td></tr>';
  }
  if (html === '') { html = '<tr><td colspan="6"><div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Không có khu vực khớp bộ lọc.</p></div></td></tr>'; }
  document.getElementById('rows').innerHTML = html;
}
startPage(function () {
  zones = loadData('zones');
  renderStats(); renderZoneCards(); renderBars(); renderTable();
  document.getElementById('q').oninput = renderTable;
  document.getElementById('fs').onchange = renderTable;
});
