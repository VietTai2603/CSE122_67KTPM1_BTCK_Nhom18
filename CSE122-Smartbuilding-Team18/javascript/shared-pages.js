(function () {
  var roleNames = { Occupant: 'Người sử dụng tòa nhà', Operator: 'Nhân viên vận hành', 'Facility Manager': 'Quản lý cơ sở', Admin: 'Quản trị viên' };
  function notice(message, error) {
    var box = document.getElementById('notice');
    if (!box) return;
    box.textContent = message;
    box.className = 'shared-notice show' + (error ? ' error' : '');
  }
  function read(key, fallback) {
    try { var value = JSON.parse(localStorage.getItem(key)); return value || fallback; } catch (e) { return fallback; }
  }
  var session = read('sb_session', null);
  var profileForm = document.getElementById('profileForm');
  if (profileForm) {
    if (!session) { notice('Bạn chưa đăng nhập. Vui lòng đăng nhập để xem hồ sơ.', true); profileForm.hidden = true; }
    else {
      document.getElementById('name').value = session.name || '';
      document.getElementById('email').value = session.email || '';
      document.getElementById('role').value = roleNames[session.role] || session.role || '';
      profileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value.trim();
        if (!name) { notice('Vui lòng nhập họ và tên.', true); return; }
        session.name = name; localStorage.setItem('sb_session', JSON.stringify(session));
        var users = read('sb_users', []);
        for (var i = 0; i < users.length; i++) if (users[i].email.toLowerCase() === session.email.toLowerCase()) users[i].name = name;
        if (users.length) localStorage.setItem('sb_users', JSON.stringify(users));
        notice('Đã lưu thông tin hồ sơ.');
      });
      document.getElementById('logout').addEventListener('click', function () { localStorage.removeItem('sb_session'); });
    }
  }
  var settingsForm = document.getElementById('settingsForm');
  if (settingsForm) settingsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!session) { notice('Bạn cần đăng nhập trước khi đổi mật khẩu.', true); return; }
    var current = document.getElementById('currentPassword').value;
    var next = document.getElementById('newPassword').value;
    var passwordKey = 'sb_password_' + session.email.toLowerCase();
    var savedPassword = localStorage.getItem(passwordKey) || '123456';
    if (current !== savedPassword) { notice('Mật khẩu hiện tại không đúng.', true); return; }
    if (next.length < 6) { notice('Mật khẩu mới cần ít nhất 6 ký tự.', true); return; }
    if (next !== document.getElementById('confirmPassword').value) { notice('Mật khẩu xác nhận chưa khớp.', true); return; }
    localStorage.setItem(passwordKey, next);
    notice('Đã cập nhật mật khẩu cho tài khoản demo trên trình duyệt này.'); settingsForm.reset();
  });
  var forgotForm = document.getElementById('forgotForm');
  var resetForm = document.getElementById('resetForm');
  var recoveryEmail = '';
  if (forgotForm && resetForm) {
    forgotForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = document.getElementById('email').value.trim();
      var users = read('sb_users', []);
      var found = users.some(function (user) { return user.email.toLowerCase() === email.toLowerCase(); });
      if (!found) { notice('Không tìm thấy tài khoản với email này.', true); return; }
      recoveryEmail = email;
      forgotForm.hidden = true;
      resetForm.hidden = false;
      notice('Đã xác nhận tài khoản. Hãy tạo mật khẩu mới.');
    });
    resetForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var next = document.getElementById('newPassword').value;
      var confirm = document.getElementById('confirmPassword').value;
      if (next.length < 6) { notice('Mật khẩu mới cần ít nhất 6 ký tự.', true); return; }
      if (next !== confirm) { notice('Mật khẩu xác nhận chưa khớp.', true); return; }
      localStorage.setItem('sb_password_' + recoveryEmail.toLowerCase(), next);
      notice('Đã khôi phục mật khẩu. Bạn có thể đăng nhập bằng mật khẩu mới.');
      resetForm.reset();
      resetForm.hidden = true;
      var emailInput = document.getElementById('email');
      emailInput.value = recoveryEmail;
      forgotForm.hidden = false;
      forgotForm.querySelector('button[type="submit"]').textContent = 'Đổi email khác';
    });
  }
})();
