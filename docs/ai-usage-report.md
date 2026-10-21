# BÁO CÁO KHAI BÁO SỬ DỤNG AI (AI USAGE REPORT)

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Đề tài (BTL-36):** SmartBuilding – Bảng điều khiển năng lượng & Điều phối tiết kiệm  
> **Nhóm thực hiện:** Nhóm 18  
> **Thành viên:** Phùng Viết Tài (SV1), Lê Quang Tiến (SV2), Lê Đức Quang (SV3)  
> **Triết lý:** *"AI là công cụ trợ lực giúp đi nhanh hơn; sinh viên làm chủ 100% kiến trúc, logic nghiệp vụ, sửa lỗi và chịu trách nhiệm về mã nguồn."*

---

## 1. TỔNG HỢP CÁC CÔNG CỤ AI ĐÃ SỬ DỤNG

| Tên công cụ AI | Phiên bản / Môi trường | Mục đích sử dụng chính trong dự án | Thành viên sử dụng |
| :--- | :--- | :--- | :---: |
| **Google Gemini / Antigravity** | Gemini 1.5 Pro / Flash | Tư vấn kiến trúc bài toán IoT Tòa nhà thông minh, gợi ý bảng mã màu Design System, sinh khung HTML/CSS ban đầu và tư vấn công thức tính toán vật lý ($CO_2$, tiền điện). | Cả 3 thành viên |
| **GitHub Copilot / Cursor** | IDE Plugin | Gợi ý tự động hoàn thành cú pháp lặp mảng ES6, các bộ chọn sự kiện DOM và media queries CSS. | Cả 3 thành viên |
| **ChatGPT (OpenAI)** | GPT-4o | Hỗ trợ biên dịch thuật ngữ chuyên ngành năng lượng (HVAC, EUI, Baseline, Peak load) và rà soát lỗi chính tả tài liệu. | Phùng Viết Tài (SV1) |

---

## 2. BẢNG ĐỐI CHIẾU CHI TIẾT THEO MÀN HÌNH & THÀNH VIÊN

