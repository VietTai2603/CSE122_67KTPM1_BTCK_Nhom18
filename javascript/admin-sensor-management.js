/* Sensor Management (C/R/U/D): quản lý cảm biến IoT giả lập */
buildLayout('admin-sensor-management.html', 'Quản trị hệ thống cảm biến', 'Sensor Management', 'Admin: Quản trị viên');
var editingId = null;
var STATUS = { online: { text: 'Hoạt động', cls: 'badge-resolved' }, offline: { text: 'Lỗi kết nối', cls: 'badge-priority-high' }, calibrating: { text: 'Đang hiệu chuẩn', cls: 'badge-pending' } };

function renderStats() {
  var sensors = loadData('sensors'), online = 0, offline = 0, sum = 0;
  for (var i = 0; i < sensors.length; i++) {
    if (sensors[i].status === 'online') { online++; }
    if (sensors[i].status === 'offline') { offline++; }
    sum += sensors[i].intervalSec;
  }
  var avg = sensors.length > 0 ? Math.round(sum / sensors.length) : 0;
  document.getElementById('stats').innerHTML = statCard('Tổng cảm biến', sensors.length + ' thiết bị', '') + statCard('Hoạt động tốt', online + ' thiết bị', 'v-green') +
    statCard('Lỗi kết nối', offline + ' thiết bị', 'v-rose') + statCard('Tần suất đọc TB', avg + 's / lần', 'v-sky');
}
function renderTable() {
  var sensors = loadData('sensors'), keyword = document.getElementById('q').value.toLowerCase(), html = '';
  for (var i = 0; i < sensors.length; i++) {
    var s = sensors[i];
    if ((s.code + ' ' + s.type + ' ' + s.zone).toLowerCase().indexOf(keyword) === -1) { continue; }
    var syncBtn = (s.status === 'offline') ? '<button class="link-btn" onclick="syncOne(' + s.id + ')">Đồng bộ lại</button>' : '';
    html += '<tr><td><strong>' + escapeHtml(s.code) + '</strong></td><td>' + escapeHtml(s.type) + '</td><td>' + escapeHtml(s.zone) + '</td><td>' + s.intervalSec + 's</td>' +
      '<td><span class="badge ' + STATUS[s.status].cls + '">' + STATUS[s.status].text + '</span></td>' +
      '<td><button class="link-btn" onclick="editSensor(' + s.id + ')">Cấu hình</button>' + syncBtn + '<button class="link-btn danger" onclick="deleteSensor(' + s.id + ')">Xóa</button></td></tr>';
  }
  if (html === '') { html = '<tr><td colspan="6"><div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Không có cảm biến phù hợp.</p></div></td></tr>'; }
  document.getElementById('rows').innerHTML = html;
}
function resetForm() {
  editingId = null;
  document.getElementById('af').reset();
  document.getElementById('submitBtn').textContent = 'Lưu cảm biến';
  document.getElementById('cancelBtn').hidden = true;
  clearErrors('af');
}
function saveSensor(event) {
  event.preventDefault();
  clearErrors('af');
  var code = document.getElementById('code').value.trim(), type = document.getElementById('type').value, zone = document.getElementById('zone').value;
  var interval = Number(document.getElementById('intervalSec').value), sensors = loadData('sensors'), ok = true, duplicate = false;
  for (var i = 0; i < sensors.length; i++) { if (sensors[i].code === code && sensors[i].id !== editingId) { duplicate = true; } }
  if (!isValidCode(code, 'SEN-', 3) || duplicate) { setError('code', 'Mã dạng SEN-009 và không được trùng'); ok = false; }
  if (!(interval >= 1 && interval <= 60)) { setError('intervalSec', 'Từ 1 đến 60 giây'); ok = false; }
  if (!ok) { return; }
  if (editingId === null) {
    sensors.push({ id: Date.now(), code: code, type: type, zone: zone, status: 'online', intervalSec: interval });
    showToast('Đã thêm cảm biến');
  } else {
    for (var j = 0; j < sensors.length; j++) {
      if (sensors[j].id === editingId) { sensors[j].code = code; sensors[j].type = type; sensors[j].zone = zone; sensors[j].intervalSec = interval; }
    }
    showToast('Đã cập nhật cảm biến');
  }
  saveData('sensors', sensors);
  resetForm(); renderStats(); renderTable();
}
function editSensor(id) {
  var sensors = loadData('sensors');
  for (var i = 0; i < sensors.length; i++) {
    if (sensors[i].id === id) {
      editingId = id;
      document.getElementById('code').value = sensors[i].code; document.getElementById('type').value = sensors[i].type;
      document.getElementById('zone').value = sensors[i].zone; document.getElementById('intervalSec').value = sensors[i].intervalSec;
      document.getElementById('submitBtn').textContent = 'Cập nhật cảm biến';
      document.getElementById('cancelBtn').hidden = false;
      document.getElementById('af').scrollIntoView({ behavior: 'smooth' });
    }
  }
}
function deleteSensor(id) {
  confirmBox('Xóa cảm biến này? Thao tác không thể hoàn tác.', function () {
    var sensors = loadData('sensors'), kept = [];
    for (var i = 0; i < sensors.length; i++) { if (sensors[i].id !== id) { kept.push(sensors[i]); } }
    saveData('sensors', kept);
    resetForm(); renderStats(); renderTable(); showToast('Đã xóa cảm biến', 'danger');
  });
}
function setStatus(id, status) {
  var sensors = loadData('sensors');
  for (var i = 0; i < sensors.length; i++) { if (sensors[i].id === id) { sensors[i].status = status; } }
  saveData('sensors', sensors);
  renderStats(); renderTable();
}
function syncOne(id) {   // mô phỏng: hiệu chuẩn 1,2 giây rồi online
  setStatus(id, 'calibrating');
  setTimeout(function () { setStatus(id, 'online'); showToast('Đã đồng bộ lại cảm biến'); }, 1200);
}
function syncAll(button) {   // mô phỏng "ping" tất cả cảm biến chưa online
  var sensors = loadData('sensors'), count = 0;
  for (var i = 0; i < sensors.length; i++) { if (sensors[i].status !== 'online') { count++; } }
  if (count === 0) { showToast('Tất cả cảm biến đang hoạt động', 'info'); return; }
  button.disabled = true;
  button.textContent = 'Đang gửi tín hiệu ping…';
  setTimeout(function () {
    var list = loadData('sensors');
    for (var j = 0; j < list.length; j++) { list[j].status = 'online'; }
    saveData('sensors', list);
    button.disabled = false;
    button.textContent = 'Chạy đồng bộ tự động';
    renderStats(); renderTable(); showToast('Đã đồng bộ ' + count + ' cảm biến');
  }, 1500);
}
startPage(function () {
  var zoneNames = [], zones = loadData('zones');
  for (var i = 0; i < zones.length; i++) { zoneNames.push(zones[i].name); }
  fillSelect('zone', zoneNames);
  renderStats(); renderTable();
  document.getElementById('q').oninput = renderTable;
  document.getElementById('syncAll').onclick = function () { syncAll(this); };
});
