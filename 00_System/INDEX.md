# INDEX — Danh bạ entity AI OS

Mục lục tra cứu toàn bộ entity file theo ID. Cập nhật mỗi khi thêm file mới.

## Product / System (SYS)
| ID | Tên | File |
|---|---|---|
| SYS-GNOL | Giải ngân online | `04_Knowledge/products/SYS-GNOL.md` |
| SYS-BLOL | Bảo lãnh online | `04_Knowledge/products/SYS-BLOL.md` |

## Person (PER)
| ID | Tên | File |
|---|---|---|
| PER-TTT | Trần Thế Tuân | `04_Knowledge/people/PER-TTT.md` |

## Skill
| Tên | Mục đích | File |
|---|---|---|
| weekly-report | Báo cáo tuần Khối (5 mảng) từ GAS live → HTML email (đọc di động) + .docx | `03_Skills/weekly-report/SKILL.md` |
| deadline-brief | Nâng chất cảnh báo hạn | `03_Skills/deadline-brief/SKILL.md` |
| decision-brief | Brief hỗ trợ quyết định nhanh | `03_Skills/decision-brief/SKILL.md` |
| intake-triage | Thu thập & định tuyến việc đột xuất | `03_Skills/intake-triage/SKILL.md` |

## Decision (DEC)
| ID | Tiêu đề | File |
|---|---|---|
| DEC-20260803-01 | Kiến trúc 2 lớp, sit-above (Option C) | `05_Journal/decisions/DEC-20260803-01_kien-truc-2-lop-sit-above.md` |
| DEC-20260803-02 | Động cơ luôn bật tại GAS | `05_Journal/decisions/DEC-20260803-02_dong-co-luon-bat-tai-gas.md` |
| DEC-20260803-03 | Data model map 9 sheet + taxonomy 2 chiều | `05_Journal/decisions/DEC-20260803-03_data-model-map-9-sheet.md` |
| DEC-20260803-04 | Folder Option B — tách 05_Journal | `05_Journal/decisions/DEC-20260803-04_folder-option-b-tach-journal.md` |
| DEC-20260803-05 | Mẫu báo cáo tuần v2 + lịch thứ 6 | `05_Journal/decisions/DEC-20260803-05_mau-bao-cao-tuan-v2.md` |

## Meeting (MTG)
| ID | Tiêu đề | File |
|---|---|---|
| — | — | — |

## Report (RPT)
> ⚠️ File .docx báo cáo **chỉ lưu local** (gitignore) vì chứa tên KH — không đẩy lên GitHub/cloud (RULE-data-boundary). Dựng lại bằng `03_Skills/weekly-report/run.js`.

| ID | Kỳ | File (local-only) |
|---|---|---|
| RPT-2026-W33 | Tuần 33/2026 (báo cáo Khối) | `05_Journal/reports/RPT-2026-W33_bao-cao-tuan.{html,docx}` |

> Quy ước ID & tên file: xem `02_Rules/naming-convention.md`.
