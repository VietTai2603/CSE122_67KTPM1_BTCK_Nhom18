/* TIỆN ÍCH DÙNG CHUNG (SV2 – Data Engine): localStorage, toast, modal xác nhận, form, khung giao diện, giao diện AI */
const SB = {
  esc: s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
  fmt: n => Number(n).toLocaleString('vi-VN'),
  now: () => new Date().toTimeString().slice(0, 5),

  // Chỉ nạp SEED khi localStorage chưa có -> không ghi đè dữ liệu người dùng đã thêm
  get(k) {
    try { const v = localStorage.getItem('sb_' + k); if (v) return JSON.parse(v); } catch (e) {}
    const d = structuredClone(SEED[k]); this.set(k, d); return d;
  },
  set(k, v) { try { localStorage.setItem('sb_' + k, JSON.stringify(v)); } catch (e) {} },

  toast(msg, type = 'success') {
    let c = document.querySelector('.toast-container');
    if (!c) { c = document.createElement('div'); c.className = 'toast-container'; document.body.append(c); }
    const t = document.createElement('div'); t.className = 'toast toast-' + type; t.textContent = msg; c.append(t);
    setTimeout(() => { t.style.opacity = 0; setTimeout(() => t.remove(), 300); }, 2800);
  },

  confirm(msg, ok) {
    const o = document.createElement('div'); o.className = 'modal-overlay active';
    o.innerHTML = `<div class="modal-content" role="dialog" aria-modal="true"><div class="modal-header"><h2 class="modal-title">Xác nhận</h2></div><div class="modal-body">${this.esc(msg)}</div><div class="modal-footer"><button class="btn btn-secondary" data-x>Quay lại</button><button class="btn btn-danger" data-ok>Xác nhận</button></div></div>`;
    o.onclick = e => { if (e.target === o || e.target.matches('[data-x]')) o.remove(); if (e.target.matches('[data-ok]')) { o.remove(); ok(); } };
    document.body.append(o);
  },

  // ----- Form helpers: tạo ô nhập + kiểm tra hợp lệ hiển thị lỗi ngay dưới ô -----
  field: (label, name, ctl) => `<div class="form-group"><label class="form-label" for="${name}">${label} <span class="required">*</span></label>${ctl}<div class="form-error-msg"></div></div>`,
  input: (name, type = 'text', ph = '', extra = '') => `<input class="form-control" id="${name}" name="${name}" type="${type}" placeholder="${ph}" ${extra}>`,
  select: (name, opts) => `<select class="form-control" id="${name}" name="${name}">${opts.map(o => Array.isArray(o) ? `<option value="${o[0]}">${o[1]}</option>` : `<option>${o}</option>`).join('')}</select>`,
  validate(form, rules) {
    let ok = true; const d = {};
    for (const [n, [fn, msg]] of Object.entries(rules)) {
      const el = form.elements[n], g = el.closest('.form-group'); d[n] = el.value.trim();
      const bad = !fn(d[n]); g.classList.toggle('has-error', bad);
      g.querySelector('.form-error-msg').textContent = bad ? msg : ''; if (bad) ok = false;
    }
    return ok ? d : null;
  },

  // ----- Khung giao diện (sidebar + topbar) dùng cho 4 trang Operator -----
  shell(active, title, sub) {
    const nav = [['operator-energy-monitor', '📊', 'Tổng quan năng lượng'], ['operator-alert-center', '🚨', 'Cảnh báo'], ['operator-saving-actions', '🌿', 'Hành động tiết kiệm'], ['operator-zone-control', '🎛️', 'Điều khiển thiết bị']];
    document.getElementById('sidebar').innerHTML = `<div class="sidebar-header"><div class="brand-icon">⚡</div><div><div class="brand-title">SmartBuilding</div><div class="brand-sub">Energy Operations</div></div></div>
      <nav class="sidebar-menu" aria-label="Menu vận hành"><div class="menu-label">Vận hành</div>${nav.map(([f, i, t]) => `<a class="nav-item ${f === active ? 'active' : ''}" href="${f}.html" ${f === active ? 'aria-current="page"' : ''}><span>${i}</span>${t}</a>`).join('')}<div class="menu-label">Khác</div><a class="nav-item" href="../index.html"><span>🏠</span>Trang chủ Portal</a></nav>
      <div class="sidebar-footer"><div class="user-info"><div class="user-name">Lê Quang Tiến</div><span class="user-role-badge">Operator</span></div></div>`;
    document.getElementById('topbar').innerHTML = `<div class="topbar-left"><button class="menu-toggle-btn" id="menuBtn" aria-label="Mở menu">☰</button><div><h1 class="page-title">${title}</h1><div class="page-subtitle">${sub}</div></div></div><div class="topbar-right"><div class="status-indicator"><span class="status-dot"></span>Operator: Nguyễn Văn Minh</div><div class="points-pill" id="clock"></div></div>`;
    const bd = document.createElement('div'); bd.className = 'sidebar-backdrop'; document.body.append(bd);
    const sb = document.getElementById('sidebar'), tog = () => { sb.classList.toggle('show'); bd.classList.toggle('active'); };
    document.getElementById('menuBtn').onclick = tog; bd.onclick = tog;
    const tick = () => document.getElementById('clock').textContent = this.now(); tick(); setInterval(tick, 30000);
  },

  boot(fn) { const m = document.getElementById('main'); m.classList.add('is-loading'); setTimeout(() => { m.classList.remove('is-loading'); fn(); }, 500); },

  // ----- Giao diện AI: Đang xử lý -> Kết quả -> Vì sao -> Chấp nhận/Sửa/Từ chối/Tạo lại; lỗi -> Thử lại/Dùng thủ công -----
  aiFail: false,
  failBtn(b) { const u = () => b.textContent = 'Mô phỏng AI lỗi: ' + (this.aiFail ? 'BẬT' : 'TẮT'); b.onclick = () => { this.aiFail = !this.aiFail; u(); }; u(); },
  ai(box, run, onOk, onEdit) {
    box.innerHTML = '<div class="ai-box"><div class="skeleton"></div><div class="skeleton short"></div><small class="muted">🤖 AI đang phân tích…</small></div>';
    setTimeout(() => {
      let r = null; try { if (!this.aiFail) r = run(); } catch (e) {}
      box.innerHTML = r
        ? `<div class="ai-box"><h3>${r.title}</h3><p>${r.text}</p><p class="why"><b>Vì sao?</b> ${r.why}</p><button class="btn btn-ai btn-sm" data-a="ok">Chấp nhận</button>${onEdit ? '<button class="btn btn-secondary btn-sm" data-a="edit">Sửa</button>' : ''}<button class="btn btn-secondary btn-sm" data-a="no">Từ chối</button><button class="btn btn-secondary btn-sm" data-a="re">Tạo lại</button></div>`
        : `<div class="ai-box ai-err"><h3>AI chưa thể đưa ra kết quả</h3><p>Không đủ dữ liệu hoặc hệ thống đang gặp sự cố.</p><button class="btn btn-secondary btn-sm" data-a="re">Thử lại</button><button class="btn btn-secondary btn-sm" data-a="manual">Dùng thủ công</button></div>`;
      box.onclick = e => {
        const a = e.target.dataset.a; if (!a) return;
        if (a === 're') this.ai(box, run, onOk, onEdit);
        if (a === 'no') box.innerHTML = '<p class="muted">Đã từ chối đề xuất.</p>';
        if (a === 'ok') { onOk(r); box.innerHTML = '<p class="ok-text">✔ Đã áp dụng đề xuất.</p>'; }
        if (a === 'edit') onEdit(r);
        if (a === 'manual') { box.innerHTML = ''; this.toast('Chuyển sang thao tác thủ công', 'info'); }
      };
    }, 1200);
  }
};

