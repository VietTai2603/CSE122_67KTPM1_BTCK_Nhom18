# QUY TẮC VIẾT CODE JAVASCRIPT CỦA NHÓM 18 (mức cơ bản)

**Được dùng:** `var`, `function`, `if / else`, `for`, `while`, mảng `[]`, đối tượng `{}`, `document.getElementById`, `querySelector`, `innerHTML`, `addEventListener` hoặc `onclick="tenHam()"`, `localStorage` + `JSON.parse / JSON.stringify`, `setTimeout`, `Math`, `Date`, nối chuỗi bằng dấu `+`.

**Không dùng:** hàm mũi tên `=>`, chuỗi dạng backtick, `map / filter / reduce / forEach`, toán tử `...` (spread), `const [a, b] = ...` (destructuring), `class`, `async / await`, `import / export`, biểu thức chính quy, `Object.assign`, `structuredClone`, toán tử `?:` lồng nhau.

**Thói quen:** mỗi hàm ngắn (khoảng 20 dòng) và làm một việc; tên hàm đọc là hiểu (`renderTable`, `saveZone`, `deleteAction`); mỗi trang một file JS riêng trùng tên với file HTML; có chú thích tiếng Việt ở chỗ khó.

**Hàm dùng chung (javascript/main.js):** `loadData`, `saveData`, `showToast`, `confirmBox`, `setError`, `clearErrors`, `buildLayout`, `startPage`, `escapeHtml`, `formatNumber`, `padNumber`, `isValidEmail`, `isValidCode`.
