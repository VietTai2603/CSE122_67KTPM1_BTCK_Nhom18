/* Alert Center (C/R/U) + AI-1 phát hiện bất thường */
buildLayout('operator-alert-center.html', 'Trung tâm cảnh báo & bất thường', 'Tiếp nhận và xử lý sự cố');
var currentFilter = 'all';
var aiResult = null;
var LEVEL = { critical: { text: 'Critical', cls: 'badge-priority-high' }, warning: { text: 'Warning', cls: 'badge-pending' } };
var STATUS_TEXT = { 'new': 'Mới', investigating: 'Đang điều tra', resolved: 'Đã giải quyết', dismissed: 'Đã bác bỏ' };

function isOpen(a) { return a.status !== 'resolved' && a.status !== 'dismissed'; }
function newAlertId(alerts) { return 'AL-2026-' + padNumber(alerts.length + 1, 3); }

function renderStats() {
  var alerts = loadData('alerts'), critical = 0, warning = 0, resolved = 0;
  for (var i = 0; i < alerts.length; i++) {
    if (isOpen(alerts[i]) && alerts[i].level === 'critical') { critical++; }
    if (isOpen(alerts[i]) && alerts[i].level === 'warning') { warning++; }
    if (alerts[i].status === 'resolved') { resolved++; }
  }
  document.getElementById('stats').innerHTML = statCard('Tổng cảnh báo', alerts.length, 'v-sky') + statCard('Critical', critical, 'v-rose') +
    statCard('Warning', warning, 'v-amber') + statCard('Đã giải quyết', resolved, 'v-green');
}
function actionButtons(a) {   // nút thao tác thay đổi theo trạng thái
  if (a.status === 'new') {
    return '<button class="btn btn-primary btn-sm" onclick="changeStatus(\'' + a.id + '\', \'investigating\')">Xử lý ngay</button> ' +
           '<button class="btn btn-secondary btn-sm" onclick="changeStatus(\'' + a.id + '\', \'dismissed\')">Bác bỏ</button>';
  }
  if (a.status === 'investigating') {
    return '<button class="btn btn-primary btn-sm" onclick="changeStatus(\'' + a.id + '\', \'resolved\')">Hoàn tất</button> ' +
           '<button class="btn btn-secondary btn-sm" onclick="changeStatus(\'' + a.id + '\', \'dismissed\')">Bác bỏ</button>';
  }
  return '—';
}
function renderTable() {
  var alerts = loadData('alerts'), html = '';
  for (var i = 0; i < alerts.length; i++) {
    var a = alerts[i], show = false;
    if (currentFilter === 'all') { show = true; }
    else if (currentFilter === 'resolved') { show = (a.status === 'resolved'); }
    else { show = (a.level === currentFilter && isOpen(a)); }
    if (!show) { continue; }
    html += '<tr><td><strong>' + a.id + '</strong><div class="stat-label">' + a.time + '</div></td><td>' + escapeHtml(a.zone) + '</td><td>' + escapeHtml(a.issue) + '</td>' +
      '<td><span class="badge ' + LEVEL[a.level].cls + '">' + LEVEL[a.level].text + '</span> <span class="badge badge-investigating">' + STATUS_TEXT[a.status] + '</span></td><td>' + actionButtons(a) + '</td></tr>';
  }
  if (html === '') { html = '<tr><td colspan="5"><div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Không có cảnh báo trong nhóm này.</p></div></td></tr>'; }
  document.getElementById('rows').innerHTML = html;
}
function changeStatus(id, newStatus) {   // Update: đổi trạng thái cảnh báo
  var alerts = loadData('alerts');
  for (var i = 0; i < alerts.length; i++) { if (alerts[i].id === id) { alerts[i].status = newStatus; } }
  saveData('alerts', alerts);
  renderStats(); renderTable(); showToast('Đã cập nhật trạng thái');
}
function setTab(filter, button) {
  currentFilter = filter;
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) { tabs[i].classList.remove('active'); }
  button.classList.add('active');
  renderTable();
}
function toggleForm() { var f = document.getElementById('cf'); f.hidden = !f.hidden; }

function submitAlert(event) {   // Create: tạo cảnh báo thủ công
  event.preventDefault();
  clearErrors('cf');
  var zone = document.getElementById('zone').value, issue = document.getElementById('issue').value.trim(), level = document.getElementById('level').value;
  if (issue.length < 5) { setError('issue', 'Mô tả tối thiểu 5 ký tự'); return; }
  var alerts = loadData('alerts');
  alerts.unshift({ id: newAlertId(alerts), zone: zone, issue: issue, level: level, status: 'new', time: getTimeNow() });
  saveData('alerts', alerts);
  document.getElementById('cf').reset(); document.getElementById('cf').hidden = true;
  renderStats(); renderTable(); showToast('Đã tạo cảnh báo thủ công');
}

// ---------- AI-1: tìm khu vực có tải > 135% baseline ----------
function scanAI() {
  showAiLoading('aiOut');
  setTimeout(function () {
    if (aiFailMode) { showAiError('aiOut'); return; }
    var zones = loadData('zones'), hits = [], text = '';
    for (var i = 0; i < zones.length; i++) {
      if (zones[i].loadKw > 1.35 * zones[i].baselineKw) {
        hits.push(zones[i]);
        text += '<strong>' + escapeHtml(zones[i].name) + '</strong>: ' + zones[i].loadKw + ' kW (' + Math.round(zones[i].loadKw / zones[i].baselineKw * 100) + '% baseline)<br>';
      }
    }
    if (hits.length === 0) { aiResult = { title: 'Không phát hiện bất thường', text: 'Mọi khu vực đều dưới 135% baseline.', why: 'Quy tắc: P thực tế > 1,35 × P baseline.', hits: hits }; }
    else { aiResult = { title: 'Phát hiện ' + hits.length + ' điểm spike', text: text, why: 'Tải hiện tại vượt 135% baseline; nghi ngờ HVAC hoặc thiết bị chạy ngoài kế hoạch.', hits: hits }; }
    showAiResult('aiOut', aiResult, false);
  }, 1200);
}
function aiAccept() {   // tạo cảnh báo Critical cho từng khu vực bị AI phát hiện
  var alerts = loadData('alerts');
  for (var i = 0; i < aiResult.hits.length; i++) {
    var z = aiResult.hits[i];
    alerts.unshift({ id: newAlertId(alerts), zone: z.name, issue: 'AI: spike ' + Math.round(z.loadKw / z.baselineKw * 100) + '% baseline', level: 'critical', status: 'new', time: getTimeNow() });
  }
  saveData('alerts', alerts);
  document.getElementById('aiOut').innerHTML = '<p class="ok-text">✔ Đã áp dụng đề xuất.</p>';
  renderStats(); renderTable(); showToast('Đã tạo cảnh báo từ AI');
}
function aiReject() { document.getElementById('aiOut').innerHTML = '<p class="muted">Đã từ chối đề xuất.</p>'; }
function aiRegenerate() { scanAI(); }
function aiManual() { document.getElementById('aiOut').innerHTML = ''; showToast('Chuyển sang thao tác thủ công', 'info'); }

startPage(function () {
  fillSelect('zone', ['Office Tower A', 'Lobby Area', 'Data Center', 'Chiller Plant']);
  renderStats(); renderTable();
});
