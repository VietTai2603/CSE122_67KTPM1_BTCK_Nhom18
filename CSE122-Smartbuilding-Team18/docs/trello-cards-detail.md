# CHI TIẾT 24 TASK TRELLO – SMARTBUILDING BTL-36

Dùng tài liệu này để cập nhật mô tả cho đúng 24 card đã có trên Trello; không tạo card thay thế. Giữ nguyên ngày bắt đầu/hạn, người được giao, nhãn, comment, link và lịch sử hoạt động đang có. Chỉ bổ sung hoặc sửa phần mô tả cần thiết. Trello sẽ ghi nhận lần chỉnh sửa mới trong activity, còn card cũ và lịch sử vẫn thuộc card đó. Nếu card đã có nhánh, PR hoặc video thật thì giữ nguyên; chỉ điền phần còn thiếu.

## TASK-01 — Khởi tạo tài liệu dự án
**Người phụ trách:** Phùng Viết Tài (Lead)  
**Tệp:** `docs/project-proposal.md`, `docs/roles-and-features.md`, `docs/screen-list.md`, `docs/team-assignment.md`, `docs/ai-usage-report.md`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `docs/init-documentation`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Chuẩn hóa tài liệu nền tảng của đề tài SmartBuilding: vấn đề, mục tiêu, vai trò người dùng, luồng nghiệp vụ, kiểm kê màn hình, phân công và việc sử dụng AI.

**Checklist:**
- [ ] Mô tả mục tiêu, phạm vi và đối tượng sử dụng thống nhất.
- [ ] Liệt kê đầy đủ màn hình theo vai trò và màn hình dùng chung.
- [ ] Ghi đúng người phụ trách và tệp tương ứng.
- [ ] Liên kết chéo giữa README và các tài liệu trong `docs/` hoạt động.

**Hoàn thành khi:** Tài liệu không mâu thuẫn về tên đề tài, vai trò, số lượng màn hình và phân công.

## TASK-02 — Xây dựng Design System
**Người phụ trách:** Lê Đức Quang  
**Tệp:** `css/style.css`, `css/responsive.css`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/design-system-core`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Xây dựng bộ quy tắc giao diện dùng chung cho các dashboard: màu nền tối, xanh emerald, typography, card, nút, form, badge, modal và trạng thái tương tác.

**Checklist:**
- [ ] Khai báo biến màu, chữ, bo góc, bóng và chuyển động trong `:root`.
- [ ] Chuẩn hóa các thành phần tái sử dụng và trạng thái hover/focus/disabled.
- [ ] Có quy tắc responsive cho desktop, tablet và mobile.
- [ ] Kiểm tra độ tương phản, focus bàn phím và nhãn form.

**Hoàn thành khi:** Các màn hình dùng chung hệ thống style nhất quán và không tràn ngang ở màn nhỏ.

## TASK-03 — Xây dựng Mock Data Engine
**Người phụ trách:** Lê Quang Tiến  
**Tệp:** `javascript/data.js`, `javascript/manager-data.js`, `javascript/main.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/mock-data-engine`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Tạo dữ liệu mẫu cho zone, cảm biến, tài khoản, báo cáo và nghiệp vụ occupant/operator; cung cấp tiện ích đọc/ghi LocalStorage và hàm dùng chung.

**Checklist:**
- [ ] Seed dữ liệu ban đầu cho các màn hình và vai trò.
- [ ] Nạp dữ liệu theo key `sb_*`, giữ thay đổi sau reload.
- [ ] Cung cấp hàm tiện ích dùng chung, thông báo và validate cần thiết.
- [ ] Đảm bảo các script phụ thuộc được nạp đúng thứ tự.

**Hoàn thành khi:** Mỗi màn hình đọc được dữ liệu mẫu và các thay đổi nghiệp vụ được lưu, tải lại được.

## TASK-04 — Hoàn thiện Portal
**Người phụ trách:** Phùng Viết Tài  
**Tệp:** `index.html`, `css/index.css`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/portal-homepage`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Làm trang Portal giới thiệu đề tài và điều hướng tới các khu vực theo vai trò cùng màn hình dùng chung.

