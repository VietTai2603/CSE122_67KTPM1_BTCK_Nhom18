/**
 * MAIN UTILITY JAVASCRIPT (js/main.js)
 * Điều khiển giao diện chung, thông báo nổi, drawer mobile, modal
 */

document.addEventListener('DOMContentLoaded', () => {
  setupSidebarDrawer();
  updateTopBarUserInfo();
  highlightActiveNav();
});

// Điều khiển mở/đóng Sidebar trên Mobile
function setupSidebarDrawer() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const sidebar = document.querySelector('.sidebar');
  let backdrop = document.querySelector('.sidebar-backdrop');

  if (!backdrop && sidebar) {
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      if (backdrop) backdrop.classList.toggle('active');
    });
  }

  if (backdrop && sidebar) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('show');
      backdrop.classList.remove('active');
    });
  }
}

// Cập nhật thông tin người dùng và điểm thưởng trên Topbar
function updateTopBarUserInfo() {
  if (typeof getStore !== 'function') return;
  const store = getStore();
  const user = store.currentUser;

  const pointsEl = document.getElementById('userPointsDisplay');
  if (pointsEl && user) {
    pointsEl.textContent = `${user.points} Điểm Xanh`;
  }

  const nameEl = document.getElementById('sidebarUserName');
  if (nameEl && user) {
    nameEl.textContent = user.name;
  }

  const roomEl = document.getElementById('sidebarUserRoom');
  if (roomEl && user) {
    roomEl.textContent = user.room;
  }
}

// Tự động kích hoạt liên kết menu hiện tại
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar-menu .nav-item');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// Hệ thống Toast Notification
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="18" height="18" fill="none" stroke="#10b981" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  } else if (type === 'danger') {
    iconSvg = `<svg width="18" height="18" fill="none" stroke="#f87171" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
  } else {
    iconSvg = `<svg width="18" height="18" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Điều khiển Modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}
