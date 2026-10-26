# BÁO CÁO KHAI BÁO SỬ DỤNG AI (AI USAGE REPORT)

**Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
**Đề tài (BTL-36):** SmartBuilding – Bảng điều khiển năng lượng & Điều phối tiết kiệm  
**Nhóm thực hiện:** Nhóm 18 (Phùng Viết Tài, Lê Quang Tiến, Lê Đức Quang)

---

## 1. Danh sách các công cụ AI hỗ trợ sử dụng trong dự án

| Công cụ AI                                | Mục đích sử dụng                                                                                                         | Thành viên sử dụng |
| :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :----------------- |
| **Google Gemini / Antigravity Assistant** | Hỗ trợ lên cấu trúc tài liệu, tư vấn mô hình dữ liệu IoT, sinh code khởi tạo HTML/CSS và giải thuật mô phỏng quy tắc AI. | Cả nhóm            |
| **GitHub Copilot / Cursor**               | Hỗ trợ gợi ý tự động hoàn thành cú pháp DOM JavaScript, CSS media queries.                                               | Cả nhóm            |
| **ChatGPT (OpenAI)**                      | Hỗ trợ dịch thuật thuật ngữ kỹ thuật năng lượng sang tiếng Việt và chuẩn hóa nội dung mẫu.                               | Phùng Viết Tài     |
| **Claude (Anthropic)**                    | Hỗ trợ tra cứu, giải thích và gợi ý trong quá trình lập trình dự án.                                                     | Lê Quang Tiến      |
| **ChatGPT (OpenAI)**                      | Hỗ trợ giải thích JavaScript và gợi ý xử lý mã nguồn trong phạm vi dự án.                                                | Lê Đức Quang       |

---

## 2. Nhật ký câu lệnh (Prompts), Mã nguồn sinh ra & Phần sinh viên chỉnh sửa

### 2.1. Khởi tạo Mô hình dữ liệu & Hệ thống màu sắc (Design System)

- **Câu lệnh chính (Prompt):**
  > _"Hãy xây dựng một bảng mã màu CSS chuyên nghiệp theo phong cách Green Tech / Smart Energy Dashboard (nền tối Slate, điểm nhấn xanh ngọc lục bảo Emerald, vàng cảnh báo và đỏ nguy cấp). Đồng thời tạo mock data JSON gồm 4 tầng, danh sách các cảm biến nhiệt độ, công suất điện và các sự kiện cảnh báo vượt ngưỡng."_
- **Phần AI sinh ra:**
  - Bộ biến CSS `:root` chứa màu sắc cơ bản và cấu trúc đối tượng `zones`, `sensors`, `alerts` ban đầu trong file JS.
- **Phần sinh viên chỉnh sửa & tối ưu hóa:**
  - Tinh chỉnh lại độ tương phản màu sắc đạt chuẩn WCAG AA cho văn bản chữ nhỏ.
  - Chuẩn hóa lại các trường dữ liệu IoT cho sát với bài toán BTL-36 (bổ sung trường `powerRatingKw`, `currentConsumptionKwh`, `baselineNormKwh`, `status: 'normal' | 'investigating' | 'resolved'`).

### 2.2. Xử lý Logic CRUD & Đồng bộ LocalStorage

- **Câu lệnh chính (Prompt):**
  > _"Viết hàm JavaScript thuần để quản lý danh sách phản hồi tiện nghi (Comfort Feedback) lưu vào LocalStorage, hỗ trợ thêm mới, sửa khi trạng thái còn pending, hủy và xóa, đồng thời có validate form không cho phép để trống."_
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
    - _Giải thuật sinh viên xây dựng:_ Quét công suất tiêu thụ của các zone theo giờ. Nếu $P_{\text{thực tế}} > 1.35 \times P_{\text{định mức}}$, kích hoạt cờ bất thường và sinh chuỗi giải thích nguyên nhân dựa trên quy tắc nghiệp vụ (Rule-based Inference Engine).
  - **AI-2: Saving Recommendation (Gợi ý tiết kiệm điện):**
    - _Mô phỏng:_ Sinh viên xây dựng bộ quy tắc gợi ý thông minh dựa trên điều kiện thời tiết (Nhiệt độ ngoài trời > 32°C thì tăng nhiệt độ điều hòa lên 26°C; giờ trưa 12h-13h30 thì đề xuất tắt đèn khu vực làm việc chung).
  - **AI-3: What-If Simulator (Mô phỏng giả định):**
    - _Mô phỏng:_ Hàm tính toán động dựa trên công thức vật lý: Khi người dùng kéo thanh trượt giảm % công suất, tính toán lượng kWh giảm trừ, số tiền tiết kiệm được theo đơn giá điện bình quân 2.200 đ/kWh và khối lượng khí thải $CO_2$ giảm được ($0.85 \text{ kg } CO_2 / \text{kWh}$).
