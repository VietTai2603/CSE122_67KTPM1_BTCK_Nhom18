/* DỮ LIỆU GIẢ LẬP (mock). Lần đầu nạp vào localStorage (key sb_<tên>), sau đó ưu tiên dữ liệu trong trình duyệt. */
var SEED = {
  zones: [
    { id: 1, name: 'Office Tower A', floor: '1-10', type: 'HVAC', ratedKw: 1200, loadKw: 987, baselineKw: 900 },
    { id: 2, name: 'Lobby Area', floor: '1', type: 'Chiếu sáng', ratedKw: 800, loadKw: 542, baselineKw: 500 },
    { id: 3, name: 'Data Center', floor: 'B1', type: 'Ổ cắm', ratedKw: 2000, loadKw: 1489, baselineKw: 1050 },
    { id: 4, name: 'Chiller Plant', floor: 'R', type: 'HVAC', ratedKw: 2200, loadKw: 1632, baselineKw: 1500 }
  ],
  load24: [260,280,300,440,460,500,520,700,760,850,950,920,940,950,960,900,800,700,600,560,560,500,460,420,340],
  alerts: [
    { id: 'AL-2026-001', zone: 'Data Center', issue: 'Nhiệt độ cao', level: 'critical', status: 'new', time: '14:20' },
    { id: 'AL-2026-002', zone: 'Office Tower A', issue: 'Vượt 120% định mức giờ cao điểm', level: 'warning', status: 'investigating', time: '13:05' },
    { id: 'AL-2026-003', zone: 'Chiller Plant', issue: 'Dao động áp suất bất thường', level: 'critical', status: 'investigating', time: '11:40' },
    { id: 'AL-2026-004', zone: 'Lobby Area', issue: 'Đèn bật ngoài giờ', level: 'warning', status: 'new', time: '09:15' },
    { id: 'AL-2026-005', zone: 'Data Center', issue: 'Cảm biến mất kết nối', level: 'warning', status: 'resolved', time: '08:30' },
    { id: 'AL-2026-006', zone: 'Office Tower A', issue: 'Điều hòa chạy qua đêm', level: 'critical', status: 'new', time: '06:10' },
    { id: 'AL-2026-007', zone: 'Lobby Area', issue: 'Tải tăng đột biến', level: 'warning', status: 'resolved', time: '05:45' }
  ],
  operator_actions: [
    { id: 1, name: 'Giảm điện phòng điều hòa khi không làm việc', zone: 'Office Tower A', savingKwh: 150, progress: 65, status: 'active' },
    { id: 2, name: 'Tăng nhiệt độ điều hòa lên 26°C', zone: 'Chiller Plant', savingKwh: 200, progress: 30, status: 'active' },
    { id: 3, name: 'Giảm độ sáng đèn khu vực vận hành', zone: 'Data Center', savingKwh: 120, progress: 10, status: 'active' },
    { id: 4, name: 'Tắt 50% đèn hành lang sau 18h', zone: 'Lobby Area', savingKwh: 80, progress: 0, status: 'scheduled' },
    { id: 5, name: 'Chạy luân phiên chiller ban đêm', zone: 'Chiller Plant', savingKwh: 90, progress: 0, status: 'scheduled' }
  ],
  devices: [
    { id: 1, group: 'lighting', name: 'Hệ thống chiếu sáng', detail: 'Toàn tòa nhà', on: true },
    { id: 2, group: 'lighting', name: 'Chiếu sáng hành lang Tầng 2', detail: 'Độ sáng 80%', on: true },
    { id: 3, group: 'hvac', name: 'HVAC Tòa nhà A', detail: 'Đang ở 24°C', on: true },
    { id: 4, group: 'hvac', name: 'HVAC Tòa nhà C', detail: 'Đang đặt 26°C', on: true }
  ],
  control_log: [
    { time: '14:30', title: 'HVAC Tòa nhà A', desc: 'Điều chỉnh nhiệt độ về 24°C', result: 'success' },
    { time: '13:15', title: 'Chiếu sáng hành lang Tầng 2', desc: 'Giảm độ sáng 20%', result: 'running' },
    { time: '11:05', title: 'Hệ thống chiếu sáng', desc: 'Bật toàn bộ hệ thống', result: 'auto' },
    { time: '09:40', title: 'HVAC Tòa nhà C', desc: 'Điều chỉnh nhiệt độ về 26°C', result: 'success' }
  ]
};

