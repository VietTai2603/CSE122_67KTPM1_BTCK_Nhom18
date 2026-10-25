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
  var form = document.getElementById('settingsForm');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var session = read('sb_session', null);
    if (!session) { notice('Bạn cần đăng nhập trước khi đổi mật khẩu.', true); return; }
    var current = document.getElementById('currentPassword').value;
    var next = document.getElementById('newPassword').value;
    var passwordKey = 'sb_password_' + session.email.toLowerCase();
    var savedPassword = localStorage.getItem(passwordKey) || '123456';
    if (current !== savedPassword) { notice('Mật khẩu hiện tại không đúng.', true); return; }
    if (next.length < 6) { notice('Mật khẩu mới cần ít nhất 6 ký tự.', true); return; }
    if (next !== document.getElementById('confirmPassword').value) { notice('Mật khẩu xác nhận chưa khớp.', true); return; }
    localStorage.setItem(passwordKey, next);
    notice('Đã cập nhật mật khẩu cho tài khoản demo trên trình duyệt này.');
    form.reset();
  });
})();
