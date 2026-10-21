/* Saving Actions (C/R/U/D) + AI-2 gợi ý tiết kiệm */
buildLayout('operator-saving-actions.html', 'Quản lý hành động tiết kiệm', 'Điều phối lệnh tiết kiệm điện');
var editingId = null;   // null = đang thêm mới; có số = đang sửa
var aiResult = null;
var STATUS = { scheduled: { text: 'Đã lên lịch', cls: 'badge-pending' }, active: { text: 'Đang chạy', cls: 'badge-investigating' }, completed: { text: 'Hoàn thành', cls: 'badge-resolved' } };

function renderStats() {
  var actions = loadData('operator_actions'), running = 0, waiting = 0, saving = 0;
  for (var i = 0; i < actions.length; i++) {
    if (actions[i].status === 'active') { running++; saving += actions[i].savingKwh; }
    if (actions[i].status === 'scheduled') { waiting++; }
  }
  document.getElementById('stats').innerHTML = statCard('Đang thực thi', running + ' tác vụ', 'v-sky') + statCard('Chờ chạy', waiting + ' tác vụ', 'v-amber') + statCard('Tiết kiệm dự kiến', formatNumber(saving) + ' kWh', 'v-green');
}
function renderList() {
  var actions = loadData('operator_actions'), html = '';
  for (var i = 0; i < actions.length; i++) {
    var a = actions[i];
    html += '<article class="card section"><div class="card-header"><strong>' + escapeHtml(a.name) + '</strong><span class="badge ' + STATUS[a.status].cls + '">' + STATUS[a.status].text + '</span></div>' +
      '<p class="stat-label">' + escapeHtml(a.zone) + ' · tiết kiệm ~' + formatNumber(a.savingKwh) + ' kWh</p>' +
      '<div class="progress"><i style="width:' + a.progress + '%"></i></div><p class="stat-label">' + a.progress + '% hoàn thành</p>' +
      '<button class="btn btn-secondary btn-sm" onclick="editAction(' + a.id + ')">Sửa</button> ' +
      '<button class="btn btn-danger btn-sm" onclick="deleteAction(' + a.id + ')">Hủy lệnh</button></article>';
  }
  if (html === '') { html = '<div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Hãy thêm mới hoặc nhờ AI gợi ý.</p></div>'; }
  document.getElementById('list').innerHTML = html;
}
function fillForm(name, zone, saving, progress, status) {
  document.getElementById('title').value = name; document.getElementById('zone').value = zone; document.getElementById('saving').value = saving;
  document.getElementById('progress').value = progress; document.getElementById('status').value = status;
  document.getElementById('af').scrollIntoView({ behavior: 'smooth' });
}
function resetForm() {
  editingId = null;
  document.getElementById('af').reset();
  document.getElementById('submitBtn').textContent = 'Lưu tác vụ';
  document.getElementById('cancelBtn').hidden = true;
  clearErrors('af');
}
function saveAction(event) {   // Create hoặc Update tùy editingId
  event.preventDefault();
  clearErrors('af');
  var title = document.getElementById('title').value.trim(), zone = document.getElementById('zone').value;
  var saving = Number(document.getElementById('saving').value), progress = Number(document.getElementById('progress').value);
  var status = document.getElementById('status').value, ok = true;
  if (title.length < 3) { setError('title', 'Tên tối thiểu 3 ký tự'); ok = false; }
  if (!(saving > 0)) { setError('saving', 'Nhập số kWh lớn hơn 0'); ok = false; }
  if (!(progress >= 0 && progress <= 100)) { setError('progress', 'Tiến độ từ 0 đến 100'); ok = false; }
  if (!ok) { return; }
  var actions = loadData('operator_actions');
  if (editingId === null) {
    actions.push({ id: Date.now(), name: title, zone: zone, savingKwh: saving, progress: progress, status: status });
    showToast('Đã thêm tác vụ');
  } else {
    for (var i = 0; i < actions.length; i++) {
      if (actions[i].id === editingId) { actions[i].name = title; actions[i].zone = zone; actions[i].savingKwh = saving; actions[i].progress = progress; actions[i].status = status; }
    }
    showToast('Đã cập nhật tác vụ');
  }
  saveData('operator_actions', actions);
  resetForm(); renderStats(); renderList();
}
function editAction(id) {
  var actions = loadData('operator_actions');
  for (var i = 0; i < actions.length; i++) {
    if (actions[i].id === id) {
      editingId = id;
      fillForm(actions[i].name, actions[i].zone, actions[i].savingKwh, actions[i].progress, actions[i].status);
      document.getElementById('submitBtn').textContent = 'Cập nhật tác vụ';
      document.getElementById('cancelBtn').hidden = false;
    }
  }
}
function deleteAction(id) {   // Delete có hộp xác nhận
  confirmBox('Hủy lệnh tiết kiệm này? Thao tác không thể hoàn tác.', function () {
    var actions = loadData('operator_actions'), kept = [];
    for (var i = 0; i < actions.length; i++) { if (actions[i].id !== id) { kept.push(actions[i]); } }
    saveData('operator_actions', kept);
    resetForm(); renderStats(); renderList(); showToast('Đã hủy lệnh', 'danger');
  });
}