**Checklist:**
- [ ] Hiển thị phần giới thiệu SmartBuilding và các thẻ vai trò.
- [ ] Giữ nút Đăng nhập trên thanh đầu trang.
- [ ] Thêm mục Tài khoản & hỗ trợ liên kết tới Đăng nhập, 403, 404, Hồ sơ, Cài đặt và Quên mật khẩu.
- [ ] Đảm bảo các đường dẫn hoạt động khi chạy qua server và hiển thị tốt trên mobile.

**Hoàn thành khi:** Người dùng tìm được các màn hình vai trò và màn hình chung trực tiếp từ Portal.

## TASK-05 — Màn hình xác thực và tài khoản dùng chung
**Người phụ trách:** Lê Quang Tiến (Đăng nhập, Cài đặt); Lê Đức Quang (403, Hồ sơ)  
**Tệp:** `html/login.html`, `html/settings.html`, `html/403.html`, `html/profile.html`, `javascript/login.js`, `javascript/shared-pages.js`, `css/shared-pages.css`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/common-account-screens`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Hoàn thiện luồng đăng nhập mô phỏng, trang không đủ quyền, trang hồ sơ và chức năng đổi mật khẩu.

**Checklist:**
- [ ] Đăng nhập kiểm tra email, mật khẩu, trạng thái tài khoản và chuyển đúng màn theo role.
- [ ] Cài đặt xác thực mật khẩu hiện tại, kiểm tra mật khẩu mới và xác nhận khớp.
- [ ] Hồ sơ hiển thị tên/email/vai trò và lưu tên mới vào phiên hiện tại.
- [ ] Tên hồ sơ Occupant mới xuất hiện trên màn hình Người sử dụng tòa nhà.
- [ ] Trang 403 có nút quay về Portal và đổi tài khoản.

**Hoàn thành khi:** Các thao tác hợp lệ và không hợp lệ đều có thông báo rõ, dữ liệu tài khoản cập nhật được trong demo.

## TASK-06 — Trang 404 và khôi phục mật khẩu
**Người phụ trách:** Phùng Viết Tài  
**Tệp:** `html/404.html`, `javascript/404.js`, `html/forgot-password.html`, `javascript/shared-pages.js`, `css/404.css`, `css/shared-pages.css`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/common-error-recovery`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Hoàn thiện trang báo không tìm thấy đường dẫn và luồng khôi phục mật khẩu mô phỏng trên trình duyệt.

**Checklist:**
- [ ] Trang 404 giải thích lỗi, có nút về Portal và quay lại.
- [ ] Nhập email tài khoản hiện có để chuyển sang bước tạo mật khẩu mới.
- [ ] Kiểm tra mật khẩu mới tối thiểu 6 ký tự và xác nhận trùng khớp.
- [ ] Lưu mật khẩu mới cục bộ và cho phép đăng nhập lại bằng mật khẩu đó.
- [ ] Email không tồn tại hoặc dữ liệu sai có thông báo phù hợp.

**Hoàn thành khi:** Luồng khôi phục demo hoàn tất được trên cùng trình duyệt; trang 404 điều hướng đúng.

## TASK-07 — Occupant Dashboard và Energy History
**Người phụ trách:** Phùng Viết Tài  
**Tệp:** `html/occupant-dashboard.html`, `javascript/occupant-dashboard.js`, `html/occupant-energy-history.html`, `javascript/occupant-energy-history.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/occupant-occupant-dashboard`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Hiển thị tổng quan tiêu thụ điện của người dùng, lịch sử theo ngày và gợi ý tiết kiệm.

**Checklist:**
- [ ] Hiển thị kWh, chi phí, nhiệt độ, điểm xanh và cấp hiện tại.
- [ ] Biểu đồ theo giờ phân biệt mức tiêu thụ vượt ngưỡng.
- [ ] Hiển thị gợi ý và tóm tắt thử thách/phản hồi gần nhất.
- [ ] Lịch sử hỗ trợ chọn khoảng 7/30 ngày và tính tổng/trung bình.
- [ ] Thông tin tên người dùng phản ánh phiên đăng nhập.