/* =====================================================================
   API DÙNG CHUNG CHO CÁC TRANG SV1 (occupant-*): store, toast, modal, thử thách, phản hồi
   Mỗi nhóm dữ liệu lưu ở key riêng: sb_occupant_user | _stats | _ai | _challenges | _feedbacks
   ===================================================================== */
const OCC_KEYS = { user: 'currentUser', stats: 'energyStats', ai: 'aiSuggestions', challenges: 'challenges', feedbacks: 'feedbacks' };
function getStore() { const s = {}; for (const [k, p] of Object.entries(OCC_KEYS)) s[p] = SB.get('occupant_' + k); return s; }
function saveStore(s) { for (const [k, p] of Object.entries(OCC_KEYS)) SB.set('occupant_' + k, s[p]); }
function showToast(msg, type = 'success') { SB.toast(msg, type); }
function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('active'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('active'); }
const nowText = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`; };

// Cập nhật điểm xanh, tên, phòng và các chỉ số trên thanh trên / sidebar / dashboard (bỏ qua nếu trang không có phần tử)
function updateTopBarUserInfo() {
  if (!document.getElementById('userPointsDisplay') && !document.getElementById('sidebarUserName')) return;
  const s = getStore(), u = s.currentUser, set = (id, h) => { const el = document.getElementById(id); if (el) el.innerHTML = h; };
  const unit = t => ` <span style="font-size: 1rem; font-weight: 500; color: var(--text-muted);">${t}</span>`;
  const kwh = Math.round(s.energyStats.hourlyUsage.reduce((a, h) => a + h.kwh, 0) * 10) / 10;
  set('userPointsDisplay', SB.fmt(u.points) + ' Điểm Xanh'); set('sidebarUserName', SB.esc(u.name)); set('sidebarUserRoom', SB.esc(u.room));
  set('todayUsageDisplay', kwh.toLocaleString('vi-VN') + unit('kWh')); set('todayCostDisplay', SB.fmt(Math.round(kwh * 3000)) + unit('đ'));
  set('roomTempDisplay', s.energyStats.roomTemp + '°C'); set('userEcoLevelDisplay', 'Cấp ' + (Math.floor(u.points / 150) + 1));
}

// ----- Thử thách: available -> in-progress -> completed (cộng điểm khi hoàn thành) -----
function getChallenges(filter = 'all') { const l = getStore().challenges; return filter === 'all' ? l : l.filter(c => c.status === filter); }
function joinChallenge(id) {
  const s = getStore(), c = s.challenges.find(x => x.id === id); if (!c || c.status !== 'available') return null;
  c.status = 'in-progress'; c.participantsCount++; saveStore(s); return c;
}
function updateChallengeProgress(id, step = 1) {
  const s = getStore(), c = s.challenges.find(x => x.id === id); if (!c || c.status !== 'in-progress') return null;
  c.current = Math.min(c.target, c.current + step); c.progress = Math.round(c.current / c.target * 100);
  if (c.current >= c.target) { c.status = 'completed'; s.currentUser.points += c.rewardPoints; }
  saveStore(s); return c;
}

// ----- Phản hồi tiện nghi: C/R/U/D -----
function getFeedbacks(filter = 'all') { const l = getStore().feedbacks; return filter === 'all' ? l : l.filter(f => f.status === filter); }
function getFeedbackById(id) { return getStore().feedbacks.find(f => f.id === id) || null; }
function createFeedback(data) {
  const s = getStore(), f = { id: 'fb' + Date.now(), status: 'pending', adminNote: '', createdAt: nowText(), ...data };
  s.feedbacks.unshift(f); s.currentUser.points += 10; saveStore(s); return f;
}
function updateFeedback(id, patch) {
  const s = getStore(), f = s.feedbacks.find(x => x.id === id); if (!f) return null; Object.assign(f, patch); saveStore(s); return f;
}
function deleteFeedback(id) { const s = getStore(); s.feedbacks = s.feedbacks.filter(f => f.id !== id); saveStore(s); }

// Menu mobile (nút #menuToggleBtn), đóng modal khi bấm nền, và nạp thông tin người dùng khi mở trang
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuToggleBtn'), sb = document.querySelector('.sidebar');
  if (btn && sb) { const bd = document.createElement('div'); bd.className = 'sidebar-backdrop'; document.body.append(bd); const t = () => { sb.classList.toggle('show'); bd.classList.toggle('active'); }; btn.addEventListener('click', t); bd.addEventListener('click', t); }
  updateTopBarUserInfo();
});
document.addEventListener('click', e => { if (e.target.matches('.modal-overlay[id]')) e.target.classList.remove('active'); });
