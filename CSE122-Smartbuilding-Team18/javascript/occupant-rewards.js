// Đọc danh sách quà và lịch sử đổi từ dữ liệu mẫu/localStorage.
function renderRewards() {
  var rewards = loadData("occupant_rewards");
  var user = loadData("occupant_user");
  var html = "";

  for (var i = 0; i < rewards.length; i++) {
    var reward = rewards[i];
    var disabled = user.points < reward.points < 50 ? "disabled" : "";
    html +=
      '<article class="card the-qua-tang"><div class="bieu-tuong-qua" aria-hidden="true">' +
      reward.icon +
      "</div>" +
      "<h3>" +
      escapeHtml(reward.name) +
      '</h3><p class="chu-phu">' +
      escapeHtml(reward.description) +
      "</p>" +
      '<div class="chan-the-qua"><strong>' +
      reward.points +
      " Điểm</strong>" +
      '<button class="btn btn-primary btn-sm" ' +
      disabled +
      " onclick=\"redeemReward('" +
      reward.id +
      "')\">Đổi quà</button></div></article>";
  }
  document.getElementById("rewardsList").innerHTML = html;
  document.getElementById("rewardPoints").textContent = formatNumber(
    user.points,
  );
  document.getElementById("userPointsDisplay").textContent =
    formatNumber(user.points) + " Điểm Xanh";
  renderRewardHistory();
}

function renderRewardHistory() {
  var history = loadData("occupant_reward_history");
  var html = "";
  if (history.length === 0) {
    html =
      '<p class="chu-phu">Bạn chưa đổi quà lần nào. Hãy tích lũy điểm từ các thử thách nhé!</p>';
  } else {
    html = '<ul class="danh-sach-lich-su">';
    for (var i = 0; i < history.length; i++) {
      html +=
        "<li><span>" +
        escapeHtml(history[i].name) +
        "</span><span>" +
        history[i].points +
        " điểm · " +
        escapeHtml(history[i].date) +
        "</span></li>";
    }
    html += "</ul>";
  }
  document.getElementById("rewardHistory").innerHTML = html;
}

function redeemReward(id) {
  var rewards = loadData("occupant_rewards");
  var user = loadData("occupant_user");
  var history = loadData("occupant_reward_history");
  var chosen = null;
  for (var i = 0; i < rewards.length; i++) {
    if (rewards[i].id === id) {
      chosen = rewards[i];
    }
  }

  if (!chosen || user.points < chosen.points) {
    showToast("Bạn chưa có đủ điểm để đổi phần quà này.", "info");
    return;
  }
  user.points -= chosen.points;
  var now = new Date();
  history.unshift({
    name: chosen.name,
    points: chosen.points,
    date: now.toLocaleDateString("vi-VN"),
  });
  saveData("occupant_user", user);
  saveData("occupant_reward_history", history);
  renderRewards();
  showToast("Đổi " + chosen.name + " thành công!", "success");
}

document.addEventListener("DOMContentLoaded", renderRewards);
