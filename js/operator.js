/* LOGIC 4 MÀN HÌNH OPERATOR (SV2). Mỗi trang có <body data-page="..."> để chọn hàm tương ứng. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), E = SB.esc;
  const OPEN = a => !['resolved', 'dismissed'].includes(a.status);
  const stat = (l, v, c = '') => `<article class="card stat-card"><div class="stat-label">${l}</div><div class="stat-value ${c}">${v}</div></article>`;
  const empty = m => `<div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>${m}</p></div>`;
  const zst = z => { const r = z.loadKw / z.ratedKw; return r > .9 ? ['Quá tải', 'badge-priority-high', 'z-bad'] : r > .8 ? ['Peak load', 'badge-pending', 'z-warn'] : ['Bình thường', 'badge-resolved', 'z-ok']; };
  const P = {};

  /* ===== 1. Energy Monitor (R) ===== */
  P.monitor = () => {
    const zs = SB.get('zones'), al = SB.get('alerts').filter(OPEN), tot = zs.reduce((a, z) => a + z.loadKw, 0), base = zs.reduce((a, z) => a + z.baselineKw, 0);
    $('#stats').innerHTML = stat('Khu vực giám sát', zs.length, 'v-sky') + stat('Tổng công suất tức thời', SB.fmt(tot) + ' kW', 'v-sky') + stat('Cảnh báo đang mở', al.length, al.length ? 'v-rose' : 'v-green') + stat('Hiệu suất so với baseline', Math.min(100, Math.round(base / tot * 100)) + '%', 'v-green');
    $('#zoneGrid').innerHTML = zs.length ? zs.map(z => { const s = zst(z), p = Math.round(z.loadKw / z.ratedKw * 100);
      return `<article class="card ${s[2]}"><h3>${E(z.name)}</h3><div class="stat-value">${SB.fmt(z.loadKw)} <small>kW</small></div><div class="progress" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div><p class="stat-label">${p}% thiết kế · <span class="badge ${s[1]}">${s[0]}</span></p></article>`; }).join('') : empty('Chưa có khu vực nào.');
    // Biểu đồ SVG thuần: đường xanh = phụ tải, nét đứt vàng = baseline
    const d = SEED.load24, W = 760, H = 260, x = i => 40 + i * (W - 56) / 24, y = v => H - 30 - v / 1000 * (H - 50), pt = a => a.map((v, i) => x(i) + ',' + y(v)).join(' ');
    const g = [0, 250, 500, 750, 1000].map(v => `<line x1="40" x2="${W - 16}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(255,255,255,.08)"/><text x="34" y="${y(v) + 4}" text-anchor="end" fill="#94a3b8" font-size="11">${v}</text>`).join('');
    const t = [0, 4, 8, 12, 16, 20, 24].map(i => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" fill="#94a3b8" font-size="11">${String(i).padStart(2, '0')}:00</text>`).join('');
    $('#chart').innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-label="Biểu đồ phụ tải 24 giờ"><title>Phụ tải 24 giờ so với baseline</title>${g}${t}<polygon points="${x(0)},${y(0)} ${pt(d)} ${x(24)},${y(0)}" fill="rgba(56,189,248,.15)"/><polyline points="${pt(d.map(v => Math.round(v * .9)))}" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5 4"/><polyline points="${pt(d)}" fill="none" stroke="#38bdf8" stroke-width="3"/></svg>`;
    const draw = () => { const q = $('#q').value.toLowerCase(), f = $('#fs').value, r = zs.filter(z => z.name.toLowerCase().includes(q) && (!f || zst(z)[0] === f));
      $('#rows').innerHTML = r.length ? r.map(z => { const s = zst(z); return `<tr><td><strong>${E(z.name)}</strong></td><td>${E(z.floor)}</td><td>${E(z.type)}</td><td>${SB.fmt(z.ratedKw)} kW</td><td>${SB.fmt(z.loadKw)} kW</td><td><span class="badge ${s[1]}">${s[0]}</span></td></tr>`; }).join('') : `<tr><td colspan="6">${empty('Không có khu vực khớp bộ lọc.')}</td></tr>`; };
    $('#q').oninput = $('#fs').onchange = draw; draw();
  };

  /* ===== 2. Alert Center (C/R/U) + AI-1 ===== */
  P.alerts = () => {
    let f = 'all';
    const LV = { critical: ['Critical', 'badge-priority-high'], warning: ['Warning', 'badge-pending'] }, ST = { new: 'Mới', investigating: 'Đang điều tra', resolved: 'Đã giải quyết', dismissed: 'Đã bác bỏ' }, NX = { new: ['investigating', 'Xử lý ngay'], investigating: ['resolved', 'Hoàn tất'] };
    $('#cf').innerHTML = SB.field('Khu vực', 'zone', SB.select('zone', SB.get('zones').map(z => z.name))) + SB.field('Sự cố', 'issue', SB.input('issue', 'text', 'Mô tả sự cố (≥ 5 ký tự)')) + SB.field('Mức độ', 'level', SB.select('level', [['warning', 'Warning'], ['critical', 'Critical']])) + '<button class="btn btn-primary">Lưu cảnh báo</button>';
    const draw = () => {
      const a = SB.get('alerts'), o = a.filter(OPEN);
      $('#stats').innerHTML = stat('Tổng cảnh báo', a.length, 'v-sky') + stat('Critical', o.filter(x => x.level === 'critical').length, 'v-rose') + stat('Warning', o.filter(x => x.level === 'warning').length, 'v-amber') + stat('Đã giải quyết', a.filter(x => x.status === 'resolved').length, 'v-green');
      const r = f === 'all' ? a : f === 'resolved' ? a.filter(x => x.status === 'resolved') : o.filter(x => x.level === f);
      $('#rows').innerHTML = r.length ? r.map(x => `<tr><td><strong>${E(x.id)}</strong><div class="stat-label">${E(x.time)}</div></td><td>${E(x.zone)}</td><td>${E(x.issue)}</td><td><span class="badge ${LV[x.level][1]}">${LV[x.level][0]}</span> <span class="badge badge-investigating">${ST[x.status]}</span></td><td>${NX[x.status] ? `<button class="btn btn-primary btn-sm" data-n="${E(x.id)}">${NX[x.status][1]}</button> <button class="btn btn-secondary btn-sm" data-x="${E(x.id)}">Bác bỏ</button>` : '—'}</td></tr>`).join('') : `<tr><td colspan="5">${empty('Không có cảnh báo trong nhóm này.')}</td></tr>`;
    };
    const upd = (id, fn) => { SB.set('alerts', SB.get('alerts').map(x => x.id === id ? fn(x) : x)); draw(); SB.toast('Đã cập nhật trạng thái'); };
    $('#rows').onclick = e => { const n = e.target.dataset.n, x = e.target.dataset.x; if (n) upd(n, a => ({ ...a, status: NX[a.status][0] })); if (x) upd(x, a => ({ ...a, status: 'dismissed' })); };
    $('#tabs').onclick = e => { if (!e.target.dataset.f) return; f = e.target.dataset.f; document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === e.target)); draw(); };
    $('#add').onclick = () => { $('#cf').hidden = !$('#cf').hidden; };
    $('#cf').onsubmit = e => { e.preventDefault();
      const d = SB.validate(e.target, { zone: [v => v, 'Chọn khu vực'], issue: [v => v.length >= 5, 'Mô tả tối thiểu 5 ký tự'], level: [v => v, 'Chọn mức độ'] }); if (!d) return;
      const a = SB.get('alerts'); a.unshift({ id: 'AL-2026-' + String(a.length + 1).padStart(3, '0'), zone: d.zone, issue: d.issue, level: d.level, status: 'new', time: SB.now() });
      SB.set('alerts', a); e.target.reset(); e.target.hidden = true; draw(); SB.toast('Đã tạo cảnh báo thủ công'); };
    SB.failBtn($('#fail'));
    $('#scan').onclick = () => SB.ai($('#aiOut'), () => {
      const hit = SB.get('zones').filter(z => z.loadKw > 1.35 * z.baselineKw);
      if (!hit.length) return { title: 'Không phát hiện bất thường', text: 'Mọi khu vực đều dưới 135% baseline.', why: 'Quy tắc: P_thực tế > 1,35 × P_baseline.', hit: [] };
      return { title: `Phát hiện ${hit.length} điểm spike`, text: hit.map(z => `<strong>${E(z.name)}</strong>: ${z.loadKw} kW (${Math.round(z.loadKw / z.baselineKw * 100)}% baseline)`).join('<br>'), why: 'Tải hiện tại vượt 135% mức baseline (P_thực tế > 1,35 × P_baseline); nghi ngờ HVAC hoặc thiết bị chạy ngoài kế hoạch.', hit };
    }, r => { const a = SB.get('alerts'); r.hit.forEach(z => a.unshift({ id: 'AL-2026-' + String(a.length + 1).padStart(3, '0'), zone: z.name, issue: 'AI: spike ' + Math.round(z.loadKw / z.baselineKw * 100) + '% baseline', level: 'critical', status: 'new', time: SB.now() })); SB.set('alerts', a); draw(); SB.toast(r.hit.length ? 'Đã tạo cảnh báo từ AI' : 'Đã ghi nhận'); });
    draw();
  };

  /* ===== 3. Saving Actions (C/R/U/D) + AI-2 ===== */
  P.actions = () => {
    let edit = null;
    const ST = { scheduled: ['Đã lên lịch', 'badge-pending'], active: ['Đang chạy', 'badge-investigating'], completed: ['Hoàn thành', 'badge-resolved'] }, zones = SB.get('zones').map(z => z.name);
    $('#af').innerHTML = SB.field('Tên tác vụ', 'title', SB.input('title', 'text', 'VD: Tắt đèn hành lang')) + SB.field('Khu vực áp dụng', 'zone', SB.select('zone', zones)) + SB.field('Tiết kiệm dự kiến (kWh)', 'saving', SB.input('saving', 'number', '0', 'min="1"')) + SB.field('Tiến độ (%)', 'progress', SB.input('progress', 'number', '0', 'min="0" max="100" value="0"')) + SB.field('Trạng thái', 'status', SB.select('status', [['scheduled', 'Đã lên lịch'], ['active', 'Đang chạy'], ['completed', 'Hoàn thành']])) + '<button class="btn btn-primary" id="sub">Lưu tác vụ</button> <button type="button" class="btn btn-secondary" id="cx" hidden>Hủy sửa</button>';
    const reset = () => { edit = null; $('#af').reset(); $('#sub').textContent = 'Lưu tác vụ'; $('#cx').hidden = true; };
    const fill = x => { $('#title').value = x.name; $('#zone').value = x.zone; $('#saving').value = x.savingKwh; $('#progress').value = x.progress || 0; $('#status').value = x.status || 'scheduled'; $('#af').scrollIntoView({ behavior: 'smooth' }); };
    const draw = () => {
      const a = SB.get('operator_actions'), on = a.filter(x => x.status === 'active');
      $('#stats').innerHTML = stat('Đang thực thi', on.length + ' <small>tác vụ</small>', 'v-sky') + stat('Chờ chạy', a.filter(x => x.status === 'scheduled').length + ' <small>tác vụ</small>', 'v-amber') + stat('Tiết kiệm dự kiến', SB.fmt(on.reduce((s, x) => s + x.savingKwh, 0)) + ' <small>kWh</small>', 'v-green');
      $('#list').innerHTML = a.length ? a.map(x => `<article class="card section"><div class="card-header"><strong>${E(x.name)}</strong><span class="badge ${ST[x.status][1]}">${ST[x.status][0]}</span></div><p class="stat-label">${E(x.zone)} · tiết kiệm ~${SB.fmt(x.savingKwh)} kWh</p><div class="progress" role="progressbar" aria-valuenow="${x.progress}" aria-valuemin="0" aria-valuemax="100"><i style="width:${x.progress}%"></i></div><p class="stat-label">${x.progress}% hoàn thành</p><div class="toolbar"><button class="btn btn-secondary btn-sm" data-e="${x.id}">Sửa</button><button class="btn btn-danger btn-sm" data-d="${x.id}">Hủy lệnh</button></div></article>`).join('') : empty('Chưa có lệnh tiết kiệm. Hãy thêm mới hoặc nhờ AI gợi ý.');
    };
    $('#list').onclick = e => { const id = +(e.target.dataset.e || e.target.dataset.d); if (!id) return;
      if (e.target.dataset.e) { edit = id; fill(SB.get('operator_actions').find(x => x.id === id)); $('#sub').textContent = 'Cập nhật tác vụ'; $('#cx').hidden = false; }
      else SB.confirm('Hủy lệnh tiết kiệm này? Thao tác không thể hoàn tác.', () => { SB.set('operator_actions', SB.get('operator_actions').filter(x => x.id !== id)); reset(); draw(); SB.toast('Đã hủy lệnh', 'danger'); }); };
    $('#cx').onclick = reset;
    $('#af').onsubmit = e => { e.preventDefault();
      const d = SB.validate(e.target, { title: [v => v.length >= 3, 'Tên tối thiểu 3 ký tự'], zone: [v => v, 'Chọn khu vực'], saving: [v => +v > 0, 'Nhập số kWh lớn hơn 0'], progress: [v => v !== '' && +v >= 0 && +v <= 100, 'Tiến độ từ 0 đến 100'], status: [v => v, 'Chọn trạng thái'] }); if (!d) return;
      const o = { name: d.title, zone: d.zone, savingKwh: +d.saving, progress: +d.progress, status: d.status }, msg = edit ? 'Đã cập nhật tác vụ' : 'Đã thêm tác vụ';
      let a = SB.get('operator_actions'); edit ? a = a.map(x => x.id === edit ? { ...x, ...o } : x) : a.push({ id: Date.now(), ...o });
      SB.set('operator_actions', a); reset(); draw(); SB.toast(msg); };
    // AI-2: nhập (khu vực + nhiệt độ ngoài trời) -> kiểm tra -> xử lý -> kết quả + lý do -> quyết định
    $('#aiZone').innerHTML = zones.map(n => `<option>${E(n)}</option>`).join(''); SB.failBtn($('#fail'));
    $('#aiGo').onclick = () => {
      const t = $('#aiTemp').value, err = $('#aiErr'); err.textContent = '';
      if (t === '' || isNaN(t) || +t < 10 || +t > 45) { err.textContent = 'Nhiệt độ ngoài trời phải từ 10 đến 45°C.'; return; }
      const zn = $('#aiZone').value;
      SB.ai($('#aiOut'), () => {
        const z = SB.get('zones').find(z => z.name === zn), h = new Date().getHours() + new Date().getMinutes() / 60, r = z.loadKw / z.ratedKw;
        const mk = (name, pct, why) => ({ title: 'Gợi ý cho ' + E(z.name), name, zone: z.name, saving: Math.round(z.loadKw * pct), text: `${E(name)} — tiết kiệm khoảng <strong>${Math.round(z.loadKw * pct)} kWh</strong>.`, why });
        if (z.loadKw > 1.3 * z.baselineKw) return mk('Tạm dừng các tải không khẩn cấp', .15, `Tải ${z.loadKw} kW cao hơn ${Math.round(z.loadKw / z.baselineKw * 100)}% baseline.`);
        if (+t > 32 && z.type === 'HVAC') return mk('Tăng nhiệt độ điều hòa lên 26°C', .12, `Ngoài trời ${t}°C (> 32°C) và khu vực dùng HVAC.`);
        if (h >= 12 && h <= 13.5) return mk('Tắt đèn khu vực làm việc chung giờ trưa', .08, 'Khung 12:00–13:30 ít người sử dụng.');
        if (r > .8) return mk('Điều chỉnh giờ chạy HVAC 9:00–16:00', .1, `Tải đạt ${Math.round(r * 100)}% công suất thiết kế (> 80%).`);
        return null; // không đủ căn cứ -> trạng thái "AI thất bại / không chắc chắn"
      }, r => { const a = SB.get('operator_actions'); a.push({ id: Date.now(), name: r.name, zone: r.zone, savingKwh: r.saving, progress: 0, status: 'scheduled' }); SB.set('operator_actions', a); draw(); },
      r => { fill({ name: r.name, zone: r.zone, savingKwh: r.saving, progress: 0, status: 'scheduled' }); SB.toast('Đã điền gợi ý vào biểu mẫu, bạn có thể chỉnh trước khi lưu', 'info'); });
    };
    draw();
  };

  /* ===== 4. Zone Live Control ===== */
  P.control = () => {
    const RES = { success: ['Thành công', 'badge-resolved'], running: ['Thực hiện', 'badge-pending'], auto: ['Tự động', 'badge-investigating'] };
    const draw = () => {
      const d = SB.get('devices'), lg = SB.get('control_log'), grp = g => d.filter(x => x.group === g).map(x => `<div class="device"><div><strong>${E(x.name)}</strong><div class="stat-label">${E(x.detail)}</div></div><label class="switch"><input type="checkbox" role="switch" data-id="${x.id}" ${x.on ? 'checked' : ''} aria-label="Bật/tắt ${E(x.name)}"><span></span></label></div>`).join('');
      $('#lights').innerHTML = grp('lighting'); $('#hvac').innerHTML = grp('hvac');
      const off = d.filter(x => !x.on).length;
      $('#sys').innerHTML = off ? `<span class="badge badge-pending">${off} thiết bị đang tắt</span>` : '<span class="badge badge-resolved">Đang hoạt động</span>';
      $('#log').innerHTML = lg.length ? lg.map(l => `<li><time>${E(l.time)}</time><div><strong>${E(l.title)}</strong><div class="stat-label">${E(l.desc)}</div></div><span class="badge ${RES[l.result][1]}">${RES[l.result][0]}</span></li>`).join('') : empty('Chưa có can thiệp nào hôm nay.');
    };
    $('#main').onchange = e => { const id = +e.target.dataset.id; if (!id) return;
      const d = SB.get('devices').map(x => x.id === id ? { ...x, on: e.target.checked } : x), x = d.find(v => v.id === id), lg = SB.get('control_log');
      lg.unshift({ time: SB.now(), title: x.name, desc: x.on ? 'Bật thiết bị' : 'Tắt thiết bị', result: 'success' });
      SB.set('devices', d); SB.set('control_log', lg.slice(0, 8)); draw(); SB.toast((x.on ? 'Đã bật ' : 'Đã tắt ') + x.name); };
    $('#sync').onclick = function () { const b = this; b.disabled = true; b.textContent = 'Đang đồng bộ…';
      setTimeout(() => { const lg = SB.get('control_log'); lg.unshift({ time: SB.now(), title: 'Đồng bộ tất cả thiết bị', desc: 'Hoàn tất', result: 'success' }); SB.set('control_log', lg.slice(0, 8)); b.disabled = false; b.textContent = 'Đồng bộ tất cả thiết bị'; draw(); SB.toast('Đã đồng bộ tất cả thiết bị'); }, 1200); };
    draw();
  };

  const CFG = { monitor: ['operator-energy-monitor', 'Tổng quan năng lượng', 'Energy Operations Center'], alerts: ['operator-alert-center', 'Trung tâm cảnh báo & bất thường', 'Tiếp nhận và xử lý sự cố'], actions: ['operator-saving-actions', 'Quản lý hành động tiết kiệm', 'Điều phối lệnh tiết kiệm điện'], control: ['operator-zone-control', 'Bảng điều khiển nhanh thiết bị', 'Zone Live Control'] };
  const key = document.body.dataset.page; SB.shell(...CFG[key]); SB.boot(P[key]);
})();
