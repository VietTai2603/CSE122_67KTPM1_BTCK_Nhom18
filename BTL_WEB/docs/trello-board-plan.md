# KẾ HOẠCH BẢNG CÔNG VIỆC TRELLO (TRELLO BOARD PLAN)

**Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
**Đề tài (BTL-36):** SmartBuilding – Bảng điều khiển năng lượng và điều phối tiết kiệm  
**Nhóm thực hiện:** Nhóm 18  
**Tên bảng Trello:** `CSE122-BTL36-Team18-SmartBuilding`

---

## 1. Cấu trúc các cột quy chuẩn trên Trello (5 Cột)

```text
┌────────────────┐   ┌────────────┐   ┌───────────────┐   ┌─────────────────┐   ┌────────────────┐
│   TỒN ĐỌNG     │ ➔ │  CẦN LÀM   │ ➔ │   ĐANG LÀM    │ ➔ │    CHỜ DUYỆT    │ ➔ │   HOÀN THÀNH   │
│   (Backlog)    │   │  (To Do)   │   │ (In Progress) │   │ (Review/PR/OBS) │   │     (Done)     │
└────────────────┘   └────────────┘   └───────────────┘   └─────────────────┘   └────────────────┘
```

### Quy tắc nhãn màu (Labels) trên Trello:

- 🟢 **Role: SV1 - Occupant** (Phùng Viết Tài)
- 🔵 **Role: SV2 - Operator** (Lê Quang Tiến)
- 🟣 **Role: SV3 - Manager & Admin** (Lê Đức Quang)
- 🟡 **Common / Portal** (Dùng chung cả nhóm)
- 🤖 **AI Feature** (Tính năng AI)
- 🎥 **OBS Evidence** (Minh chứng video)

---

## 2. Quy chuẩn nội dung của một Thẻ công việc (Card Template)

Khi tạo mỗi card trên Trello, thành viên bắt buộc phải điền theo mẫu sau:

```markdown
### [MÃ_TASK] - Tên công việc

- **Người thực hiện:** [Phùng Viết Tài / Lê Quang Tiến / Lê Đức Quang]
- **Màn hình / Tệp:** `html/[ten-tep].html` | `css/[...].css` | `javascript/[...].js`
- **Nhánh Git:** `feature/[ten-nhanh]`
- **Hạn hoàn thành:** [Ngày/Tháng/Năm]
- **Mô tả chi tiết:**
  - Mục tiêu công việc
  - Các trạng thái cần có (Normal, Loading, Empty, Alert/Error)
- **Danh sách kiểm tra hoàn thành (Checklist - Definition of Done):**
  - [ ] Thiết kế wireframe / layout
  - [ ] Viết HTML5 Semantic
  - [ ] Viết CSS và Responsive (Mobile / Tablet / Desktop)
  - [ ] Viết JavaScript xử lý sự kiện DOM & validate form
  - [ ] Tích hợp LocalStorage / mock data
  - [ ] Kiểm tra không có lỗi console F12
  - [ ] Commit chuẩn Conventional Commits
  - [ ] Tạo Pull Request trên GitHub và được thành viên khác review
  - [ ] Quay video OBS minh chứng (3-5 phút)
- **Liên kết minh chứng:**
  - PR GitHub: `https://github.com/.../pull/...`
  - Commit ID: `[abc1234]`
  - Video OBS: `videos/SV[X]-0[Y]-[screen-name].mp4`
