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

Entity operational giữ ID sẵn có trong Dashboard (Task, Initiative, Case, Issue, Dev) — không đặt lại.

## Tên file
`<ID>_<slug-không-dấu>.md` — vd `DEC-20260803-01_chon-endpoint-gas.md`.
Slug: chữ thường, không dấu, nối bằng gạch nối.

## Front-matter bắt buộc (YAML)
`id · type · title · status · owner · tags · related · created · updated · version · source`
- `status`: draft | active | superseded | done
- `related`: mảng ID nối tới entity khác (operational hoặc file) — tạo liên kết hai chiều.
- `version`: số nguyên tăng dần; lịch sử chi tiết dựa vào Git.

## Ngày tháng
Định dạng `YYYY-MM-DD` trong front-matter. (Dashboard lưu `DD-MMM-YY` — convert ở biên khi đọc/ghi.)
