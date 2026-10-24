(function () {
  var backLink = document.getElementById('goBack');
  if (!backLink) return;
  backLink.addEventListener('click', function (event) {
    if (!document.referrer) return;
    try {
      if (new URL(document.referrer).origin === window.location.origin) {
        event.preventDefault();
        window.history.back();
      }
    } catch (error) {
      // Giữ liên kết dự phòng về trang chủ nếu referrer không hợp lệ.
    }
  });
})();
