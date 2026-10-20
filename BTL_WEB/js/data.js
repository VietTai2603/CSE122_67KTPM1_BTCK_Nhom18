/**
 * DATA LAYER & LOCALSTORAGE MANAGEMENT
 * Hệ thống dữ liệu giả lập & điều phối trạng thái BTL-36
 * Vai trò: SV1 - Người sử dụng tòa nhà (Occupant)
 */

const STORAGE_KEY = 'sb_occupant_store';

// Dữ liệu mẫu khởi tạo ban đầu
const DEFAULT_STORE = {
  currentUser: {
    id: 'user_sv1',
    name: 'Nguyễn Văn An',
    email: 'an.nguyen@smartbuilding.io',
    role: 'occupant',
    roleLabel: 'Người sử dụng tòa nhà',
    room: 'Phòng 402 - Khu vực Đông',
    zoneId: 'zone_4',
    floor: 'Tầng 4',
    building: 'GreenTech Innovation Tower',
    points: 420,
    ecoLevel: 'Chiến binh Xanh (Cấp 3)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  energyStats: {
    todayKwh: 14.8,
    yesterdayKwh: 17.5,
    savingPercentage: 15.4, // Giảm 15.4% so với hôm qua
    monthlyTargetKwh: 350,
    monthlyCurrentKwh: 182,
    todayCostVnd: 44400, // 3000 VNĐ / kWh
    hourlyUsage: [
      { hour: '07:00', kwh: 0.6, baseline: 0.8 },
      { hour: '08:00', kwh: 1.4, baseline: 1.6 },
      { hour: '09:00', kwh: 2.2, baseline: 2.5 },
      { hour: '10:00', kwh: 2.8, baseline: 2.9 },
      { hour: '11:00', kwh: 2.5, baseline: 2.7 },
      { hour: '12:00', kwh: 1.1, baseline: 2.0 }, // Giờ trưa tiết kiệm
      { hour: '13:00', kwh: 1.9, baseline: 2.2 },
      { hour: '14:00', kwh: 2.4, baseline: 2.5 },
      { hour: '15:00', kwh: 2.7, baseline: 2.6 }, // Chớm vượt đỉnh
      { hour: '16:00', kwh: 2.1, baseline: 2.4 },
      { hour: '17:00', kwh: 1.2, baseline: 1.8 }
    ],
    roomSensors: {
      temperature: 25.4, // độ C
      humidity: 58, // %
      lux: 480, // Ánh sáng
      co2: 650 // ppm
    }
  },
  aiSuggestions: [
    {
      id: 'ai_sugg_01',
      title: 'Tăng nhiệt độ điều hòa lên 26°C',
      description: 'Cảm biến phòng 402 ghi nhận nhiệt độ hiện tại là 24°C, bên ngoài 28°C. Tăng lên 26°C giúp tiết kiệm ngay 9% điện mà vẫn duy trì tiện nghi.',
      potentialSavings: '1.3 kWh/ngày (~4.000 VNĐ)',
      impact: 'Cao',
      applied: false
    },
    {
      id: 'ai_sugg_02',
      title: 'Tận dụng ánh sáng tự nhiên',
      description: 'Khu vực cửa sổ phòng 402 hiện đạt 480 lux ánh sáng tự nhiên. Bạn có thể tắt bớt 2 hàng đèn trần dãy ngoài.',
      potentialSavings: '0.8 kWh/ngày',
      impact: 'Trung bình',
      applied: true
    }
  ],
  feedbacks: [
    {
      id: 'fb_101',
      room: 'Phòng 402 - Khu vực Đông',
      category: 'temperature',
      categoryLabel: 'Nhiệt độ / Điều hòa',
      issueType: 'too_cold',
      issueLabel: 'Quá lạnh (Lãng phí điện)',
      priority: 'high',
      description: 'Điều hòa thổi trực tiếp vào khu bàn làm việc số 3 và 4, nhiệt độ cảm nhận khoảng 22 độ C rất buốt, đề nghị tăng lên 25-26 độ.',
      status: 'investigating', // 'pending' | 'investigating' | 'resolved' | 'cancelled'
      createdAt: '2026-10-12 09:15',
      updatedAt: '2026-10-12 10:30',
      adminNote: 'Kỹ thuật viên đã nhận tin và đang điều chỉnh van gió trung tâm VAV Tầng 4.'
    },
    {
      id: 'fb_102',
      room: 'Hành lang Tầng 4',
      category: 'lighting',
      categoryLabel: 'Chiếu sáng',
      issueType: 'lights_on_bright_day',
      issueLabel: 'Bật đèn khi trời sáng rực',
      priority: 'medium',
      description: 'Dãy đèn hành lang kính mở 100% công suất dù trời nắng to, nên cài đặt cảm biến quang tự tắt.',
      status: 'pending',
      createdAt: '2026-10-11 14:20',
      updatedAt: '2026-10-11 14:20',
      adminNote: ''
    },
    {
      id: 'fb_103',
      room: 'Phòng họp 401',
      category: 'devices',
      categoryLabel: 'Thiết bị & Thông gió',
      issueType: 'standby_waste',
      issueLabel: 'Quên tắt máy chiếu sau họp',
      priority: 'low',
      description: 'Máy chiếu và màn hình phụ bật suốt từ trưa không ai dùng, em đã tắt giúp và kiến nghị bổ sung chế độ Auto-off.',
      status: 'resolved',
      createdAt: '2026-10-09 13:40',
      updatedAt: '2026-10-09 15:10',
      adminNote: 'Đã khen thưởng 30 điểm xanh vì tinh thần chủ động tắt thiết bị.'
    }
  ],
  challenges: [
    {
      id: 'ch_01',
      title: 'Chiến dịch Eco 26°C',
      description: 'Duy trì điều hòa phòng làm việc từ 25.5°C đến 26°C trong suốt 5 ngày làm việc liên tiếp.',
      category: 'Điều hòa',
      rewardPoints: 100,
      badge: '🧊 Vua Eco',
      duration: '5 ngày',
      progress: 60, // 3/5 ngày
      target: 5,
      current: 3,
      status: 'in-progress', // 'available' | 'in-progress' | 'completed'
      deadline: '16/10/2026',
      participantsCount: 48
    },
    {
      id: 'ch_02',
      title: 'Tắt màn hình giờ nghỉ trưa',
      description: 'Tắt màn hình phụ và chuyển máy tính về chế độ Sleep khi rời bàn nghỉ trưa từ 12h00 đến 13h00.',
      category: 'Thiết bị',
      rewardPoints: 50,
      badge: '🌙 Ngủ Trưa Xanh',
      duration: '3 ngày',
      progress: 100,
      target: 3,
      current: 3,
      status: 'completed',
      deadline: '12/10/2026',
      participantsCount: 125
    },
    {
      id: 'ch_03',
      title: 'Tắt sớm trước 15 phút',
      description: 'Tắt điều hòa và các thiết bị sạc cá nhân trước khi tan sở 15 phút, tận dụng hơi lạnh còn lưu lại.',
      category: 'Thói quen',
      rewardPoints: 80,
      badge: '⏰ Tắt Sớm 15P',
      duration: '4 ngày',
      progress: 0,
      target: 4,
      current: 0,
      status: 'available',
      deadline: '20/10/2026',
      participantsCount: 32
    },
    {
      id: 'ch_04',
      title: 'Không gian Ánh sáng Tự nhiên',
      description: 'Kéo rèm và tắt ít nhất 50% bóng đèn phòng trong các khung giờ nắng đẹp (9h00 - 11h00).',
      category: 'Chiếu sáng',
      rewardPoints: 70,
      badge: '☀️ Nắng Ban Mai',
      duration: '3 ngày',
      progress: 0,
      target: 3,
      current: 0,
      status: 'available',
      deadline: '18/10/2026',
      participantsCount: 19
    }
  ]
};

