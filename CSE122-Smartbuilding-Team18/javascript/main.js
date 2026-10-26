/* main.js – các hàm dùng chung. Chỉ dùng JavaScript cơ bản: var, function, if, for, mảng, đối tượng. */

// ===== 1. Dữ liệu: đọc / lưu vào localStorage =====
function loadData(key) {
  var storageKey = "sb_" + key;
  var text = localStorage.getItem(storageKey);
  if (text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      // đã có dữ liệu người dùng -> dùng luôn
      localStorage.removeItem(storageKey);
    } // dữ liệu hỏng thì khởi tạo lại từ dữ liệu mẫu
  }
  var data = JSON.parse(JSON.stringify(SEED[key])); // chưa có -> sao chép dữ liệu mẫu từ data.js
  localStorage.setItem(storageKey, JSON.stringify(data));
  return data;
}
function saveData(key, data) {
  localStorage.setItem("sb_" + key, JSON.stringify(data));
}

// ===== 2. Tiện ích nhỏ =====
function escapeHtml(text) {
  // chống chèn HTML khi in dữ liệu người dùng nhập
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function formatNumber(n) {
  return Number(n).toLocaleString("vi-VN");
}
function getTimeNow() {
  return new Date().toTimeString().slice(0, 5);
}
function statCard(label, value, colorClass) {
  return (
    '<article class="card stat-card"><div class="stat-label">' +
    label +
    '</div><div class="stat-value ' +
    colorClass +
    '">' +
    value +
    "</div></article>"
  );
}
function fillSelect(selectId, list) {
  // đổ danh sách chữ vào ô <select>
  var html = "";
  for (var i = 0; i < list.length; i++) {
    html += "<option>" + escapeHtml(list[i]) + "</option>";
  }
  document.getElementById(selectId).innerHTML = html;
}

// ===== 3. Thông báo, hộp xác nhận, lỗi dưới ô nhập =====
function showToast(text, type) {
  var box = document.querySelector(".toast-container");
  if (!box) {
    box = document.createElement("div");
    box.className = "toast-container";
    document.body.appendChild(box);
  }
  var toast = document.createElement("div");
  toast.className = "toast toast-" + (type || "success");
  toast.textContent = text;
  box.appendChild(toast);
  setTimeout(function () {
    toast.remove();
  }, 2800);
}
function confirmBox(message, yesFunction) {
  // yesFunction chạy khi người dùng bấm "Xác nhận"
  var overlay = document.createElement("div");
  overlay.className = "modal-overlay active";
  overlay.innerHTML =
    '<div class="modal-content"><div class="modal-header"><h2 class="modal-title">Xác nhận</h2></div>' +
    '<div class="modal-body">' +
    escapeHtml(message) +
    '</div><div class="modal-footer">' +
    '<button class="btn btn-secondary" id="noBtn">Quay lại</button><button class="btn btn-danger" id="yesBtn">Xác nhận</button></div></div>';
  document.body.appendChild(overlay);
  document.getElementById("noBtn").onclick = function () {
    overlay.remove();
  };
  document.getElementById("yesBtn").onclick = function () {
    overlay.remove();
    yesFunction();
  };
}
function setError(inputId, message) {
  var group = document.getElementById(inputId).parentElement;
  group.classList.add("has-error");
  group.querySelector(".form-error-msg").textContent = message;
}
function clearErrors(formId) {
  var groups = document.querySelectorAll("#" + formId + " .form-group");
  for (var i = 0; i < groups.length; i++) {
    groups[i].classList.remove("has-error");
  }
}

// ===== 4. Khung trang (sidebar + thanh trên) cho 4 trang Operator, và hiệu ứng "đang tải" =====
function buildLayout(activePage, title, subtitle, who) {
  if (!who) {
    who = "Operator: Nguyễn Văn Minh";
  }
  var groups = [
    [
      "Vận hành",
      [
        ["operator-energy-monitor.html", "📊", "Tổng quan năng lượng"],
        ["operator-alert-center.html", "🚨", "Cảnh báo"],
        ["operator-saving-actions.html", "🌿", "Hành động tiết kiệm"],
        ["operator-zone-control.html", "🎛️", "Điều khiển thiết bị"],
      ],
    ],
    [
      "Quản lý",
      [
        ["manager-energy-kpis.html", "📈", "KPI năng lượng"],
        ["manager-zone-comparison.html", "⚖️", "So sánh khu vực"],
        ["manager-monthly-report.html", "📋", "Báo cáo tháng"],
      ],
    ],
    [
      "Quản trị",
      [
        ["admin-zone-management.html", "🏢", "Khu vực"],
        ["admin-sensor-management.html", "📡", "Cảm biến"],
        ["admin-user-management.html", "👥", "Người dùng"],
      ],
    ],
  ];
  var menu = "";
  for (var g = 0; g < groups.length; g++) {
    menu += '<div class="menu-label">' + groups[g][0] + "</div>";
    var links = groups[g][1];
    for (var i = 0; i < links.length; i++) {
      var cls = "nav-item";
      if (links[i][0] === activePage) {
        cls += " active";
      }
      menu +=
        '<a class="' +
        cls +
        '" href="' +
        links[i][0] +
        '"><span>' +
        links[i][1] +
        "</span>" +
        links[i][2] +
        "</a>";
    }
  }
  document.getElementById("sidebar").innerHTML =
    '<div class="sidebar-header"><div class="brand-icon">⚡</div><div><div class="brand-title">SmartBuilding</div><div class="brand-sub">Energy Operations</div></div></div>' +
    '<nav class="sidebar-menu">' +
    menu +
    '<div class="menu-label">Khác</div><a class="nav-item" href="../index.html"><span>🏠</span>Trang chủ Portal</a></nav>' +
    '<div class="sidebar-footer"><div class="user-name">Nhóm 18</div><span class="user-role-badge">CSE122 • BTL-36</span></div>';
  document.getElementById("topbar").innerHTML =
    '<div class="topbar-left"><button class="menu-toggle-btn" id="menuToggleBtn" aria-label="Mở menu">☰</button>' +
    '<div><h1 class="page-title">' +
    title +
    '</h1><div class="page-subtitle">' +
    subtitle +
    "</div></div></div>" +
    '<div class="topbar-right"><div class="status-indicator"><span class="status-dot"></span>' +
    who +
    '</div><div class="points-pill">' +
    getTimeNow() +
    "</div></div>";
}
function startPage(drawFunction) {
  // hiện "đang tải" 0,5 giây rồi mới vẽ nội dung
  var main = document.getElementById("main");
  main.classList.add("is-loading");
  setTimeout(function () {
    main.classList.remove("is-loading");
    drawFunction();
  }, 500);
}

// ===== 5. Giao diện AI: đang xử lý -> kết quả + lý do -> Chấp nhận / Sửa / Từ chối / Tạo lại =====
// Mỗi trang tự viết các hàm aiAccept(), aiEdit(), aiReject(), aiRegenerate(), aiManual() mà các nút bên dưới sẽ gọi.
var aiFailMode = false; // bật để mô phỏng "AI thất bại"
function toggleAiFail(buttonId) {
  aiFailMode = !aiFailMode;
  document.getElementById(buttonId).textContent =
    "Mô phỏng AI lỗi: " + (aiFailMode ? "BẬT" : "TẮT");
}
function showAiLoading(boxId) {
  document.getElementById(boxId).innerHTML =
    '<div class="ai-box"><div class="skeleton"></div><div class="skeleton short"></div><small class="muted">🤖 AI đang phân tích…</small></div>';
}
function showAiResult(boxId, result, hasEditButton) {
  // result gồm: title, text, why
  var editBtn = hasEditButton
    ? '<button class="btn btn-secondary btn-sm" onclick="aiEdit()">Sửa</button>'
    : "";
  document.getElementById(boxId).innerHTML =
    '<div class="ai-box"><h3>' +
    result.title +
    "</h3><p>" +
    result.text +
    "</p>" +
    '<p class="why"><b>Vì sao?</b> ' +
    result.why +
    '</p><button class="btn btn-ai btn-sm" onclick="aiAccept()">Chấp nhận</button>' +
    editBtn +
    '<button class="btn btn-secondary btn-sm" onclick="aiReject()">Từ chối</button><button class="btn btn-secondary btn-sm" onclick="aiRegenerate()">Tạo lại</button></div>';
}
function showAiError(boxId) {
  document.getElementById(boxId).innerHTML =
    '<div class="ai-box ai-err"><h3>AI chưa thể đưa ra kết quả</h3><p>Không đủ dữ liệu hoặc hệ thống đang gặp sự cố.</p>' +
    '<button class="btn btn-secondary btn-sm" onclick="aiRegenerate()">Thử lại</button><button class="btn btn-secondary btn-sm" onclick="aiManual()">Dùng thủ công</button></div>';
}

// ===== 6. Hàm cho các trang SV1 (occupant-*) =====
function getStore() {
  return {
    currentUser: loadData("occupant_user"),
    energyStats: loadData("occupant_stats"),
    aiSuggestions: loadData("occupant_ai"),
    challenges: loadData("occupant_challenges"),
    feedbacks: loadData("occupant_feedbacks"),
  };
}
function saveStore(s) {
  saveData("occupant_user", s.currentUser);
  saveData("occupant_stats", s.energyStats);
  saveData("occupant_ai", s.aiSuggestions);
  saveData("occupant_challenges", s.challenges);
  saveData("occupant_feedbacks", s.feedbacks);
}
function openModal(id) {
  var m = document.getElementById(id);
  if (m) {
    m.classList.add("active");
  }
}
function closeModal(id) {
  var m = document.getElementById(id);
  if (m) {
    m.classList.remove("active");
  }
}
function setHtml(id, html) {
  var el = document.getElementById(id);
  if (el) {
    el.innerHTML = html;
  }
}

function updateTopBarUserInfo() {
  // đổ điểm xanh, tên, phòng, số điện hôm nay lên giao diện
  if (
    !document.getElementById("userPointsDisplay") &&
    !document.getElementById("sidebarUserName")
  ) {
    return;
  }
  var s = getStore(),
    kwh = 0;
  var currentSession = null;
  try {
    currentSession = JSON.parse(localStorage.getItem("sb_session") || "null");
  } catch (e) {
    currentSession = null;
  }
  if (
    currentSession &&
    currentSession.role === "Occupant" &&
    currentSession.name
  ) {
    s.currentUser.name = currentSession.name;
  }
  for (var i = 0; i < s.energyStats.hourlyUsage.length; i++) {
    kwh += s.energyStats.hourlyUsage[i].kwh;
  }
  kwh = Math.round(kwh * 10) / 10;
  var unit = function (t) {
    return (
      ' <span style="font-size: 1rem; font-weight: 500; color: var(--text-muted);">' +
      t +
      "</span>"
    );
  };
  setHtml(
    "userPointsDisplay",
    formatNumber(s.currentUser.points) + " Điểm Xanh",
  );
  setHtml("sidebarUserName", escapeHtml(s.currentUser.name));
  setHtml("sidebarUserRoom", escapeHtml(s.currentUser.room));
  setHtml("todayUsageDisplay", kwh.toLocaleString("vi-VN") + unit("kWh"));
  setHtml("todayCostDisplay", formatNumber(Math.round(kwh * 3000)) + unit("đ"));
  setHtml("roomTempDisplay", s.energyStats.roomTemp + "°C");
  setHtml(
    "userEcoLevelDisplay",
    "Cấp " + (Math.floor(s.currentUser.points / 150) + 1),
  );
}

function getChallenges(filter) {
  var all = loadData("occupant_challenges"),
    result = [];
  for (var i = 0; i < all.length; i++) {
    if (filter === "all" || all[i].status === filter) {
      result.push(all[i]);
    }
  }
  return result;
}
function joinChallenge(id) {
  // available -> in-progress
  var s = getStore();
  for (var i = 0; i < s.challenges.length; i++) {
    var c = s.challenges[i];
    if (c.id === id && c.status === "available") {
      c.status = "in-progress";
      c.participantsCount++;
      saveStore(s);
      return c;
    }
  }
  return null;
}
function updateChallengeProgress(id, step) {
  // in-progress -> completed (cộng điểm thưởng)
  var s = getStore();
  for (var i = 0; i < s.challenges.length; i++) {
    var c = s.challenges[i];
    if (c.id === id && c.status === "in-progress") {
      c.current = Math.min(c.target, c.current + step);
      c.progress = Math.round((c.current / c.target) * 100);
      if (c.current >= c.target) {
        c.status = "completed";
        s.currentUser.points += c.rewardPoints;
      }
      saveStore(s);
      return c;
    }
  }
  return null;
}

function getFeedbacks(filter) {
  var all = loadData("occupant_feedbacks"),
    result = [];
  for (var i = 0; i < all.length; i++) {
    if (filter === "all" || all[i].status === filter) {
      result.push(all[i]);
    }
  }
  return result;
}
function getFeedbackById(id) {
  var all = loadData("occupant_feedbacks");
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) {
      return all[i];
    }
  }
  return null;
}
function createFeedback(data) {
  var s = getStore(),
    d = new Date(),
    p = function (n) {
      return padNumber(n, 2);
    };
  var f = {
    id: "fb" + Date.now(),
    status: "pending",
    adminNote: "",
    createdAt:
      p(d.getDate()) +
      "/" +
      p(d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      " " +
      p(d.getHours()) +
      ":" +
      p(d.getMinutes()),
  };
  for (var key in data) {
    f[key] = data[key];
  } // chép các trường người dùng nhập
  s.feedbacks.unshift(f); // thêm lên đầu danh sách
  s.currentUser.points += 10; // thưởng 10 điểm xanh
  saveStore(s);
  return f;
}
function updateFeedback(id, changes) {
  var s = getStore();
  for (var i = 0; i < s.feedbacks.length; i++) {
    if (s.feedbacks[i].id === id) {
      for (var key in changes) {
        s.feedbacks[i][key] = changes[key];
      }
      saveStore(s);
      return s.feedbacks[i];
    }
  }
  return null;
}
function deleteFeedback(id) {
  var s = getStore(),
    kept = [];
  for (var i = 0; i < s.feedbacks.length; i++) {
    if (s.feedbacks[i].id !== id) {
      kept.push(s.feedbacks[i]);
    }
  }
  s.feedbacks = kept;
  saveStore(s);
}

// Khi trang tải xong: nạp thông tin người dùng, gắn nút mở menu (điện thoại) và đóng modal khi bấm nền
document.addEventListener("DOMContentLoaded", function () {
  updateTopBarUserInfo();
  var button = document.getElementById("menuToggleBtn"),
    sidebar = document.querySelector(".sidebar");
  if (button && sidebar) {
    var backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    document.body.appendChild(backdrop);
    var toggle = function () {
      sidebar.classList.toggle("show");
      backdrop.classList.toggle("active");
    };
    button.addEventListener("click", toggle);
    backdrop.addEventListener("click", toggle);
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-overlay") && e.target.id) {
    e.target.classList.remove("active");
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    var activeModals = document.querySelectorAll(".modal-overlay.active");
    for (var i = 0; i < activeModals.length; i++) {
      activeModals[i].classList.remove("active");
    }
  }
});

// ===== 7. Kiểm tra dữ liệu nhập (viết bằng if/for, không dùng biểu thức chính quy) =====
function padNumber(number, length) {
  // padNumber(5, 3) -> '005'
  var text = String(number);
  while (text.length < length) {
    text = "0" + text;
  }
  return text;
}
function isValidCode(text, prefix, minDigits) {
  // ví dụ isValidCode('Z-05', 'Z-', 2) -> true
  if (text.indexOf(prefix) !== 0) {
    return false;
  }
  var digits = text.slice(prefix.length);
  if (digits.length < minDigits) {
    return false;
  }
  for (var i = 0; i < digits.length; i++) {
    if (digits.charAt(i) < "0" || digits.charAt(i) > "9") {
      return false;
    }
  }
  return true;
}
function isValidEmail(text) {
  // có @, có dấu chấm sau @, không có khoảng trắng
  var at = text.indexOf("@"),
    dot = text.lastIndexOf(".");
  return (
    at > 0 && dot > at + 1 && dot < text.length - 1 && text.indexOf(" ") === -1
  );
}

// ===== 8. Dùng chung cho các trang Quản lý =====
function getMonthKwh() {
  // ước tính điện cả tháng = tổng phụ tải 24 giờ x 30 ngày
  var total = 0;
  for (var h = 0; h < 24; h++) {
    total += SEED.load24[h];
  }
  return total * 30;
}
function getActiveZones() {
  // bỏ qua khu vực đã bị Admin khóa
  var zones = loadData("zones"),
    result = [];
  for (var i = 0; i < zones.length; i++) {
    if (zones[i].status !== "locked") {
      result.push(zones[i]);
    }
  }
  return result;
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    var activeModals = document.querySelectorAll(".modal-overlay.active");
    for (var i = 0; i < activeModals.length; i++) {
      activeModals[i].classList.remove("active");
    }
  }
});