**Hoàn thành khi:** Dashboard và lịch sử dùng dữ liệu mock nhất quán, không có trạng thái trống khó hiểu.

## TASK-08 — Comfort Feedback
**Người phụ trách:** Phùng Viết Tài  
**Tệp:** `html/occupant-comfort-feedback.html`, `javascript/occupant-comfort-feedback.js`, CSS liên quan
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/occupant-comfort-feedback`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Cho người sử dụng gửi và quản lý phản ánh về nhiệt độ, điều hòa và ánh sáng.

**Checklist:**
- [ ] Tạo phản ánh với loại vấn đề, khu vực, mức độ và mô tả.
- [ ] Hiển thị danh sách và trạng thái xử lý.
- [ ] Sửa phản ánh khi còn được phép; hủy/xóa phản ánh phù hợp.
- [ ] Validate trường bắt buộc và giới hạn nội dung hợp lý.
- [ ] Lưu thay đổi vào LocalStorage và khôi phục sau reload.

**Hoàn thành khi:** CRUD hoạt động và trạng thái pending/investigating/resolved/cancelled hiển thị rõ.

## TASK-09 — Energy Challenges và Rewards
**Người phụ trách:** Phùng Viết Tài  
**Tệp:** `html/occupant-energy-challenges.html`, `javascript/occupant-energy-challenges.js`, `html/occupant-rewards.html`, `javascript/occupant-rewards.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/occupant-challenges-rewards`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Cho người sử dụng tham gia thử thách tiết kiệm, cập nhật tiến độ, tích điểm và đổi quà.

**Checklist:**
- [ ] Lọc thử thách theo trạng thái available/in-progress/completed.
- [ ] Cho phép tham gia và cập nhật tiến độ; không cộng thưởng lặp.
- [ ] Hiển thị điểm, cấp độ và huy hiệu tương ứng.
- [ ] Đổi quà khi đủ điểm và ghi nhận lịch sử đổi.
- [ ] Lưu tiến độ và điểm vào LocalStorage.

**Hoàn thành khi:** Quy tắc tham gia, hoàn thành và đổi thưởng được phản ánh đúng trên giao diện.

## TASK-10 — Operator Energy Monitor
**Người phụ trách:** Lê Quang Tiến  
**Tệp:** `html/operator-energy-monitor.html`, `javascript/operator-energy-monitor.js`, CSS operator
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/operator-energy-monitor`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Giám sát phụ tải theo tầng/khu vực, công suất và trạng thái zone.

**Checklist:**
- [ ] Hiển thị các zone cùng công suất hiện tại và định mức.
- [ ] Có biểu đồ/gauge thể hiện mức sử dụng và cảnh báo vượt ngưỡng.
- [ ] Lọc theo tầng, hệ thống hoặc trạng thái.
- [ ] Phân biệt trạng thái bình thường, cảnh báo và quá tải.
- [ ] Hiển thị rõ trường hợp không có kết quả lọc.

**Hoàn thành khi:** Người vận hành xác định được zone cần chú ý từ tổng quan và bộ lọc.

## TASK-11 — Alert Center và AI-1
**Người phụ trách:** Lê Quang Tiến  
**Tệp:** `html/operator-alert-center.html`, `javascript/operator-alert-center.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/operator-alert-center`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Tiếp nhận cảnh báo, phát hiện bất thường tiêu thụ và hỗ trợ cập nhật tiến độ xử lý.

**Checklist:**
- [ ] Liệt kê cảnh báo theo mức độ và trạng thái.
- [ ] Tạo cảnh báo thủ công với dữ liệu bắt buộc.
- [ ] Quét dữ liệu để nhận diện spike và trình bày nguyên nhân/gợi ý.
- [ ] Cập nhật trạng thái mới/đang điều tra/đã xử lý.
- [ ] Lưu trạng thái và dữ liệu cảnh báo trong LocalStorage.

