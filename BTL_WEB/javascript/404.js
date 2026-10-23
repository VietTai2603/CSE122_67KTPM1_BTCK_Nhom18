const nutQuayLai = document.getElementById('nutQuayLai');

nutQuayLai.addEventListener('click', function () {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '../index.html';
  }
});

const danhSachMeo = [
  '💡 Mẹo xanh: Tắt đèn khi rời khỏi phòng nhé!',
  '🌤️ Mở rèm để tận dụng ánh sáng tự nhiên ban ngày.',
  '🔌 Rút sạc khi không sử dụng để tránh hao điện.'
];

let viTriMeo = 0;
const nutDoiMeo = document.getElementById('nutDoiMeo');
const noiDungMeo = document.getElementById('noiDungMeo');

nutDoiMeo.addEventListener('click', function () {
  viTriMeo = viTriMeo + 1;

  if (viTriMeo >= danhSachMeo.length) {
    viTriMeo = 0;
  }

  noiDungMeo.textContent = danhSachMeo[viTriMeo];
});
