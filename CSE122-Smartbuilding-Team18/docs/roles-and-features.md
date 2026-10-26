# ĐẶC TẢ VAI TRÒ & LUỒNG NGHIỆP VỤ HỆ THỐNG (ROLES & FEATURES)
**Dự án:** SmartBuilding – Bảng điều khiển năng lượng và điều phối tiết kiệm (BTL-36)  
**Nhóm thực hiện:** Nhóm 18 (Phùng Viết Tài, Lê Quang Tiến, Lê Đức Quang)  

---

## PHẦN 1: SV1 – NGƯỜI SỬ DỤNG TÒA NHÀ (OCCUPANT)
**Sinh viên phụ trách:** Phùng Viết Tài  

### 1. Mục tiêu và Hành vi của Người sử dụng tòa nhà
Người sử dụng tòa nhà (nhân viên văn phòng, cư dân hoặc người làm việc trong tòa nhà) đóng vai trò trung tâm trong chuỗi tiết kiệm năng lượng:
- **Xem dữ liệu trực quan:** Không cần hiểu các thông số kỹ thuật điện phức tạp; họ cần nhìn thấy lượng điện tiêu thụ quy đổi ra kWh, chi phí ước tính và so sánh với mức trung bình.
- **Tác động hai chiều (Phản hồi tiện nghi):** Nếu phòng quá nóng hoặc quá lạnh (gây lãng phí điều hòa), họ có thể gửi phản hồi để hệ thống điều phối lại nhiệt độ tự động hoặc thủ công.
- **Hành vi hóa tiết kiệm (Gamification):** Tham gia các thử thách tiết kiệm ngắn hạn (ví dụ: tắt đèn buổi trưa, chỉnh điều hòa lên 26°C), tích điểm đổi phần thưởng/huy hiệu.

### 2. Luồng nghiệp vụ chi tiết của 5 màn hình SV1

#### Màn hình 1: Occupant Dashboard (`html/occupant-dashboard.html`) - Thao tác Read (R)
- **Luồng thao tác:**
  1. Người dùng truy cập dashboard.
  2. Hệ thống tải dữ liệu chỉ số điện hôm nay của phòng/khu vực tương ứng.
  3. Hiển thị thẻ thống kê: Điện năng hôm nay (kWh), Xu hướng tăng/giảm so với hôm qua, Điểm tích lũy xanh.
  4. Biểu đồ tiêu thụ theo các mốc giờ trong ngày (xác định giờ cao điểm tiêu thụ nhiều nhất).
  5. Widget "Gợi ý thông minh hôm nay" (AI-2: Saving Recommendation Tips) đưa ra khuyến nghị tức thời.
- **Các trạng thái xử lý:**
  - `Loading`: Khung xương (skeleton loading) khi tải dữ liệu tiêu thụ.
  - `Normal`: Hiển thị đầy đủ số liệu và biểu đồ trực quan.
  - `Alert`: Cảnh báo màu vàng/đỏ khi mức tiêu thụ phòng vượt ngưỡng 120% định mức.
  - `Empty`: Khi chưa có dữ liệu đo đạc từ cảm biến.

#### Màn hình 2: Comfort Feedback (`html/occupant-comfort-feedback.html`) - Đầy đủ C / R / U / D
- **Luồng thao tác:**
  1. **Create (Tạo):** Người dùng điền form phản hồi:
     - Chọn vị trí phòng (VD: Phòng 402, Khu làm việc mở Tầng 4).
     - Phân loại tiện nghi: Nhiệt độ (Quá nóng / Quá lạnh), Chiếu sáng (Thiếu sáng / Thừa sáng lãng phí), Không khí / Tiếng ồn.
     - Mức độ khẩn cấp: Thấp, Bình thường, Cao.
     - Ghi chú chi tiết.
     - Validate form: Kiểm tra bắt buộc chọn danh mục và nội dung ghi chú tối thiểu 10 ký tự.
  2. **Read (Đọc):** Xem danh sách các phản hồi đã gửi dưới dạng thẻ/bảng, có bộ lọc theo trạng thái (`Chờ duyệt`, `Đang xử lý`, `Đã xong`).
  3. **Update (Sửa):** Khi phản hồi còn ở trạng thái `Chờ duyệt`, người dùng có thể bấm nút "Chỉnh sửa" qua modal popup để cập nhật lại thông tin.
  4. **Delete (Xóa/Hủy):** Người dùng có thể xóa hoặc hủy yêu cầu nếu vấn đề đã tự hết. Có hộp thoại xác nhận (Confirm modal).
- **Lưu trữ dữ liệu:** Toàn bộ dữ liệu được quản lý đồng bộ vào `localStorage` (key: `sb_occupant_feedbacks`).

