/* Occupant Dashboard (R): điện hôm nay, biểu đồ theo giờ, gợi ý AI, tóm tắt thử thách và phản hồi */

function renderHourlyChart() {   // mỗi giờ một cột; cột đỏ nếu dùng nhiều hơn mức chuẩn (baseline)
  var usage = getStore().energyStats.hourlyUsage;
  var maxKwh = 0;
  for (var i = 0; i < usage.length; i++) {
    if (usage[i].kwh > maxKwh) { maxKwh = usage[i].kwh; }
    if (usage[i].baseline > maxKwh) { maxKwh = usage[i].baseline; }
  }
  maxKwh = maxKwh * 1.15;   // chừa khoảng trống phía trên

  var html = '';
  for (var j = 0; j < usage.length; j++) {
    var item = usage[j];
    var heightPercent = Math.round(item.kwh / maxKwh * 100);
    var color = 'linear-gradient(180deg, var(--emerald-400) 0%, var(--emerald-600) 100%)';
    if (item.kwh > item.baseline) { color = 'linear-gradient(180deg, #f87171 0%, #dc2626 100%)'; }
    html += '<div class="cot-theo-gio"><div class="khung-cot-bieu-do">' +
      '<div class="cot-dien-nang" style="height: ' + heightPercent + '%; background: ' + color + ';" data-tooltip="' + item.kwh + ' kWh (Chuẩn: ' + item.baseline + ' kWh)"></div>' +
      '</div><span class="nhan-gio">' + item.hour + '</span></div>';
  }
  document.getElementById('barChartContainer').innerHTML = html;
}

function renderAiSuggestions() {
  var list = getStore().aiSuggestions, html = '';
  for (var i = 0; i < list.length; i++) {
    var item = list[i], badge = '<span class="badge badge-pending">Khuyến nghị</span>', button = '';
    if (item.applied) { badge = '<span class="badge badge-resolved">Đã áp dụng</span>'; }
    else { button = '<button class="btn btn-primary btn-sm" onclick="applySuggestion(\'' + item.id + '\')">Áp dụng</button>'; }
    html += '<div class="the-goi-y"><div class="hang-can-deu"><strong>' + item.title + '</strong>' + badge + '</div>' +
      '<p class="chu-nho-mo">' + item.description + '</p>' +
      '<div class="hang-can-deu"><span class="chu-tiet-kiem">Tiết kiệm: ' + item.potentialSavings + '</span>' + button + '</div></div>';
  }
  document.getElementById('aiSuggestionsList').innerHTML = html;
}

function applySuggestion(id) {   // áp dụng gợi ý thì được thưởng 25 điểm xanh
  var store = getStore();
  for (var i = 0; i < store.aiSuggestions.length; i++) {
    if (store.aiSuggestions[i].id === id) {
      store.aiSuggestions[i].applied = true;
      store.currentUser.points += 25;
      saveStore(store);
      renderAiSuggestions();
      updateTopBarUserInfo();
      showToast('Đã áp dụng gợi ý tiết kiệm thành công! Bạn nhận được +25 Điểm Xanh.', 'success');
    }
  }
}

function renderQuickSummaries() {
  var store = getStore();
  var active = store.challenges[0];
  for (var i = 0; i < store.challenges.length; i++) {
    if (store.challenges[i].status === 'in-progress') { active = store.challenges[i]; break; }
  }
  if (active) {
    document.getElementById('quickChallengesSummary').innerHTML = '<div class="the-tom-tat">' +
      '<div class="hang-can-deu"><strong>' + active.title + '</strong><span class="badge badge-pending">' + active.progress + '%</span></div>' +
      '<div class="thanh-tien-do-nho"><div class="muc-tien-do-nho" style="width: ' + active.progress + '%;"></div></div>' +
      '<div class="dong-thong-tin"><span>Phần thưởng: ' + active.rewardPoints + ' điểm</span><span>Hạn chót: ' + active.deadline + '</span></div></div>';
  }
  var latest = store.feedbacks[0];
  if (latest) {
    var statusText = 'Chờ duyệt';
    if (latest.status === 'investigating') { statusText = 'Đang xử lý'; }
    if (latest.status === 'resolved') { statusText = 'Đã giải quyết'; }
    document.getElementById('quickFeedbackSummary').innerHTML = '<div class="the-tom-tat">' +
      '<div class="hang-can-deu"><strong>' + escapeHtml(latest.issueLabel) + '</strong><span class="badge badge-' + escapeHtml(latest.status) + '">' + statusText + '</span></div>' +
      '<p class="chu-nho-mo">' + escapeHtml(latest.description.slice(0, 90)) + '...</p>' +
      '<div class="dong-thong-tin"><span>Gửi lúc: ' + escapeHtml(latest.createdAt) + '</span></div></div>';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderHourlyChart();
  renderAiSuggestions();
  renderQuickSummaries();
});