**Hoàn thành khi:** Cảnh báo có thể được tạo, lọc, phân tích mock và xử lý xuyên suốt.

## TASK-12 — Saving Actions và AI-2
**Người phụ trách:** Lê Quang Tiến  
**Tệp:** `html/operator-saving-actions.html`, `javascript/operator-saving-actions.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/operator-saving-actions`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Quản lý các lệnh tiết kiệm điện theo zone và sử dụng gợi ý từ hệ thống.

**Checklist:**
- [ ] Tạo lệnh với khu vực, thời gian, hành động và mức tiết kiệm dự kiến.
- [ ] Sửa, hủy hoặc lưu trữ lệnh theo trạng thái.
- [ ] Hiển thị scheduled/active/completed/cancelled và bộ lọc.
- [ ] Gợi ý hành động mock có thể được áp dụng hoặc bỏ qua.
- [ ] Có xác nhận trước thao tác hủy và lưu thay đổi.

**Hoàn thành khi:** CRUD và trạng thái lệnh nhất quán sau khi tải lại trang.

## TASK-13 — Energy KPIs
**Người phụ trách:** Lê Đức Quang  
**Tệp:** `html/manager-energy-kpis.html`, `javascript/manager-energy-kpis.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/manager-energy-kpis`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Cung cấp tổng quan KPI năng lượng và chi phí cho quản lý cơ sở.

**Checklist:**
- [ ] Hiển thị EUI, chi phí, tiêu thụ và phát thải CO₂.
- [ ] So sánh thực tế với ngân sách hoặc kỳ trước.
- [ ] Biểu đồ xu hướng tháng có nhãn và đơn vị rõ ràng.
- [ ] Có trạng thái dữ liệu tải lỗi/trống nếu phù hợp.

**Hoàn thành khi:** Số liệu và biểu đồ dễ đọc, nhất quán với dữ liệu mock.

## TASK-14 — Zone Comparison và AI-3 Simulator
**Người phụ trách:** Lê Đức Quang  
**Tệp:** `html/manager-zone-comparison.html`, `javascript/manager-zone-comparison.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/manager-zone-comparison`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** So sánh mức tiêu thụ giữa các khu vực và mô phỏng kịch bản giảm tải.

**Checklist:**
- [ ] So sánh tiêu thụ/định mức giữa các zone.
- [ ] Cho phép chọn mức giảm qua điều khiển What-If.
- [ ] Tính kWh, chi phí và CO₂ tiết kiệm theo kịch bản.
- [ ] Trình bày so sánh trước/sau mô phỏng.
- [ ] Cho phép lưu kịch bản đã chọn nếu nghiệp vụ hỗ trợ.

**Hoàn thành khi:** Thay đổi tham số cập nhật kết quả nhất quán và giải thích được.

## TASK-15 — Monthly Report
**Người phụ trách:** Lê Đức Quang  
**Tệp:** `html/manager-monthly-report.html`, `javascript/manager-monthly-report.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/manager-monthly-report`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Tạo, xem, cập nhật và duyệt báo cáo năng lượng định kỳ.

**Checklist:**
- [ ] Liệt kê báo cáo theo tháng và trạng thái draft/approved/archived.
- [ ] Tạo báo cáo từ dữ liệu mock và cập nhật nhận xét.
- [ ] Duyệt hoặc xóa bản nháp theo quyền/nghiệp vụ.
- [ ] Hỗ trợ in báo cáo bằng `window.print()`.
- [ ] Lưu nội dung và trạng thái báo cáo.

**Hoàn thành khi:** Vòng đời báo cáo rõ ràng và bản in giữ được nội dung cần thiết.

## TASK-16 — Zone Management
**Người phụ trách:** Lê Đức Quang  
**Tệp:** `html/admin-zone-management.html`, `javascript/admin-zone-management.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/admin-zone-management`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Quản trị danh mục các tầng/khu vực và thông số định mức.

