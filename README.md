# 🚀 AI Portfolio - Modern, Multi-Theme & Bilingual AI Engineering Showcase

Đây là bộ mã nguồn **Portfolio cá nhân chuẩn Quốc tế** dành cho các kỹ sư **AI Engineer / Data Scientist / Machine Learning Engineer**, được thiết kế tối giản, hiện đại và tối ưu hóa 100% cho các Nhà tuyển dụng quốc tế và trong nước.

---

## 🌟 Các Tính Năng Nổi Bật

1. **Song Ngữ Toàn Diện (Default: English | Tùy chọn: Tiếng Việt)**:
   - Mặc định là **Tiếng Anh chuẩn chuyên ngành AI/ML**.
   - Bộ chuyển đổi **`EN` / `VI`** trên Navbar chuyển ngữ tức thì toàn bộ trang web mà không cần reload.
2. **Bộ Chuyển Đổi 3 Giao Diện (Multi-Theme Switcher)**:
   - 🌙 **Dark**: Nền đen than chì hiện đại, sắc nét.
   - ☀️ **Light**: Nền trắng ngọc thanh lịch, sáng sủa.
   - 🌾 **Solar**: Tông màu ấm đất dịu mắt (Sepia Warm Glow).
3. **Interactive Canvas Particle Physics**:
   - Mạng lưới hạt tương tác chuột ở Hero: di chuột làm dạt ra và biến mất, sau đó tự hồi phục. Tự động đổi màu theo theme.
4. **Trình Mô Phỏng AI Trực Tiếp (Live AI Query Playground)**:
   - Cho phép nhà tuyển dụng chạy thử nghiệm mô phỏng quy trình RAG Q&A (Vector DB search → Rerank → LLM grounded generation) ngay trên trang web.
5. **Modal Xem Chi Tiết Kiến Trúc Kỹ Thuật (Architecture Viewer Modal)**:
   - Nút *"View Architecture"* ở từng dự án mở sơ đồ khối luồng dữ liệu chi tiết.
6. **Thanh Chỉ Số Tuyển Dụng & Bộ Lọc Dự Án (Recruiter Metrics & Category Filter)**:
   - 3+ Dự án Production-ready, 90%+ Accuracy, Kaggle Expert, 1 Bài báo khoa học.
   - Bộ lọc dự án: *All, Computer Vision, GenAI & LLMs, Machine Learning*.

---

## 📁 Cấu Trúc Thư Mục

```text
d:/MyProject/Portfolio/
├── index.html            # File HTML chính (mặc định Tiếng Anh, kèm comment chú thích)
├── css/
│   └── style.css         # Style 3 Themes, 3D tilt hover, animations, modals
├── js/
│   ├── i18n.js           # Bộ từ điển song ngữ EN / VI
│   └── main.js           # Xử lý Theme, i18n, Canvas, AI Playground, Modal
├── assets/
│   ├── images/           # Ảnh đại diện & hình ảnh demo dự án
│   └── docs/             # Nơi đặt file CV bản PDF
└── README.md             # Tài liệu này
```

---

## 🛠️ Hướng Dẫn Tùy Chỉnh Thông Tin

- Để thay đổi nội dung song ngữ, bạn có thể chỉnh sửa trong file [js/i18n.js](file:///d:/MyProject/Portfolio/js/i18n.js).
- Để thay đổi các đường dẫn GitHub, LinkedIn, Kaggle, Email và file CV, bạn mở file [index.html](file:///d:/MyProject/Portfolio/index.html) và tìm các comment `<!-- [CHỈNH SỬA TẠI ĐÂY]: ... -->`.

---

## 🖥️ Cách Xem Thử
- Mở trực tiếp file [index.html](file:///d:/MyProject/Portfolio/index.html) bằng trình duyệt web.
- Bấm thử nút **EN / VI** và nút **Dark / Light / Solar** trên Navbar.
- Bấm nút **"Run Inference Simulation"** trong phần **AI Playground** để trải nghiệm mô phỏng AI.
