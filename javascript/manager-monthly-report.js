/* Monthly Report (C/R/U/D): lập, nhận xét, ký duyệt, lưu trữ, xóa nháp, in và xuất CSV */
buildLayout('manager-monthly-report.html', 'Báo cáo định kỳ hàng tháng', 'Lập, duyệt và xuất báo cáo', 'Manager: Quản lý cơ sở');
var PRICE = 2200, CO2_PER_KWH = 0.85;
var selectedId = null;
var STATUS = { draft: { text: 'Bản nháp', cls: 'badge-pending' }, approved: { text: 'Đã duyệt', cls: 'badge-resolved' }, archived: { text: 'Đã lưu trữ', cls: 'badge-investigating' } };

function monthKey(month) {   // '09/2026' -> 2026*12+9, để so sánh thứ tự tháng
  var parts = month.split('/');
  return Number(parts[1]) * 12 + Number(parts[0]);
}
function findReport(id) {
  var reports = loadData('reports');
  for (var i = 0; i < reports.length; i++) { if (reports[i].id === id) { return reports[i]; } }
  return null;
}
function renderStats(reports) {
  var approved = 0, draft = 0;
  for (var i = 0; i < reports.length; i++) {
    if (reports[i].status === 'approved') { approved++; }
    if (reports[i].status === 'draft') { draft++; }
  }
  document.getElementById('stats').innerHTML = statCard('Tổng báo cáo đã lưu', reports.length + ' kỳ', '') + statCard('Đã duyệt', approved + ' kỳ', 'v-green') + statCard('Đang soạn thảo', draft + ' kỳ', 'v-amber');
}
function sortReports(reports) {   // mới nhất lên đầu (sắp xếp nổi bọt cho dễ hiểu)
  for (var i = 0; i < reports.length; i++) {
    for (var j = 0; j < reports.length - 1 - i; j++) {
      if (monthKey(reports[j].month) < monthKey(reports[j + 1].month)) { var t = reports[j]; reports[j] = reports[j + 1]; reports[j + 1] = t; }
    }
  }
  return reports;
}
function renderList(reports) {
  var html = '';
  for (var i = 0; i < reports.length; i++) {
    var r = reports[i], deleteBtn = '', mark = '';
    if (r.status === 'draft') { deleteBtn = '<button class="btn btn-danger btn-sm" onclick="deleteReport(' + r.id + ')">Xóa</button>'; }
    if (r.id === selectedId) { mark = ' z-ok'; }
    html += '<article class="card report' + mark + '"><span aria-hidden="true">📄</span><div><strong>' + escapeHtml(r.title) + '</strong><div class="stat-label">Tháng ' + r.month + ' · ' + escapeHtml(r.author) + ' · ' + formatNumber(r.totalKwh) + ' kWh</div></div>' +
      '<span class="badge ' + STATUS[r.status].cls + '">' + STATUS[r.status].text + '</span><button class="btn btn-secondary btn-sm" onclick="viewReport(' + r.id + ')">Xem</button>' + deleteBtn + '</article>';
  }
  if (html === '') { html = '<div class="empty-state"><div class="empty-state-title">Chưa có dữ liệu</div><p>Nhấn "Lập báo cáo mới".</p></div>'; }
  document.getElementById('list').innerHTML = html;
}
function renderDetail() {
  var box = document.getElementById('detail'), r = findReport(selectedId);
  if (r === null) { box.innerHTML = '<div class="empty-state"><p>Chọn một báo cáo trong kho lưu trữ để xem tóm tắt.</p></div>'; return; }
  var trend = 'giảm', buttons = '', disabled = '';
  if (r.changePct > 0) { trend = 'tăng'; }
  if (r.status !== 'archived') { buttons += '<button class="btn btn-secondary btn-sm" onclick="saveNote(false)">Lưu nhận xét</button> '; } else { disabled = 'disabled'; }
  if (r.status === 'draft') { buttons += '<button class="btn btn-primary btn-sm" onclick="saveNote(true)">Ký duyệt</button> '; }
  if (r.status === 'approved') { buttons += '<button class="btn btn-secondary btn-sm" onclick="archiveReport()">Lưu trữ</button> '; }
  buttons += '<button class="btn btn-secondary btn-sm" onclick="window.print()">In / Xuất PDF</button> <button class="btn btn-secondary btn-sm" onclick="exportCsv()">Xuất CSV</button>';
  box.innerHTML = '<h2 class="card-title">Tóm tắt báo cáo tháng ' + r.month + '</h2>' +
    '<p style="margin:12px 0">Tổng năng lượng tiêu thụ toàn tòa nhà: <strong>' + formatNumber(r.totalKwh) + ' kWh</strong> (' + trend + ' ' + Math.abs(r.changePct) + '% so với kỳ trước). ' +
    'Chi phí ước tính ' + formatNumber(r.totalKwh * PRICE) + ' ₫; phát thải ' + formatNumber(Math.round(r.totalKwh * CO2_PER_KWH)) + ' kg CO₂.</p>' +
    '<div class="form-group"><label class="form-label" for="note">Nhận xét của ban quản lý</label><textarea class="form-control" id="note" rows="3" ' + disabled + '>' + escapeHtml(r.note) + '</textarea><div class="form-error-msg"></div></div>' +
    '<div class="toolbar no-print">' + buttons + '</div>';
}
function refresh() {
  var reports = sortReports(loadData('reports'));
  renderStats(reports); renderList(reports); renderDetail();
}
function viewReport(id) { selectedId = id; refresh(); }
function toggleForm() { var f = document.getElementById('cf'); f.hidden = !f.hidden; }