**Checklist:**
- [ ] Xem danh sách, tìm kiếm và lọc zone.
- [ ] Thêm zone với tên, tầng, loại, diện tích và công suất định mức.
- [ ] Sửa thông tin và khóa/kích hoạt zone.
- [ ] Validate số liệu không âm và trường bắt buộc.
- [ ] Lưu thay đổi và cập nhật danh sách tức thì.

**Hoàn thành khi:** CRUD zone hoạt động và dữ liệu lỗi bị chặn với hướng dẫn rõ.

## TASK-17 — Sensor Management
**Người phụ trách:** Lê Đức Quang  
**Tệp:** `html/admin-sensor-management.html`, `javascript/admin-sensor-management.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/admin-sensor-management`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Quản lý danh mục cảm biến IoT giả lập và trạng thái kết nối.

**Checklist:**
- [ ] Hiển thị mã, loại, zone, chu kỳ đọc và trạng thái cảm biến.
- [ ] Thêm cảm biến và gán vào zone hợp lệ.
- [ ] Sửa cấu hình, bật/tắt hoặc mô phỏng online/offline.
- [ ] Validate mã cảm biến không trùng và chu kỳ hợp lệ.
- [ ] Lưu dữ liệu thay đổi qua LocalStorage.

**Hoàn thành khi:** Danh mục phản ánh đúng thao tác CRUD và trạng thái cảm biến.

## TASK-18 — User Management
**Người phụ trách:** Lê Đức Quang  
**Tệp:** `html/admin-user-management.html`, `javascript/admin-user-management.js`
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `feature/admin-user-management`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Quản trị tài khoản, vai trò và trạng thái truy cập của người dùng.

**Checklist:**
- [ ] Liệt kê và tìm kiếm tài khoản theo tên/email/vai trò.
- [ ] Tạo tài khoản với email hợp lệ và một trong bốn vai trò.
- [ ] Sửa thông tin, đổi vai trò/khu vực phụ trách.
- [ ] Khóa hoặc kích hoạt tài khoản; tài khoản khóa không đăng nhập được.
- [ ] Lưu thay đổi và phản ánh chúng ở đăng nhập demo.

**Hoàn thành khi:** Quản trị viên kiểm soát được danh mục người dùng và quyền truy cập.

## TASK-19 — Kiểm tra Responsive và Accessibility
**Người phụ trách:** Phùng Viết Tài  
**Phạm vi:** Toàn bộ HTML/CSS giao diện
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `fix/responsive-a11y`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Rà soát giao diện ở kích thước desktop, tablet và điện thoại; sửa lỗi bố cục và khả năng truy cập.

**Checklist:**
- [ ] Kiểm tra màn hình rộng, tablet và mobile cho từng nhóm trang.
- [ ] Sửa tràn ngang, chữ bị cắt, modal/menu vượt viewport.
- [ ] Kiểm tra điều hướng bàn phím, focus, label và alt/aria cần thiết.
- [ ] Kiểm tra tương phản chữ và trạng thái không chỉ dựa vào màu.

**Hoàn thành khi:** Các luồng chính sử dụng được trên màn nhỏ và bằng bàn phím.

## TASK-20 — Kiểm tra dữ liệu và lỗi Console
**Người phụ trách:** Lê Quang Tiến  
**Phạm vi:** Các màn hình có JavaScript/LocalStorage
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `fix/localstorage-console`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Rà soát luồng nạp, lưu và tải lại dữ liệu; kiểm tra các form và xử lý lỗi JavaScript.

**Checklist:**
- [ ] Kiểm tra tạo/sửa/xóa rồi tải lại trang để xác nhận dữ liệu lưu đúng.
- [ ] Kiểm tra dữ liệu rỗng, bộ lọc không có kết quả và nhập sai định dạng.
- [ ] Kiểm tra các script nạp đúng thứ tự và không phát sinh lỗi Console.
- [ ] Xác nhận dữ liệu demo có thể khởi tạo lại khi LocalStorage trống.

**Hoàn thành khi:** Luồng sử dụng chính không tạo lỗi Console và dữ liệu bền qua reload.