// ---------- AI-2: gợi ý theo khu vực + nhiệt độ ngoài trời ----------
function suggestFor(zone, temp) {   // trả về gợi ý, hoặc null nếu không đủ căn cứ
  var now = new Date(), hour = now.getHours() + now.getMinutes() / 60, ratio = zone.loadKw / zone.ratedKw, percent = 0, name = '', why = '';
  if (zone.loadKw > 1.3 * zone.baselineKw) { name = 'Tạm dừng các tải không khẩn cấp'; percent = 0.15; why = 'Tải ' + zone.loadKw + ' kW cao hơn ' + Math.round(zone.loadKw / zone.baselineKw * 100) + '% baseline.'; }
  else if (temp > 32 && zone.type === 'HVAC') { name = 'Tăng nhiệt độ điều hòa lên 26°C'; percent = 0.12; why = 'Ngoài trời ' + temp + '°C (> 32°C) và khu vực dùng HVAC.'; }
  else if (hour >= 12 && hour <= 13.5) { name = 'Tắt đèn khu vực làm việc chung giờ trưa'; percent = 0.08; why = 'Khung 12:00–13:30 ít người sử dụng.'; }
  else if (ratio > 0.8) { name = 'Điều chỉnh giờ chạy HVAC 9:00–16:00'; percent = 0.1; why = 'Tải đạt ' + Math.round(ratio * 100) + '% công suất thiết kế (> 80%).'; }
  else { return null; }
  var kwh = Math.round(zone.loadKw * percent);
  return { title: 'Gợi ý cho ' + escapeHtml(zone.name), text: escapeHtml(name) + ' — tiết kiệm khoảng <strong>' + kwh + ' kWh</strong>.', why: why, name: name, zone: zone.name, kwh: kwh };
}
function askAI() {
  var temp = document.getElementById('aiTemp').value, error = document.getElementById('aiErr');
  error.textContent = '';
  if (temp === '' || isNaN(temp) || Number(temp) < 10 || Number(temp) > 45) { error.textContent = 'Nhiệt độ ngoài trời phải từ 10 đến 45°C.'; return; }
  showAiLoading('aiOut');
  setTimeout(function () {
    if (aiFailMode) { showAiError('aiOut'); return; }
    var zones = loadData('zones'), chosen = document.getElementById('aiZone').value, zone = null;
    for (var i = 0; i < zones.length; i++) { if (zones[i].name === chosen) { zone = zones[i]; } }
    aiResult = suggestFor(zone, Number(temp));
    if (aiResult === null) { showAiError('aiOut'); } else { showAiResult('aiOut', aiResult, true); }
  }, 1200);
}
function aiAccept() {
  var actions = loadData('operator_actions');
  actions.push({ id: Date.now(), name: aiResult.name, zone: aiResult.zone, savingKwh: aiResult.kwh, progress: 0, status: 'scheduled' });
  saveData('operator_actions', actions);
  document.getElementById('aiOut').innerHTML = '<p class="ok-text">✔ Đã áp dụng đề xuất.</p>';
  renderStats(); renderList(); showToast('Đã thêm tác vụ từ AI');
}
function aiEdit() { fillForm(aiResult.name, aiResult.zone, aiResult.kwh, 0, 'scheduled'); showToast('Đã điền gợi ý vào biểu mẫu, hãy chỉnh rồi lưu', 'info'); }
function aiReject() { document.getElementById('aiOut').innerHTML = '<p class="muted">Đã từ chối đề xuất.</p>'; }
function aiRegenerate() { askAI(); }
function aiManual() { document.getElementById('aiOut').innerHTML = ''; showToast('Chuyển sang thao tác thủ công', 'info'); }

startPage(function () {
  var names = ['Office Tower A', 'Lobby Area', 'Data Center', 'Chiller Plant'];
  fillSelect('zone', names); fillSelect('aiZone', names);
  renderStats(); renderList();
});
