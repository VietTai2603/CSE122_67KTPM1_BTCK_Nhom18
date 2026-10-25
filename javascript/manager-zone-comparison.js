/* Zone Comparison (C/R/U) + AI-3 What-if: so sánh khu vực và mô phỏng giảm phụ tải */
buildLayout('manager-zone-comparison.html', 'So sánh tiêu thụ giữa các khu vực', 'So sánh & mô phỏng What-if (AI-3)', 'Manager: Quản lý cơ sở');
var PRICE = 2200, CO2_PER_KWH = 0.85;
var editingId = null;   // đang sửa kịch bản nào (null = tạo mới)
var aiResult = null;

function sumLoad(zones) {
  var total = 0;
  for (var i = 0; i < zones.length; i++) { total += zones[i].loadKw; }
  return total;
}
function getPrevFactor(zone, periodIndex) {   // kỳ này = kỳ trước x hệ số
  var f = SEED.prev[zone.name];
  if (!f) { return 1; }
  return f[periodIndex];
}
// ---------- So sánh ----------
function applyFilter() {
  document.getElementById('cmpChart').innerHTML = '<p class="muted">⏳ Đang tải…</p>';
  setTimeout(function () {
    var zones = getActiveZones(), chosen = document.getElementById('fz').value, period = Number(document.getElementById('fp').value);
    var factor = getMonthKwh() / sumLoad(zones), rows = [], max = 1;
    for (var i = 0; i < zones.length; i++) {
      if (chosen !== '' && zones[i].name !== chosen) { continue; }
      var now = Math.round(zones[i].loadKw * factor), before = Math.round(now / getPrevFactor(zones[i], period));
      rows.push({ name: zones[i].name, now: now, before: before, diff: Math.round((now - before) / before * 1000) / 10 });
      if (now > max) { max = now; }
      if (before > max) { max = before; }
    }
    var chart = '', table = '';
    for (var j = 0; j < rows.length; j++) {
      var r = rows[j], cls = 'badge-resolved', text = '↓ ' + Math.abs(r.diff) + '%';
      if (r.diff > 0) { cls = 'badge-priority-high'; text = '↑ +' + r.diff + '%'; }
      chart += '<div class="cmp-row"><strong>' + escapeHtml(r.name) + '</strong><div><div class="progress"><i style="width:' + (r.now / max * 100) + '%"></i></div>' +
        '<div class="progress alt"><i style="width:' + (r.before / max * 100) + '%"></i></div></div></div>';
      table += '<tr><td><strong>' + escapeHtml(r.name) + '</strong></td><td>' + formatNumber(r.now) + '</td><td>' + formatNumber(r.before) + '</td><td><span class="badge ' + cls + '">' + text + '</span></td></tr>';
    }
    if (rows.length === 0) { chart = '<div class="empty-state"><p>Không có khu vực hoạt động.</p></div>'; table = '<tr><td colspan="4">Không có dữ liệu.</td></tr>'; }
    else { chart = '<p class="stat-label"><span class="v-sky">■</span> Kỳ này &nbsp; <span class="v-amber">■</span> Kỳ trước</p>' + chart; }
    document.getElementById('cmpChart').innerHTML = chart;
    document.getElementById('cmpRows').innerHTML = table;
  }, 600);
}
// ---------- AI-3: What-if ----------
function showSliderValue() { document.getElementById('wv').textContent = document.getElementById('wp').value + '%'; }
function runWhatIf() {
  var zoneName = document.getElementById('wz').value, percent = Number(document.getElementById('wp').value), error = document.getElementById('werr');
  error.textContent = '';
  if (zoneName === '' || !(percent >= 1 && percent <= 50)) { error.textContent = 'Chọn khu vực và mức giảm từ 1 đến 50%.'; return; }
  showAiLoading('aiOut');
  setTimeout(function () {
    if (aiFailMode) { showAiError('aiOut'); return; }
    var base = 0, zones = getActiveZones();
    if (zoneName === 'Toàn tòa nhà') { base = getMonthKwh(); }
    else {
      for (var i = 0; i < zones.length; i++) { if (zones[i].name === zoneName) { base = zones[i].loadKw * getMonthKwh() / sumLoad(zones); } }
    }
    if (base <= 0) { showAiError('aiOut'); return; }   // khu vực không còn hoạt động -> AI không đủ dữ liệu
    var kwh = Math.round(base * percent / 100), money = kwh * PRICE, co2 = Math.round(kwh * CO2_PER_KWH);
    aiResult = { zone: zoneName, pct: percent, kwh: kwh, vnd: money, co2: co2, title: 'Giảm ' + percent + '% tại ' + escapeHtml(zoneName),
      text: 'Tiết kiệm <strong>' + formatNumber(kwh) + ' kWh/tháng</strong> ≈ <strong>' + formatNumber(money) + ' ₫</strong>, giảm <strong>' + formatNumber(co2) + ' kg CO₂</strong>.',
      why: 'Tiêu thụ ước tính ' + formatNumber(Math.round(base)) + ' kWh/tháng × ' + percent + '%; đơn giá ' + formatNumber(PRICE) + ' ₫/kWh; hệ số phát thải ' + CO2_PER_KWH + ' kg CO₂/kWh.' };
    showAiResult('aiOut', aiResult, true);
  }, 1200);
}
function aiAccept() {   // lưu kịch bản (tạo mới hoặc cập nhật kịch bản đang sửa)
  var list = loadData('scenarios');
  if (editingId === null) {
    list.unshift({ id: Date.now(), zone: aiResult.zone, pct: aiResult.pct, kwh: aiResult.kwh, vnd: aiResult.vnd, co2: aiResult.co2, applied: false });
  } else {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === editingId) { list[i].zone = aiResult.zone; list[i].pct = aiResult.pct; list[i].kwh = aiResult.kwh; list[i].vnd = aiResult.vnd; list[i].co2 = aiResult.co2; }
    }
  }
  saveData('scenarios', list);
  editingId = null;
  document.getElementById('aiOut').innerHTML = '<p class="ok-text">✔ Đã lưu kịch bản.</p>';
  renderScenarios();
}
function aiEdit() { document.getElementById('wp').focus(); showToast('Điều chỉnh thanh trượt rồi chạy lại', 'info'); }
function aiReject() { document.getElementById('aiOut').innerHTML = '<p class="muted">Đã từ chối đề xuất.</p>'; }
function aiRegenerate() { runWhatIf(); }
function aiManual() { document.getElementById('aiOut').innerHTML = ''; showToast('Chuyển sang thao tác thủ công', 'info'); }
// ---------- Kịch bản đã lưu ----------
function renderScenarios() {
  var list = loadData('scenarios'), html = '';
  for (var i = 0; i < list.length; i++) {
    var s = list[i], badge = '<span class="badge badge-pending">Đã lưu</span>', applyBtn = '<button class="btn btn-primary btn-sm" onclick="applyScenario(' + s.id + ')">Áp dụng làm định mức</button>';
    if (s.applied) { badge = '<span class="badge badge-resolved">Đã áp dụng</span>'; applyBtn = ''; }
    html += '<article class="card report"><div><strong>Giảm ' + s.pct + '% · ' + escapeHtml(s.zone) + '</strong><div class="stat-label">' + formatNumber(s.kwh) + ' kWh/tháng · ' + formatNumber(s.vnd) + ' ₫ · ' + formatNumber(s.co2) + ' kg CO₂</div></div>' +
      badge + '<button class="btn btn-secondary btn-sm" onclick="editScenario(' + s.id + ')">Sửa</button>' + applyBtn + '</article>';
  }
  if (html === '') { html = '<div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Chưa có kịch bản nào được lưu.</p></div>'; }
  document.getElementById('sc').innerHTML = html;
}
function editScenario(id) {
  var list = loadData('scenarios');
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      editingId = id;
      document.getElementById('wz').value = list[i].zone;
      document.getElementById('wp').value = list[i].pct;
      showSliderValue();
      document.getElementById('wz').scrollIntoView({ behavior: 'smooth' });
      showToast('Chỉnh thanh trượt rồi chạy mô phỏng để cập nhật kịch bản', 'info');
    }
  }
}
function applyScenario(id) {   // đặt baseline mới cho khu vực (ảnh hưởng AI-1 ở trang Operator)
  var list = loadData('scenarios'), s = null;
  for (var i = 0; i < list.length; i++) { if (list[i].id === id) { s = list[i]; } }
  confirmBox('Đặt định mức mới: giảm ' + s.pct + '% tại ' + s.zone + '?', function () {
    var zones = loadData('zones');
    for (var j = 0; j < zones.length; j++) {
      if (s.zone === 'Toàn tòa nhà' || zones[j].name === s.zone) { zones[j].baselineKw = Math.round(zones[j].loadKw * (1 - s.pct / 100)); }
    }
    saveData('zones', zones);
    s.applied = true;
    saveData('scenarios', list);
    renderScenarios(); showToast('Đã cập nhật định mức (baseline) mới');
  });
}
startPage(function () {
  var names = [], zones = getActiveZones();
  for (var i = 0; i < zones.length; i++) { names.push(zones[i].name); }
  fillSelect('wz', ['Toàn tòa nhà'].concat(names));
  fillSelect('fz', ['Tất cả khu vực'].concat(names));
  document.getElementById('fz').options[0].value = '';
  document.getElementById('cmpChart').innerHTML = '<div class="empty-state"><p>Vui lòng chọn bộ lọc và nhấn "Áp dụng" để xem dữ liệu.</p></div>';
  document.getElementById('cmpRows').innerHTML = '<tr><td colspan="4">Chưa có dữ liệu. Nhấn "Áp dụng".</td></tr>';
  document.getElementById('apply').onclick = applyFilter;
  document.getElementById('wgo').onclick = runWhatIf;
  document.getElementById('wp').oninput = showSliderValue;
  document.getElementById('fail').textContent = 'Mô phỏng AI lỗi: TẮT';
  document.getElementById('fail').onclick = function () { toggleAiFail('fail'); };
  showSliderValue(); renderScenarios();
});
