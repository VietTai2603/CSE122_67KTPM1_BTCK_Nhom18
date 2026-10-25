# BẢNG KIỂM KÊ MÀN HÌNH CHUẨN (SCREEN LIST)

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Đề tài (BTL-36):** SmartBuilding – Bảng điều khiển năng lượng & Điều phối tiết kiệm  
> **Nhóm thực hiện:** Nhóm 18 (SV1: Phùng Viết Tài | SV2: Lê Quang Tiến | SV3: Lê Đức Quang)  

---

## 📋 1. BẢNG KIỂM KÊ MÀN HÌNH ĐẦY ĐỦ 12 CỘT (SCREEN INVENTORY TABLE)

*Quy ước 12 cột chuẩn Barem V2:*
1. **Role:** Vai trò người dùng trong hệ thống
2. **User Goal:** Mục tiêu cốt lõi của người dùng
3. **User Task:** Nhiệm vụ/thao tác cụ thể thực hiện trên giao diện
4. **Screen:** Tên màn hình giao diện
5. **File:** Đường dẫn tệp `.html` tương ứng
6. **CRUD:** Thao tác dữ liệu (Create, Read, Update, Delete / Archive)
7. **States:** Các trạng thái giao diện được bao phủ (Normal, Loading, Empty, Error/Alert, Success)
8. **AI:** Tính năng AI tích hợp & luồng trải nghiệm
9. **Assignee:** Thành viên chịu trách nhiệm lát cắt dọc
10. **Task ID:** Mã công việc truy vết trên bảng Trello
11. **Branch:** Nhánh Git phát triển tính năng
12. **OBS:** Tên video minh chứng webcam & live code tương ứng

