/* User Management (C/R/U/D): quản lý tài khoản và phân quyền */
buildLayout('admin-user-management.html', 'Quản trị người dùng & phân quyền', 'User Management', 'Admin: Quản trị viên');
var editingId = null;

function countActiveAdmins(users) {
  var n = 0;
  for (var i = 0; i < users.length; i++) { if (users[i].role === 'Admin' && users[i].status === 'active') { n++; } }
  return n;
}
function renderStats() {
  var users = loadData('users'), active = 0;
  for (var i = 0; i < users.length; i++) { if (users[i].status === 'active') { active++; } }
  document.getElementById('stats').innerHTML = statCard('Tổng tài khoản', users.length + ' người dùng', '') + statCard('Đang hoạt động', active, 'v-green') + statCard('Đã khóa', users.length - active, 'v-rose');
}
function renderTable() {
  var users = loadData('users'), keyword = document.getElementById('q').value.toLowerCase(), html = '';
  for (var i = 0; i < users.length; i++) {
    var u = users[i];
    if ((u.name + ' ' + u.email + ' ' + u.role).toLowerCase().indexOf(keyword) === -1) { continue; }
    var badge = u.status === 'active' ? '<span class="badge badge-resolved">Hoạt động</span>' : '<span class="badge badge-priority-high">Đã khóa</span>';
    var lockText = u.status === 'active' ? 'Khóa' : 'Mở khóa';
    html += '<tr><td><strong>' + escapeHtml(u.name) + '</strong><div class="stat-label">' + escapeHtml(u.email) + '</div></td><td>' + escapeHtml(u.role) + '</td><td>' + escapeHtml(u.zone) + '</td><td>' + badge + '</td>' +
      '<td><button class="link-btn" onclick="editUser(' + u.id + ')">Sửa</button><button class="link-btn" onclick="toggleLockUser(' + u.id + ')">' + lockText + '</button>' +
      '<button class="link-btn danger" onclick="deleteUser(' + u.id + ')">Xóa</button></td></tr>';
  }
  if (html === '') { html = '<tr><td colspan="5"><div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Không có tài khoản phù hợp.</p></div></td></tr>'; }
  document.getElementById('rows').innerHTML = html;
}
function resetForm() {
  editingId = null;
  document.getElementById('af').reset();
  document.getElementById('submitBtn').textContent = 'Lưu người dùng';
  document.getElementById('cancelBtn').hidden = true;
  clearErrors('af');
}
function saveUser(event) {
  event.preventDefault();
  clearErrors('af');
  var name = document.getElementById('name').value.trim(), email = document.getElementById('email').value.trim();
  var role = document.getElementById('role').value, zone = document.getElementById('zone').value;
  var users = loadData('users'), ok = true, duplicate = false;
  for (var i = 0; i < users.length; i++) { if (users[i].email === email && users[i].id !== editingId) { duplicate = true; } }
  if (name.length < 3) { setError('name', 'Tên tối thiểu 3 ký tự'); ok = false; }
  if (!isValidEmail(email) || duplicate) { setError('email', 'Email hợp lệ và không được trùng'); ok = false; }
  if (!ok) { return; }
  if (editingId === null) {
    users.push({ id: Date.now(), name: name, email: email, role: role, zone: zone, status: 'active' });
    showToast('Đã thêm người dùng');
  } else {
    for (var j = 0; j < users.length; j++) {
      if (users[j].id === editingId) { users[j].name = name; users[j].email = email; users[j].role = role; users[j].zone = zone; }
    }
    showToast('Đã cập nhật người dùng');
  }
  saveData('users', users);
  resetForm(); renderStats(); renderTable();
}
function editUser(id) {
  var users = loadData('users');
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      editingId = id;
      document.getElementById('name').value = users[i].name; document.getElementById('email').value = users[i].email;
      document.getElementById('role').value = users[i].role; document.getElementById('zone').value = users[i].zone;
      document.getElementById('submitBtn').textContent = 'Cập nhật người dùng';
      document.getElementById('cancelBtn').hidden = false;
      document.getElementById('af').scrollIntoView({ behavior: 'smooth' });
    }
  }
}
function findUser(users, id) {
  for (var i = 0; i < users.length; i++) { if (users[i].id === id) { return users[i]; } }
  return null;
}
function toggleLockUser(id) {
  var users = loadData('users'), user = findUser(users, id);
  if (user.role === 'Admin' && user.status === 'active' && countActiveAdmins(users) <= 1) { showToast('Phải còn ít nhất 1 Admin đang hoạt động', 'danger'); return; }
  user.status = (user.status === 'active') ? 'locked' : 'active';
  saveData('users', users);
  renderStats(); renderTable(); showToast('Đã đổi trạng thái tài khoản', 'info');
}
function deleteUser(id) {
  var users = loadData('users'), user = findUser(users, id);
  if (user.role === 'Admin' && user.status === 'active' && countActiveAdmins(users) <= 1) { showToast('Không thể xóa Admin cuối cùng.', 'danger'); return; }
  confirmBox('Xóa tài khoản "' + user.name + '"? Thao tác không thể hoàn tác.', function () {
    var kept = [];
    for (var i = 0; i < users.length; i++) { if (users[i].id !== id) { kept.push(users[i]); } }
    saveData('users', kept);
    resetForm(); renderStats(); renderTable(); showToast('Đã xóa người dùng', 'danger');
  });
}
startPage(function () {
  var names = ['Toàn tòa nhà'], zones = loadData('zones');
  for (var i = 0; i < zones.length; i++) { names.push(zones[i].name); }
  fillSelect('zone', names);
  renderStats(); renderTable();
  document.getElementById('q').oninput = renderTable;
});
