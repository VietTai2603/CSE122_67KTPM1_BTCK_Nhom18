/* LOGIC 6 MÀN HÌNH SV3: manager-* (KPI, So sánh + AI-3, Báo cáo) và admin-* (Zone, Sensor, User) */
(() => {
  const $ = (s, r = document) => r.querySelector(s), E = SB.esc, fmt = SB.fmt, P = {};
  // Chuẩn hóa zone cũ (SV2 lưu chưa có code/diện tích/trạng thái) -> luôn có đủ trường
  const zn = z => { const x = ZX[z.name] || []; return { code: x[0] || 'Z-' + String(z.id).padStart(2, '0'), areaM2: x[1] || 2000, status: 'active', ...z }; };
  const Z = all => SB.get('zones').map(zn).filter(z => all || z.status === 'active');
  const K = SEED.kpi, MONTH = SEED.load24.slice(0, 24).reduce((a, b) => a + b, 0) * 30; // kWh/tháng ước tính = Σ phụ tải 24h × 30 ngày
  const kOf = zs => MONTH / (zs.reduce((a, z) => a + z.loadKw, 0) || 1);                 // kWh/tháng ứng với mỗi 1 kW tải
  const stat = (l, v, c = '') => `<article class="card stat-card"><div class="stat-label">${l}</div><div class="stat-value ${c}">${v}</div></article>`;
  const empty = m => `<div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>${m}</p></div>`;
  const BS = { active: ['Hoạt động', 'badge-resolved'], locked: ['Đã khóa', 'badge-priority-high'], online: ['Hoạt động', 'badge-resolved'], offline: ['Lỗi kết nối', 'badge-priority-high'], calibrating: ['Đang hiệu chuẩn', 'badge-pending'] };
  const badge = s => `<span class="badge ${BS[s][1]}">${BS[s][0]}</span>`;

  // Khung giao diện (sidebar + topbar) cho Manager/Admin – bổ sung vào đối tượng SB của main.js
  SB.shell3 = function (active, title, sub, who) {
    const g = [['Quản lý', [['manager-energy-kpis', '📈', 'KPI năng lượng'], ['manager-zone-comparison', '⚖️', 'So sánh khu vực'], ['manager-monthly-report', '📋', 'Báo cáo tháng']]], ['Quản trị', [['admin-zone-management', '🏢', 'Khu vực'], ['admin-sensor-management', '📡', 'Cảm biến'], ['admin-user-management', '👥', 'Người dùng']]]];
    document.getElementById('sidebar').innerHTML = `<div class="sidebar-header"><div class="brand-icon">⚡</div><div><div class="brand-title">SmartBuilding</div><div class="brand-sub">Energy Operations</div></div></div><nav class="sidebar-menu" aria-label="Menu quản lý và quản trị">${g.map(([t, l]) => `<div class="menu-label">${t}</div>` + l.map(([f, i, n]) => `<a class="nav-item ${f === active ? 'active' : ''}" href="${f}.html" ${f === active ? 'aria-current="page"' : ''}><span>${i}</span>${n}</a>`).join('')).join('')}<div class="menu-label">Khác</div><a class="nav-item" href="../index.html"><span>🏠</span>Trang chủ Portal</a></nav><div class="sidebar-footer"><div class="user-info"><div class="user-name">Trần Văn Quản Lý</div><span class="user-role-badge">Manager / Admin</span></div></div>`;
    const open = SB.get('alerts').filter(a => !['resolved', 'dismissed'].includes(a.status)).length;
    document.getElementById('topbar').innerHTML = `<div class="topbar-left"><button class="menu-toggle-btn" id="menuBtn" aria-label="Mở menu">☰</button><div><h1 class="page-title">${title}</h1><div class="page-subtitle">${sub}</div></div></div><div class="topbar-right"><div class="status-indicator"><span class="status-dot"></span>${who}</div><a class="points-pill" href="operator-alert-center.html" aria-label="${open} cảnh báo đang mở">🔔 ${open}</a><div class="points-pill" id="clock"></div></div>`;
    const bd = document.createElement('div'); bd.className = 'sidebar-backdrop'; document.body.append(bd);
    const sb = document.getElementById('sidebar'), tog = () => { sb.classList.toggle('show'); bd.classList.toggle('active'); };
    document.getElementById('menuBtn').onclick = tog; bd.onclick = tog;
    const tick = () => document.getElementById('clock').textContent = this.now(); tick(); setInterval(tick, 30000);
  };

  /* ===== 7. Energy KPIs (R) ===== */
  P.kpis = () => {
    const zs = Z(), k = kOf(zs), cost = MONTH * K.price, pct = cost / K.budget, area = zs.reduce((a, z) => a + z.areaM2, 0) || 1;
    const rows = zs.map(z => { const act = Math.round(z.loadKw * k), tg = Math.round(z.baselineKw * 1.1 * k); return { z, act, tg, dev: (act - tg) / tg }; }); // mục tiêu = 110% baseline
    const bad = rows.filter(r => r.dev > .1).length;
    $('#stats').innerHTML = stat('Cường độ năng lượng (EUI)', fmt(Math.round(MONTH * 12 / area)) + ' <small>kWh/m²/năm</small>', 'v-sky') + stat('Chi phí so với ngân sách', Math.round(pct * 100) + '%', pct <= 1 ? 'v-green' : 'v-rose') + stat('Phát thải CO₂ tháng này', fmt(Math.round(MONTH * K.co2 / 1000)) + ' <small>tấn</small>', 'v-amber') + stat('Trạng thái KPI', bad ? 'Cần cải thiện' : 'Đạt mục tiêu', bad ? 'v-rose' : 'v-green');
    const w = Math.min(100, Math.round(pct * 100)); $('#bar').style.width = w + '%'; $('#barwrap').setAttribute('aria-valuenow', w);
    $('#bpct').textContent = fmt(Math.round(cost)) + ' ₫ / ' + fmt(K.budget) + ' ₫';
    const W = 760, H = 260, x = i => 44 + i * (W - 60) / 11, y = v => H - 30 - v / 500 * (H - 50), pt = a => a.map((v, i) => x(i) + ',' + y(v)).join(' ');
    const g = [0, 125, 250, 375, 500].map(v => `<line x1="44" x2="${W - 16}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(255,255,255,.08)"/><text x="38" y="${y(v) + 4}" text-anchor="end" fill="#94a3b8" font-size="11">${v}</text>`).join('');
    const t = K.actual.map((_, i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" fill="#94a3b8" font-size="11">T${i + 1}</text>`).join('');
    $('#chart').innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-label="Xu hướng tiêu thụ thực tế và mục tiêu theo tháng">${g}${t}<polyline points="${pt(K.target)}" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5 4"/><polyline points="${pt(K.actual)}" fill="none" stroke="#10b981" stroke-width="3"/>${K.actual.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="#10b981"/>`).join('')}</svg>`;
    $('#rows').innerHTML = rows.length ? rows.map(({ z, act, tg, dev }) => { const p = Math.abs(Math.round(dev * 1000) / 10), r = dev <= 0 ? [`Tốt (${p}% dưới mục tiêu)`, 'badge-resolved'] : dev <= .1 ? [`Chấp nhận (+${p}%)`, 'badge-pending'] : [`Cần cải thiện (+${p}%)`, 'badge-priority-high'];
      return `<tr><td><strong>${E(z.name)}</strong></td><td>${fmt(tg)}</td><td>${fmt(act)}</td><td><span class="badge ${r[1]}">${r[0]}</span></td></tr>`; }).join('') : `<tr><td colspan="4">${empty('Không có khu vực nào đang hoạt động.')}</td></tr>`;
  };

  /* ===== 8. Zone Comparison (C/R/U) + AI-3 What-if ===== */
  P.compare = () => {
    let editId = null; const pf = (n, i) => (SEED.prev[n] || [1, 1])[i], opts = Z().map(z => `<option>${E(z.name)}</option>`).join('');
    $('#fz').innerHTML = '<option value="">Tất cả khu vực</option>' + opts; $('#wz').innerHTML = '<option>Toàn tòa nhà</option>' + opts;
    const none = () => empty('Vui lòng chọn bộ lọc và nhấn "Áp dụng" để xem dữ liệu.');
    $('#cmpChart').innerHTML = none(); $('#cmpRows').innerHTML = `<tr><td colspan="4">${none()}</td></tr>`;
    $('#apply').onclick = () => { $('#cmpChart').innerHTML = '<p class="muted">⏳ Đang tải…</p>'; setTimeout(() => {
      const zs = Z(), k = kOf(zs), fz = $('#fz').value, pi = +$('#fp').value;
      const r = zs.filter(z => !fz || z.name === fz).map(z => { const cur = Math.round(z.loadKw * k), prev = Math.round(cur / pf(z.name, pi)); return { n: z.name, cur, prev, d: Math.round((cur - prev) / prev * 1000) / 10 }; }), mx = Math.max(...r.map(x => Math.max(x.cur, x.prev)), 1);
      $('#cmpChart').innerHTML = r.length ? '<p class="stat-label"><span class="v-sky">■</span> Kỳ này &nbsp; <span class="v-amber">■</span> Kỳ trước</p>' + r.map(x => `<div class="cmp-row"><strong>${E(x.n)}</strong><div><div class="progress"><i style="width:${x.cur / mx * 100}%"></i></div><div class="progress alt"><i style="width:${x.prev / mx * 100}%"></i></div></div></div>`).join('') : empty('Không có khu vực hoạt động.');
      $('#cmpRows').innerHTML = r.length ? r.map(x => `<tr><td><strong>${E(x.n)}</strong></td><td>${fmt(x.cur)}</td><td>${fmt(x.prev)}</td><td><span class="badge ${x.d > 0 ? 'badge-priority-high' : 'badge-resolved'}">${x.d > 0 ? '↑ +' : '↓ '}${Math.abs(x.d)}%</span></td></tr>`).join('') : `<tr><td colspan="4">${empty('Không có dữ liệu.')}</td></tr>`;
    }, 600); };
    // ----- AI-3: nhập (khu vực + % giảm) -> kiểm tra -> xử lý -> kết quả + lý do -> Chấp nhận/Sửa/Từ chối/Tạo lại -----
    const wv = () => $('#wv').textContent = $('#wp').value + '%'; $('#wp').oninput = wv; wv(); SB.failBtn($('#fail'));
    const drawSc = () => { const a = SB.get('scenarios');
      $('#sc').innerHTML = a.length ? a.map(s => `<article class="card report"><div><strong>Giảm ${s.pct}% · ${E(s.zone)}</strong><div class="stat-label">${fmt(s.kwh)} kWh/tháng · ${fmt(s.vnd)} ₫ · ${fmt(s.co2)} kg CO₂</div></div><span class="badge ${s.applied ? 'badge-resolved' : 'badge-pending'}">${s.applied ? 'Đã áp dụng' : 'Đã lưu'}</span><button class="btn btn-secondary btn-sm" data-a="e" data-id="${s.id}">Sửa</button>${s.applied ? '' : `<button class="btn btn-primary btn-sm" data-a="ap" data-id="${s.id}">Áp dụng làm định mức</button>`}</article>`).join('') : empty('Chưa có kịch bản nào được lưu.'); };
    $('#sc').onclick = e => { const a = e.target.dataset.a, id = +e.target.dataset.id; if (!a) return; const s = SB.get('scenarios').find(x => x.id === id);
      if (a === 'e') { editId = id; $('#wz').value = s.zone; $('#wp').value = s.pct; wv(); $('#wz').scrollIntoView({ behavior: 'smooth' }); SB.toast('Chỉnh thanh trượt rồi chạy mô phỏng để cập nhật kịch bản', 'info'); }
      if (a === 'ap') SB.confirm(`Đặt định mức mới: giảm ${s.pct}% tại ${s.zone}?`, () => {
        SB.set('zones', SB.get('zones').map(z => s.zone === 'Toàn tòa nhà' || z.name === s.zone ? { ...z, baselineKw: Math.round(z.loadKw * (1 - s.pct / 100)) } : z));
        SB.set('scenarios', SB.get('scenarios').map(x => x.id === id ? { ...x, applied: true } : x)); drawSc(); SB.toast('Đã cập nhật định mức (baseline) mới'); }); };
    $('#wgo').onclick = () => {
      const zn = $('#wz').value, p = +$('#wp').value, er = $('#werr'); er.textContent = '';
      if (!zn || !(p >= 1 && p <= 50)) { er.textContent = 'Chọn khu vực và mức giảm từ 1 đến 50%.'; return; }
      SB.ai($('#aiOut'), () => {
        const zs = Z(), k = kOf(zs), z = zs.find(z => z.name === zn), base = zn === 'Toàn tòa nhà' ? MONTH : z ? z.loadKw * k : 0;
        if (!(base > 0)) return null; // khu vực không còn hoạt động -> AI không đủ dữ liệu
        const kwh = Math.round(base * p / 100), vnd = kwh * K.price, co2 = Math.round(kwh * K.co2);
        return { title: `Giảm ${p}% tại ${E(zn)}`, text: `Tiết kiệm <strong>${fmt(kwh)} kWh/tháng</strong> ≈ <strong>${fmt(vnd)} ₫</strong>, giảm <strong>${fmt(co2)} kg CO₂</strong>.`, why: `Tiêu thụ ước tính ${fmt(Math.round(base))} kWh/tháng × ${p}%; đơn giá ${fmt(K.price)} ₫/kWh; hệ số phát thải ${K.co2} kg CO₂/kWh.`, zone: zn, pct: p, kwh, vnd, co2 };
      }, r => { const a = SB.get('scenarios'), o = { zone: r.zone, pct: r.pct, kwh: r.kwh, vnd: r.vnd, co2: r.co2, applied: false };
        editId ? SB.set('scenarios', a.map(s => s.id === editId ? { ...s, ...o } : s)) : SB.set('scenarios', [{ id: Date.now(), ...o }, ...a]); editId = null; drawSc(); },
      () => { $('#wp').focus(); SB.toast('Điều chỉnh thanh trượt rồi chạy lại', 'info'); });
    };
    drawSc();
  };

  /* ===== 9. Monthly Report (C/R/U/D + xuất file) ===== */
  P.reports = () => {
    let sel = null; const ST = { draft: ['Bản nháp', 'badge-pending'], approved: ['Đã duyệt', 'badge-resolved'], archived: ['Đã lưu trữ', 'badge-investigating'] };
    const mk = m => m.split('-').reverse().join('/'), key = m => { const [mm, y] = m.split('/'); return +y * 12 + +mm; };
    $('#cf').innerHTML = SB.field('Tháng báo cáo', 'month', SB.input('month', 'month')) + SB.field('Tiêu đề báo cáo', 'title', SB.input('title', 'text', 'VD: Báo cáo năng lượng tháng 10/2026')) + '<div class="form-group"><button class="btn btn-primary">Tạo báo cáo (tự tổng hợp)</button></div>';
    const draw = () => {
      const a = SB.get('reports').slice().sort((p, q) => key(q.month) - key(p.month));
      $('#stats').innerHTML = stat('Tổng báo cáo đã lưu', a.length + ' <small>kỳ</small>') + stat('Đã duyệt', a.filter(r => r.status === 'approved').length + ' <small>kỳ</small>', 'v-green') + stat('Đang soạn thảo', a.filter(r => r.status === 'draft').length + ' <small>kỳ</small>', 'v-amber');
      $('#list').innerHTML = a.length ? a.map(r => `<article class="card report ${sel === r.id ? 'z-ok' : ''}"><span aria-hidden="true">📄</span><div><strong>${E(r.title)}</strong><div class="stat-label">Tháng ${E(r.month)} · ${E(r.author)} · ${fmt(r.totalKwh)} kWh</div></div><span class="badge ${ST[r.status][1]}">${ST[r.status][0]}</span><button class="btn btn-secondary btn-sm" data-a="v" data-id="${r.id}">Xem</button>${r.status === 'draft' ? `<button class="btn btn-danger btn-sm" data-a="d" data-id="${r.id}">Xóa</button>` : ''}</article>`).join('') : empty('Chưa có báo cáo. Nhấn "Lập báo cáo mới".');
      const r = a.find(x => x.id === sel);
      $('#detail').innerHTML = r ? `<h2 class="card-title">Tóm tắt báo cáo tháng ${E(r.month)}</h2><p style="margin:12px 0">Tổng năng lượng tiêu thụ toàn tòa nhà: <strong>${fmt(r.totalKwh)} kWh</strong> (${r.changePct > 0 ? 'tăng' : 'giảm'} ${Math.abs(r.changePct)}% so với kỳ trước). Chi phí ước tính ${fmt(r.totalKwh * K.price)} ₫; phát thải ${fmt(Math.round(r.totalKwh * K.co2))} kg CO₂.</p><div class="form-group"><label class="form-label" for="note">Nhận xét của ban quản lý</label><textarea class="form-control" id="note" rows="3" ${r.status === 'archived' ? 'disabled' : ''}>${E(r.note)}</textarea><div class="form-error-msg"></div></div><div class="toolbar no-print">${r.status !== 'archived' ? '<button class="btn btn-secondary btn-sm" data-a="n">Lưu nhận xét</button>' : ''}${r.status === 'draft' ? '<button class="btn btn-primary btn-sm" data-a="ap">Ký duyệt</button>' : ''}${r.status === 'approved' ? '<button class="btn btn-secondary btn-sm" data-a="ar">Lưu trữ</button>' : ''}<button class="btn btn-secondary btn-sm" data-a="pr">In / Xuất PDF</button><button class="btn btn-secondary btn-sm" data-a="csv">Xuất CSV</button></div>` : empty('Chọn một báo cáo trong kho lưu trữ để xem tóm tắt.');
    };
    const upd = fn => { SB.set('reports', SB.get('reports').map(x => x.id === sel ? fn(x) : x)); draw(); };
    const csv = r => { const q = s => '"' + String(s).replace(/"/g, '""') + '"', rows = [['Tháng', 'Tiêu đề', 'Trạng thái', 'Tổng kWh', 'Chi phí (VND)', 'CO2 (kg)', 'Biến động (%)', 'Nhận xét'], [r.month, r.title, ST[r.status][0], r.totalKwh, r.totalKwh * K.price, Math.round(r.totalKwh * K.co2), r.changePct, r.note]];
      const l = document.createElement('a'); l.href = URL.createObjectURL(new Blob(['\ufeff' + rows.map(x => x.map(q).join(',')).join('\n')], { type: 'text/csv' })); l.download = 'bao-cao-' + r.month.replace('/', '-') + '.csv'; l.click(); URL.revokeObjectURL(l.href); SB.toast('Đã xuất file CSV'); };
    $('#list').onclick = e => { const a = e.target.dataset.a, id = +e.target.dataset.id; if (!a) return;
      if (a === 'v') { sel = id; draw(); }
      if (a === 'd') SB.confirm('Xóa bản nháp báo cáo này?', () => { SB.set('reports', SB.get('reports').filter(x => x.id !== id)); if (sel === id) sel = null; draw(); SB.toast('Đã xóa báo cáo nháp', 'danger'); }); };
    $('#detail').onclick = e => { const a = e.target.dataset.a; if (!a) return;
      if (a === 'n' || a === 'ap') { const v = $('#note').value.trim(), g = $('#note').closest('.form-group'), bad = v.length < 5; g.classList.toggle('has-error', bad); g.querySelector('.form-error-msg').textContent = bad ? 'Nhận xét tối thiểu 5 ký tự' : ''; if (bad) return;
        upd(x => ({ ...x, note: v, status: a === 'ap' ? 'approved' : x.status })); SB.toast(a === 'ap' ? 'Đã ký duyệt báo cáo' : 'Đã lưu nhận xét'); }
      if (a === 'ar') { upd(x => ({ ...x, status: 'archived' })); SB.toast('Đã lưu trữ báo cáo', 'info'); }
      if (a === 'pr') window.print();
      if (a === 'csv') csv(SB.get('reports').find(x => x.id === sel)); };
    $('#add').onclick = () => { $('#cf').hidden = !$('#cf').hidden; };
    $('#cf').onsubmit = e => { e.preventDefault(); const a = SB.get('reports');
      const d = SB.validate(e.target, { month: [v => /^\d{4}-\d{2}$/.test(v) && !a.some(r => r.month === mk(v)), 'Chọn tháng chưa có báo cáo'], title: [v => v.length >= 5, 'Tiêu đề tối thiểu 5 ký tự'] }); if (!d) return;
      const m = mk(d.month), f = .94 + (+m.slice(0, 2) % 6) * .02, tot = Math.round(MONTH * f / 100) * 100, prev = a.filter(r => key(r.month) < key(m)).sort((p, q) => key(q.month) - key(p.month))[0];
      const r = { id: Date.now(), month: m, title: d.title, author: 'Trần Văn Quản Lý', status: 'draft', totalKwh: tot, changePct: prev ? Math.round((tot - prev.totalKwh) / prev.totalKwh * 1000) / 10 : 0, note: `Tổng hợp tự động từ dữ liệu mock: ${fmt(tot)} kWh.` };
      SB.set('reports', [...a, r]); sel = r.id; e.target.reset(); e.target.hidden = true; draw(); SB.toast('Đã tạo báo cáo bản nháp'); };
    draw();
  };

  /* ===== CRUD dùng chung cho 3 trang Admin: biểu mẫu + bảng + tìm kiếm + sửa/xóa + hành động riêng ===== */
  const crud3 = c => {
    let edit = null; const L = () => SB.get(c.key).map(c.norm || (x => x));
    $('#af').innerHTML = c.fields.map(f => SB.field(f.l, f.n, f.o ? SB.select(f.n, typeof f.o === 'function' ? f.o() : f.o) : SB.input(f.n, f.t || 'text', f.ph || '', f.t === 'number' ? 'min="0"' : ''))).join('') + `<div class="form-group"><button class="btn btn-primary" id="sub">Lưu ${c.noun}</button> <button type="button" class="btn btn-secondary" id="cx" hidden>Hủy sửa</button></div>`;
    $('#head').innerHTML = '<tr>' + c.cols.map(x => `<th>${x[0]}</th>`).join('') + '<th>Thao tác</th></tr>';
    const reset = () => { edit = null; $('#af').reset(); $('#sub').textContent = 'Lưu ' + c.noun; $('#cx').hidden = true; };
    const upd = (id, fn) => { SB.set(c.key, L().map(x => x.id === id ? fn(x) : x)); draw(); };
    const draw = () => {
      const l = L(), q = $('#q').value.toLowerCase(), r = l.filter(x => JSON.stringify(x).toLowerCase().includes(q));
      $('#stats').innerHTML = c.stats(l);
      $('#rows').innerHTML = r.length ? r.map(x => `<tr>${c.cols.map(h => `<td>${h[1](x)}</td>`).join('')}<td><button class="link-btn" data-a="e" data-id="${x.id}">${c.editLabel || 'Sửa'}</button>${c.extra ? c.extra(x) : ''}<button class="link-btn danger" data-a="d" data-id="${x.id}">Xóa</button></td></tr>`).join('') : `<tr><td colspan="${c.cols.length + 1}">${empty('Không có dữ liệu phù hợp.')}</td></tr>`;
    };
    $('#rows').onclick = e => { const a = e.target.dataset.a, id = +e.target.dataset.id; if (!a) return; const row = L().find(x => x.id === id);
      if (a === 'e') { edit = id; c.fields.forEach(f => $('#' + f.n).value = row[f.n]); $('#sub').textContent = 'Cập nhật ' + c.noun; $('#cx').hidden = false; $('#af').scrollIntoView({ behavior: 'smooth' }); }
      else if (a === 'd') { const m = c.canDel && c.canDel(row, L()); if (m) return SB.toast(m, 'danger');
        SB.confirm(`Xóa ${c.noun} "${row.name || row.code}"? Thao tác không thể hoàn tác.`, () => { SB.set(c.key, L().filter(x => x.id !== id)); reset(); draw(); SB.toast('Đã xóa ' + c.noun, 'danger'); }); }
      else c.act(a, row, upd, L()); };
    $('#af').onsubmit = e => { e.preventDefault(); const rules = {}; c.fields.forEach(f => rules[f.n] = [v => f.r(v, edit), f.m]);
      const d = SB.validate(e.target, rules); if (!d) return; c.fields.forEach(f => { if (f.t === 'number') d[f.n] = +d[f.n]; });
      const msg = edit ? 'Đã cập nhật ' : 'Đã thêm '; if (edit) upd(edit, x => ({ ...x, ...d })); else { SB.set(c.key, [...L(), { id: Date.now(), ...c.make(d) }]); draw(); }
      reset(); SB.toast(msg + c.noun); };
    $('#cx').onclick = reset; $('#q').oninput = draw; draw();
  };

  /* ===== 10. Zone Management ===== */
  P.zones = () => crud3({ key: 'zones', noun: 'khu vực', norm: zn,
    fields: [
      { n: 'code', l: 'Mã ID', ph: 'Z-05', r: (v, e) => /^Z-\d{2,}$/.test(v) && !Z(true).some(z => z.code === v && z.id !== e), m: 'Mã dạng Z-05 và không trùng' },
      { n: 'name', l: 'Tên khu vực', ph: 'VD: Parking B2', r: v => v.length >= 3, m: 'Tối thiểu 3 ký tự' },
      { n: 'floor', l: 'Tầng', ph: 'VD: B2', r: v => v.length >= 1, m: 'Nhập tầng' },
      { n: 'type', l: 'Loại tải chính', o: ['HVAC', 'Chiếu sáng', 'Ổ cắm'], r: v => v, m: 'Chọn loại tải' },
      { n: 'areaM2', l: 'Diện tích (m²)', t: 'number', r: v => +v > 0, m: 'Diện tích phải lớn hơn 0' },
      { n: 'ratedKw', l: 'Công suất định mức (kW)', t: 'number', r: v => +v > 0, m: 'Công suất phải lớn hơn 0' }],
    make: d => ({ ...d, loadKw: Math.round(d.ratedKw * .5), baselineKw: Math.round(d.ratedKw * .45), status: 'active' }),
    cols: [['Mã ID', z => E(z.code)], ['Tên khu vực', z => `<strong>${E(z.name)}</strong><div class="stat-label">Tầng ${E(z.floor)} · ${fmt(z.areaM2)} m²</div>`], ['Loại tải', z => E(z.type)], ['Công suất định mức', z => fmt(z.ratedKw) + ' kW'], ['Cảm biến gắn kèm', z => SB.get('sensors').filter(s => s.zone === z.name).length + ' sensors'], ['Trạng thái', z => badge(z.status)]],
    extra: z => `<button class="link-btn" data-a="lock" data-id="${z.id}">${z.status === 'active' ? 'Khóa' : 'Mở khóa'}</button>`,
    act: (a, z, upd) => { if (a === 'lock') { upd(z.id, x => ({ ...x, status: x.status === 'active' ? 'locked' : 'active' })); SB.toast(z.status === 'active' ? 'Đã tạm dừng hiển thị khu vực' : 'Đã kích hoạt lại khu vực', 'info'); } },
    canDel: z => { const n = SB.get('sensors').filter(s => s.zone === z.name).length; return n ? `Không thể xóa: còn ${n} cảm biến gắn kèm.` : null; },
    stats: l => stat('Tổng khu vực quản lý', l.length + ' <small>khu vực</small>') + stat('Đang hoạt động', l.filter(z => z.status === 'active').length + ' <small>zone</small>', 'v-green') + stat('Vô hiệu hóa', l.filter(z => z.status !== 'active').length + ' <small>zone</small>', 'v-sky') });

  /* ===== 11. Sensor Management ===== */
  P.sensors = () => {
    crud3({ key: 'sensors', noun: 'cảm biến', editLabel: 'Cấu hình',
      fields: [
        { n: 'code', l: 'Mã sensor', ph: 'SEN-009', r: (v, e) => /^SEN-\d{3}$/.test(v) && !SB.get('sensors').some(s => s.code === v && s.id !== e), m: 'Mã dạng SEN-009 và không trùng' },
        { n: 'type', l: 'Loại cảm biến', o: ['Nhiệt độ / độ ẩm', 'Điện năng', 'Ánh sáng'], r: v => v, m: 'Chọn loại' },
        { n: 'zone', l: 'Khu vực', o: () => Z(true).map(z => z.name), r: v => v, m: 'Chọn khu vực' },
        { n: 'intervalSec', l: 'Chu kỳ đọc (giây)', t: 'number', r: v => +v >= 1 && +v <= 60, m: 'Từ 1 đến 60 giây' }],
      make: d => ({ ...d, status: 'online' }),
      cols: [['Mã sensor', s => `<strong>${E(s.code)}</strong>`], ['Loại thiết bị', s => E(s.type)], ['Khu vực gắn', s => E(s.zone)], ['Chu kỳ đọc', s => s.intervalSec + 's'], ['Trạng thái', s => badge(s.status)]],
      extra: s => s.status === 'offline' ? `<button class="link-btn" data-a="sync" data-id="${s.id}">Đồng bộ lại</button>` : '',
      act: (a, s, upd) => { if (a === 'sync') { upd(s.id, x => ({ ...x, status: 'calibrating' })); setTimeout(() => { upd(s.id, x => ({ ...x, status: 'online' })); SB.toast('Đã đồng bộ ' + s.code); }, 1200); } },
      stats: l => stat('Tổng cảm biến', l.length + ' <small>thiết bị</small>') + stat('Hoạt động tốt', l.filter(s => s.status === 'online').length + ' <small>thiết bị</small>', 'v-green') + stat('Lỗi kết nối', l.filter(s => s.status === 'offline').length + ' <small>thiết bị</small>', 'v-rose') + stat('Tần suất đọc TB', (l.length ? Math.round(l.reduce((a, s) => a + s.intervalSec, 0) / l.length) : 0) + 's <small>/ lần</small>', 'v-sky') });
    $('#syncAll').onclick = function () { const b = this, off = SB.get('sensors').filter(s => s.status !== 'online'); if (!off.length) return SB.toast('Tất cả cảm biến đang hoạt động', 'info');
      b.disabled = true; b.textContent = 'Đang gửi tín hiệu ping…';
      setTimeout(() => { SB.set('sensors', SB.get('sensors').map(s => ({ ...s, status: 'online' }))); b.disabled = false; b.textContent = 'Chạy đồng bộ tự động'; $('#q').oninput(); SB.toast('Đã đồng bộ ' + off.length + ' cảm biến'); }, 1500); };
  };

  /* ===== 12. User Management ===== */
  P.users = () => {
    const admins = l => l.filter(u => u.role === 'Admin' && u.status === 'active').length;
    crud3({ key: 'users', noun: 'người dùng',
      fields: [
        { n: 'name', l: 'Họ tên', ph: 'Nguyễn Văn A', r: v => v.length >= 3, m: 'Tối thiểu 3 ký tự' },
        { n: 'email', l: 'Email', t: 'email', ph: 'ten@smartbuilding.vn', r: (v, e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && !SB.get('users').some(u => u.email === v && u.id !== e), m: 'Email hợp lệ và không trùng' },
        { n: 'role', l: 'Vai trò', o: ['Occupant', 'Operator', 'Facility Manager', 'Admin'], r: v => v, m: 'Chọn vai trò' },
        { n: 'zone', l: 'Khu vực phụ trách', o: () => ['Toàn tòa nhà', ...Z(true).map(z => z.name)], r: v => v, m: 'Chọn khu vực' }],
      make: d => ({ ...d, status: 'active' }),
      cols: [['Họ tên', u => `<strong>${E(u.name)}</strong><div class="stat-label">${E(u.email)}</div>`], ['Vai trò', u => E(u.role)], ['Khu vực phụ trách', u => E(u.zone)], ['Trạng thái', u => badge(u.status)]],
      extra: u => `<button class="link-btn" data-a="lock" data-id="${u.id}">${u.status === 'active' ? 'Khóa' : 'Mở khóa'}</button>`,
      act: (a, u, upd, l) => { if (a !== 'lock') return; if (u.role === 'Admin' && u.status === 'active' && admins(l) <= 1) return SB.toast('Phải còn ít nhất 1 Admin đang hoạt động', 'danger');
        upd(u.id, x => ({ ...x, status: x.status === 'active' ? 'locked' : 'active' })); SB.toast(u.status === 'active' ? 'Đã khóa tài khoản' : 'Đã mở khóa tài khoản', 'info'); },
      canDel: (u, l) => u.role === 'Admin' && u.status === 'active' && admins(l) <= 1 ? 'Không thể xóa Admin cuối cùng.' : null,
      stats: l => stat('Tổng tài khoản', l.length + ' <small>người dùng</small>') + stat('Đang hoạt động', l.filter(u => u.status === 'active').length, 'v-green') + stat('Đã khóa', l.filter(u => u.status !== 'active').length, 'v-rose') });
  };

  const CFG = { kpis: ['manager-energy-kpis', 'Chỉ số hiệu suất năng lượng (Energy KPIs)', 'KPI, ngân sách và phát thải', 'Manager: Quản lý cơ sở'], compare: ['manager-zone-comparison', 'So sánh tiêu thụ giữa các khu vực', 'So sánh & mô phỏng What-if (AI-3)', 'Manager: Quản lý cơ sở'], reports: ['manager-monthly-report', 'Báo cáo định kỳ hàng tháng', 'Lập, duyệt và xuất báo cáo', 'Manager: Quản lý cơ sở'], zones: ['admin-zone-management', 'Quản trị danh mục khu vực', 'Zone Management', 'Admin: Quản trị viên'], sensors: ['admin-sensor-management', 'Quản trị hệ thống cảm biến', 'Sensor Management', 'Admin: Quản trị viên'], users: ['admin-user-management', 'Quản trị người dùng & phân quyền', 'User Management', 'Admin: Quản trị viên'] };
  const k = document.body.dataset.page; SB.shell3(...CFG[k]);
  SB.boot(() => { try { P[k](); } catch (e) { console.error(e); $('#main').innerHTML = '<div class="card empty-state"><div class="empty-state-title">⚠️ Không tải được dữ liệu</div><p>Đã xảy ra lỗi khi hiển thị trang này.</p><button class="btn btn-primary" onclick="location.reload()">Thử lại</button></div>'; } });
})();
