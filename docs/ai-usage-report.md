# BÁO CÁO KHAI BÁO SỬ DỤNG AI (AI USAGE REPORT)
**Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
**Đề tài (BTL-36):** SmartBuilding – Bảng điều khiển năng lượng & Điều phối tiết kiệm  
**Nhóm thực hiện:** Nhóm 18 (Phùng Viết Tài, Lê Quang Tiến, Lê Đức Quang)  

---

## 1. Danh sách các công cụ AI hỗ trợ sử dụng trong dự án

| Công cụ AI | Mục đích sử dụng | Thành viên sử dụng |
| :--- | :--- | :--- |
| **Google Gemini / Antigravity Assistant** | Hỗ trợ lên cấu trúc tài liệu, tư vấn mô hình dữ liệu IoT, sinh code khởi tạo HTML/CSS và giải thuật mô phỏng quy tắc AI. | Cả nhóm |
| **GitHub Copilot / Cursor** | Hỗ trợ gợi ý tự động hoàn thành cú pháp DOM JavaScript, CSS media queries. | Cả nhóm |
| **ChatGPT (OpenAI)** | Hỗ trợ dịch thuật thuật ngữ kỹ thuật năng lượng sang tiếng Việt và chuẩn hóa nội dung mẫu. | Phùng Viết Tài |

---

## 2. Nhật ký câu lệnh (Prompts), Mã nguồn sinh ra & Phần sinh viên chỉnh sửa

### 2.1. Khởi tạo Mô hình dữ liệu & Hệ thống màu sắc (Design System)
- **Câu lệnh chính (Prompt):**
  > *"Hãy xây dựng một bảng mã màu CSS chuyên nghiệp theo phong cách Green Tech / Smart Energy Dashboard (nền tối Slate, điểm nhấn xanh ngọc lục bảo Emerald, vàng cảnh báo và đỏ nguy cấp). Đồng thời tạo mock data JSON gồm 4 tầng, danh sách các cảm biến nhiệt độ, công suất điện và các sự kiện cảnh báo vượt ngưỡng."*
- **Phần AI sinh ra:**
  - Bộ biến CSS `:root` chứa màu sắc cơ bản và cấu trúc đối tượng `zones`, `sensors`, `alerts` ban đầu trong file JS.
- **Phần sinh viên chỉnh sửa & tối ưu hóa:**
  - Tinh chỉnh lại độ tương phản màu sắc đạt chuẩn WCAG AA cho văn bản chữ nhỏ.
  - Chuẩn hóa lại các trường dữ liệu IoT cho sát với bài toán BTL-36 (bổ sung trường `powerRatingKw`, `currentConsumptionKwh`, `baselineNormKwh`, `status: 'normal' | 'investigating' | 'resolved'`).

### 2.2. Xử lý Logic CRUD & Đồng bộ LocalStorage
- **Câu lệnh chính (Prompt):**
  > *"Viết hàm JavaScript thuần để quản lý danh sách phản hồi tiện nghi (Comfort Feedback) lưu vào LocalStorage, hỗ trợ thêm mới, sửa khi trạng thái còn pending, hủy và xóa, đồng thời có validate form không cho phép để trống."*
- **Phần AI sinh ra:**
  - Đoạn code mẫu thao tác `JSON.parse` và `JSON.stringify` trên `localStorage`.
- **Lỗi AI gặp phải:**
  - AI khởi tạo mảng tĩnh mỗi lần tải trang khiến dữ liệu người dùng vừa thêm bị ghi đè lại bởi dữ liệu mặc định ban đầu.
  - Form validation của AI dùng lệnh `alert()` truyền thống của trình duyệt, gây gián đoạn trải nghiệm người dùng và không đúng yêu cầu thẩm mỹ của đồ án.
- **Cách sinh viên kiểm chứng & khắc phục:**
  - Sinh viên viết lại hàm kiểm tra: nếu `localStorage.getItem('sb_occupant_feedbacks')` chưa có thì mới nạp dữ liệu mẫu ban đầu, ngược lại thì ưu tiên lấy dữ liệu từ bộ nhớ trình duyệt.
  - Thay thế toàn bộ `alert()` bằng hệ thống thẻ thông báo nổi tùy biến (Toast Notification) và hiển thị dòng chữ báo lỗi màu đỏ ngay dưới từng ô nhập liệu (`input.is-invalid`).

