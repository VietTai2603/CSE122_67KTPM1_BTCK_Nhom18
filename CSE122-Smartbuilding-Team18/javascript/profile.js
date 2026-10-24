(function () {
  var roleNames = { Occupant: 'Người sử dụng tòa nhà', Operator: 'Nhân viên vận hành', 'Facility Manager': 'Quản lý cơ sở', Admin: 'Quản trị viên' };
  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (error) { return fallback; }
  }
  function notice(message, error) {
    var box = document.getElementById('notice');
    if (!box) return;
    box.textContent = message;
    box.className = 'shared-notice show' + (error ? ' error' : '');
  }
  var session = read('sb_session', null);
  var form = document.getElementById('profileForm');
  if (!form) return;
  if (!session) {
    notice('Bạn chưa đăng nhập. Vui lòng đăng nhập để xem hồ sơ.', true);
    form.hidden = true;
    return;
  }
  document.getElementById('name').value = session.name || '';
  document.getElementById('email').value = session.email || '';
  document.getElementById('role').value = roleNames[session.role] || session.role || '';
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('name').value.trim();
    if (!name) { notice('Vui lòng nhập họ và tên.', true); return; }
    session.name = name;
    localStorage.setItem('sb_session', JSON.stringify(session));
    var users = read('sb_users', []);
    for (var i = 0; i < users.length; i++) {
      if (users[i].email && users[i].email.toLowerCase() === session.email.toLowerCase()) users[i].name = name;
    }
    if (users.length) localStorage.setItem('sb_users', JSON.stringify(users));
    notice('Đã lưu thông tin hồ sơ.');
  });
  var logout = document.getElementById('logout');
  if (logout) logout.addEventListener('click', function () { localStorage.removeItem('sb_session'); });
})();