function createReport(event) {   // Create: báo cáo tự tổng hợp từ dữ liệu mẫu
  event.preventDefault();
  clearErrors('cf');
  var value = document.getElementById('month').value, title = document.getElementById('title').value.trim();
  var reports = loadData('reports'), ok = true, month = '';
  if (value.length !== 7) { setError('month', 'Chọn tháng báo cáo'); ok = false; }
  else {
    month = value.slice(5, 7) + '/' + value.slice(0, 4);
    for (var i = 0; i < reports.length; i++) { if (reports[i].month === month) { setError('month', 'Tháng này đã có báo cáo'); ok = false; } }
  }
  if (title.length < 5) { setError('title', 'Tiêu đề tối thiểu 5 ký tự'); ok = false; }
  if (!ok) { return; }
  var factor = 0.94 + (Number(value.slice(5, 7)) % 6) * 0.02, total = Math.round(getMonthKwh() * factor / 100) * 100;
  var previous = null;   // báo cáo gần nhất trước tháng này
  for (var j = 0; j < reports.length; j++) {
    if (monthKey(reports[j].month) < monthKey(month) && (previous === null || monthKey(reports[j].month) > monthKey(previous.month))) { previous = reports[j]; }
  }
  var change = 0;
  if (previous !== null) { change = Math.round((total - previous.totalKwh) / previous.totalKwh * 1000) / 10; }
  var report = { id: Date.now(), month: month, title: title, author: 'Trần Văn Quản Lý', status: 'draft', totalKwh: total, changePct: change, note: 'Tổng hợp tự động từ dữ liệu mẫu: ' + formatNumber(total) + ' kWh.' };
  reports.push(report);
  saveData('reports', reports);
  selectedId = report.id;
  document.getElementById('cf').reset(); document.getElementById('cf').hidden = true;
  refresh(); showToast('Đã tạo báo cáo bản nháp');
}
function saveNote(approve) {   // Update: lưu nhận xét, có thể kèm ký duyệt
  var note = document.getElementById('note').value.trim(), group = document.getElementById('note').parentElement;
  group.classList.remove('has-error');
  if (note.length < 5) { group.classList.add('has-error'); group.querySelector('.form-error-msg').textContent = 'Nhận xét tối thiểu 5 ký tự'; return; }
  var reports = loadData('reports');
  for (var i = 0; i < reports.length; i++) {
    if (reports[i].id === selectedId) { reports[i].note = note; if (approve) { reports[i].status = 'approved'; } }
  }
  saveData('reports', reports);
  refresh();
  if (approve) { showToast('Đã ký duyệt báo cáo'); } else { showToast('Đã lưu nhận xét'); }
}
function archiveReport() {
  var reports = loadData('reports');
  for (var i = 0; i < reports.length; i++) { if (reports[i].id === selectedId) { reports[i].status = 'archived'; } }
  saveData('reports', reports);
  refresh(); showToast('Đã lưu trữ báo cáo', 'info');
}
function deleteReport(id) {   // Delete: chỉ xóa được bản nháp
  confirmBox('Xóa bản nháp báo cáo này?', function () {
    var reports = loadData('reports'), kept = [];
    for (var i = 0; i < reports.length; i++) { if (reports[i].id !== id) { kept.push(reports[i]); } }
    saveData('reports', kept);
    if (selectedId === id) { selectedId = null; }
    refresh(); showToast('Đã xóa báo cáo nháp', 'danger');
  });
}
function csvCell(text) { return '"' + String(text).split('"').join('""') + '"'; }
function exportCsv() {   // tạo file CSV và tải về
  var r = findReport(selectedId);
  var header = ['Tháng', 'Tiêu đề', 'Trạng thái', 'Tổng kWh', 'Chi phí (VND)', 'CO2 (kg)', 'Biến động (%)', 'Nhận xét'];
  var row = [r.month, r.title, STATUS[r.status].text, r.totalKwh, r.totalKwh * PRICE, Math.round(r.totalKwh * CO2_PER_KWH), r.changePct, r.note];
  var cells1 = [], cells2 = [];
  for (var i = 0; i < header.length; i++) { cells1.push(csvCell(header[i])); cells2.push(csvCell(row[i])); }
  var blob = new Blob(['\ufeff' + cells1.join(',') + '\n' + cells2.join(',')], { type: 'text/csv' });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'bao-cao-' + r.month.replace('/', '-') + '.csv';
  link.click();
  showToast('Đã xuất file CSV');
}
startPage(function () {
  document.getElementById('add').onclick = toggleForm;
  refresh();
});