### 2.3. Hiện thực 3 Tính năng AI mô phỏng (AI Features)
- **Mô tả triển khai theo yêu cầu môn học:**
  - **AI-1: Energy Anomaly Detector (Phát hiện Spike bất thường):**
    - *Giải thuật sinh viên xây dựng:* Quét công suất tiêu thụ của các zone theo giờ. Nếu $P_{\text{thực tế}} > 1.35 \times P_{\text{định mức}}$, kích hoạt cờ bất thường và sinh chuỗi giải thích nguyên nhân dựa trên quy tắc nghiệp vụ (Rule-based Inference Engine).
  - **AI-2: Saving Recommendation (Gợi ý tiết kiệm điện):**
    - *Mô phỏng:* Sinh viên xây dựng bộ quy tắc gợi ý thông minh dựa trên điều kiện thời tiết (Nhiệt độ ngoài trời > 32°C thì tăng nhiệt độ điều hòa lên 26°C; giờ trưa 12h-13h30 thì đề xuất tắt đèn khu vực làm việc chung).
  - **AI-3: What-If Simulator (Mô phỏng giả định):**
    - *Mô phỏng:* Hàm tính toán động dựa trên công thức vật lý: Khi người dùng kéo thanh trượt giảm % công suất, tính toán lượng kWh giảm trừ, số tiền tiết kiệm được theo đơn giá điện bình quân 2.200 đ/kWh và khối lượng khí thải $CO_2$ giảm được ($0.85 \text{ kg } CO_2 / \text{kWh}$).
- **Quy chuẩn trải nghiệm AI bắt buộc đã thực hiện:**
  - Có đủ trạng thái: Người dùng bấm phân tích ➔ Hiển thị hiệu ứng chờ/khung xương (Loading/Skeleton 1 - 1.5 giây để tạo cảm giác suy luận thông minh) ➔ Hiển thị kết luận & bảng giải thích nguyên nhân ➔ Nút cho phép người dùng **"Chấp nhận áp dụng"**, **"Chỉnh sửa thông số"** hoặc **"Bỏ qua"**.
  - Có nút mô phỏng tình huống **"AI thất bại"** để kiểm chứng giao diện xử lý lỗi thân thiện.

---

## 3. Phân định ranh giới: Tính năng Mock vs Gọi API thật

| Tính năng | Phương thức triển khai | Lý do lựa chọn |
| :--- | :---: | :--- |
| **Dữ liệu đo đạc cảm biến (Readings, Sensors, Zones)** | **Mock Engine + LocalStorage** | Đảm bảo hệ thống chạy mượt mà độc lập, không phụ thuộc vào hạ tầng IoT phần cứng hoặc mạng Internet chập chờn khi bảo vệ bài tập lớn. |
| **Lưu trữ dữ liệu nghiệp vụ (CRUD Feedback, Actions, Challenges)** | **LocalStorage 2 chiều** | Dữ liệu được lưu trữ trực tiếp trên trình duyệt, tải lại trang F5 vẫn giữ nguyên trạng thái, minh chứng rõ ràng thao tác người dùng. |
| **Thuật toán phân tích AI (Anomaly, Recommendations, What-If)** | **Mô phỏng Frontend (Rule-based & Dynamic Calculations)** | Phù hợp với năng lực môn Frontend cơ bản, kiểm soát được 100% kịch bản kiểm thử và câu hỏi vấn đáp trực tiếp từ giảng viên. |
| **Mở rộng API LLM thật (Tùy chọn)** | **Sẵn sàng tích hợp qua `fetch()`** | Cấu trúc code được mô-đun hóa sẵn sàng gọi API Gemini Flash nếu nhóm chọn bảo vệ tính năng điểm cộng. |

---

## 4. Bài học & Kinh nghiệm rút ra của Sinh viên

1. **Hiểu rõ bản chất thay vì phụ thuộc công cụ:** AI là trợ lý lập trình đắc lực giúp tăng tốc độ viết khung mã nguồn, nhưng sinh viên phải làm chủ hoàn toàn kiến trúc DOM, quy tắc CSS và luồng nghiệp vụ để có thể tự tay sửa lỗi và trả lời vấn đáp trực tiếp của thầy cô.
2. **Kỹ năng Prompting chính xác:** Càng đặc tả rõ ràng ràng buộc kỹ thuật (ví dụ: *không dùng thư viện ngoài, chỉ dùng Vanilla CSS và Vanilla JS, lưu LocalStorage*) thì mã nguồn AI sinh ra càng sạch và hạn chế tối đa việc phải viết lại.
3. **Tầm quan trọng của trải nghiệm thất bại (Edge Cases):** Khi làm việc thực tế, một tính năng AI tốt không chỉ ở lúc trả về kết quả đẹp, mà phải biết xử lý tử tế khi dữ liệu bị thiếu hoặc thuật toán gặp sự cố.
