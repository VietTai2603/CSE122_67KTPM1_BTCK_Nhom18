/* DỮ LIỆU GIẢ LẬP bổ sung cho SV3 (nạp SAU data.js, TRƯỚC main.js). Mở rộng SEED, không sửa file của người khác. */
Object.assign(SEED, {
  sensors: [
    { id: 1, code: 'SEN-001', type: 'Nhiệt độ / độ ẩm', zone: 'Lobby Area', status: 'online', intervalSec: 5 },
    { id: 2, code: 'SEN-002', type: 'Điện năng', zone: 'Office Tower A', status: 'online', intervalSec: 5 },
    { id: 3, code: 'SEN-003', type: 'Điện năng', zone: 'Data Center', status: 'online', intervalSec: 5 },
    { id: 4, code: 'SEN-004', type: 'Nhiệt độ / độ ẩm', zone: 'Data Center', status: 'online', intervalSec: 10 },
    { id: 5, code: 'SEN-005', type: 'Điện năng', zone: 'Data Center', status: 'offline', intervalSec: 5 },
    { id: 6, code: 'SEN-006', type: 'Ánh sáng', zone: 'Lobby Area', status: 'online', intervalSec: 15 },
    { id: 7, code: 'SEN-007', type: 'Điện năng', zone: 'Chiller Plant', status: 'online', intervalSec: 5 },
    { id: 8, code: 'SEN-008', type: 'Nhiệt độ / độ ẩm', zone: 'Office Tower A', status: 'offline', intervalSec: 10 }
  ],
  users: [
    { id: 1, name: 'Nguyễn An', email: 'an@smartbuilding.vn', role: 'Occupant', zone: 'Office Tower A', status: 'active' },
    { id: 2, name: 'Nguyễn Văn Minh', email: 'minh@smartbuilding.vn', role: 'Operator', zone: 'Toàn tòa nhà', status: 'active' },
    { id: 3, name: 'Trần Văn Quản Lý', email: 'ql@smartbuilding.vn', role: 'Facility Manager', zone: 'Toàn tòa nhà', status: 'active' },
    { id: 4, name: 'Quản Trị Viên', email: 'admin@smartbuilding.vn', role: 'Admin', zone: 'Toàn tòa nhà', status: 'active' },
    { id: 5, name: 'Lê Thị Hoa', email: 'hoa@smartbuilding.vn', role: 'Occupant', zone: 'Lobby Area', status: 'active' },
    { id: 6, name: 'Võ Minh Khôi', email: 'khoi@smartbuilding.vn', role: 'Operator', zone: 'Chiller Plant', status: 'locked' }
  ],
  reports: [
    { id: 1, month: '05/2026', title: 'Báo cáo năng lượng tháng 05/2026', author: 'Trần Văn Quản Lý', status: 'archived', totalKwh: 471200, changePct: 2.1, note: 'Tiêu thụ tăng nhẹ do đợt nắng nóng đầu mùa.' },
    { id: 2, month: '06/2026', title: 'Báo cáo năng lượng tháng 06/2026', author: 'Trần Văn Quản Lý', status: 'approved', totalKwh: 462900, changePct: -1.8, note: 'Giảm nhờ tối ưu giờ chạy HVAC.' },
    { id: 3, month: '07/2026', title: 'Báo cáo năng lượng tháng 07/2026', author: 'Trần Văn Quản Lý', status: 'approved', totalKwh: 480400, changePct: 3.8, note: 'Tăng do thời tiết nắng nóng kéo dài.' },
    { id: 4, month: '08/2026', title: 'Báo cáo năng lượng tháng 08/2026', author: 'Trần Văn Quản Lý', status: 'approved', totalKwh: 458700, changePct: -4.5, note: 'Giảm 4,5% nhờ tối ưu hệ thống lạnh trung tâm ban đêm.' },
    { id: 5, month: '09/2026', title: 'Báo cáo năng lượng tháng 09/2026', author: 'Trần Văn Quản Lý', status: 'draft', totalKwh: 452300, changePct: -1.4, note: 'Đang chờ ban quản lý nhận xét.' }
  ],
  scenarios: [],
  kpi: {
    price: 2200, co2: 0.85, budget: 1050000000,
    actual: [455, 448, 462, 440, 471, 463, 480, 459, 452, 447, 441, 438],
    target: [470, 465, 460, 455, 450, 450, 455, 455, 450, 445, 440, 435]
  },
  // Hệ số "kỳ này / kỳ trước" theo khu vực: [so với tháng trước, so với cùng kỳ năm trước]
  prev: { 'Office Tower A': [1.04, 0.98], 'Lobby Area': [0.97, 1.03], 'Data Center': [1.12, 1.08], 'Chiller Plant': [0.99, 0.94] }
});
// Bổ sung trường cho zones (mã, diện tích, trạng thái) – các trang khác không bị ảnh hưởng
const ZX = { 'Office Tower A': ['Z-01', 20000], 'Lobby Area': ['Z-02', 4000], 'Data Center': ['Z-03', 1500], 'Chiller Plant': ['Z-04', 1000] };
SEED.zones.forEach(z => Object.assign(z, { code: ZX[z.name][0], areaM2: ZX[z.name][1], status: 'active' }));
