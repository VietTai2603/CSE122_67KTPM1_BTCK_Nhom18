# SMARTBUILDING – BẢNG ĐIỀU KHIỂN NĂNG LƯỢNG VÀ ĐIỀU PHỐI TIẾT KIỆM (BTL-36)

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Khoa:** Công nghệ thông tin – Trường Đại học Thủy Lợi (TLU)  
> **Giảng viên hướng dẫn ** ThS. Kiều Tuấn Dũng
> **Nhóm thực hiện:** Nhóm 18 (Lớp: CSE122)  
> **Lĩnh vực đề tài:** Smart City / Smart Building & Energy

---

## 🌐 1. ĐƯỜNG DẪN DỰ ÁN & LIÊN KẾT MINH CHỨNG (GATEKEEPERS)

- 🚀 **Đường dẫn triển khai thực tế (Live Deployment URL - ĐK3):**  
  👉 [https://cse122-btl36-smartbuilding.vercel.app](https://cse122-btl36-smartbuilding.vercel.app) _(Hoặc mở qua GitHub Pages)_
- 💻 **Kho mã nguồn GitHub chính thức (Repository - ĐK2):**  
  👉 [https://github.com/cse122-team18/cse122-smartbuilding-btl36](https://github.com/cse122-team18/cse122-smartbuilding-btl36)
- 🎨 **Bản thiết kế Mockup Figma / Canva (Design System - ĐK1):**  
  👉 [Link Figma Dự án (Quyền xem công khai)](design/figma-link.txt)
- 📋 **Bảng quản lý công việc Trello Board (Task Management):**  
  👉 [Bảng Trello CSE122-BTL36-Team18-SmartBuilding](docs/trello-board-plan.md)
- 🎥 **Thư mục tổng hợp Video minh chứng OBS (1:1 từng màn hình - ĐK4):**  
  👉 [Thư mục Video OBS Google Drive](https://drive.google.com/drive/folders/1Jnj_pA_bsquwrfJWm9tJqOOQUZkHKE3S)

---

## 👥 2. THÀNH VIÊN NHÓM 18, LÁT CẮT DỌC & TRÁCH NHIỆM CHÉO

Dự án tuân thủ nghiêm ngặt **Nguyên tắc số 3 (Vertical Slice & Cross-Responsibility)**: Mỗi thành viên tự tay code trọn vẹn các màn hình từ Mockup ➔ HTML/CSS ➔ JS/DOM ➔ LocalStorage ➔ Git/PR ➔ OBS, đồng thời gánh 1 trục kỹ thuật xuyên suốt.

|  STT  | Họ và tên                             | MSSV | Vai trò chính                                     | Trách nhiệm chéo (Cross-cutting)                                                                                                                                                                        | Các màn hình phụ trách chính                                                                                                                                                                                                                          |
| :---: | :------------------------------------ | :--: | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Phùng Viết Tài**<br>_(Trưởng nhóm)_ | SV1  | **Người sử dụng tòa nhà<br>(Occupant)**           | **Trục 1: Design System & A11y**<br>- Quản lý biến `:root`, CSS Tokens.<br>- Điều hướng chung & Khả năng tiếp cận.<br>- Đồng phụ trách `index.html`, `404.html`.                                        | 1. `html/occupant-dashboard.html`<br>2. `html/occupant-comfort-feedback.html`<br>3. `html/occupant-energy-challenges.html`<br>4. `html/occupant-energy-history.html`<br>5. `html/occupant-rewards.html`                                               |
| **2** | **Lê Quang Tiến**                     | SV2  | **Nhân viên vận hành<br>(Operator)**              | **Trục 2: Data Engine & JS Architecture**<br>- Quản trị dữ liệu khởi tạo (`data.js`).<br>- Đồng bộ 2 chiều `localStorage`.<br>- Chuẩn hóa luồng tương tác AI UX.<br>- Đồng phụ trách `html/login.html`. | 6. `html/operator-energy-monitor.html`<br>7. `html/operator-alert-center.html`<br>8. `html/operator-saving-actions.html`<br>9. `html/operator-zone-control.html`                                                                                      |
| **3** | **Lê Đức Quang**                      | SV3  | **Quản lý cơ sở & Quản trị<br>(Manager & Admin)** | **Trục 3: Tích hợp, Responsive & Release**<br>- Kiểm thử đa thiết bị (Desktop/Tablet/Mobile).<br>- Tích hợp What-If AI Simulator.<br>- Quản lý merge PR (`dev` ➔ `main`) & Deploy.                      | 10. `html/manager-energy-kpis.html`<br>11. `html/manager-zone-comparison.html`<br>12. `html/manager-monthly-report.html`<br>13. `html/admin-zone-management.html`<br>14. `html/admin-sensor-management.html`<br>15. `html/admin-user-management.html` |

---

## 🏢 3. NGỮ CẢNH & PHÁT BIỂU VẤN ĐỀ THỰC TẾ (P1 – P4)

Trong xu thế Smart City và Công trình xanh, việc quản lý và tối ưu năng lượng tại các tòa nhà văn phòng cao tầng gặp 4 điểm nghẽn chính:

- **P1 (Dữ liệu khó đọc):** Chỉ số công tơ điện và cảm biến dạng kỹ thuật thô, người dùng và ban quản lý khó nắm bắt trực quan.
- **P2 (Khó phát hiện bất thường):** Sự cố rò rỉ, điều hòa chạy qua đêm (Spike phụ tải) chỉ được biết khi nhận hóa đơn tiền điện cuối tháng.
- **P3 (Hành động chưa thành quy trình):** Khẩu hiệu tiết kiệm điện chung chung, thiếu đầu việc (Task) điều phối phân công cụ thể.
- **P4 (Người dùng ít thấy tác động hành vi):** Cư dân văn phòng cảm thấy nóng/lạnh nhưng không có kênh phản hồi và không có động lực tham gia tiết kiệm.

---

## 🎯 4. MỤC TIÊU CỐT LÕI CỦA SẢN PHẨM (O1 – O7)

- **O1:** Hiện thực hóa sản phẩm Web Frontend hoàn chỉnh với hành trình người dùng liền mạch cho 4 vai trò.
- **O2:** Xây dựng 15 màn hình nghiệp vụ chuyên sâu + 3 màn hình dùng chung, đảm bảo mỗi vai trò có tối thiểu 4–6 màn hình.
- **O3:** Thao tác CRUD thực chất gắn với vòng đời dữ liệu: Tạo, Đọc, Sửa, Hủy/Xóa/Lưu trữ, duyệt trạng thái.
- **O4:** Tương tác DOM thuần: Tìm kiếm từ khóa kết hợp bộ lọc đa tiêu chí, Modal xác nhận, Toast thông báo, Form validation chi tiết.
- **O5:** Quản lý dữ liệu bền vững qua `localStorage`, tải lại trang F5 dữ liệu vẫn giữ nguyên vẹn.
- **O6:** Tích hợp 3 trải nghiệm AI mô phỏng đúng chuẩn 6 bước AI UX và kịch bản xử lý ngoại lệ (Failure Mode).
- **O7:** Tổ chức làm việc nhóm chuẩn công nghiệp bằng Trello và Git Flow phân nhánh chặt chẽ.

---

## 📑 5. BẢNG KIỂM KÊ MÀN HÌNH TỔNG QUAN (SCREEN INVENTORY)

Toàn bộ 18 màn hình được định danh và theo dõi tại tệp chi tiết [docs/screen-inventory.md](docs/screen-inventory.md) với đủ 12 cột truy vết:

| Vai trò                    | Số màn hình | Màn hình tiêu biểu                                                |  Mức độ CRUD  | Tính năng AI                         |
| :------------------------- | :---------: | :---------------------------------------------------------------- | :-----------: | :----------------------------------- |
| **Dùng chung**             |      3      | Portal (`index.html`), Đăng nhập (`login.html`), Lỗi (`404.html`) |       R       | Điều hướng & Phân quyền              |
| **Occupant (SV1)**         |      5      | Dashboard, Comfort Feedback, Energy Challenges, History, Rewards  | C / R / U / D | AI-2 Tips gợi ý cá nhân              |
| **Operator (SV2)**         |      4      | Energy Monitor, Alert Center, Saving Actions, Zone Live Control   | C / R / U / D | **AI-1:** Quét Spike bất thường tải  |
| **Facility Manager (SV3)** |      3      | Energy KPIs, Zone Comparison, Monthly Report                      | C / R / U / D | **AI-3:** What-If Simulator tải điện |
| **Admin (SV3)**            |      3      | Zone Management, Sensor Management, User Management               | C / R / U / D | Quản trị tham số cấu hình            |

---

## 🔄 6. KIẾN TRÚC HỆ THỐNG & LUỒNG LIÊN THÔNG ĐA VAI TRÒ

Ứng dụng tạo thành một vòng lặp nghiệp vụ khép kín giữa các vai trò:

1. **Occupant (SV1)** gửi phản ánh: _"Phòng 402 quá lạnh (Lãng phí điện)"_ ➔ Lưu vào `localStorage`.
2. **Operator (SV2)** mở _Alert Center_, kích hoạt **AI-1** quét phát hiện Spike quá tải HVAC tại Zone tương ứng.
3. **Operator (SV2)** sang _Saving Actions_, chạy **AI-2** nhận gợi ý: _"Tăng điều hòa Tầng 4 lên 26°C"_ ➔ Bấm **Áp dụng** tạo lệnh điều phối.
4. **Facility Manager (SV3)** mở _Zone Comparison_, dùng **AI-3 What-If** dự tính số tiền và $CO_2$ tiết kiệm được, sau đó lập và ký duyệt _Báo cáo tháng_.
5. **Admin (SV3)** cấu hình phân bổ lại diện tích và cảm biến IoT của Zone để giám sát chặt chẽ.

---

## 🤖 7. BA TRẢI NGHIỆM AI MÔ PHỎNG & CHUẨN 6 BƯỚC AI UX

Các tính năng AI tuân thủ nghiêm ngặt quy trình 6 bước tại **Nguyên tắc số 4**:
`Input ➔ Processing (Skeleton Loading) ➔ Output ➔ Explainability (Vì sao có gợi ý?) ➔ User Control (Chấp nhận/Sửa/Từ chối) ➔ Save/Apply vào LocalStorage`.

1. **AI-1: Energy Anomaly Detector (Phát hiện Spike bất thường - `html/operator-alert-center.html`):**
   - _Quy tắc:_ Quét các zone có công suất $P_{\text{thực tế}} > 1.35 \times P_{\text{baseline}}$.
   - _Explainability:_ Nêu rõ tỷ lệ % vượt ngưỡng và nghi vấn thiết bị chạy sai lịch trình.
2. **AI-2: Saving Recommendation Engine (Gợi ý lệnh tiết kiệm điện - `html/operator-saving-actions.html`):**
   - _Quy tắc:_ Dựa trên nhiệt độ ngoài trời (> 32°C ➔ tăng nhiệt độ điều hòa; giờ trưa 12h-13h30 ➔ tắt đèn).
   - _User Control:_ Cho phép bấm **"Chỉnh sửa"** để điền thông số vào form trước khi duyệt.
3. **AI-3: What-If Energy Simulator (Mô phỏng cắt giảm tải - `html/manager-zone-comparison.html`):**
   - _Quy tắc:_ Cho phép kéo thanh trượt giảm 1% – 50% phụ tải ➔ Tính ngay số kWh, số tiền (2.200 đ/kWh) và $CO_2$ giảm được ($0.85 \text{ kg } CO_2/\text{kWh}$).
   - _Lưu trữ:_ Cho phép lưu kịch bản thành định mức áp dụng cho kỳ tới.
4. **Kịch bản AI Failure / Uncertainty Mode:** Có nút chuyển đổi `Mô phỏng AI lỗi: BẬT/TẮT` để kiểm tra khả năng xử lý khi thiếu dữ liệu hoặc hệ thống lỗi.

---

## 🛠️ 8. CÔNG NGHỆ ÁP DỤNG & ĐẶC TẢ KỸ THUẬT

- **Ngôn ngữ nền tảng:** HTML5 Semantic chuẩn W3C, CSS3 hiện đại, Vanilla JavaScript ES6+ (không dùng thư viện ngoài theo yêu cầu đồ án).
- **CSS Architecture:** Thiết kế hệ thống biến `:root` tập trung trong [css/style.css](css/style.css), hỗ trợ responsive hoàn hảo trên Mobile (320px–375px), Tablet (768px) và Desktop ($\ge 1024px$).
- **Bảo mật mã nguồn:** Tuân thủ Barem VP-02 (chống XSS) bằng hàm `escapeHtml()` khi render dữ liệu người dùng.
- **Data Persistence:** Bộ dữ liệu mẫu phong phú trong [javascript/data.js](javascript/data.js) đồng bộ 2 chiều với Web Storage API (`localStorage`).

---

## 📂 9. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
cse122-smartbuilding-team18/
├── index.html                   # Trang chủ Portal điều hướng toàn hệ thống
├── server.js                    # Node.js HTTP Server tĩnh (tùy chọn)
├── vercel.json                  # Cấu hình Deploy Vercel (ĐK3)
├── .gitignore                   # Loại trừ file rác, log và video nặng
├── README.md                    # Tài liệu đặc tả 15 mục chuẩn Barem
├── design/                      # Hồ sơ thiết kế (ĐK1)
│   ├── figma-link.txt           # Link Figma/Canva quyền xem công khai
│   └── mockups/                 # 13 ảnh mockup tĩnh dự phòng khi offline
├── docs/                        # Tài liệu kỹ nghệ phần mềm
│   ├── screen-inventory.md      # Bảng kiểm kê 18 màn hình đủ 12 cột (ĐK1)
│   ├── project-proposal.md      # Đề cương ngữ cảnh, vấn đề và mục tiêu
│   ├── roles-and-features.md    # Đặc tả hành trình người dùng chi tiết
│   ├── team-assignment.md       # Bảng phân công RACI & Trách nhiệm chéo
│   ├── trello-board-plan.md     # Kế hoạch thẻ công việc Trello 5 cột
│   └── ai-usage-report.md       # Báo cáo minh bạch sử dụng AI (ĐK5)
├── html/                        # Mã nguồn 17 trang giao diện
│   ├── occupant-*.html          # 5 trang vai trò Người sử dụng (SV1)
│   ├── operator-*.html          # 4 trang vai trò Vận hành (SV2)
│   ├── manager-*.html           # 3 trang vai trò Quản lý (SV3)
│   ├── admin-*.html             # 3 trang vai trò Quản trị (SV3)
│   ├── login.html               # Trang đăng nhập mô phỏng phân quyền
│   └── 404.html                 # Trang báo lỗi đường dẫn thân thiện
├── css/                         # Kiến trúc stylesheet CSS3
│   ├── style.css                # Design system, CSS Variables & dùng chung
│   ├── responsive.css           # Media queries cho Mobile & Tablet
│   └── *.css                    # CSS đặc thù cho từng trang/vai trò
└── javascript/                  # Tầng logic JavaScript & Dữ liệu
    ├── data.js                  # Dữ liệu khởi tạo IoT Mock Engine
    ├── manager-data.js          # Dữ liệu mở rộng cho Manager/Admin
    ├── main.js                  # Thư viện hàm dùng chung, layout & modal
    └── *.js                     # Logic tương tác DOM riêng từng trang
```

---

## 🚀 10. HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN CỤC BỘ

### Cách 1: Sử dụng VS Code Live Server (Khuyên dùng)

1. Cài extension **Live Server** trong VS Code.
2. Nhấp chuột phải vào file `index.html` và chọn **"Open with Live Server"**.
3. Ứng dụng sẽ tự động mở trên trình duyệt tại địa chỉ `http://127.0.0.1:5500`.

### Cách 2: Sử dụng máy chủ Node.js tĩnh

```bash
node server.js
# Mở trình duyệt truy cập: http://localhost:3000
```

---

## 🌿 11. QUY TRÌNH PHÁT TRIỂN GIT & COMMIT FLOW (ĐK2)

- **Chiến lược phân nhánh (Branching Strategy):**
  - `main`: Nhánh ổn định cao nhất, chỉ merge khi release hoặc bảo vệ.
  - `dev`: Nhánh tích hợp chung của cả nhóm.
  - `feature/sv1-*`, `feature/sv2-*`, `feature/sv3-*`: Nhánh tính năng riêng của từng thành viên.
- **Quy chuẩn thông điệp Commit (Conventional Commits):**
  - `feat: [tính năng mới]`
  - `fix: [sửa lỗi hoặc vá XSS]`
  - `style: [chỉnh sửa giao diện, CSS, màu sắc]`
  - `refactor: [tối ưu hóa cấu trúc code]`
  - `docs: [cập nhật tài liệu, bảng kiểm kê màn hình]`
- **Quy trình Review:** 100% Pull Request từ `feature/*` vào `dev` phải có ít nhất 1 thành viên khác chấp thuận (Peer Review Approved).

---

## 🎥 12. DANH MỤC VIDEO OBS MINH CHỨNG (TỶ LỆ 1:1) (ĐK4)

_Mỗi video có thời lượng 3–5 phút, bắt buộc có webcam rõ mặt, mở mã nguồn trong VS Code, giải thích logic, live edit và commit:_

| STT | Tên tệp Video OBS quy chuẩn             | Màn hình tương ứng      | Sinh viên thực hiện |   Trạng thái    |
| :-: | :-------------------------------------- | :---------------------- | :-----------------: | :-------------: |
|  1  | `SV1-01-occupant-dashboard.mp4`         | Occupant Dashboard      |   Phùng Viết Tài    | Đang hoàn thiện |
|  2  | `SV1-02-occupant-comfort-feedback.mp4`  | Comfort Feedback        |   Phùng Viết Tài    | Đang hoàn thiện |
|  3  | `SV1-03-occupant-energy-challenges.mp4` | Energy Challenges       |   Phùng Viết Tài    | Đang hoàn thiện |
|  4  | `SV1-04-occupant-energy-history.mp4`    | Energy History          |   Phùng Viết Tài    | Đang hoàn thiện |
|  5  | `SV1-05-occupant-rewards.mp4`           | Green Rewards           |   Phùng Viết Tài    | Đang hoàn thiện |
|  6  | `SV2-01-operator-energy-monitor.mp4`    | Energy Monitor          |    Lê Quang Tiến    | Đang hoàn thiện |
|  7  | `SV2-02-operator-alert-center.mp4`      | Alert Center & AI-1     |    Lê Quang Tiến    | Đang hoàn thiện |
|  8  | `SV2-03-operator-saving-actions.mp4`    | Saving Actions & AI-2   |    Lê Quang Tiến    | Đang hoàn thiện |
|  9  | `SV2-04-operator-zone-control.mp4`      | Zone Live Control       |    Lê Quang Tiến    | Đang hoàn thiện |
| 10  | `SV3-01-manager-energy-kpis.mp4`        | Energy KPIs             |    Lê Đức Quang     | Đang hoàn thiện |
| 11  | `SV3-02-manager-zone-comparison.mp4`    | Zone Comparison & AI-3  |    Lê Đức Quang     | Đang hoàn thiện |
| 12  | `SV3-03-manager-monthly-report.mp4`     | Monthly Report & Export |    Lê Đức Quang     | Đang hoàn thiện |
| 13  | `SV3-04-admin-zone-management.mp4`      | Zone Management         |    Lê Đức Quang     | Đang hoàn thiện |
| 14  | `SV3-05-admin-sensor-management.mp4`    | Sensor Management       |    Lê Đức Quang     | Đang hoàn thiện |
| 15  | `SV3-06-admin-user-management.mp4`      | User Management         |    Lê Đức Quang     | Đang hoàn thiện |

---

## 🤖 13. MINH BẠCH SỬ DỤNG AI & KIỂM CHỨNG MÃ NGUỒN (ĐK5)

Chi tiết được trình bày tại [docs/ai-usage-report.md](docs/ai-usage-report.md):

- **Phần AI hỗ trợ:** Khởi tạo ý tưởng layout, gợi ý CSS tokens, tư vấn công thức tính phát thải $CO_2$.
- **Phần sinh viên kiểm chứng & làm chủ:** Khắc phục lỗi XSS của AI, viết lại logic đồng bộ 2 chiều `localStorage`, gộp bộ lọc tìm kiếm kết hợp, thiết kế luồng tương tác AI UX 6 bước và xây dựng các kịch bản lỗi ngoại lệ (Fallback Error State).

---

## ⏱️ 14. KỊCH BẢN DEMO 6 PHÚT TẠI BUỔI BẢO VỆ CHÍNH THỨC

- **Mốc 1 (0:00 – 0:45) — Mở đầu & Định vị:** Mở Link đã deploy, giới thiệu 3 câu về đề tài BTL-36, mở nhanh [docs/screen-inventory.md](docs/screen-inventory.md).
- **Mốc 2 (0:45 – 2:15) — SV1 Demo:** Trình diễn gửi phản ánh Comfort Feedback (Form Validation), gõ tìm kiếm từ khóa không tồn tại để chứng minh Empty State.
- **Mốc 3 (2:15 – 3:45) — SV2 Demo:** Trình diễn Alert Center quét AI-1, kích hoạt Saving Actions AI-2 qua 6 bước tương tác, bật thử AI Failure Mode.
- **Mốc 4 (3:45 – 5:00) — SV3 Demo:** Chỉ rõ phản ánh/hành động đã xuất hiện ở phía Quản lý, chạy What-If Simulator (AI-3), ký duyệt và bấm in báo cáo PDF (`window.print()`). F5 trang để chứng minh dữ liệu lưu bền vững trong `localStorage`.
- **Mốc 5 (5:00 – 6:00) — Kiểm tra Kỹ thuật:** Bật Chrome DevTools F12 co về 320px và 768px, nhấn phím Tab chứng minh `:focus-visible` và phím Esc đóng Modal.

---

## 💡 15. KẾ HOẠCH BẢO VỆ & SẴN SÀNG CHỈNH SỬA TRỰC TIẾP (LIVE MODIFICATION)

Cả 3 thành viên đã tự luyện tập và sẵn sàng thực hiện trực tiếp trong 5–10 phút tại phòng thi:

- **Nhóm A (Tìm kiếm & Bộ lọc):** Thêm bộ lọc tầng, sắp xếp A-Z hoặc bộ đếm kết quả động.
- **Nhóm B (Biểu mẫu & Hợp lệ):** Thêm trường số điện thoại/ghi chú, bộ đếm 200 ký tự cho textarea, kiểm tra trùng lặp mã.
- **Nhóm C (CSS & Bố cục):** Đổi hiển thị từ bảng sang thẻ Card Grid, thêm thanh KPI tổng hợp.
- **Nhóm D (Trạng thái dữ liệu):** Giả lập mảng rỗng `[]` hiển thị Empty State, độ trễ `setTimeout` 800ms cho skeleton.
- **Nhóm E (Vòng đời nghiệp vụ):** Thêm trạng thái _Cần bổ sung (Needs Revision)_ hoặc nút ghim ưu tiên lưu `localStorage`.
- **Nhóm F (AI UX):** Thêm chỉ số tin cậy (Confidence Score 88%) hoặc nút tạo lại phương án khác (Regenerate).

---

© 2026 SmartBuilding CSE122 Team 18. All rights reserved.
