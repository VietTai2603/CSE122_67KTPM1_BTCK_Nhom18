# BẢNG KIỂM KÊ MÀN HÌNH – ĐỀ TÀI BTL-36 - TLU

**Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
**Tên đề tài:** SmartBuilding – Bảng điều khiển năng lượng và điều phối tiết kiệm  
**Nhóm thực hiện:** Nhóm 18

---

## 1. Bảng kiểm kê màn hình vai trò SV1: Người sử dụng tòa nhà (Occupant)

| Vai trò                   | Mục tiêu người dùng                                                                                 | Nhiệm vụ người dùng                                                                                                                                  | Màn hình               | Tệp (.html)                             | Thao tác CRUD & Trạng thái                                                                                                              | Tính năng AI liên quan                           | Người phụ trách    |
| :------------------------ | :-------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- | :----------------- |
| **Người sử dụng tòa nhà** | Nắm bắt điện năng tiêu thụ tại phòng/khu vực làm việc và so sánh hiệu quả tiết kiệm                 | - Xem tổng quan điện năng theo ngày/tuần<br>- Xem cảnh báo tiêu thụ vượt định mức<br>- Xem mẹo tiết kiệm trong ngày                                  | **Occupant Dashboard** | `html/occupant-dashboard.html`         | **R** (Read)<br>- Trạng thái: Bình thường, Đang tải, Rỗng, Cảnh báo vượt ngưỡng                                                         | AI-2: Gợi ý hành động tiết kiệm điện cá nhân hóa | **Phùng Viết Tài** |
| **Người sử dụng tòa nhà** | Phản ánh chất lượng tiện nghi (nhiệt độ, điều hòa, ánh sáng) để BQL điều phối tiết kiệm điện hợp lý | - Gửi phản ánh tiện nghi mới<br>- Xem lịch sử các phản hồi đã gửi<br>- Sửa nội dung phản hồi khi chưa duyệt<br>- Hủy/Xóa phản hồi không còn hiệu lực | **Comfort Feedback**   | `html/occupant-comfort-feedback.html`  | **C / R / U / D** (Đầy đủ CRUD)<br>- Trạng thái: Chờ tiếp nhận (`pending`), Đang xử lý (`investigating`), Đã xử lý (`resolved`), Đã hủy | Hỗ trợ phân tích mức độ tiện nghi                | **Phùng Viết Tài** |
| **Người sử dụng tòa nhà** | Tham gia các chiến dịch tiết kiệm năng lượng của tòa nhà để tích điểm và nhận thưởng                | - Xem danh sách thử thách có sẵn<br>- Đăng ký tham gia thử thách mới<br>- Cập nhật tiến độ hoàn thành<br>- Nhận điểm thưởng & huy hiệu               | **Energy Challenges**  | `html/occupant-energy-challenges.html` | **C / R / U**<br>- Trạng thái: Chưa tham gia (`available`), Đang thực hiện (`in-progress`), Hoàn thành (`completed`)                    | AI đề xuất thử thách phù hợp theo thói quen      | **Phùng Viết Tài** |
| **Người sử dụng tòa nhà** | Theo dõi lịch sử tiêu thụ để nhận biết ngày dùng nhiều điện | - Chọn xem 7 hoặc 30 ngày<br>- Xem tổng và trung bình kWh<br>- So sánh trung bình với định mức mẫu | **Energy History** | `html/occupant-energy-history.html` | **R** (Read)<br>- Trạng thái: Có dữ liệu mẫu | Không áp dụng | **Phùng Viết Tài** |
| **Người sử dụng tòa nhà** | Đổi điểm xanh tích lũy thành quà tặng | - Xem danh sách quà và số điểm cần thiết<br>- Đổi quà khi đủ điểm<br>- Xem lịch sử đổi quà | **Rewards** | `html/occupant-rewards.html` | **R / U**<br>- Điểm được trừ khi đổi quà<br>- Lịch sử lưu trong `localStorage` | Không áp dụng | **Phùng Viết Tài** |

---