| STT | Màn hình / Tệp | Thành viên | Câu lệnh Prompt chính | Phần AI sinh ra ban đầu | Lỗi / Hạn chế của AI phát hiện được | Phần Sinh viên tự kiểm chứng & Chỉnh sửa |
| :-: | :--- | :---: | :--- | :--- | :--- | :--- |
| **1** | `index.html`<br>`css/style.css` | **SV1**<br>Phùng Viết Tài | *"Tạo hệ thống Design System CSS Dark Green Tech cho bảng điều khiển năng lượng tòa nhà, gồm biến :root cho màu sắc và thẻ card."* | Bộ biến màu `:root` cơ bản và layout Grid mẫu. | Màu chữ trên nền tối bị thiếu độ tương phản (< 3:1), không đạt chuẩn tiếp cận WCAG AA. | Sinh viên đo lại độ tương phản qua Chrome DevTools, chỉnh lại `--text-muted: #94a3b8` và `--emerald-400: #34d399` đạt chuẩn $\ge 4.5:1$. |
| **2** | `html/occupant-dashboard.html`<br>`javascript/occupant-dashboard.js` | **SV1**<br>Phùng Viết Tài | *"Viết giao diện dashboard người dùng tòa nhà có biểu đồ cột thể hiện điện năng 24h và thẻ gợi ý AI."* | Biểu đồ dùng thẻ `<div>` tĩnh với chiều cao cố định gõ cứng (hardcoded). | Biểu đồ không co giãn theo tỷ lệ dữ liệu thực tế, các gợi ý AI không có trạng thái nạp dữ liệu. | Sinh viên viết lại hàm tính toán động tỷ lệ `%` chiều cao theo giá trị cực đại `maxKwh * 1.15`, thêm hiệu ứng tooltip khi hover và gắn sự kiện cộng điểm xanh. |
| **3** | `html/occupant-comfort-feedback.html`<br>`javascript/occupant-comfort-feedback.js` | **SV1**<br>Phùng Viết Tài | *"Viết form gửi phản hồi tiện nghi (nhiệt độ, ánh sáng) và bảng hiển thị danh sách có sửa, xóa."* | Đoạn code JavaScript thao tác mảng và in danh sách ra bảng qua `innerHTML`. | **Lỗi bảo mật nghiêm trọng XSS:** AI nối chuỗi trực tiếp từ ô input người dùng vào `innerHTML` (`item.room`, `item.description`). Khi nhập `<img src=x onerror=alert(1)>` bị bật alert. | Sinh viên phát hiện lỗ hổng theo Barem VP-02, bọc toàn bộ dữ liệu người dùng qua hàm `escapeHtml()`, thay `alert()` mặc định bằng Toast Notification và Form Error Message dưới từng ô. |
| **4** | `html/operator-energy-monitor.html`<br>`javascript/operator-energy-monitor.js` | **SV2**<br>Lê Quang Tiến | *"Tạo giao diện giám sát năng lượng các zone, có biểu đồ phụ tải 24h và bảng lọc kết hợp tìm kiếm."* | Hàm tìm kiếm từ khóa `keyword` và hàm lọc trạng thái viết riêng rẽ, không kết hợp được. | Khi chọn lọc trạng thái thì bị mất kết quả tìm kiếm từ khóa (bộ lọc hoạt động rời rạc, vi phạm Barem 5.1). | Sinh viên gộp chung logic lọc vào hàm `renderTable()`, lắng nghe đồng thời sự kiện `oninput` của ô tìm kiếm và `onchange` của thẻ select. |
| **5** | `html/operator-alert-center.html`<br>`javascript/operator-alert-center.js` *(AI-1)* | **SV2**<br>Lê Quang Tiến | *"Xây dựng tính năng AI phát hiện điểm tiêu thụ bất thường (Spike) khi tải vượt quá 135% định mức."* | Hàm JavaScript quét mảng và trả về kết quả ngay lập tức dưới dạng text thông báo thô sơ. | Thiếu hoàn toàn quy chuẩn trải nghiệm AI UX 6 bước: không có trạng thái chờ (Loading), không có phần giải thích lý do ("Why"), không có nút kiểm soát. | Sinh viên xây dựng quy trình 6 bước: Hiển thị Skeleton loading 1.2s ➔ Bảng kết quả thẻ Card ➔ Khối Explainability ➔ Nút Chấp nhận/Bác bỏ/Thủ công ➔ Cập nhật thật vào mảng `alerts` trong `localStorage`. Bổ sung nút chuyển đổi mô phỏng AI lỗi (`toggleAiFail`). |
| **6** | `html/operator-saving-actions.html`<br>`javascript/operator-saving-actions.js` *(AI-2)* | **SV2**<br>Lê Quang Tiến | *"Viết tính năng AI gợi ý lệnh tiết kiệm điện dựa trên nhiệt độ ngoài trời và khung giờ làm việc."* | AI đề xuất hàm trả về một chuỗi văn bản gợi ý chung chung, không gắn với entity khu vực (zone). | Không kiểm tra hợp lệ dữ liệu nhập (nhiệt độ âm hoặc > 50°C vẫn nhận), không liên kết với bảng CRUD hành động. | Sinh viên bổ sung validation nhiệt độ (10°C - 45°C), xây dựng thuật toán suy luận theo ngữ cảnh (nhiệt độ > 32°C tăng điều hòa 26°C, giờ trưa tắt đèn), cho phép người dùng bấm "Chỉnh sửa" để điền gợi ý vào form trước khi lưu. |
| **7** | `html/manager-zone-comparison.html`<br>`javascript/manager-zone-comparison.js` *(AI-3)* | **SV3**<br>Lê Đức Quang | *"Xây dựng công cụ What-If Simulator cho phép người quản lý kéo thanh trượt giảm % phụ tải để tính tiền và CO2 tiết kiệm."* | Đoạn code sử dụng công thức tính toán đơn giản nhưng không kiểm tra ràng buộc thanh trượt, không lưu được kịch bản. | Giá trị phần trăm có thể bị kéo về 0 hoặc vượt quá 100%, kết quả tính toán không quy đổi đúng đơn giá tiền điện (VND) và hệ số phát thải. | Sinh viên giới hạn thanh trượt từ 1% đến 50%, áp dụng đơn giá điện bình quân 2.200 đ/kWh và hệ số $0.85 \text{ kg } CO_2/\text{kWh}$, bổ sung lưu kịch bản vào danh sách để theo dõi. |
| **8** | `html/manager-monthly-report.html`<br>`javascript/manager-monthly-report.js` | **SV3**<br>Lê Đức Quang | *"Tạo trang quản lý báo cáo năng lượng tháng, hỗ trợ ký duyệt và in ấn báo cáo."* | Khung HTML cơ bản có nút bấm nhưng khi in bằng `window.print()` thì toàn bộ sidebar, navbar và nút bấm đều bị in ra giấy làm vỡ trang. | Bản in PDF xấu, lộn xộn các thành phần điều hướng không cần thiết. | Sinh viên bổ sung CSS `@media print { .no-print, .sidebar, .topbar { display: none !important; } }`, tối ưu layout báo cáo khổ giấy A4 sạch sẽ, bổ sung tính năng xuất file CSV dữ liệu. |
| **9** | `html/admin-*-management.html`<br>`javascript/admin-*.js` | **SV3**<br>Lê Đức Quang | *"Viết 3 màn hình CRUD quản trị danh mục: Khu vực (Zones), Cảm biến IoT (Sensors), Người dùng (Users)."* | Khung bảng HTML và hàm thêm sửa xóa lưu vào biến mảng bộ nhớ RAM (mất sạch khi F5). | Tải lại trang (F5) toàn bộ dữ liệu vừa thêm bị biến mất; form không kiểm tra trùng lặp email hay mã cảm biến. | Sinh viên đồng bộ hóa toàn bộ thao tác CRUD vào `localStorage` (key: `sb_zones`, `sb_sensors`, `sb_users`), bổ sung cơ chế kiểm tra chống trùng lặp mã định danh và thông báo Toast. |

