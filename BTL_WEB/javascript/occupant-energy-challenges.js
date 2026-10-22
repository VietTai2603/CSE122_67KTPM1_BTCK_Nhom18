/* Energy Challenges (C/R/U): xem, tham gia thử thách, ghi nhận tiến độ và nhận điểm */
var activeFilter = 'all';

function setupFilterTabs() {   // bấm tab nào thì lọc theo tab đó
  var tabs = document.querySelectorAll('#challengeTabs .filter-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function () {
      for (var j = 0; j < tabs.length; j++) { tabs[j].classList.remove('active'); }
      this.classList.add('active');
      activeFilter = this.getAttribute('data-filter');
      renderChallenges();
    });
  }
}

function renderChallenges() {
  var list = getChallenges(activeFilter), container = document.getElementById('challengesGrid');
  if (list.length === 0) {
    container.innerHTML = '<div class="empty-state" style="grid-column: span 2;"><div class="empty-state-title">Không tìm thấy thử thách nào trong mục này</div></div>';
    return;
  }
  var html = '';
  for (var i = 0; i < list.length; i++) {
    var ch = list[i], statusBadge = '', actionBtn = '';
    if (ch.status === 'available') {
      statusBadge = '<span class="badge" style="background: rgba(255,255,255,0.08); color: var(--text-muted);">Chưa tham gia</span>';
      actionBtn = '<button class="btn btn-primary" onclick="handleJoinChallenge(\'' + ch.id + '\')">Tham gia thử thách ngay &rarr;</button>';
    } else if (ch.status === 'in-progress') {
      statusBadge = '<span class="badge badge-pending">Đang thực hiện</span>';
      actionBtn = '<button class="btn btn-secondary" onclick="handleProgressStep(\'' + ch.id + '\')">Ghi nhận tiến độ hôm nay (+1 bước)</button>';
    } else {
      statusBadge = '<span class="badge badge-resolved">Đã hoàn thành xuất sắc</span>';
      actionBtn = '<button class="btn btn-secondary" style="opacity: 0.7; cursor: default;" disabled>✓ Đã nhận ' + ch.rewardPoints + ' điểm</button>';
    }
    html += '<div class="challenge-card"><div class="challenge-header"><div>' +
      '<span class="challenge-badge-icon">' + ch.badge.split(' ')[0] + '</span>' +
      '<span class="badge" style="margin-left: 6px; background: rgba(255,255,255,0.05); color: var(--text-dim);">' + ch.category + '</span>' +
      '<h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 6px; color: #fff;">' + ch.title + '</h3></div>' +
      '<div style="text-align: right;"><span class="challenge-points">+' + ch.rewardPoints + ' Điểm</span><div style="margin-top: 6px;">' + statusBadge + '</div></div></div>' +
      '<p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: auto;">' + ch.description + '</p>' +
      '<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width: ' + ch.progress + '%;"></div></div>' +
      '<div class="challenge-meta"><span>Tiến độ: <strong>' + ch.current + '/' + ch.target + ' mốc (' + ch.progress + '%)</strong></span>' +
      '<span>' + ch.participantsCount + ' người tham gia • Hạn: ' + ch.deadline + '</span></div>' +
      '<div style="margin-top: 12px;">' + actionBtn + '</div></div>';
  }
  container.innerHTML = html;
}

function handleJoinChallenge(id) {   // Create: tham gia thử thách
  var result = joinChallenge(id);
  if (result) {
    renderChallenges();
    showToast('Bạn đã tham gia thử thách "' + result.title + '" thành công!', 'success');
  }
}

function handleProgressStep(id) {   // Update: ghi nhận tiến độ, đủ mốc thì hoàn thành và nhận điểm
  var result = updateChallengeProgress(id, 1);
  if (result) {
    renderChallenges();
    updateTopBarUserInfo();
    if (result.status === 'completed') {
      showToast('Chúc mừng! Bạn đã hoàn thành "' + result.title + '" và nhận +' + result.rewardPoints + ' Điểm Xanh!', 'success');
    } else {
      showToast('Đã ghi nhận tiến độ cho "' + result.title + '"! Tiến độ hiện tại: ' + result.progress + '%', 'info');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setupFilterTabs();
  renderChallenges();
});
