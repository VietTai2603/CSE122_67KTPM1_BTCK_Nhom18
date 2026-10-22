/* Đăng nhập MÔ PHỎNG: đối chiếu email với danh sách người dùng (Admin quản lý ở trang User Management) */
var DEMO_PASSWORD = '123456';
var ROUTE = { 'Occupant': 'occupant-dashboard.html', 'Operator': 'operator-energy-monitor.html', 'Facility Manager': 'manager-energy-kpis.html', 'Admin': 'admin-zone-management.html' };
var ROLE_NAME = { 'Occupant': 'Người sử dụng tòa nhà', 'Operator': 'Nhân viên vận hành', 'Facility Manager': 'Quản lý cơ sở', 'Admin': 'Quản trị viên' };

function showMessage(type, html) {
  var box = document.getElementById('msg');
  box.className = 'auth-msg ' + type;
  box.innerHTML = html;
}
function clearMessage() { document.getElementById('msg').className = 'auth-msg'; }
function togglePassword() {
  var input = document.getElementById('password'), button = document.getElementById('pwToggle');
  if (input.type === 'password') { input.type = 'text'; button.textContent = 'Ẩn'; }
  else { input.type = 'password'; button.textContent = 'Hiện'; }
}
function fillDemo(email) {   // bấm nút vai trò -> điền sẵn email và mật khẩu
  document.getElementById('email').value = email;
  document.getElementById('password').value = DEMO_PASSWORD;
  clearMessage(); clearErrors('lf');
}
function renderDemoButtons() {
  var users = loadData('users'), roles = ['Occupant', 'Operator', 'Facility Manager', 'Admin'], html = '';
  for (var r = 0; r < roles.length; r++) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].role === roles[r] && users[i].status === 'active') {   // lấy tài khoản đầu tiên còn hoạt động của vai trò này
        html += '<button type="button" class="btn btn-secondary btn-sm" onclick="fillDemo(\'' + users[i].email + '\')">' + ROLE_NAME[roles[r]] + '</button>';
        break;
      }
    }
  }
  document.getElementById('demo').innerHTML = html;
}
function findUserByEmail(email) {
  var users = loadData('users');
  for (var i = 0; i < users.length; i++) { if (users[i].email.toLowerCase() === email.toLowerCase()) { return users[i]; } }
  return null;
}
function login(event) {
  event.preventDefault();
  clearMessage(); clearErrors('lf');
  var email = document.getElementById('email').value.trim(), password = document.getElementById('password').value, ok = true;
  if (!isValidEmail(email)) { setError('email', 'Vui lòng nhập email hợp lệ'); ok = false; }
  if (password.length < 6) { setError('password', 'Mật khẩu tối thiểu 6 ký tự'); ok = false; }
  if (!ok) { return; }
  var button = document.getElementById('submitBtn');
  button.disabled = true;
  button.classList.add('is-checking');
  document.getElementById('submitText').textContent = 'Đang kiểm tra…';   // trạng thái "đang kiểm tra"
  setTimeout(function () {
    button.disabled = false;
    button.classList.remove('is-checking');
    document.getElementById('submitText').textContent = 'Đăng nhập';
    var user = findUserByEmail(email);
    if (user === null || password !== DEMO_PASSWORD) { showMessage('error', 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.'); return; }   // lỗi xác thực
    if (user.status !== 'active') { showMessage('error', 'Tài khoản này đã bị khóa. Vui lòng liên hệ Quản trị viên.'); return; }
    saveData('session', { id: user.id, name: user.name, email: user.email, role: user.role });
    showMessage('info', 'Xin chào <strong>' + escapeHtml(user.name) + '</strong> (' + ROLE_NAME[user.role] + '). Đang chuyển trang…');
    showToast('Đăng nhập thành công');
    setTimeout(function () { location.href = ROUTE[user.role]; }, 700);
  }, 900);
}
function logout() {
  localStorage.removeItem('sb_session');
  clearMessage();
  showToast('Đã đăng xuất', 'info');
  return false;
}

renderDemoButtons();
var savedSession = localStorage.getItem('sb_session');   // đã đăng nhập từ trước?
if (savedSession) {
  var session = JSON.parse(savedSession);
  showMessage('info', 'Đang đăng nhập với <strong>' + escapeHtml(session.name) + '</strong> (' + ROLE_NAME[session.role] + '). <a href="' + ROUTE[session.role] + '" style="text-decoration:underline">Tiếp tục</a> · <a href="#" onclick="return logout()" style="text-decoration:underline">Đăng xuất</a>');
}
