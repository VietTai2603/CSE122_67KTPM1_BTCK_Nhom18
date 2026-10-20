# ĐỀ CƯƠNG DỰ ÁN BÀI TẬP LỚN (PROJECT PROPOSAL)
**Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
**Đề tài (BTL-36):** SmartBuilding – Bảng điều khiển năng lượng & Điều phối tiết kiệm  
**Nhóm thực hiện:** Nhóm 18  
**Thành viên:**
1. Phùng Viết Tài (SV1 - Trưởng nhóm)
2. Lê Quang Tiến (SV2)
3. Lê Đức Quang (SV3)

---

## 1. Ngữ cảnh & Đặt vấn đề (Context & Problem Statement)

### 1.1. Ngữ cảnh thực tế
Trong xu thế phát triển đô thị thông minh (Smart City) và công trình xanh (Green Building), việc tối ưu hóa mức tiêu thụ năng lượng điện tại các tòa nhà văn phòng, trường học và khu chung cư là ưu tiên hàng đầu. Một tòa nhà thương mại tiêu chuẩn tiêu thụ hàng trăm ngàn kWh điện mỗi tháng từ hệ thống điều hòa không khí (HVAC), chiếu sáng, máy chủ và các thiết bị văn phòng.

### 1.2. Vấn đề tồn tại (Pain Points)
1. **Dữ liệu thô khó tiếp cận:** Dữ liệu từ đồng hồ đo và cảm biến IoT thường ở dạng số thô hoặc bảng kỹ thuật phức tạp, người vận hành và người dùng thông thường khó đọc hiểu.
2. **Khó phát hiện bất thường kịp thời:** Việc rò rỉ điện, điều hòa chạy qua đêm hoặc thiết bị quá tải (Spike tiêu thụ) thường chỉ được phát hiện khi nhận hóa đơn tiền điện cuối tháng.
3. **Thiếu sự phối hợp hai chiều:** Người sử dụng phòng (occupant) cảm thấy quá nóng/quá lạnh nhưng không có kênh phản hồi chính thức; ban quản lý vận hành điều hòa cục bộ gây lãng phí năng lượng.
4. **Hành động tiết kiệm điện chưa thành quy trình (Task):** Các khuyến nghị tiết kiệm chỉ mang tính khẩu hiệu, chưa được biến thành đầu việc cụ thể có người nhận và theo dõi tiến độ.
5. **Người dùng ít thấy tác động hành vi:** Thiếu cơ chế khuyến khích (gamification), thử thách và ghi nhận điểm xanh để cư dân tòa nhà chung tay tiết kiệm.

---

## 2. Mục tiêu của Đề tài (Objectives)

- **Biến bài toán thực tế thành sản phẩm Web Frontend hoàn chỉnh:** Dựng giao diện tương tác trực quan, hiện đại, có hành trình người dùng rõ ràng cho 4 vai trò.
- **Bảo đảm chuẩn kiến trúc & nghiệp vụ:**
  - Thiết kế tối thiểu 12 màn hình nghiệp vụ độc lập + 3 màn hình dùng chung.
  - Mỗi vai trò có từ 3 màn hình chuyên biệt với đầy đủ thao tác C/R/U/D mô phỏng thực tế.
  - Sử dụng JavaScript DOM thuần (Vanilla JS), mô-đun hóa logic xử lý và lưu trữ trạng thái bền vững qua `localStorage` / Mock JSON.
- **Tích hợp 3 trải nghiệm AI mô phỏng:**
  1. *AI-1: Energy Anomaly Detector* (Phát hiện điểm tiêu thụ điện bất thường / Spike).
  2. *AI-2: Saving Recommendation* (Gợi ý lệnh tiết kiệm điện theo khu vực).
  3. *AI-3: What-If Simulator* (Mô phỏng tác động giảm tải và ước tính chi phí tiết kiệm).
