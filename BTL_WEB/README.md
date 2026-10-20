# SMARTBUILDING – BẢNG ĐIỀU KHIỂN NĂNG LƯỢNG VÀ ĐIỀU PHỐI TIẾT KIỆM (BTL-36)

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Nhóm thực hiện:** Nhóm 18  
> **Lĩnh vực:** Smart City / Smart Building & Energy  
> **Giảng viên hướng dẫn:** Bộ môn Công nghệ Web  

---

## 👥 THÀNH VIÊN NHÓM 18 & PHÂN CÔNG VAI TRÒ

| STT | Họ và tên | MSSV | Vai trò chính | Trách nhiệm chéo & Màn hình phụ trách |
| :---: | :--- | :---: | :--- | :--- |
| 1 | **Phùng Viết Tài** *(Lead)* | SV1 | **Người sử dụng tòa nhà (Occupant)** | **Design System & A11y**<br>- `pages/occupant-dashboard.html`<br>- `pages/occupant-comfort-feedback.html`<br>- `pages/occupant-energy-challenges.html`<br>- Đồng phụ trách `index.html` |
| 2 | **Lê Quang Tiến** | SV2 | **Nhân viên vận hành (Operator)** | **Data Engine & JS Logic**<br>- `pages/operator-energy-monitor.html`<br>- `pages/operator-alert-center.html`<br>- `pages/operator-saving-actions.html`<br>- Đồng phụ trách `pages/login.html` |
| 3 | **Lê Đức Quang** | SV3 | **Quản lý cơ sở & Quản trị viên** | **Tích hợp & Mô phỏng AI**<br>- `pages/manager-energy-kpis.html`<br>- `pages/manager-zone-comparison.html`<br>- `pages/manager-monthly-report.html`<br>- `pages/admin-zone-management.html`<br>- `pages/admin-sensor-management.html`<br>- `pages/admin-user-management.html`<br>- Đồng phụ trách `pages/404.html` |

---

## 📁 CẤU TRÚC TÀI LIỆU DỰ ÁN (`docs/`)

Toàn bộ tài liệu chuẩn bị, quy trình kỹ nghệ phần mềm và báo cáo được lưu trữ đầy đủ trong thư mục `docs/`:

1. [Đề cương dự án (Project Proposal)](file:///c:/BTL_WEB/docs/project-proposal.md): Ngữ cảnh, bài toán, mục tiêu và phạm vi.
2. [Bảng kiểm kê màn hình (Screen List)](file:///c:/BTL_WEB/docs/screen-list.md): Danh mục 12 màn hình nghiệp vụ + 3 màn hình chung theo chuẩn C/R/U/D.
3. [Đặc tả vai trò & Luồng nghiệp vụ (Roles & Features)](file:///c:/BTL_WEB/docs/roles-and-features.md): Mô tả chi tiết hành trình người dùng của từng vai trò.
4. [Bảng phân công nhiệm vụ (Team Assignment)](file:///c:/BTL_WEB/docs/team-assignment.md): Ma trận trách nhiệm RACI và trách nhiệm chéo.
5. [Kế hoạch bảng công việc Trello (Trello Board Plan)](file:///c:/BTL_WEB/docs/trello-board-plan.md): Danh sách 24 task chi tiết từ Backlog đến Done.
6. [Báo cáo khai báo sử dụng AI (AI Usage Report)](file:///c:/BTL_WEB/docs/ai-usage-report.md): Minh chứng câu lệnh, phần AI sinh ra, phần sinh viên kiểm chứng và 3 tính năng AI mô phỏng.

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
  1. *AI-1: Energy Anomaly Detector* (Phát hiện Spike bất thường).
  2. *AI-2: Saving Recommendation* (Gợi ý lệnh tiết kiệm điện).
  3. *AI-3: What-If Simulator* (Mô phỏng tác động giảm phụ tải).