| # | Role | User Goal | User Task | Screen | File | CRUD | States | AI | Assignee | Task ID | Branch | OBS |
| :-: | :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| **0** | **Chung** | Điều hướng hệ thống, chọn vai trò trải nghiệm | Xem tổng quan, chuyển vai trò, mở tài liệu | **Trang chủ Portal** | `index.html` | **R** | Normal, Hover interactive | Mô phỏng tổng quan | Cả nhóm | `TASK-04` | `feature/shared-portal` | `COMMON-01-portal-index.mp4` |
| **0b** | **Chung** | Xác thực danh tính & chuyển nhanh quyền thử nghiệm | Nhập form, click điền nhanh tài khoản 4 role | **Đăng nhập** | `html/login.html` | **R** | Normal, Validating, Error | Không áp dụng | SV2 | `TASK-05` | `feature/shared-auth` | `COMMON-02-login.mp4` |
| **0c** | **Chung** | Báo lỗi khi đường dẫn không tồn tại | Xem gợi ý điều hướng, quay lại trang chủ | **404 Not Found** | `html/404.html` | **R** | 404 Error State | Không áp dụng | SV1 | `TASK-06` | `feature/shared-404` | `COMMON-03-404.mp4` |
| **1** | **Occupant** | Nắm bắt điện tiêu thụ cá nhân & mẹo tiết kiệm | Xem thẻ chỉ số, biểu đồ giờ, xem gợi ý mẹo | **Occupant Dashboard** | `html/occupant-dashboard.html` | **R** | Normal, Loading, Empty, Spike Alert | **AI-2:** Gợi ý tiết kiệm điện cá nhân hóa | Phùng Viết Tài (SV1) | `TASK-07` | `feature/sv1-occupant-dashboard` | `SV1-01-occupant-dashboard.mp4` |
| **2** | **Occupant** | Phản ánh chất lượng nhiệt độ/ánh sáng để BQL xử lý | Điền form phản ánh, xem danh sách, sửa, xóa/hủy | **Comfort Feedback** | `html/occupant-comfort-feedback.html` | **C / R / U / D** | Normal, Empty, Form error, Confirm modal | Phân tích mức độ tiện nghi | Phùng Viết Tài (SV1) | `TASK-08` | `feature/sv1-comfort-feedback` | `SV1-02-occupant-comfort-feedback.mp4` |
| **3** | **Occupant** | Tham gia chiến dịch tiết kiệm để tích lũy điểm xanh | Xem danh sách, tham gia thử thách, cập nhật mốc | **Energy Challenges** | `html/occupant-energy-challenges.html` | **C / R / U** | Normal, Tab filter, Progress, Empty | Đề xuất thử thách phù hợp | Phùng Viết Tài (SV1) | `TASK-09` | `feature/sv1-energy-challenges` | `SV1-03-occupant-energy-challenges.mp4` |
| **4** | **Occupant** | Theo dõi lịch sử tiêu thụ điện theo chu kỳ 7/30 ngày | Lọc mốc thời gian, xem biểu đồ và định mức | **Energy History** | `html/occupant-energy-history.html` | **R** | Normal, Chart render, Empty | Phân tích xu hướng dùng điện | Phùng Viết Tài (SV1) | `TASK-07b` | `feature/sv1-energy-history` | `SV1-04-occupant-energy-history.mp4` |
| **5** | **Occupant** | Đổi điểm tích lũy xanh thành quà tặng giá trị | Xem quà, bấm đổi quà, trừ điểm, xem lịch sử đổi | **Green Rewards** | `html/occupant-rewards.html` | **R / U** | Normal, Insufficient points, Success toast | Không áp dụng | Phùng Viết Tài (SV1) | `TASK-09b` | `feature/sv1-rewards` | `SV1-05-occupant-rewards.mp4` |
| **6** | **Operator** | Giám sát phụ tải tức thời theo từng tầng/khu vực | Xem KPI công suất, bản đồ zone, lọc tải & tìm kiếm | **Energy Monitor** | `html/operator-energy-monitor.html` | **R** | Normal, Loading, Overload red, Empty filter | Cảnh báo vượt ngưỡng tự động | Lê Quang Tiến (SV2) | `TASK-10` | `feature/sv2-energy-monitor` | `SV2-01-operator-energy-monitor.mp4` |
| **7** | **Operator** | Tiếp nhận & xử lý sự cố bất thường lưới điện | Quét AI Spike, tạo cảnh báo tay, đổi trạng thái | **Alert Center** | `html/operator-alert-center.html` | **C / R / U** | Normal, AI Loading, Empty, Critical alert | **AI-1:** Phát hiện Spike & Failure Mode | Lê Quang Tiến (SV2) | `TASK-11` | `feature/sv2-alert-center` | `SV2-02-operator-alert-center.mp4` |
| **8** | **Operator** | Điều phối & phát hành lệnh cắt giảm công suất | Nhập lệnh mới, nhận gợi ý AI, sửa tiến độ, hủy | **Saving Actions** | `html/operator-saving-actions.html` | **C / R / U / D** | Normal, AI Skeleton, Form error, Confirm modal | **AI-2:** Gợi ý lệnh tiết kiệm (6 bước UX) | Lê Quang Tiến (SV2) | `TASK-12` | `feature/sv2-saving-actions` | `SV2-03-operator-saving-actions.mp4` |
| **9** | **Operator** | Điều khiển bật/tắt thiết bị tại chỗ theo khu vực | Bật/tắt đèn, điều hòa, xem nhật ký điều khiển | **Zone Live Control** | `html/operator-zone-control.html` | **R / U** | Normal, Device state toggles, Running log | Không áp dụng | Lê Quang Tiến (SV2) | `TASK-19` | `feature/sv2-zone-control` | `SV2-04-operator-zone-control.mp4` |
| **10** | **Facility Mgr** | Giám sát vĩ mô EUI, chi phí tiền điện & phát thải | Xem thẻ KPI, so sánh ngân sách vs thực tế, radar | **Energy KPIs** | `html/manager-energy-kpis.html` | **R** | Normal, Loading skeleton, Error state | Đánh giá mức độ đạt chuẩn EUI | Lê Đức Quang (SV3) | `TASK-13` | `feature/sv3-manager-kpis` | `SV3-01-manager-energy-kpis.mp4` |
| **11** | **Facility Mgr** | So sánh tiêu thụ giữa các tầng & chạy mô phỏng tải | Lọc khu vực, kéo thanh trượt What-If, lưu mốc mới | **Zone Comparison** | `html/manager-zone-comparison.html` | **C / R / U** | Normal, Chart diff, AI Loading, Simulation | **AI-3:** What-If Simulator giảm % phụ tải | Lê Đức Quang (SV3) | `TASK-14` | `feature/sv3-zone-comparison` | `SV3-02-manager-zone-comparison.mp4` |
| **12** | **Facility Mgr** | Lập, thẩm định, phê duyệt và xuất báo cáo tháng | Tạo kỳ báo cáo, nhập ghi chú BQL, ký duyệt, in PDF | **Monthly Report** | `html/manager-monthly-report.html` | **C / R / U / D** | Normal, Draft, Approved, Export CSV, Print | Tóm tắt phân tích định kỳ | Lê Đức Quang (SV3) | `TASK-15` | `feature/sv3-monthly-report` | `SV3-03-manager-monthly-report.mp4` |
| **13** | **Admin** | Quản lý danh mục tầng & khu vực chức năng | Xem bảng zone, thêm mới, sửa diện tích/tải, khóa | **Zone Management** | `html/admin-zone-management.html` | **C / R / U / D** | Normal, Empty search, Validation, Lock modal | Quản trị tham số cấu hình | Lê Đức Quang (SV3) | `TASK-16` | `feature/sv3-admin-zones` | `SV3-04-admin-zone-management.mp4` |
| **14** | **Admin** | Quản lý thiết bị cảm biến IoT giả lập trong tòa nhà | Xem danh sách cảm biến, thêm, sửa chu kỳ, bật/tắt | **Sensor Management** | `html/admin-sensor-management.html` | **C / R / U / D** | Normal, Online/Offline badge, Form error | Nguồn dữ liệu IoT Mock Engine | Lê Đức Quang (SV3) | `TASK-17` | `feature/sv3-admin-sensors` | `SV3-05-admin-sensor-management.mp4` |
| **15** | **Admin** | Quản trị tài khoản và phân quyền truy cập hệ thống | Thêm tài khoản, sửa vai trò, khóa/mở khóa người dùng | **User Management** | `html/admin-user-management.html` | **C / R / U / D** | Normal, Active/Locked badge, Email check | Phân quyền 4 vai trò RBAC | Lê Đức Quang (SV3) | `TASK-18` | `feature/sv3-admin-users` | `SV3-06-admin-user-management.mp4` |