## 2. Danh sách các màn hình dùng chung ( SV1 đồng phụ trách)

| Vai trò   | Mục tiêu người dùng                                                | Nhiệm vụ người dùng                                                                      | Màn hình               | Tệp (.html)        | Trạng thái giao diện                     | Người phụ trách |
| :-------- | :----------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :--------------------- | :----------------- | :--------------------------------------- | :-------------- |
| **Chung** | Giới thiệu tổng quan hệ thống BTL-36, điều hướng nhanh các vai trò | - Giới thiệu sản phẩm<br>- Chọn vai trò trải nghiệm<br>- Xem liên kết tài liệu & báo cáo | **Portal / Trang chủ** | `index.html`       | Bình thường, Điều hướng tương tác        | SV1 + Nhóm      |
| **Chung** | Xác thực người dùng và phân quyền theo vai trò                     | - Đăng nhập tài khoản<br>- Chuyển vai trò thử nghiệm                                     | **Đăng nhập**          | `html/login.html` | Bình thường, Đang kiểm tra, Lỗi xác thực | Đồng phụ trách  |
| **Chung** | Thông báo lỗi không tìm thấy trang                                 | - Hiển thị hướng dẫn quay lại                                                            | **404 Not Found**      | `html/404.html`   | Trạng thái lỗi 404                       | Đồng phụ trách  |

---

## 3. Bảng kiểm kê màn hình vai trò SV2: Nhân viên vận hành (Operator)

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp (.html) | Thao tác CRUD & Trạng thái | Tính năng AI liên quan | Người phụ trách |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Nhân viên vận hành** | Giám sát phụ tải tức thời theo từng tầng/khu vực và phát hiện nguy cơ quá tải | - Theo dõi công suất kW & kWh thời gian thực<br>- Xem bản đồ lưới các zone cảnh báo<br>- Lọc theo tầng, trạng thái và hệ thống | **Energy Monitor** | `html/operator-energy-monitor.html` | **R** (Read)<br>- Trạng thái: Bình thường, Đang tải, Rỗng, Quá tải đỏ | Tích hợp cảnh báo vượt ngưỡng | **Lê Quang Tiến** |
| **Nhân viên vận hành** | Tiếp nhận, phát hiện và xử lý sự cố bất thường của lưới điện | - Xem danh sách cảnh báo thời gian thực<br>- Quét tìm điểm bất thường (Spike)<br>- Tạo cảnh báo thủ công<br>- Cập nhật tiến độ xử lý sự cố | **Alert Center** | `html/operator-alert-center.html` | **C / R / U**<br>- Trạng thái: Mới (`new`), Đang điều tra (`investigating`), Đã xử lý (`resolved`) | **AI-1: Energy Anomaly Detector** (Phát hiện Spike & nguyên nhân) | **Lê Quang Tiến** |
| **Nhân viên vận hành** | Điều phối và phát hành các lệnh tiết kiệm năng lượng cho các khu vực | - Xem danh sách lệnh điều phối đang chạy<br>- Tạo lệnh tiết kiệm mới (thủ công hoặc từ AI)<br>- Chỉnh sửa mốc áp dụng lệnh<br>- Hủy/Lưu trữ lệnh không còn phù hợp | **Saving Actions** | `html/operator-saving-actions.html` | **C / R / U / D** (Đầy đủ CRUD)<br>- Trạng thái: Đã lên lịch (`scheduled`), Đang chạy (`active`), Hoàn thành (`completed`), Đã hủy | **AI-2: Saving Recommendation** (Gợi ý lệnh tiết kiệm theo zone) | **Lê Quang Tiến** |
| **Nhân viên vận hành** | Điều khiển nhanh thiết bị | - Theo dõi trạng thái tòa nhà hệ thống<br>- Xem bản đồ lưới các zone cảnh báo<br>- Lọc theo tầng, trạng thái và hệ thống | **Zone Live Control** | `html/operator-zone-control.html` | **R** (Read)<br>- Trạng thái: Bình thường, Đang tải, Rỗng, Quá tải đỏ | Tích hợp cảnh báo vượt ngưỡng | **Lê Quang Tiến** |