## TASK-21 — Kiểm tra AI fallback và retry
**Người phụ trách:** Lê Đức Quang  
**Phạm vi:** AI-1, AI-2, AI-3
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `fix/ai-fallback`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Bổ sung trạng thái dự phòng khi thiếu dữ liệu hoặc mô phỏng AI không tạo được kết quả.

**Checklist:**
- [ ] Có trạng thái đang xử lý, kết quả, lỗi và thử lại nếu phù hợp.
- [ ] Khi thiếu dữ liệu, giải thích nguyên nhân và đưa lựa chọn thao tác thủ công.
- [ ] Không làm mất dữ liệu người dùng khi thử lại.
- [ ] Nội dung AI mock được nhận diện là gợi ý để người dùng xem xét.

**Hoàn thành khi:** Cả ba luồng AI có thể phục hồi sau lỗi/thiếu dữ liệu và giao diện không bị treo.

## TASK-22 — Quay video OBS minh chứng
**Người phụ trách:** Cả 3 thành viên  
**Phạm vi:** Các màn hình do từng sinh viên phụ trách
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `docs/obs-evidence`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Quay minh chứng quy trình sử dụng và phần triển khai theo yêu cầu môn học.

**Checklist:**
- [ ] Mỗi sinh viên quay các màn hình được giao, có trình bày chức năng chính.
- [ ] Video có hình ảnh người trình bày, giao diện chạy và minh chứng code/commit theo yêu cầu lớp.
- [ ] Tên file đúng quy ước `SVx-xx-screen-name.mp4`.
- [ ] Kiểm tra âm thanh, hình ảnh và liên kết lưu trữ trước khi nộp.

**Hoàn thành khi:** Đủ video cho các màn hình cần minh chứng và mở xem được.

## TASK-23 — Hoàn thiện README và báo cáo AI
**Người phụ trách:** Phùng Viết Tài (Lead), phối hợp cả nhóm  
**Tệp:** `README.md`, `docs/ai-usage-report.md`, tài liệu liên quan
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `docs/final-readme-ai-report`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Hoàn thiện hướng dẫn chạy, phân công, kiểm kê màn hình, nguồn dữ liệu và báo cáo sử dụng AI.

**Checklist:**
- [ ] Ghi hướng dẫn cài/chạy demo và thông tin tài khoản nếu cần.
- [ ] Cập nhật danh sách màn hình và người phụ trách thống nhất với Trello.
- [ ] Ghi rõ phần AI sử dụng, mục đích và cách nhóm kiểm tra kết quả.
- [ ] Thêm liên kết minh chứng, commit/PR và video khi có.

**Hoàn thành khi:** Người khác có thể mở dự án, chạy demo và hiểu phạm vi sản phẩm từ tài liệu.

## TASK-24 — Diễn tập bảo vệ và live-coding
**Người phụ trách:** Cả 3 thành viên  
**Phạm vi:** Demo tổng thể và các kịch bản phát sinh
**Hạn hoàn thành:** [Điền ngày DD/MM/YYYY]
**Nhánh Git:** `docs/defense-livecoding`
**Pull Request GitHub:** [Điền URL PR sau khi tạo]
**Commit Git:** [Điền mã SHA]
**Video OBS:** [Điền link hoặc tên file video]


**Mô tả:** Chuẩn bị phần trình bày, phân vai demo và luyện xử lý yêu cầu live-coding trong thời gian giới hạn.

**Checklist:**
- [ ] Chốt thứ tự giới thiệu vấn đề, vai trò, chức năng và kết quả.
- [ ] Mỗi thành viên nắm rõ phần mình làm và dữ liệu demo.
- [ ] Luyện các thay đổi nhỏ: thêm trường, chỉnh biểu đồ, thêm bộ lọc hoặc sửa trạng thái.
- [ ] Chuẩn bị phương án khi mạng/dịch vụ ngoài không khả dụng.

**Hoàn thành khi:** Nhóm demo được toàn bộ luồng và hoàn thành một thay đổi live-coding có giải thích.