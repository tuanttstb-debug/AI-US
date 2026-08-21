---
name: brd-writer
type: skill
description: Viết BRD (Business Requirements Document) cho sản phẩm/tính năng tín dụng mới trong hệ TPBank theo phương pháp chuẩn — cấu trúc 3 trụ (Tổng quan · Quy trình As-is/To-be · Chi tiết yêu cầu), User Story + Acceptance Criteria phủ ca ngoại lệ, maker-checker, bộ bảng biểu chuẩn, văn phong actor-centric. Kích hoạt khi cần soạn mới/rà soát/chuẩn hoá một BRD nghiệp vụ.
owner: PER-TTT
version: 1
updated: 2026-08-21
---

## Mục tiêu
Soạn nhanh một BRD **đủ để lãnh đạo duyệt, IT bóc spec, QA soạn nghiệm thu** — đúng cấu trúc, đúng văn phong, không sót ca ngoại lệ và không sót cửa maker-checker của TPBank.

## Khi nào dùng
- Soạn **mới** BRD cho một sản phẩm/tính năng tín dụng.
- **Rà soát** một BRD nháp trước khi phát hành (chạy `CHECKLIST.md`).
- **Chuẩn hoá** một tài liệu yêu cầu rời rạc về đúng khung.

## Nguồn chuẩn (phương pháp)
Nguyên tắc/concept/văn phong: **[[REF-BRD-WRITING]]** (`04_Knowledge/references/REF-BRD-WRITING.md`) — tài liệu canonical, rút *phương pháp* từ dự án tham chiếu SCF (đã lọc bỏ nghiệp vụ). Actor & cửa phê duyệt TPBank: [[REF-TPBANK-DELIVERY]]. Bản đồ hệ thống: [[SYS-TPBANK]].

## File trong skill
| File | Vai trò |
|---|---|
| `SKILL.md` | Quy trình 7 bước (file này) |
| `BRD_TEMPLATE.md` | Khung rỗng tái dùng — copy ra rồi điền |
| `CHECKLIST.md` | Rà soát trước phát hành (chống anti-pattern) |
| *(nguyên tắc)* | → `04_Knowledge/references/REF-BRD-WRITING.md` |

## Quy trình 7 bước
1. **Khởi tạo** — copy `BRD_TEMPLATE.md` thành `BRD_<sản phẩm>_v0.1.md`. Điền Lịch sử tài liệu + mục 1 Tổng quan (người yêu cầu, nội dung, **lý do + neo pháp lý/chính sách**, bảng lợi ích).
2. **Vẽ As-is** — mục 2.1: lưu đồ hiện tại + bảng mô tả quy trình + **liệt kê Pain Point** (bản lề bắt buộc).
3. **Thiết kế To-be** — mục 2.2: mỗi luồng nghiệp vụ = 1 sơ đồ + đoạn mô tả; mỗi luồng truy vết được về một Pain Point.
4. **Bóc User Story** — mục 3: nhóm theo tính năng/module; mỗi US tiêu đề `US-xx – <Actor> <hành động>`, thân "Là… tôi muốn… để…". Đánh số **liên tục, không trùng**.
5. **Viết Acceptance Criteria** — mỗi US có `AC1..ACn`; **bắt buộc ≥1 AC ngoại lệ** (timeout/validate/vượt ngưỡng/retry/từ chối quyền); nêu rõ chuyển trạng thái. Thêm bảng đặc tả trường/phân quyền nếu có màn hình.
6. **Maker-checker + NFR** — rà mọi luồng tạo/sửa có đủ **Tay 1 / Tay 2** và trạng thái Nháp/Chờ duyệt/Duyệt/Từ chối; viết mục Yêu cầu phi chức năng; thêm Phụ lục Roadmap theo giai đoạn + Glossary.
7. **Rà soát & phát hành** — chạy toàn bộ `CHECKLIST.md`; tăng version trong Lịch sử tài liệu.

## Nguyên tắc bất biến (nhắc nhanh)
- **As-is → Pain Point → To-be**, không đảo thứ tự.
- Mỗi US nghiệm thu độc lập; mỗi AC **kiểm thử được** + phủ ngoại lệ.
- Actor hệ thống nêu **đích danh**; trạng thái có **tên riêng**; thuật ngữ **nhất quán**.
- Luồng nghiệp vụ tín dụng luôn thể hiện **maker-checker**.
- Không đưa chi tiết kỹ thuật (CSDL/API contract) — đó là việc của SRS/TDD.

## Ranh giới dữ liệu
BRD chứa nghiệp vụ nội bộ → **không** đẩy file BRD sản phẩm lên cloud/GitHub công khai. Khi dùng SCF làm tham chiếu, chỉ mượn *phương pháp*, không sao chép logic sản phẩm.
