/* Comfort Feedback (C/R/U/D): gửi, xem, sửa, xóa phản ánh tiện nghi */
var currentFilter = 'all';

// Danh sách "vấn đề" thay đổi theo nhóm tiện nghi được chọn
var issueOptionsMap = {
  temperature: [
    { val: 'too_cold', text: 'Quá lạnh (Lãng phí điện điều hòa)' },
    { val: 'too_hot', text: 'Quá ngột ngạt / Quá nóng' },
    { val: 'wind_draft', text: 'Gió điều hòa phả thẳng vào người' }
  ],
  lighting: [
    { val: 'lights_on_bright_day', text: 'Bật đèn khi trời sáng rực' },
    { val: 'lights_broken', text: 'Bóng đèn nhấp nháy / hỏng' },
    { val: 'too_dim', text: 'Khu vực làm việc quá tối' }
  ],
  devices: [
    { val: 'standby_waste', text: 'Thiết bị bật không người dùng (Lãng phí)' },
    { val: 'loud_ventilation', text: 'Hệ thống hút mùi / quạt quá ồn' }
  ]
};

function updateIssueOptions() {
  var category = document.getElementById('selectCategory').value, list = issueOptionsMap[category], html = '';
  for (var i = 0; i < list.length; i++) { html += '<option value="' + list[i].val + '">' + list[i].text + '</option>'; }
  document.getElementById('selectIssue').innerHTML = html;
}

function setupFilterTabs() {
  var tabs = document.querySelectorAll('.nut-tab-loc');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function () {
      for (var j = 0; j < tabs.length; j++) { tabs[j].classList.remove('active'); }
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      renderFeedbackList();
    });
  }
}

function renderFeedbackList() {
  var all = getFeedbacks('all'), pending = 0, investigating = 0, resolved = 0;
  for (var i = 0; i < all.length; i++) {
    if (all[i].status === 'pending') { pending++; }
    if (all[i].status === 'investigating') { investigating++; }
    if (all[i].status === 'resolved') { resolved++; }
  }
  document.getElementById('countAll').textContent = all.length;
  document.getElementById('countPending').textContent = pending;
  document.getElementById('countInvestigating').textContent = investigating;
  document.getElementById('countResolved').textContent = resolved;

  var list = getFeedbacks(currentFilter), table = document.getElementById('feedbackTable'), emptyState = document.getElementById('emptyState');
  if (list.length === 0) {
    document.getElementById('feedbackTableBody').innerHTML = '';
    table.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  table.style.display = 'table';
  emptyState.style.display = 'none';

  var html = '';
  for (var k = 0; k < list.length; k++) {
    var item = list[k], statusBadge = '', priorityLabel = '', note = '';
    if (item.status === 'pending') { statusBadge = '<span class="badge badge-pending">Chờ tiếp nhận</span>'; }
    else if (item.status === 'investigating') { statusBadge = '<span class="badge badge-investigating">Đang xử lý</span>'; }
    else { statusBadge = '<span class="badge badge-resolved">Đã giải quyết</span>'; }
    if (item.priority === 'high') { priorityLabel = '<span class="badge badge-priority-high">Cao</span>'; }
    else if (item.priority === 'medium') { priorityLabel = 'Trung bình'; }
    else { priorityLabel = 'Thấp'; }
    if (item.adminNote) { note = '<div class="ghi-chu-quan-ly">↳ BQL: ' + escapeHtml(item.adminNote) + '</div>'; }

    html += '<tr><td><strong>' + escapeHtml(item.room) + '</strong></td>' +
      '<td><span class="ten-danh-muc">' + escapeHtml(item.categoryLabel) + '</span></td>' +
      '<td><div class="tieu-de-o">' + escapeHtml(item.issueLabel) + '</div><div class="mo-ta-o">' + escapeHtml(item.description) + '</div>' + note + '</td>' +
      '<td>' + priorityLabel + '</td><td>' + statusBadge + '</td><td class="ngay-gui">' + escapeHtml(item.createdAt) + '</td>' +
      '<td class="nut-thao-tac"><button class="btn btn-secondary btn-sm" onclick="openEditFeedbackModal(\'' + item.id + '\')">Sửa</button> ' +
      '<button class="btn btn-danger btn-sm" onclick="promptDeleteFeedback(\'' + item.id + '\')">Xóa</button></td></tr>';
  }
  document.getElementById('feedbackTableBody').innerHTML = html;
}

// ----- CREATE -----
function openCreateFeedbackModal() {
  document.getElementById('createFeedbackForm').reset();
  updateIssueOptions();
  openModal('createModal');
}
function handleCreateFeedback(event) {
  event.preventDefault();
  var categorySelect = document.getElementById('selectCategory'), issueSelect = document.getElementById('selectIssue');
  var description = document.getElementById('inputDescription').value.trim();
  if (description.length < 10) {
    document.getElementById('grpDescription').classList.add('has-error');
    return;
  }
  document.getElementById('grpDescription').classList.remove('has-error');
  createFeedback({
    room: document.getElementById('inputRoom').value.trim(),
    category: categorySelect.value,
    categoryLabel: categorySelect.options[categorySelect.selectedIndex].text,
    issueType: issueSelect.value,
    issueLabel: issueSelect.options[issueSelect.selectedIndex].text,
    priority: document.getElementById('selectPriority').value,
    description: description
  });
  closeModal('createModal');
  renderFeedbackList();
  updateTopBarUserInfo();
  showToast('Gửi phản ánh thành công! Bạn nhận được +10 Điểm Xanh.', 'success');
}

// ----- UPDATE -----
function openEditFeedbackModal(id) {
  var item = getFeedbackById(id);
  if (!item) { return; }
  document.getElementById('editId').value = item.id;
  document.getElementById('editRoom').value = item.room;
  document.getElementById('editPriority').value = item.priority;
  document.getElementById('editDescription').value = item.description;
  openModal('editModal');
}
function handleUpdateFeedback(event) {
  event.preventDefault();
  var description = document.getElementById('editDescription').value.trim();
  if (description.length < 10) {
    document.getElementById('grpEditDesc').classList.add('has-error');
    return;
  }
  document.getElementById('grpEditDesc').classList.remove('has-error');
  updateFeedback(document.getElementById('editId').value, {
    room: document.getElementById('editRoom').value.trim(),
    priority: document.getElementById('editPriority').value,
    description: description
  });
  closeModal('editModal');
  renderFeedbackList();
  showToast('Cập nhật phản ánh thành công!', 'success');
}

// ----- DELETE (có hộp thoại xác nhận) -----
function promptDeleteFeedback(id) {
  document.getElementById('deleteTargetId').value = id;
  openModal('deleteConfirmModal');
}
function confirmDeleteFeedback() {
  var id = document.getElementById('deleteTargetId').value;
  if (id) {
    deleteFeedback(id);
    closeModal('deleteConfirmModal');
    renderFeedbackList();
    showToast('Đã xóa phản ánh thành công.', 'danger');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  updateIssueOptions();
  setupFilterTabs();
  renderFeedbackList();
});