// Khởi tạo LocalStorage nếu chưa có
function initStorage() {
  const current = localStorage.getItem(STORAGE_KEY);
  if (!current) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STORE));
  }
}

// Lấy toàn bộ dữ liệu store
function getStore() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_STORE;
  } catch (e) {
    console.error('Lỗi phân tích JSON từ LocalStorage:', e);
    return DEFAULT_STORE;
  }
}

// Lưu dữ liệu store
function saveStore(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Lỗi lưu vào LocalStorage:', e);
    return false;
  }
}

// Khôi phục dữ liệu gốc mẫu
function resetStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STORE));
  return DEFAULT_STORE;
}

// ==========================================
// CÁC HÀM CRUD FEEDBACK (COMFORT FEEDBACK)
// ==========================================
function getFeedbacks(filterStatus = 'all') {
  const store = getStore();
  let list = store.feedbacks || [];
  if (filterStatus !== 'all') {
    list = list.filter(item => item.status === filterStatus);
  }
  return list;
}

function getFeedbackById(id) {
  const store = getStore();
  return store.feedbacks.find(item => item.id === id);
}

function createFeedback(feedbackData) {
  const store = getStore();
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

  const newFeedback = {
    id: 'fb_' + Date.now(),
    room: feedbackData.room || store.currentUser.room,
    category: feedbackData.category,
    categoryLabel: feedbackData.categoryLabel || 'Tiện nghi',
    issueType: feedbackData.issueType,
    issueLabel: feedbackData.issueLabel || 'Phản ánh chung',
    priority: feedbackData.priority || 'medium',
    description: feedbackData.description,
    status: 'pending',
    createdAt: dateStr,
    updatedAt: dateStr,
    adminNote: ''
  };

  store.feedbacks.unshift(newFeedback);
  // Thưởng 10 điểm xanh cho người dùng khi đóng góp phản hồi
  store.currentUser.points += 10;
  saveStore(store);
  return newFeedback;
}