/* ===== DỮ LIỆU SV1 – Occupant (key localStorage: sb_occupant_*) ===== */
var occupantData = {
  occupant_user: { name: 'Nguyễn Văn An', room: 'Phòng 402 - Khu Đông', points: 420 },
  occupant_stats: {
    roomTemp: 25.4,
    // 12 mốc giờ; tổng = 14,8 kWh. kwh lớn hơn baseline thì cột màu đỏ (spike)
    hourlyUsage: [
      { hour: '07h', kwh: 0.5, baseline: 0.5 }, { hour: '08h', kwh: 1.0, baseline: 1.0 }, { hour: '09h', kwh: 1.4, baseline: 1.4 },
      { hour: '10h', kwh: 1.6, baseline: 1.5 }, { hour: '11h', kwh: 1.5, baseline: 1.5 }, { hour: '12h', kwh: 1.0, baseline: 1.1 },
      { hour: '13h', kwh: 1.2, baseline: 1.2 }, { hour: '14h', kwh: 1.7, baseline: 1.4 }, { hour: '15h', kwh: 1.8, baseline: 1.5 },
      { hour: '16h', kwh: 1.5, baseline: 1.5 }, { hour: '17h', kwh: 1.0, baseline: 1.1 }, { hour: '18h', kwh: 0.6, baseline: 0.6 }
    ]
  },
  occupant_ai: [
    { id: 'ai1', title: 'Đặt điều hòa ở 26°C', description: 'Nhiệt độ phòng đang thấp hơn mức tối ưu vào buổi chiều, nâng thêm 1–2°C để giảm tải HVAC.', potentialSavings: '≈ 1,2 kWh/ngày', applied: false },
    { id: 'ai2', title: 'Tắt màn hình khi rời bàn', description: 'Phát hiện tải thiết bị văn phòng vẫn cao trong khung 12:00–13:30.', potentialSavings: '≈ 0,5 kWh/ngày', applied: false },
    { id: 'ai3', title: 'Ngắt thiết bị chờ sau 18h', description: 'Các thiết bị standby vẫn tiêu thụ điện sau giờ làm việc.', potentialSavings: '≈ 0,8 kWh/ngày', applied: true }
  ],
  occupant_challenges: [
    { id: 'ch1', title: 'Tắt máy tính khi nghỉ trưa', category: 'Thiết bị', badge: '🖥️ Ngủ Trưa Xanh', description: 'Tắt hẳn máy tính và màn hình trong giờ nghỉ trưa để cắt tải chờ.', rewardPoints: 50, target: 5, current: 4, progress: 80, participantsCount: 28, deadline: '31/10/2026', status: 'in-progress' },
    { id: 'ch2', title: 'Giảm sử dụng thang máy', category: 'Di chuyển', badge: '🛗 Đi Bộ Xanh', description: 'Đi cầu thang bộ thay vì thang máy khi di chuyển dưới 3 tầng.', rewardPoints: 30, target: 5, current: 0, progress: 0, participantsCount: 15, deadline: '31/10/2026', status: 'available' },
    { id: 'ch3', title: 'Tắt đèn khi rời phòng', category: 'Chiếu sáng', badge: '💡 Vua Eco', description: 'Luôn tắt đèn khi là người cuối cùng rời khỏi phòng.', rewardPoints: 70, target: 7, current: 6, progress: 86, participantsCount: 41, deadline: '07/11/2026', status: 'in-progress' },
    { id: 'ch4', title: 'Sử dụng điều hòa hợp lý', category: 'Điều hòa', badge: '❄️ Chế Độ Eco 26°C', description: 'Giữ điều hòa ở 26°C và tắt trước khi ra về 15 phút.', rewardPoints: 100, target: 10, current: 6, progress: 60, participantsCount: 52, deadline: '15/11/2026', status: 'in-progress' },
    { id: 'ch5', title: 'Tiết kiệm nước tại văn phòng', category: 'Tài nguyên', badge: '💧 Giọt Nước Xanh', description: 'Khóa vòi nước sau khi sử dụng và báo ngay khi phát hiện rò rỉ.', rewardPoints: 40, target: 5, current: 0, progress: 0, participantsCount: 9, deadline: '30/11/2026', status: 'available' },
    { id: 'ch6', title: 'Mang bình nước cá nhân', category: 'Môi trường', badge: '🍶 Không Rác Nhựa', description: 'Dùng bình nước cá nhân thay chai nhựa dùng một lần.', rewardPoints: 50, target: 5, current: 5, progress: 100, participantsCount: 33, deadline: '30/09/2026', status: 'completed' }
  ],
  occupant_feedbacks: [
    { id: 'fb1', room: 'Phòng 402', category: 'temperature', categoryLabel: 'Nhiệt độ', issueType: 'too_cold', issueLabel: 'Quá lạnh (Lãng phí điện điều hòa)', priority: 'high', description: 'Buổi chiều điều hòa chạy quá lạnh, cả phòng phải mặc thêm áo khoác.', status: 'investigating', adminNote: 'Đội vận hành đang chỉnh nhiệt độ về 26°C.', createdAt: '15/10/2026 10:30' },
    { id: 'fb2', room: 'Khu làm việc mở Tầng 4', category: 'lighting', categoryLabel: 'Chiếu sáng', issueType: 'lights_on_bright_day', issueLabel: 'Bật đèn khi trời sáng rực', priority: 'medium', description: 'Dãy đèn sát cửa sổ vẫn bật dù trời nắng, có thể tắt bớt.', status: 'pending', adminNote: '', createdAt: '14/10/2026 15:20' },
    { id: 'fb3', room: 'Phòng họp B', category: 'devices', categoryLabel: 'Thiết bị', issueType: 'standby_waste', issueLabel: 'Thiết bị bật không người dùng (Lãng phí)', priority: 'low', description: 'Máy chiếu và màn hình họp vẫn bật suốt đêm.', status: 'resolved', adminNote: 'Đã cài hẹn giờ tắt tự động 19:00.', createdAt: '12/10/2026 09:15' }
  ],
  occupant_rewards: [
    { id: 'rw1', name: 'Voucher cà phê', description: 'Giảm giá một đồ uống tại quầy cà phê tầng 1.', points: 100, icon: '☕' },
    { id: 'rw2', name: 'Bình nước thân thiện môi trường', description: 'Bình nước cá nhân dùng nhiều lần.', points: 250, icon: '🥤' },
    { id: 'rw3', name: 'Voucher nhà ăn', description: 'Giảm 30.000đ cho hóa đơn tại nhà ăn.', points: 300, icon: '🍱' }
  ],
  occupant_reward_history: []
};
for (var key in occupantData) {   // gộp dữ liệu SV1 vào SEED
  SEED[key] = occupantData[key];
}