---

## 4. Bảng kiểm kê màn hình vai trò SV3: Quản lý cơ sở & Quản trị viên (Facility Manager & Admin)

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp (.html) | Thao tác CRUD & Trạng thái | Tính năng AI liên quan | Người phụ trách |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Quản lý cơ sở** | Nắm bắt bức tranh tài chính, chỉ số KPI hiệu quả năng lượng và phát thải $CO_2$ | - Xem các thẻ chỉ số KPI cốt lõi (EUI, chi phí, điểm xanh)<br>- So sánh chi phí thực tế vs ngân sách<br>- Xem xu hướng tiêu thụ tháng | **Energy KPIs** | `html/manager-energy-kpis.html` | **R** (Read)<br>- Trạng thái: Bình thường, Đang tải, Lỗi dữ liệu | Đánh giá đạt chuẩn KPI | **Lê Đức Quang** |
| **Quản lý cơ sở** | So sánh hiệu suất giữa các tầng và chạy mô phỏng kịch bản cắt giảm phụ tải | - So sánh mức tiêu thụ giữa 4 tầng tòa nhà<br>- Chạy mô phỏng giả định What-If<br>- Đánh giá số tiền & $CO_2$ tiết kiệm<br>- Lưu kịch bản làm định mức mới | **Zone Comparison** | `html/manager-zone-comparison.html` | **C / R / U**<br>- Trạng thái: Bình thường, Đang chạy mô phỏng, Lưu thành công | **AI-3: What-If Simulator** (Mô phỏng giảm X% phụ tải) | **Lê Đức Quang** |
| **Quản lý cơ sở** | Lập, thẩm định, phê duyệt và xuất bản báo cáo năng lượng định kỳ | - Xem danh sách báo cáo hàng tháng<br>- Lập báo cáo năng lượng tháng mới<br>- Cập nhật nhận xét & ký duyệt báo cáo<br>- Xóa báo cáo nháp<br>- In ấn / Xuất báo cáo PDF | **Monthly Report** | `html/manager-monthly-report.html` | **C / R / U / D** (Đầy đủ CRUD)<br>- Trạng thái: Bản nháp (`draft`), Đã duyệt (`approved`), Đã lưu trữ | Tóm tắt phân tích định kỳ | **Lê Đức Quang** |
| **Quản trị viên** | Quản lý danh mục các tầng và khu vực chức năng trong tòa nhà | - Xem danh sách các Zone<br>- Thêm khu vực mới<br>- Chỉnh sửa diện tích $m^2$, công suất định mức<br>- Khóa/Kích hoạt khu vực | **Zone Management** | `html/admin-zone-management.html` | **C / R / U / D**<br>- Trạng thái: Đang hoạt động, Tạm khóa | Quản lý cấu hình | **Lê Đức Quang** |
| **Quản trị viên** | Quản lý danh mục cảm biến IoT giả lập và tần suất đo đạc | - Xem danh sách cảm biến IoT<br>- Thêm mới cảm biến đo điện/nhiệt độ<br>- Điều chỉnh thông số & chu kỳ đọc<br>- Bật/Tắt trạng thái Online/Offline mock | **Sensor Management** | `html/admin-sensor-management.html` | **C / R / U / D**<br>- Trạng thái: Online, Offline, Hiệu chuẩn | Mô phỏng nguồn cấp dữ liệu | **Lê Đức Quang** |
| **Quản trị viên** | Quản lý tài khoản hệ thống và phân quyền truy cập 4 vai trò | - Xem danh sách tài khoản<br>- Thêm tài khoản mới<br>- Cập nhật vai trò & phòng ban phụ trách<br>- Khóa/Kích hoạt tài khoản người dùng | **User Management** | `html/admin-user-management.html` | **C / R / U / D**<br>- Trạng thái: Đang hoạt động, Đã khóa | Phân quyền hệ thống | **Lê Đức Quang** |