#### Màn hình 3: Energy Challenges (`html/occupant-energy-challenges.html`) - C / R / U
- **Luồng thao tác:**
  1. **Read (Đọc):** Xem danh sách thử thách tiết kiệm năng lượng của tòa nhà (VD: *"Chế độ Eco 26°C"*, *"Giờ Trái Đất văn phòng"*, *"Tắt thiết bị trước khi về"*).
  2. **Create/Join (Tham gia):** Nhấn "Tham gia thử thách" -> Chuyển trạng thái thẻ từ `Chưa tham gia` sang `Đang thực hiện`.
  3. **Update (Cập nhật tiến độ):** 
     - Người dùng cập nhật mốc hoàn thành (ví dụ: ngày 1/5, ngày 2/5).
     - Khi đạt 100%, nhấn "Nhận thưởng" -> Hệ thống cộng điểm thưởng xanh vào tài khoản và cập nhật trạng thái `Đã hoàn thành`.
- **Trạng thái:** Lọc theo tab (Tất cả, Đang tham gia, Đã hoàn thành).

#### Màn hình 4: Energy History (`html/occupant-energy-history.html`) - Read (R)
- Chọn khoảng thời gian 7 ngày hoặc 30 ngày.
- Xem biểu đồ cột, tổng điện năng, mức trung bình mỗi ngày và so sánh với định mức mẫu 15 kWh/ngày.
- Dùng dữ liệu minh họa để người dùng tập đọc xu hướng; màn hình không sửa dữ liệu cảm biến.

#### Màn hình 5: Rewards (`html/occupant-rewards.html`) - Read / Update (R / U)
- Xem số Điểm Xanh hiện có và danh sách quà cùng mức điểm cần đổi.
- Chỉ đổi được quà khi đủ điểm; đổi thành công thì trừ điểm trong `sb_occupant_user`.
- Lịch sử đổi quà được lưu trong `sb_occupant_reward_history` trên `localStorage`.

---

## PHẦN 2: SV2 – NHÂN VIÊN VẬN HÀNH (OPERATOR)
**Sinh viên phụ trách:** Lê Quang Tiến  

### 1. Mục tiêu và Hành vi của Nhân viên vận hành
Nhân viên kỹ thuật/vận hành chịu trách nhiệm đảm bảo hệ thống điện, HVAC và chiếu sáng của toàn tòa nhà hoạt động ổn định và tiết kiệm:
- Giám sát phụ tải tức thời theo từng tầng (Zone Monitor) và hệ thống cảm biến đo đếm.
- Phát hiện sớm các sự cố rò rỉ, quá tải, tiêu thụ bất thường (Spike) bằng thuật toán AI-1.
- Ra quyết định điều phối và phát hành các lệnh tiết kiệm điện (Saving Actions) gửi đến các bộ phận.

### 2. Luồng nghiệp vụ chi tiết của 3 màn hình SV2

#### Màn hình 1: Energy Monitor (`html/operator-energy-monitor.html`) - Thao tác Read (R)
- **Luồng thao tác:**
  1. Nhân viên truy cập màn hình giám sát năng lượng toàn tòa nhà.
  2. Hiển thị tổng công suất tức thời (kW), tổng điện năng tiêu thụ trong ngày (kWh), số khu vực đang hoạt động bình thường vs đang cảnh báo.
  3. Lưới bản đồ trạng thái các Zone (Tầng 1 -> Tầng 4): mã màu xanh (bình thường), vàng (cảnh báo nhẹ), đỏ (quá tải).
  4. Bộ lọc hiển thị: Lọc theo Tầng, Trạng thái hoạt động, Loại phụ tải (Điều hòa HVAC, Chiếu sáng, Ổ cắm).
  5. Xem biểu đồ phụ tải 24 giờ so sánh với đường chuẩn định mức (Baseline).

#### Màn hình 2: Alert Center (`html/operator-alert-center.html`) - C / R / U
- **Luồng thao tác:**
  1. **Read (Đọc):** Xem danh mục các cảnh báo sự cố điện năng thời gian thực.
  2. **Tích hợp AI-1 (Energy Anomaly Detector):** 
     - Nhấn nút "Quét bất thường bằng AI" ➔ Hiển thị thanh tiến trình đang phân tích ➔ Trả về các điểm Spike phát hiện được kèm lý do suy luận.
  3. **Create (Tạo cảnh báo thủ công):** Tạo sự cố mới khi phát hiện bằng mắt thường hoặc qua kiểm tra thực địa.
  4. **Update (Cập nhật trạng thái):** Chuyển trạng thái từ `Chờ xử lý (New)` ➔ `Đang điều tra (Investigating)` ➔ `Đã giải quyết (Resolved)` hoặc `Bác bỏ (Dismissed)`.

#### Màn hình 3: Saving Actions (`html/operator-saving-actions.html`) - Đầy đủ C / R / U / D
- **Luồng thao tác:**
  1. **Read (Đọc):** Xem danh sách các hành động tiết kiệm điện đang được triển khai (ví dụ: *"Tăng nhiệt độ điều hòa Tầng 3 lên 26°C"*, *"Tắt 50% đèn hành lang sau 18h"*).
  2. **Create (Tạo mới):** 
     - Tạo thủ công: Nhập tên hành động, khu vực áp dụng, mức tiết kiệm ước tính (% hoặc kWh), người phụ trách.
     - Tạo từ AI-2 (Saving Recommendation): Bấm chấp nhận đề xuất từ AI để tự động tạo action.
  3. **Update (Sửa):** Điều chỉnh thông số hành động hoặc cập nhật trạng thái tiến độ (`Scheduled` ➔ `In-progress` ➔ `Completed`).
  4. **Delete / Archive (Xóa / Lưu trữ):** Hủy bỏ hành động nếu tình hình thực tế thay đổi; có modal xác nhận trước khi xóa.
