/* Zone Management (C/R/U/D): quản lý danh mục khu vực */
buildLayout('admin-zone-management.html', 'Quản trị danh mục khu vực', 'Zone Management', 'Admin: Quản trị viên');
var editingId = null;

function getZones() {   // zone do trang Operator lưu có thể thiếu mã, diện tích, trạng thái -> bổ sung mặc định
  var zones = loadData('zones');
  var defaults = { 'Office Tower A': ['Z-01', 20000], 'Lobby Area': ['Z-02', 4000], 'Data Center': ['Z-03', 1500], 'Chiller Plant': ['Z-04', 1000] };
  for (var i = 0; i < zones.length; i++) {
    var d = defaults[zones[i].name];
    if (!zones[i].code) { zones[i].code = d ? d[0] : 'Z-' + padNumber(zones[i].id, 2); }
    if (!zones[i].areaM2) { zones[i].areaM2 = d ? d[1] : 2000; }
    if (!zones[i].status) { zones[i].status = 'active'; }
  }
  return zones;
}
function countSensors(zoneName) {
  var sensors = loadData('sensors'), n = 0;
  for (var i = 0; i < sensors.length; i++) { if (sensors[i].zone === zoneName) { n++; } }
  return n;
}
function renderStats() {
  var zones = getZones(), active = 0;
  for (var i = 0; i < zones.length; i++) { if (zones[i].status === 'active') { active++; } }
  document.getElementById('stats').innerHTML = statCard('Tổng khu vực quản lý', zones.length + ' khu vực', '') +
    statCard('Đang hoạt động', active + ' zone', 'v-green') + statCard('Vô hiệu hóa', (zones.length - active) + ' zone', 'v-sky');
}
function renderTable() {
  var zones = getZones(), keyword = document.getElementById('q').value.toLowerCase(), html = '';
  for (var i = 0; i < zones.length; i++) {
    var z = zones[i];
    if ((z.code + ' ' + z.name + ' ' + z.type).toLowerCase().indexOf(keyword) === -1) { continue; }
    var badge = z.status === 'active' ? '<span class="badge badge-resolved">Hoạt động</span>' : '<span class="badge badge-priority-high">Đã khóa</span>';
    var lockText = z.status === 'active' ? 'Khóa' : 'Mở khóa';
    html += '<tr><td>' + escapeHtml(z.code) + '</td><td><strong>' + escapeHtml(z.name) + '</strong><div class="stat-label">Tầng ' + escapeHtml(z.floor) + ' · ' + formatNumber(z.areaM2) + ' m²</div></td>' +
      '<td>' + escapeHtml(z.type) + '</td><td>' + formatNumber(z.ratedKw) + ' kW</td><td>' + countSensors(z.name) + ' sensors</td><td>' + badge + '</td>' +
      '<td><button class="link-btn" onclick="editZone(' + z.id + ')">Sửa</button><button class="link-btn" onclick="toggleLock(' + z.id + ')">' + lockText + '</button>' +
      '<button class="link-btn danger" onclick="deleteZone(' + z.id + ')">Xóa</button></td></tr>';
  }
  if (html === '') { html = '<tr><td colspan="7"><div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Không có khu vực phù hợp.</p></div></td></tr>'; }
  document.getElementById('rows').innerHTML = html;
}
function resetForm() {
  editingId = null;
  document.getElementById('af').reset();
  document.getElementById('submitBtn').textContent = 'Lưu khu vực';
  document.getElementById('cancelBtn').hidden = true;
  clearErrors('af');
}
function saveZone(event) {   // Create hoặc Update tùy editingId
  event.preventDefault();
  clearErrors('af');
  var code = document.getElementById('code').value.trim(), name = document.getElementById('name').value.trim(), floor = document.getElementById('floor').value.trim();
  var type = document.getElementById('type').value, area = Number(document.getElementById('areaM2').value), rated = Number(document.getElementById('ratedKw').value);
  var zones = getZones(), ok = true;
  var duplicate = false;
  for (var i = 0; i < zones.length; i++) { if (zones[i].code === code && zones[i].id !== editingId) { duplicate = true; } }
  if (!isValidCode(code, 'Z-', 2) || duplicate) { setError('code', 'Mã dạng Z-05 và không được trùng'); ok = false; }
  if (name.length < 3) { setError('name', 'Tên tối thiểu 3 ký tự'); ok = false; }
  if (floor === '') { setError('floor', 'Nhập tầng'); ok = false; }
  if (!(area > 0)) { setError('areaM2', 'Diện tích phải lớn hơn 0'); ok = false; }
  if (!(rated > 0)) { setError('ratedKw', 'Công suất phải lớn hơn 0'); ok = false; }
  if (!ok) { return; }
  if (editingId === null) {
    zones.push({ id: Date.now(), code: code, name: name, floor: floor, type: type, areaM2: area, ratedKw: rated,
                 loadKw: Math.round(rated * 0.5), baselineKw: Math.round(rated * 0.45), status: 'active' });
    showToast('Đã thêm khu vực');
  } else {
    for (var j = 0; j < zones.length; j++) {
      if (zones[j].id === editingId) { zones[j].code = code; zones[j].name = name; zones[j].floor = floor; zones[j].type = type; zones[j].areaM2 = area; zones[j].ratedKw = rated; }
    }
    showToast('Đã cập nhật khu vực');
  }
  saveData('zones', zones);
  resetForm(); renderStats(); renderTable();
}
function editZone(id) {
  var zones = getZones();
  for (var i = 0; i < zones.length; i++) {
    if (zones[i].id === id) {
      editingId = id;
      document.getElementById('code').value = zones[i].code; document.getElementById('name').value = zones[i].name; document.getElementById('floor').value = zones[i].floor;
      document.getElementById('type').value = zones[i].type; document.getElementById('areaM2').value = zones[i].areaM2; document.getElementById('ratedKw').value = zones[i].ratedKw;
      document.getElementById('submitBtn').textContent = 'Cập nhật khu vực';
      document.getElementById('cancelBtn').hidden = false;
      document.getElementById('af').scrollIntoView({ behavior: 'smooth' });
    }
  }
}
function toggleLock(id) {   // Khóa / mở khóa: khu vực bị khóa bị ẩn khỏi KPI và so sánh
  var zones = getZones();
  for (var i = 0; i < zones.length; i++) {
    if (zones[i].id === id) { zones[i].status = (zones[i].status === 'active') ? 'locked' : 'active'; }
  }
  saveData('zones', zones);
  renderStats(); renderTable(); showToast('Đã đổi trạng thái khu vực', 'info');
}
function deleteZone(id) {
  var zones = getZones(), zone = null;
  for (var i = 0; i < zones.length; i++) { if (zones[i].id === id) { zone = zones[i]; } }
  var n = countSensors(zone.name);
  if (n > 0) { showToast('Không thể xóa: còn ' + n + ' cảm biến gắn kèm.', 'danger'); return; }
  confirmBox('Xóa khu vực "' + zone.name + '"? Thao tác không thể hoàn tác.', function () {
    var kept = [];
    for (var k = 0; k < zones.length; k++) { if (zones[k].id !== id) { kept.push(zones[k]); } }
    saveData('zones', kept);
    resetForm(); renderStats(); renderTable(); showToast('Đã xóa khu vực', 'danger');
  });
}
startPage(function () {
  renderStats(); renderTable();
  document.getElementById('q').oninput = renderTable;
});
