/* Zone Live Control: bật/tắt thiết bị và xem lịch sử can thiệp */
buildLayout('operator-zone-control.html', 'Bảng điều khiển nhanh thiết bị', 'Zone Live Control');
var RESULT = { success: { text: 'Thành công', cls: 'badge-resolved' }, running: { text: 'Thực hiện', cls: 'badge-pending' }, auto: { text: 'Tự động', cls: 'badge-investigating' } };

function deviceHtml(d) {
  var checked = d.on ? 'checked' : '';
  return '<div class="device"><div><strong>' + escapeHtml(d.name) + '</strong><div class="stat-label">' + escapeHtml(d.detail) + '</div></div>' +
    '<label class="switch"><input type="checkbox" ' + checked + ' onchange="toggleDevice(' + d.id + ', this)" aria-label="Bật/tắt ' + escapeHtml(d.name) + '"><span></span></label></div>';
}
function render() {
  var devices = loadData('devices'), log = loadData('control_log'), lights = '', hvac = '', logHtml = '', off = 0;
  for (var i = 0; i < devices.length; i++) {
    if (!devices[i].on) { off++; }
    if (devices[i].group === 'lighting') { lights += deviceHtml(devices[i]); } else { hvac += deviceHtml(devices[i]); }
  }
  for (var j = 0; j < log.length; j++) {
    logHtml += '<li><time>' + log[j].time + '</time><div><strong>' + escapeHtml(log[j].title) + '</strong><div class="stat-label">' + escapeHtml(log[j].desc) + '</div></div>' +
      '<span class="badge ' + RESULT[log[j].result].cls + '">' + RESULT[log[j].result].text + '</span></li>';
  }
  document.getElementById('lights').innerHTML = lights;
  document.getElementById('hvac').innerHTML = hvac;
  document.getElementById('log').innerHTML = logHtml;
  if (off > 0) { document.getElementById('sys').innerHTML = '<span class="badge badge-pending">' + off + ' thiết bị đang tắt</span>'; }
  else { document.getElementById('sys').innerHTML = '<span class="badge badge-resolved">Đang hoạt động</span>'; }
}
function addLog(title, desc) {   // ghi lịch sử, chỉ giữ 8 dòng mới nhất
  var log = loadData('control_log');
  log.unshift({ time: getTimeNow(), title: title, desc: desc, result: 'success' });
  saveData('control_log', log.slice(0, 8));
}
function toggleDevice(id, checkbox) {
  var devices = loadData('devices'), name = '';
  for (var i = 0; i < devices.length; i++) {
    if (devices[i].id === id) { devices[i].on = checkbox.checked; name = devices[i].name; }
  }
  saveData('devices', devices);
  addLog(name, checkbox.checked ? 'Bật thiết bị' : 'Tắt thiết bị');
  render();
  showToast((checkbox.checked ? 'Đã bật ' : 'Đã tắt ') + name);
}
function syncAll(button) {   // mô phỏng đồng bộ mất 1,2 giây
  button.disabled = true;
  button.textContent = 'Đang đồng bộ…';
  setTimeout(function () {
    addLog('Đồng bộ tất cả thiết bị', 'Hoàn tất');
    button.disabled = false;
    button.textContent = 'Đồng bộ tất cả thiết bị';
    render();
    showToast('Đã đồng bộ tất cả thiết bị');
  }, 1200);
}
startPage(function () {
  render();
  document.getElementById('sync').onclick = function () { syncAll(this); };
});
