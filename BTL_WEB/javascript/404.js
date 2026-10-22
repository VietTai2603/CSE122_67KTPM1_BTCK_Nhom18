// Nút quay lại trang trước
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', function () {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '../index.html';
  }
});

// Nút tạo hiệu ứng sáng cho biểu tượng năng lượng
const energyButton = document.getElementById('energyButton');
const energyIcon = document.getElementById('energyIcon');
const energyMessage = document.getElementById('energyMessage');

energyButton.addEventListener('click', function () {
  energyIcon.classList.toggle('glow');

  if (energyIcon.classList.contains('glow')) {
    energyMessage.textContent = 'Đã nạp đầy năng lượng! Chọn một lối để tiếp tục nhé.';
  } else {
    energyMessage.textContent = 'Mạng lưới vẫn ổn định.';
  }
});