function updateFeedback(id, updateData) {
  const store = getStore();
  const index = store.feedbacks.findIndex(item => item.id === id);
  if (index === -1) return null;

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

  store.feedbacks[index] = {
    ...store.feedbacks[index],
    ...updateData,
    updatedAt: dateStr
  };

  saveStore(store);
  return store.feedbacks[index];
}

function deleteFeedback(id) {
  const store = getStore();
  const initialLen = store.feedbacks.length;
  store.feedbacks = store.feedbacks.filter(item => item.id !== id);
  saveStore(store);
  return store.feedbacks.length < initialLen;
}

// ==========================================
// CÁC HÀM CRUD THỬ THÁCH (ENERGY CHALLENGES)
// ==========================================
function getChallenges(statusFilter = 'all') {
  const store = getStore();
  let list = store.challenges || [];
  if (statusFilter !== 'all') {
    list = list.filter(ch => ch.status === statusFilter);
  }
  return list;
}

function joinChallenge(challengeId) {
  const store = getStore();
  const ch = store.challenges.find(c => c.id === challengeId);
  if (!ch) return false;

  ch.status = 'in-progress';
  ch.progress = 10;
  ch.current = 1;
  ch.participantsCount += 1;
  saveStore(store);
  return ch;
}

function updateChallengeProgress(challengeId, stepIncrement = 1) {
  const store = getStore();
  const ch = store.challenges.find(c => c.id === challengeId);
  if (!ch || ch.status !== 'in-progress') return null;

  ch.current = Math.min(ch.target, ch.current + stepIncrement);
  ch.progress = Math.round((ch.current / ch.target) * 100);

  if (ch.progress >= 100) {
    ch.status = 'completed';
    store.currentUser.points += ch.rewardPoints;
  }

  saveStore(store);
  return ch;
}

// Khởi chạy khởi tạo ngay khi tải script
initStorage();
