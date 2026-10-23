// Dữ liệu mẫu theo ngày, dùng để luyện cách vẽ biểu đồ bằng JavaScript cơ bản.
var weekUsage = [12.4, 14.1, 13.2, 16.0, 11.8, 15.3, 14.8];
var monthUsage = [13.2, 14.1, 12.8, 15.4, 13.7, 11.9, 14.8, 16.1, 13.5, 14.4, 12.6, 15.2, 13.1, 14.6, 16.3, 12.2, 13.8, 14.9, 11.7, 15.5, 14.0, 13.4, 16.0, 12.9, 14.3, 15.1, 13.6, 12.5, 15.7, 14.8];

function renderEnergyHistory() {
  var values = document.getElementById('periodSelect').value === 'month' ? monthUsage : weekUsage;
  var max = 0, total = 0, html = '';
  for (var i = 0; i < values.length; i++) {
    total += values[i];
    if (values[i] > max) { max = values[i]; }
  }
  for (var j = 0; j < values.length; j++) {
    var height = Math.round(values[j] / max * 100);
    var label = values.length === 7 ? 'Ngày ' + (j + 1) : (j + 1) + '';
    html += '<div class="cot-lich-su"><div class="gia-tri-cot">' + values[j].toFixed(1) + '</div>' +
      '<div class="khung-cot-lich-su"><div class="muc-cot-lich-su" style="height:' + height + '%" title="' + values[j] + ' kWh"></div></div>' +
      '<div class="nhan-cot-lich-su">' + label + '</div></div>';
  }
  var average = total / values.length;
  document.getElementById('historyChart').innerHTML = html;
  document.getElementById('totalUsage').textContent = total.toFixed(1) + ' kWh';
  document.getElementById('averageUsage').textContent = average.toFixed(1) + ' kWh';
  document.getElementById('usageCompare').textContent = average <= 15 ? 'Dưới định mức' : 'Trên định mức';
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('periodSelect').addEventListener('change', renderEnergyHistory);
  renderEnergyHistory();
});