```

---

## 3. Danh mục chi tiết các Task trên Trello của Nhóm 18

### PHẦN I: KHỞI TẠO NỀN TẢNG & GIAO DIỆN DÙNG CHUNG (CẢ NHÓM)

|   Mã Task   | Tên công việc                                                               |    Người thực hiện    | Tệp / Màn hình liên quan                   | Nhánh Git gợi ý              |
| :---------: | :-------------------------------------------------------------------------- | :-------------------: | :----------------------------------------- | :--------------------------- |
| **TASK-01** | Khởi tạo tài liệu dự án, bảng kiểm kê màn hình & đặc tả vai trò             | Phùng Viết Tài (Lead) | `docs/*.md`                                | `docs/init-documentation`    |
| **TASK-02** | Xây dựng bộ Design System (CSS Variables, màu sắc Dark Emerald, Typography) |     Lê Đức Quang      | `css/style.css`, `css/responsive.css`      | `feature/design-system-core` |
| **TASK-03** | Khởi tạo mô hình dữ liệu IoT Mock Engine & tiện ích LocalStorage            |     Lê Quang Tiến     | `javascript/data.js`, `javascript/main.js` | `feature/mock-data-engine`   |
| **TASK-04** | Hoàn thiện trang Portal điều hướng hệ thống                                 |    Phùng Viết Tài     | `index.html`                               | `feature/portal-homepage`    |
| **TASK-05** | Xây dựng màn hình Đăng nhập mô phỏng phân quyền 4 vai trò                   |     Lê Quang Tiến     | `html/login.html`                          | `feature/auth-login`         |
| **TASK-06** | Xây dựng trang thông báo lỗi điều hướng 404 Not Found                       |    Phùng Viết Tài     | `html/404.html`                            | `feature/404-not-found`      |

---

### PHẦN II: LÁT CẮT DỌC SV1 – PHÙNG VIẾT TÀI (NGƯỜI SỬ DỤNG TÒA NHÀ)

|   Mã Task   | Tên công việc                                                                           | Màn hình & Tệp                         |                          CRUD / Nghiệp vụ                          | Video OBS quy định                      |
| :---------: | :-------------------------------------------------------------------------------------- | :------------------------------------- | :----------------------------------------------------------------: | :-------------------------------------- |
| **TASK-07** | **Occupant Dashboard:** Giao diện thẻ chỉ số điện, biểu đồ tiêu thụ 24h & mẹo tiết kiệm | `html/occupant-dashboard.html`, `html/occupant-energy-history.html` | **R** (Read)<br>Dashboard, lịch sử tiêu thụ; Normal, Skeleton loading, Empty, Alert | `SV1-01-occupant-dashboard.mp4`         |
| **TASK-08** | **Comfort Feedback:** Quản lý phản ánh tiện nghi nhiệt độ/ánh sáng đầy đủ C/R/U/D       | `html/occupant-comfort-feedback.html`  | **C/R/U/D**<br>Form validate, Modal popup sửa, Lưu `localStorage`  | `SV1-02-occupant-comfort-feedback.mp4`  |
| **TASK-09** | **Energy Challenges:** Tham gia thử thách xanh, cập nhật tiến độ & tích điểm thưởng     | `html/occupant-energy-challenges.html`, `html/occupant-rewards.html` | **C/R/U**<br>Tab filter, tiến độ, điểm/Level, huy hiệu & phần thưởng | `SV1-03-occupant-energy-challenges.mp4` |

---

### PHẦN III: LÁT CẮT DỌC SV2 – LÊ QUANG TIẾN (NHÂN VIÊN VẬN HÀNH)

|   Mã Task   | Tên công việc                                                                             | Màn hình & Tệp                      |                           CRUD / Nghiệp vụ                            | Video OBS quy định                   |
| :---------: | :---------------------------------------------------------------------------------------- | :---------------------------------- | :-------------------------------------------------------------------: | :----------------------------------- |
| **TASK-10** | **Energy Monitor:** Giám sát phụ tải tức thời theo từng tầng/zone, cảnh báo quá tải       | `html/operator-energy-monitor.html` |  **R** (Read)<br>Grid bản đồ Zone, Bộ lọc trạng thái, Gauge tải điện  | `SV2-01-operator-energy-monitor.mp4` |
| **TASK-11** | **Alert Center:** Trung tâm xử lý cảnh báo & Tích hợp AI-1 (Energy Anomaly Detector)      | `html/operator-alert-center.html`   |   **C/R/U**<br>Quét Spike bằng AI, Tạo sự cố, Đổi trạng thái xử lý    | `SV2-02-operator-alert-center.mp4`   |
| **TASK-12** | **Saving Actions:** Điều phối lệnh tiết kiệm điện & Tích hợp AI-2 (Saving Recommendation) | `html/operator-saving-actions.html` | **C/R/U/D**<br>Thêm/Sửa/Hủy lệnh, Đồng bộ LocalStorage, Modal confirm | `SV2-03-operator-saving-actions.mp4` |

---

### PHẦN IV: LÁT CẮT DỌC SV3 – LÊ ĐỨC QUANG (QUẢN LÝ CƠ SỞ & QUẢN TRỊ VIÊN)

|   Mã Task   | Tên công việc                                                                              | Màn hình & Tệp                      |                          CRUD / Nghiệp vụ                           | Video OBS quy định                   |
| :---------: | :----------------------------------------------------------------------------------------- | :---------------------------------- | :-----------------------------------------------------------------: | :----------------------------------- |
| **TASK-13** | **Energy KPIs:** Dashboard vĩ mô theo dõi chỉ số EUI, chi phí tiền điện & phát thải $CO_2$ | `html/manager-energy-kpis.html`     |     **R** (Read)<br>Thẻ KPI, Biểu đồ so sánh tháng, Chỉ số xanh     | `SV3-01-manager-energy-kpis.mp4`     |
| **TASK-14** | **Zone Comparison & AI-3 Simulator:** So sánh định mức & Mô phỏng What-If giảm % phụ tải   | `html/manager-zone-comparison.html` |  **C/R/U**<br>Slider What-If AI, Tính tiền điện & $CO_2$ tiết kiệm  | `SV3-02-manager-zone-comparison.mp4` |
| **TASK-15** | **Monthly Report:** Quản lý kỳ báo cáo năng lượng, phê duyệt bản nháp & In ấn PDF          | `html/manager-monthly-report.html`  | **C/R/U/D**<br>Tạo báo cáo tháng, Duyệt/Hủy, In ấn `window.print()` | `SV3-03-manager-monthly-report.mp4`  |
| **TASK-16** | **Zone Management:** Quản lý danh mục các tầng và khu vực tòa nhà                          | `html/admin-zone-management.html`   |  **C/R/U/D**<br>Thêm/Sửa/Khóa Zone, validate diện tích & công suất  | `SV3-04-admin-zone-management.mp4`   |
| **TASK-17** | **Sensor Management:** Quản lý danh mục cảm biến IoT giả lập                               | `html/admin-sensor-management.html` |    **C/R/U/D**<br>Thêm/Sửa cảm biến, toggle Online/Offline mock     | `SV3-05-admin-sensor-management.mp4` |
| **TASK-18** | **User Management:** Quản lý danh sách tài khoản & phân quyền 4 vai trò                    | `html/admin-user-management.html`   |  **C/R/U/D**<br>Thêm/Sửa/Khóa user, phân quyền truy cập theo Zone   | `SV3-06-admin-user-management.mp4`   |

---

### PHẦN V: KIỂM THỬ TỔNG THỂ, MINH CHỨNG & BẢO VỆ (CẢ NHÓM)

|   Mã Task   | Tên công việc                                                                 | Người phụ trách chính | Yêu cầu nghiệm thu                                                      |
| :---------: | :---------------------------------------------------------------------------- | :-------------------: | :---------------------------------------------------------------------- |
| **TASK-19** | Kiểm thử Responsive đa thiết bị (Desktop, iPad, iPhone/Android) & Tối ưu A11y |    Phùng Viết Tài     | Không vỡ layout, menu mobile hoạt động hoàn hảo, contrast màu chuẩn     |
| **TASK-20** | Kiểm thử chu trình dữ liệu LocalStorage và kiểm tra sạch lỗi Console F12      |     Lê Quang Tiến     | Reset / Reload dữ liệu không sinh lỗi, validate form chặt chẽ           |
| **TASK-21** | Tích hợp kiểm thử trải nghiệm thất bại của AI (Fallback & Retry state)        |     Lê Đức Quang      | Cả 3 tính năng AI đều có kịch bản xử lý khi gặp lỗi / thiếu dữ liệu     |
| **TASK-22** | Quay và hoàn tất trọn bộ video OBS minh chứng của từng sinh viên              |    Cả 3 thành viên    | Mỗi màn hình có 1 video đúng quy cách (có mặt SV, live-code, commit)    |
| **TASK-23** | Hoàn thiện file `docs/ai-usage-report.md` và `README.md` chính thức           | Phùng Viết Tài (Lead) | Đầy đủ bảng kiểm kê, liên kết commit, PR và link video                  |
| **TASK-24** | Diễn tập bảo vệ và chuẩn bị các kịch bản Live-coding ngẫu nhiên (5-10 phút)   |    Cả 3 thành viên    | Sẵn sàng thêm trường nhập liệu mới, đổi bảng sang thẻ card, thêm bộ lọc |

---