- **Quy chuẩn trải nghiệm AI bắt buộc đã thực hiện:**
  - Có đủ trạng thái: Người dùng bấm phân tích ➔ Hiển thị hiệu ứng chờ/khung xương (Loading/Skeleton 1 - 1.5 giây để tạo cảm giác suy luận thông minh) ➔ Hiển thị kết luận & bảng giải thích nguyên nhân ➔ Nút cho phép người dùng **"Chấp nhận áp dụng"**, **"Chỉnh sửa thông số"** hoặc **"Bỏ qua"**.
  - Có nút mô phỏng tình huống **"AI thất bại"** để kiểm chứng giao diện xử lý lỗi thân thiện.

---

## 3. Phân định ranh giới: Tính năng Mock vs Gọi API thật

| Tính năng                                                          |                  Phương thức triển khai                   | Lý do lựa chọn                                                                                                                        |
| :----------------------------------------------------------------- | :-------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Dữ liệu đo đạc cảm biến (Readings, Sensors, Zones)**             |              **Mock Engine + LocalStorage**               | Đảm bảo hệ thống chạy mượt mà độc lập, không phụ thuộc vào hạ tầng IoT phần cứng hoặc mạng Internet chập chờn khi bảo vệ bài tập lớn. |
| **Lưu trữ dữ liệu nghiệp vụ (CRUD Feedback, Actions, Challenges)** |                 **LocalStorage 2 chiều**                  | Dữ liệu được lưu trữ trực tiếp trên trình duyệt, tải lại trang F5 vẫn giữ nguyên trạng thái, minh chứng rõ ràng thao tác người dùng.  |
| **Thuật toán phân tích AI (Anomaly, Recommendations, What-If)**    | **Mô phỏng Frontend (Rule-based & Dynamic Calculations)** | Phù hợp với năng lực môn Frontend cơ bản, kiểm soát được 100% kịch bản kiểm thử và câu hỏi vấn đáp trực tiếp từ giảng viên.           |
| **Mở rộng API LLM thật (Tùy chọn)**                                |            **Sẵn sàng tích hợp qua `fetch()`**            | Cấu trúc code được mô-đun hóa sẵn sàng gọi API Gemini Flash nếu nhóm chọn bảo vệ tính năng điểm cộng.                                 |

---

## 4. Bài học & Kinh nghiệm rút ra của Sinh viên

1. **Hiểu rõ bản chất thay vì phụ thuộc công cụ:** AI là trợ lý lập trình đắc lực giúp tăng tốc độ viết khung mã nguồn, nhưng sinh viên phải làm chủ hoàn toàn kiến trúc DOM, quy tắc CSS và luồng nghiệp vụ để có thể tự tay sửa lỗi và trả lời vấn đáp trực tiếp của thầy cô.
2. **Kỹ năng Prompting chính xác:** Càng đặc tả rõ ràng ràng buộc kỹ thuật (ví dụ: _không dùng thư viện ngoài, chỉ dùng Vanilla CSS và Vanilla JS, lưu LocalStorage_) thì mã nguồn AI sinh ra càng sạch và hạn chế tối đa việc phải viết lại.
3. **Tầm quan trọng của trải nghiệm thất bại (Edge Cases):** Khi làm việc thực tế, một tính năng AI tốt không chỉ ở lúc trả về kết quả đẹp, mà phải biết xử lý tử tế khi dữ liệu bị thiếu hoặc thuật toán gặp sự cố.

---

## 5. Bổ sung khai báo sử dụng AI cho JavaScript

**Học phần:** Phát triển ứng dụng Web cơ bản – CSE122  
**Đề tài:** BTL-36 SmartBuilding – Bảng điều khiển năng lượng và điều phối tiết kiệm  
**Nhóm:** 18 – Phùng Viết Tài (SV1), Lê Quang Tiến (SV2), Lê Đức Quang (SV3)