---

## 🔗 2. BẢNG TRUY VẾT 12 MẮT XÍCH (TRACEABILITY MATRIX TỪ ĐỀ BÀI ĐẾN CODE)

```text
[1. Ngữ cảnh: Tối ưu năng lượng tòa nhà thông minh Smart City]
       │
[2. Phát biểu vấn đề: P1 (Dữ liệu khó đọc) | P2 (Khó phát hiện Spike) | P3 (Hành động chưa thành task) | P4 (Ít thấy tác động)]
       │
[3. Vai trò: Occupant (SV1) | Operator (SV2) | Facility Manager (SV3) | Administrator (SV3)]
       │
[4. Luồng người dùng: Xem chỉ số ➔ Phản hồi ➔ AI phát hiện Spike ➔ Đề xuất lệnh tiết kiệm ➔ Quản lý phê duyệt & Báo cáo]
       │
[5. Bảng kiểm kê: docs/screen-inventory.md (18 màn hình: 15 nghiệp vụ + 3 chung)]
       │
[6. Bản thiết kế: design/mockups/*.jpg & design/figma-link.txt]
       │
[7. Thẻ công việc: Trello Board (TASK-01 ➔ TASK-24) với 5 cột chuẩn]
       │
[8. Nhánh phát triển: feature/sv1-*, feature/sv2-*, feature/sv3-*]
       │
[9. Ghi nhận commit: Conventional Commits (feat:, fix:, style:, refactor:, docs:)]
       │
[10. Yêu cầu hợp nhất: Pull Requests trên GitHub có Peer Review chéo giữa 3 thành viên]
       │
[11. Video OBS: 18 video mp4 độc lập tương ứng có mặt webcam và giải thích code]
       │
[12. Sản phẩm hoàn thiện: Deploy trên Vercel / GitHub Pages + Live Modification tại phòng thi]
```