---

## 3. PHÂN ĐỊNH RANH GIỚI: TÍNH NĂNG MÔ PHỎNG (MOCK) VS GỌI API THẬT

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        KIẾN TRÚC TÍNH NĂNG TRONG DỰ ÁN SMARTBUILDING                   │
├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│      TRIỂN KHAI FRONTEND / MOCK ENGINE   │        SẴN SÀNG KẾT NỐI API / CLOUD         │
├──────────────────────────────────────────┼─────────────────────────────────────────────┤
│ 1. Dữ liệu cảm biến IoT & Zone:          │ 1. Tích hợp LLM API thật (Điểm thưởng):     │
│    - Lưu trữ trong localStorage          │    - Hàm callGeminiApi() qua fetch()        │
│    - Khởi tạo từ data.js                 │    - Nhập API Key tạm thời vào              │
│    - Giữ nguyên dữ liệu khi F5           │      sessionStorage (tuyệt đối không lộ)     │
│                                          │    - Cơ chế Fallback tự động về dữ liệu mẫu │
│ 2. Ba tính năng AI suy luận quy tắc:    │                                             │
│    - AI-1: Quét Spike tải > 135%         │ 2. Triển khai Web tĩnh (Live Hosting):      │
│    - AI-2: Gợi ý tiết kiệm theo thời tiết│    - Vercel / Netlify / GitHub Pages        │
│    - AI-3: What-If Simulator tính kWh/CO2│    - Chạy độc lập 100% không cần backend    │
│    - Đầy đủ 6 bước AI UX & Failure Mode  │                                             │
└──────────────────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 4. KẾT LUẬN & MINH CHỨNG SỰ LÀM CHỦ CỦA SINH VIÊN

1. **Hiểu rõ bản chất từng dòng code:** Cả 3 sinh viên đều tự tay xây dựng các lát cắt dọc của mình, nắm rõ cơ chế Document Object Model (DOM), luồng lưu trữ Web Storage API (`localStorage`), và giải thuật xử lý mảng.
2. **Khả năng giải thích và sửa trực tiếp tại phòng thi (Live Modification):** Sinh viên đã chuẩn bị tâm thế tự tin trước 24 đề bài ngẫu nhiên của giảng viên (thêm trường nhập liệu, thêm bộ lọc, đổi layout responsive, thêm trạng thái) mà không cần phụ thuộc vào AI trong 10 phút kiểm tra.
3. **Trung thực học thuật:** Nhóm công khai 100% việc sử dụng các công cụ hỗ trợ lập trình, tuân thủ đúng quy chế đánh giá của Học phần CSE122.