- **Tuân thủ chuẩn quy trình phát triển kỹ nghệ phần mềm:**
  - Quản lý công việc bằng Trello Board (Backlog ➔ To Do ➔ In Progress ➔ Review ➔ Done).
  - Quản lý mã nguồn theo Git Flow (main, dev, feature/*, fix/*) với commit message chuẩn Conventional Commits.
  - Thực hiện Pull Request và Code Review chéo giữa các thành viên.
  - Mỗi màn hình có 1 video OBS minh chứng trực tiếp quá trình lập trình và giải thích logic.

---

## 3. Đối tượng sử dụng & Vai trò (User Roles)

Hệ thống phục vụ 4 nhóm đối tượng chính với chu trình phối hợp chặt chẽ:

```
[Người dùng tòa nhà (SV1)]   ---> Gửi phản ánh tiện nghi & Tham gia thử thách xanh
            │
            ▼
[Nhân viên vận hành (SV2)]   ---> Giám sát Zone, Phát hiện Spike (AI-1) & Điều phối lệnh tiết kiệm (AI-2)
            │
            ▼
[Quản lý cơ sở (SV3)]        ---> Theo dõi KPI, So sánh khu vực & Chạy mô phỏng What-if (AI-3)
            │
            ▼
[Quản trị viên (SV3)]        ---> Quản lý danh mục Zone, Cảm biến Mock & Phân quyền User
```

1. **Người sử dụng tòa nhà (Occupant - Phùng Viết Tài):**
   - Xem chỉ số điện năng tiêu thụ cá nhân/phòng ban.
   - Gửi phản ánh mức độ tiện nghi nhiệt độ/ánh sáng để điều phối tối ưu.
   - Tham gia thử thách tiết kiệm năng lượng, nhận điểm thưởng xanh.
2. **Nhân viên vận hành (Operator - Lê Quang Tiến):**
   - Giám sát lưới điện tiêu thụ thời gian thực theo từng tầng/khu vực.
   - Tiếp nhận và xử lý cảnh báo quá tải/bất thường từ AI.
   - Ban hành và theo dõi các lệnh điều phối tiết kiệm (Saving Actions).
3. **Quản lý cơ sở (Facility Manager - Lê Đức Quang):**
   - Theo dõi các chỉ số KPI hiệu quả sử dụng năng lượng (EUI, chi phí, phát thải $CO_2$).
   - So sánh định mức tiêu thụ giữa các khu vực (Zone Comparison).
   - Lập và phê duyệt báo cáo năng lượng định kỳ theo tháng.
4. **Quản trị viên hệ thống (Admin - Lê Đức Quang đồng phụ trách):**
   - Quản trị danh mục khu vực tòa nhà (Zones).
   - Quản trị thiết bị cảm biến và thông số đo đạc mô phỏng (Sensors Mock).
   - Quản lý tài khoản và phân quyền người dùng (Users).

---

## 4. Công nghệ & Kiến trúc Kỹ thuật (Technology Stack)

- **Frontend Core:** HTML5 Semantic, CSS3 hiện đại (CSS Custom Properties, Flexbox, Grid, Glassmorphism, Dark Mode Theme).
- **Client Logic:** JavaScript ES6+ (DOM Manipulation, Event Delegation, Modular Scripting, LocalStorage Persistence).
- **Data & Mock Engine:** Dữ liệu khởi tạo JSON trong `js/data.js` đồng bộ hóa 2 chiều với Web Storage API (`localStorage`).
- **Development Server:** Node.js HTTP Server (`server.js`) nhẹ, zero-dependency, sẵn sàng chạy cổng local 3000.
- **Quản lý & Minh chứng:** Git, GitHub, Trello, OBS Studio, Figma.

---

## 5. Tiêu chí Đánh giá & Định nghĩa Hoàn thành (Definition of Done)

Một màn hình được nghiệm thu hoàn thành (DONE) khi đáp ứng toàn bộ các tiêu chí:
1. Có bản thiết kế wireframe/mockup tương ứng trên Figma.
2. HTML viết theo chuẩn ngữ nghĩa (Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
3. CSS hoàn chỉnh, giao diện tối màu chuyên nghiệp (Green Tech Dark Theme), hỗ trợ hiển thị mượt mà trên Desktop, Tablet và Mobile.
4. Có ít nhất một tương tác JavaScript có ý nghĩa: lọc tìm kiếm, thêm mới, sửa, xóa, modal popup, toast thông báo.
5. Biểu mẫu (Form) có kiểm tra hợp lệ dữ liệu nhập (Validation) với thông báo lỗi thân thiện.
6. Bao phủ đầy đủ trạng thái: Bình thường (Normal), Đang tải (Loading skeleton), Rỗng (Empty state), Lỗi/Cảnh báo (Alert/Error).
7. Mã nguồn được đẩy qua nhánh riêng, tạo Pull Request và được thành viên khác duyệt (Approve) trước khi merge vào `dev`.
8. Có video OBS của sinh viên phụ trách giải thích logic và demo tương tác thực tế.