### 5.1. Công cụ AI dùng để hỗ trợ JavaScript

| Công cụ                               | Phạm vi hỗ trợ được khai báo                                                                                       | Thành viên      |
| :------------------------------------ | :----------------------------------------------------------------------------------------------------------------- | :-------------- |
| Google Gemini / Antigravity Assistant | Gợi ý cấu trúc dữ liệu mẫu, thuật toán JavaScript theo quy tắc nghiệp vụ và cách xử lý dữ liệu ở phía trình duyệt. | Cả 3 thành viên |
| GitHub Copilot / Cursor               | Gợi ý cú pháp JavaScript, thao tác DOM, xử lý sự kiện và hoàn thiện các đoạn mã lặp.                               | Cả 3 thành viên |

AI được dùng như công cụ hỗ trợ. Mỗi thành viên chịu trách nhiệm xem lại, điều chỉnh và giải thích phần mã JavaScript trong phạm vi mình phụ trách.

### 5.2. AI hỗ trợ học JavaScript và kiến thức nhóm tiếp thu

Nhóm hiện mới được học các kiến thức cơ bản về Java. Khi thực hiện dự án web bằng JavaScript, nhóm còn thiếu kinh nghiệm với cú pháp và các API chạy trên trình duyệt. Vì vậy, nhóm sử dụng AI ngoài việc gợi ý mã còn để giải thích khái niệm, phân tích từng bước xử lý, chỉ ra lỗi và đề xuất cách tự kiểm tra. Nhóm đọc, thử nghiệm và chỉnh sửa các gợi ý trong dự án trước khi sử dụng.

Qua quá trình này, các thành viên có cơ hội thực hành và hiểu thêm:

- Cách khai báo biến, viết hàm, dùng điều kiện và vòng lặp trong JavaScript; nhận biết một số điểm khác nhau giữa Java và JavaScript dù hai ngôn ngữ có tên gần giống nhau.
- Cách biểu diễn dữ liệu bằng mảng và object, duyệt/lọc dữ liệu và cập nhật trạng thái.
- Cách chọn và cập nhật phần tử DOM, gắn sự kiện cho nút và biểu mẫu, kiểm tra dữ liệu nhập và phản hồi lỗi cho người dùng.
- Cách tổ chức các thao tác thêm, xem, sửa, xóa (CRUD) và lưu/đọc dữ liệu phía trình duyệt bằng `localStorage`.
- Cách đọc thông báo lỗi trong console, lần theo luồng xử lý, thử các trường hợp dữ liệu khác nhau và kiểm tra trạng thái sau khi tải lại trang.

Đây là những kiến thức nhóm đã tiếp xúc và thực hành trong phạm vi dự án, không có nghĩa là tất cả thành viên đã thành thạo JavaScript. Nhóm vẫn cần tiếp tục tự học và có trách nhiệm giải thích được phần mã mình sử dụng.

### 5.3. Khai báo theo thành viên

#### SV1 – Phùng Viết Tài

**Phạm vi JavaScript:**

- `javascript/occupant-dashboard.js`
- `javascript/occupant-comfort-feedback.js`
- `javascript/occupant-energy-challenges.js`
- `javascript/occupant-energy-history.js`
- `javascript/occupant-rewards.js`
- `javascript/forgot-password.js`

**AI hỗ trợ:** Gợi ý cách kết xuất dữ liệu lên giao diện bằng DOM, xử lý sự kiện trên các màn hình Occupant, kiểm tra dữ liệu biểu mẫu, cập nhật trạng thái thử thách/điểm thưởng và lưu dữ liệu nghiệp vụ bằng `localStorage`.

**Prompt tiêu biểu (diễn giải):** “Hỗ trợ xây dựng JavaScript thuần cho luồng phản hồi tiện nghi: kiểm tra dữ liệu nhập, thêm/sửa/hủy phản hồi, cập nhật danh sách và lưu trạng thái bằng `localStorage`.”

**Phần sinh viên kiểm tra và hoàn thiện:** Đối chiếu các trường dữ liệu với biểu mẫu và dữ liệu mẫu; kiểm tra luồng tạo, sửa, hủy và tải lại trang; chỉnh cách hiển thị lỗi và thông báo để phù hợp với giao diện của dự án. Báo cáo cũ ghi nhận bản gợi ý ban đầu có thể nạp lại dữ liệu mẫu và dùng `alert()`; nhóm đã điều chỉnh để giữ dữ liệu người dùng và dùng thông báo trong giao diện.