- **Lưu trữ dữ liệu:** Đồng bộ hóa vào `localStorage` (key: `sb_operator_actions`).

#### Màn hình 4: Zone Live Control (`html/operator-zone-control.html`) - R / U
- **Luồng thao tác:**
  1. **Read (Đọc):** Xem hệ thống trạng thái tòa nhà (ví dụ: *"Điều khiển chiếu sáng"*, *"Nhiệt độ & HVAC"*).
  2. **Update (Sửa):** Điều chỉnh thông số hành động hoặc cập nhật trạng thái tiến độ (`Scheduled` ➔ `In-progress` ➔ `Completed`).

---

## PHẦN 3: SV3 – QUẢN LÝ CƠ SỞ & QUẢN TRỊ VIÊN (MANAGER & ADMIN)
**Sinh viên phụ trách:** Lê Đức Quang  

### 1. Mục tiêu và Hành vi của Quản lý cơ sở & Quản trị viên
- **Quản lý cơ sở (Facility Manager):** Nắm bắt bức tranh tài chính và môi trường vĩ mô, đánh giá hiệu quả đầu tư công nghệ tiết kiệm điện, ra quyết định chính sách thông qua kịch bản giả định (What-If Simulator).
- **Quản trị viên (Admin):** Quản lý cấu hình danh mục dữ liệu nền tảng của tòa nhà: Khu vực (Zones), Thiết bị cảm biến (Sensors), và Tài khoản người dùng (Users).

### 2. Luồng nghiệp vụ chi tiết của 6 màn hình SV3

#### Màn hình 1: Energy KPIs (`html/manager-energy-kpis.html`) - Thao tác Read (R)
- **Nghiệp vụ:** Theo dõi các chỉ số đo lường hiệu quả cốt lõi: EUI ($kWh/m^2/\text{năm}$), Tổng tiền điện tháng này so với ngân sách dự trù, Tỷ lệ năng lượng xanh, Điểm tuân thủ xanh.
- **Trực quan hóa:** Các thẻ KPI với chỉ báo phần trăm tăng/giảm và biểu đồ radar hoặc xu hướng tháng.

#### Màn hình 2: Zone Comparison (`html/manager-zone-comparison.html`) - C / R / U
- **Nghiệp vụ:** So sánh hiệu quả tiêu thụ điện giữa các khu vực (Tầng 1 vs Tầng 2 vs Tầng 3 vs Tầng 4).
- **Tích hợp AI-3 (What-If Simulator):**
  - Kéo thanh trượt điều chỉnh kịch bản: Giảm % công suất HVAC ở các zone tiêu thụ cao.
  - AI tính toán tức thời: Số kWh tiết kiệm dự kiến, số tiền tiết kiệm hàng tháng (VND), và lượng khí thải $CO_2$ giảm được.
  - Lưu cấu hình giả định làm mốc định mức mới cho tháng tiếp theo.

#### Màn hình 3: Monthly Report (`html/manager-monthly-report.html`) - Đầy đủ C / R / U / D
- **Nghiệp vụ:**
  - **Read:** Xem danh sách các kỳ báo cáo năng lượng hàng tháng.
  - **Create:** Nhấn "Tạo báo cáo tháng mới", chọn tháng, hệ thống tổng hợp tự động số liệu từ mock engine.
  - **Update:** Thêm ý kiến nhận xét của ban quản lý, ký duyệt báo cáo (`Draft` ➔ `Approved`).
  - **Delete:** Xóa báo cáo bản nháp (`Draft`).
  - **Export:** Hỗ trợ tính năng in ấn / xuất bản PDF báo cáo trực tiếp từ trình duyệt (`window.print()`).

#### Màn hình 4: Zone Management (`html/admin-zone-management.html`) - C / R / U / D
- **Nghiệp vụ:** Quản lý danh mục các tầng và khu vực chức năng trong tòa nhà (Tên zone, diện tích $m^2$, số lượng nhân sự, công suất định mức kW, trạng thái hoạt động).

#### Màn hình 5: Sensor Management (`html/admin-sensor-management.html`) - C / R / U / D
- **Nghiệp vụ:** Quản lý thiết bị đo đếm IoT (Mã cảm biến, loại cảm biến: Đo điện/Nhiệt độ/Độ ẩm/Ánh sáng, vị trí lắp đặt, tần suất đọc dữ liệu, trạng thái kết nối Online/Offline).

#### Màn hình 6: User Management (`html/admin-user-management.html`) - C / R / U / D
- **Nghiệp vụ:** Quản lý tài khoản hệ thống (Họ tên, email, vai trò: Occupant / Operator / Facility Manager / Admin, trạng thái kích hoạt, phân quyền khu vực quản lý).
