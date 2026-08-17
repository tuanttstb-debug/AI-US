---
id: RULE-naming
type: rule
title: Quy ước ID, tên file & front-matter
owner: PER-TTT
version: 1
updated: 2026-08-03
---

## ID entity file (AI OS)
| Entity | Mẫu ID | Ví dụ |
|---|---|---|
| Decision | `DEC-YYYYMMDD-nn` | DEC-20260803-01 |
| Meeting | `MTG-YYYYMMDD-nn` | MTG-20260803-01 |
| Report | `RPT-YYYY-Wnn` | RPT-2026-W32 |
| Product/System | `SYS-<MÃ>` | SYS-GNOL |
| Person | `PER-<VIẾT-TẮT>` | PER-TTT |
| Project (thẻ registry) | `PRJ-<MÃ>` | PRJ-SHTD |

Entity operational giữ ID sẵn có trong Dashboard (Task, Initiative, Case, Issue, Dev) — không đặt lại.

## Tên file
`<ID>_<slug-không-dấu>.md` — vd `DEC-20260803-01_chon-endpoint-gas.md`.
Slug: chữ thường, không dấu, nối bằng gạch nối.

## Front-matter bắt buộc (YAML)
`id · type · title · status · owner · tags · related · created · updated · version · source`
- `status`: draft | active | superseded | done
- `related`: mảng ID nối tới entity khác (operational hoặc file) — tạo liên kết hai chiều.
- `version`: số nguyên tăng dần; lịch sử chi tiết dựa vào Git.

## Thẻ dự án (Registry — mô hình Hub-and-Spoke)
Tri thức của mỗi dự án coding **sống trong repo của nó** tại thư mục **`AI_CONTEXT/`** (in hoa, khung tối thiểu 5 file — xem `00_System/templates/AI_CONTEXT_TEMPLATE/`). AIOS **không copy** nội dung; chỉ giữ:
- **Thẻ mỏng** `04_Knowledge/projects/PRJ-<MÃ>.md` (`type: project-card`) — tóm tắt + con trỏ tới repo/`AI_CONTEXT/`.
- **Danh mục** `00_System/PORTFOLIO.md` — bảng toàn bộ dự án (điểm vào duy nhất).
- Đăng ký vào `00_System/INDEX.md` mục **Project (PRJ)**.

Khi thêm dự án mới: (1) tạo `AI_CONTEXT/` trong repo từ template; (2) tạo thẻ `PRJ-<MÃ>.md`; (3) thêm 1 dòng vào PORTFOLIO + INDEX.

## Ngày tháng
Định dạng `YYYY-MM-DD` trong front-matter. (Dashboard lưu `DD-MMM-YY` — convert ở biên khi đọc/ghi.)