#### SV2 – Lê Quang Tiến

**Phạm vi JavaScript:**

- `javascript/data.js`
- `javascript/main.js`
- `javascript/login.js`
- `javascript/settings.js`
- `javascript/operator-energy-monitor.js`
- `javascript/operator-alert-center.js`
- `javascript/operator-saving-actions.js`
- `javascript/operator-zone-control.js`

**AI hỗ trợ:** Gợi ý cấu trúc dữ liệu mẫu cho Zone, cảm biến, cảnh báo và hành động; cú pháp đọc/ghi `localStorage`; cách tổ chức hàm tiện ích dùng chung, xử lý sự kiện DOM, tìm kiếm/lọc, modal/toast và kiểm tra dữ liệu nhập.

**Prompt tiêu biểu (diễn giải):** “Gợi ý cách tổ chức dữ liệu mẫu và các hàm JavaScript dùng chung để nạp/lưu dữ liệu theo khóa `sb_*`, đồng thời hỗ trợ tìm kiếm kết hợp bộ lọc trên danh sách vận hành.”

**Phần sinh viên kiểm tra và hoàn thiện:** Kiểm tra tên khóa lưu trữ và cấu trúc dữ liệu giữa các màn hình; điều chỉnh để dữ liệu đã thay đổi không bị ghi đè bởi dữ liệu mẫu khi tải lại; kiểm tra các thao tác lọc và cập nhật trạng thái với dữ liệu của hệ thống.

#### SV3 – Lê Đức Quang

**Phạm vi JavaScript:**

- `javascript/manager-data.js`
- `javascript/manager-energy-kpis.js`
- `javascript/manager-zone-comparison.js`
- `javascript/manager-monthly-report.js`
- `javascript/admin-zone-management.js`
- `javascript/admin-sensor-management.js`
- `javascript/admin-user-management.js`
- `javascript/profile.js`

**AI hỗ trợ:** Gợi ý công thức và cấu trúc hàm JavaScript cho KPI, so sánh khu vực, mô phỏng What-If, báo cáo và các thao tác CRUD của trang quản trị; gợi ý trạng thái xử lý, giải thích kết quả và phương án dự phòng khi mô phỏng không có đủ dữ liệu.

**Prompt tiêu biểu (diễn giải):** “Hỗ trợ viết hàm JavaScript tính lượng điện, chi phí và CO₂ tiết kiệm theo phần trăm tải; kiểm tra giới hạn đầu vào, hiển thị trạng thái xử lý, giải thích kết quả và lưu kịch bản được chấp nhận.”

**Phần sinh viên kiểm tra và hoàn thiện:** Kiểm tra công thức với đơn giá và hệ số phát thải được khai báo trong dự án; điều chỉnh giới hạn đầu vào; kiểm tra trạng thái và dữ liệu sau khi lưu; rà soát các thao tác CRUD và kết quả sau khi tải lại trang.

### 5.4. Giới hạn và trách nhiệm

- Các tính năng AI của sản phẩm là mô phỏng bằng JavaScript theo quy tắc và dữ liệu mẫu; đây không phải kết quả từ một mô hình AI đang chạy trong ứng dụng.
- AI có thể gợi ý mã chưa phù hợp hoặc có lỗi. Nhóm chịu trách nhiệm kiểm tra cách mã tương tác với DOM, dữ liệu mẫu và `localStorage` trước khi sử dụng.
- Thành viên phải tự giải thích được và tự chỉnh sửa phần JavaScript mình phụ trách trong buổi bảo vệ.
- Tài liệu này chỉ khai báo hỗ trợ AI cho JavaScript; các nội dung khác tiếp tục được trình bày trong `docs/ai-usage-report.md`.

### 5.5. Xác nhận của nhóm

Nhóm xác nhận nội dung trên phản ánh việc sử dụng AI hỗ trợ JavaScript trong dự án. Nếu prompt hoặc công cụ thực tế của thành viên khác với phần diễn giải, nhóm sẽ sửa lại cho đúng trước khi nộp.

| Thành viên     | Vai trò | Xác nhận |
| :------------- | :------ | :------- |
| Phùng Viết Tài | SV1     | Tài      |
| Lê Quang Tiến  | SV2     | Tiến     |
| Lê Đức Quang   | SV3     | Quang    |
