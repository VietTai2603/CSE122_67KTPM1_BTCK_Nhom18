# SMARTBUILDING – BẢNG ĐIỀU KHIỂN NĂNG LƯỢNG VÀ ĐIỀU PHỐI TIẾT KIỆM (BTL-36)

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Nhóm thực hiện:** Nhóm 18  
> **Lĩnh vực:** Smart City / Smart Building & Energy  
> **Giảng viên hướng dẫn:** Kiều Tuấn Dũng

---

## 👥 THÀNH VIÊN NHÓM 18 & PHÂN CÔNG VAI TRÒ

| STT | Họ và tên                   | MSSV | Vai trò chính                        | Trách nhiệm chéo & Màn hình phụ trách                                                                                                                                                                                                                                                                       |
| :-: | :-------------------------- | :--: | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | **Phùng Viết Tài** _(Lead)_ | SV1  | **Người sử dụng tòa nhà (Occupant)** | **Design System & A11y**<br>- `html/occupant-dashboard.html`<br>- `html/occupant-comfort-feedback.html`<br>- `html/occupant-energy-challenges.html`<br>- Đồng phụ trách `index.html`                                                                                                                        |
|  2  | **Lê Quang Tiến**           | SV2  | **Nhân viên vận hành (Operator)**    | **Data Engine & JS Logic**<br>- `html/operator-energy-monitor.html`<br>- `html/operator-alert-center.html`<br>- `html/operator-saving-actions.html`<br>- Đồng phụ trách `html/login.html`                                                                                                                   |
|  3  | **Lê Đức Quang**            | SV3  | **Quản lý cơ sở & Quản trị viên**    | **Tích hợp & Mô phỏng AI**<br>- `html/manager-energy-kpis.html`<br>- `html/manager-zone-comparison.html`<br>- `html/manager-monthly-report.html`<br>- `html/admin-zone-management.html`<br>- `html/admin-sensor-management.html`<br>- `html/admin-user-management.html`<br>- Đồng phụ trách `html/404.html` |

---

## 📁 CẤU TRÚC TÀI LIỆU DỰ ÁN (`docs/`)

Toàn bộ tài liệu chuẩn bị, quy trình kỹ nghệ phần mềm và báo cáo được lưu trữ đầy đủ trong thư mục `docs/`:

1. [Đề cương dự án (Project Proposal)](docs/project-proposal.md): Ngữ cảnh, bài toán, mục tiêu và phạm vi.
2. [Bảng kiểm kê màn hình (Screen List)](docs/screen-list.md): Danh mục 12 màn hình nghiệp vụ + 3 màn hình chung theo chuẩn C/R/U/D.
3. [Đặc tả vai trò & Luồng nghiệp vụ (Roles & Features)](docs/roles-and-features.md): Mô tả chi tiết hành trình người dùng của từng vai trò.
4. [Bảng phân công nhiệm vụ (Team Assignment)](docs/team-assignment.md): Ma trận trách nhiệm RACI và trách nhiệm chéo.
5. [Kế hoạch bảng công việc Trello (Trello Board Plan)](docs/trello-board-plan.md): Danh sách 24 task chi tiết từ Backlog đến Done.
6. [Báo cáo khai báo sử dụng AI (AI Usage Report)](docs/ai-usage-report.md): Minh chứng câu lệnh, phần AI sinh ra, phần sinh viên kiểm chứng và 3 tính năng AI mô phỏng.

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN CỤC BỘ

Dự án được xây dựng hoàn toàn bằng **HTML5, CSS3 và Vanilla JavaScript**, kèm máy chủ tĩnh siêu nhẹ không phụ thuộc thư viện ngoài:

### Cách 1: Sử dụng máy chủ Node.js có sẵn (Khuyên dùng)

```bash
# Khởi động server tĩnh tại cổng 3000
node server.js
```

Truy cập trình duyệt tại địa chỉ: [http://localhost:3000](http://localhost:3000)

### Cách 2: Sử dụng VS Code Live Server

Mở file `index.html` trong VS Code, nhấp chuột phải và chọn **"Open with Live Server"**.

---

## 🛠️ CÔNG NGHỆ ÁP DỤNG & ĐẶC TẢ KỸ THUẬT

- **Giao diện & Trải nghiệm:** CSS Grid & Flexbox, CSS Custom Properties, giao diện Dark Theme chuyên nghiệp (Green Tech), hiệu ứng chuyển động mượt mà.
- **Tương tác & Quản lý trạng thái:** JavaScript ES6+ thuần, xử lý sự kiện DOM, lưu trữ bền vững 2 chiều qua `localStorage`.
- **Bao phủ trạng thái (State Coverage):** Hỗ trợ đầy đủ trạng thái Bình thường (Normal), Đang tải (Skeleton loading), Rỗng (Empty), Cảnh báo/Lỗi (Alert/Error).
- **3 Trải nghiệm AI mô phỏng:**
  1. _AI-1: Energy Anomaly Detector_ (Phát hiện Spike bất thường).
  2. _AI-2: Saving Recommendation_ (Gợi ý lệnh tiết kiệm điện).
  3. _AI-3: What-If Simulator_ (Mô phỏng tác động giảm phụ tải).

---

## 📂 CẤU TRÚC THƯ MỤC

```text
cse122-smartbuilding-team18/
├── index.html          # Trang chủ Portal
├── server.js           # Máy chủ tĩnh (node server.js)
├── html/               # Mọi trang giao diện (occupant-*, operator-*, manager-*, admin-*, login, 404)
├── css/                # style.css + responsive.css dùng chung; mỗi vai trò/trang có CSS riêng
├── javascript/         # data.js (dữ liệu mẫu) + main.js (hàm dùng chung) + JS riêng từng trang
├── design/mockups/     # Ảnh thiết kế Canva
└── docs/               # Tài liệu dự án
```

Mỗi trang trong `html/` nối với `../css/...` bằng thẻ `<link>` và với `../javascript/...` bằng thẻ `<script>`.
