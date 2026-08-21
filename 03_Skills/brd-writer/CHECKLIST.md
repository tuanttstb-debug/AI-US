# CHECKLIST rà soát BRD trước phát hành
> Chạy toàn bộ trước khi tăng version phát hành. Nguyên tắc gốc: `04_Knowledge/references/REF-BRD-WRITING.md`.

## A. Cấu trúc & tính đầy đủ
- [ ] Có **Lịch sử tài liệu** (version, ngày, người, thay đổi) ở đầu file.
- [ ] Đủ 3 trụ: **Tổng quan · Quy trình · Chi tiết yêu cầu** + Phụ lục.
- [ ] Mục 1.3 có **neo pháp lý/chính sách** (dẫn số hiệu văn bản).
- [ ] Mục 1.4 có **bảng lợi ích** (Tiêu chí | Chi tiết hiệu quả).
- [ ] Có **Yêu cầu phi chức năng (NFR)** với ngưỡng cụ thể.
- [ ] Phụ lục có **Roadmap theo giai đoạn** + **Glossary**.

## B. Quy trình nghiệp vụ
- [ ] Có **As-is** (lưu đồ + bảng mô tả) *và* **To-be**.
- [ ] Có mục **Pain Point** rõ ràng (đánh số PP-xx).
- [ ] Mỗi luồng To-be **truy vết** được về ≥1 Pain Point.
- [ ] Mỗi sơ đồ có **đoạn mô tả đi kèm** (không đứng một mình).
- [ ] Bảng mô tả quy trình đủ cột: STT · Bước · Người · Hệ thống · Mô tả.

## C. User Story & Acceptance Criteria
- [ ] US đánh số **liên tục, KHÔNG trùng** trong mỗi module. *(lỗi hay gặp)*
- [ ] Mỗi US có thân "**Là… tôi muốn… để…**".
- [ ] Mỗi US nghiệm thu **độc lập** (một mục tiêu người dùng).
- [ ] Mỗi US có `AC1..ACn` **kiểm thử được**.
- [ ] Mỗi US có **≥1 AC ngoại lệ** (timeout/validate/vượt ngưỡng/retry/từ chối quyền).
- [ ] AC nêu rõ **chuyển trạng thái** (từ … → …, ai kích hoạt).

## D. Maker-checker & actor
- [ ] Mọi luồng tạo/sửa hồ sơ có **Tay 1 (Maker)** + **Tay 2 (KSV duyệt)**.
- [ ] Có đủ trạng thái **Nháp / Chờ duyệt / Duyệt / Từ chối**.
- [ ] Actor hệ thống nêu **đích danh** (Engine/FCC/BPM/ESignHub/kênh…), không "hệ thống" chung chung.

## E. Văn phong & nhất quán
- [ ] Thuật ngữ **nhất quán** toàn tài liệu (một khái niệm — một cách gọi).
- [ ] Viết tắt **mở ngoặc lần đầu** rồi mới dùng tắt.
- [ ] Trạng thái có **tên riêng**, viết hoa/nháy nhất quán.
- [ ] Số/ngưỡng **cụ thể** (không "một số / nhiều").
- [ ] **Soát chính tả** — không lặp từ dính liền ("hóahóa", "theotheo"). *(lỗi hay gặp)*
- [ ] Câu mệnh lệnh, actor-centric, một ý một câu.

## F. Ranh giới & phát hành
- [ ] Không có chi tiết kỹ thuật thừa (CSDL/API contract → để SRS/TDD).
- [ ] Không lộ dữ liệu khách hàng thật/secret; file BRD **không** đẩy cloud/GitHub công khai.
- [ ] Tăng **version** + cập nhật Lịch sử tài liệu.
