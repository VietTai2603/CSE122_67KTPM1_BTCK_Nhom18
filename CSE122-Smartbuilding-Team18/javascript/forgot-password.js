(function () {
  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (error) { return fallback; }
  }
  function notice(message, error) {
    var box = document.getElementById('notice');
    if (!box) return;
    box.textContent = message;
    box.className = 'shared-notice show' + (error ? ' error' : '');
  }
  var forgotForm = document.getElementById('forgotForm');
  var resetForm = document.getElementById('resetForm');
  if (!forgotForm || !resetForm) return;
  var recoveryEmail = '';
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
    document.getElementById('email').value = recoveryEmail;
    forgotForm.hidden = false;
    forgotForm.querySelector('button[type="submit"]').textContent = 'Đổi email khác';
  });
})();
