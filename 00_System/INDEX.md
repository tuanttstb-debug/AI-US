# INDEX — Danh bạ entity AI OS

Mục lục tra cứu toàn bộ entity file theo ID. Cập nhật mỗi khi thêm file mới.

> 📁 **Danh mục dự án (Portfolio):** điểm vào trung tâm cho toàn bộ dự án coding → `00_System/PORTFOLIO.md`.

## Project (PRJ) — Registry Hub-and-Spoke
> Thẻ mỏng trỏ về `AI_CONTEXT/` của repo mỗi dự án (không copy nội dung). Bảng đầy đủ: `00_System/PORTFOLIO.md`.

| ID | Dự án | Trạng thái | File |
|---|---|---|---|
| PRJ-SHTD | SHTD-Dashboard (hệ tác nghiệp Khối KHDN) | active | `04_Knowledge/projects/PRJ-SHTD.md` |
| PRJ-AIUS | ai-usecase-platform | active | `04_Knowledge/projects/PRJ-AIUS.md` |
| PRJ-LOG | Logistics-Dashboard | active | `04_Knowledge/projects/PRJ-LOG.md` |
| PRJ-NOXH | NOXH.AI (sản phẩm) | active | `04_Knowledge/projects/PRJ-NOXH.md` |
| PRJ-SG | Smart Guarantee | active | `04_Knowledge/projects/PRJ-SG.md` |
| PRJ-BM | BeneMatch | active | `04_Knowledge/projects/PRJ-BM.md` |
<!-- init-project:index-prj (script chèn dòng dự án mới NGAY TRÊN dòng này) -->
| PRJ-LGD | LG Dashboard | superseded → PRJ-LOG | `04_Knowledge/projects/PRJ-LGD.md` |
| PRJ-NOXHHACK | NOXH Hackathon | superseded → PRJ-NOXH | `04_Knowledge/projects/PRJ-NOXHHACK.md` |

## Product / System (SYS)
| ID | Tên | File |
|---|---|---|
| SYS-TPBANK | TPBank — landscape hệ thống, kiến trúc & phụ thuộc tích hợp | `04_Knowledge/products/SYS-TPBANK.md` |
| SYS-GNOL | Giải ngân online | `04_Knowledge/products/SYS-GNOL.md` |
| SYS-BLOL | Bảo lãnh online | `04_Knowledge/products/SYS-BLOL.md` |

## Reference (REF)
| ID | Tên | File |
|---|---|---|
| REF-TPBANK-DELIVERY | TPBank — mô hình triển khai dự án, governance & bài học | `04_Knowledge/references/REF-TPBANK-DELIVERY.md` |
| REF-BRD-WRITING | Nguyên tắc & phương pháp viết BRD (chuẩn TPBank tín dụng) | `04_Knowledge/references/REF-BRD-WRITING.md` |

## Person (PER)
| ID | Tên | File |
|---|---|---|
| PER-TTT | Trần Thế Tuân | `04_Knowledge/people/PER-TTT.md` |

## Skill
| Tên | Mục đích | File |
|---|---|---|
| weekly-report | Báo cáo tuần Khối (5 mảng) từ GAS live → HTML email (đọc di động) + .docx | `03_Skills/weekly-report/SKILL.md` |
| portfolio-digest | Gom trạng thái mới nhất các dự án (handover+git) → `PORTFOLIO_DIGEST.md` | `03_Skills/portfolio-digest/SKILL.md` |
| init-project | Onboard dự án mới (scaffold AI_CONTEXT+CLAUDE.md + đăng ký registry) bằng 1 lệnh | `03_Skills/init-project/SKILL.md` |
| deadline-brief | Nâng chất cảnh báo hạn | `03_Skills/deadline-brief/SKILL.md` |
| decision-brief | Brief hỗ trợ quyết định nhanh | `03_Skills/decision-brief/SKILL.md` |
| intake-triage | Thu thập & định tuyến việc đột xuất | `03_Skills/intake-triage/SKILL.md` |
| tpbank-deck | Dựng PPTX theo chuẩn nhận diện TPBank (màu/logo/accent/font/6 layout) bằng python-pptx | `03_Skills/tpbank-deck/SKILL.md` |
| brd-writer | Viết/rà soát BRD sản phẩm tín dụng (cấu trúc 3 trụ · US+AC · maker-checker · template + checklist) | `03_Skills/brd-writer/SKILL.md` |
| email-writer | Soạn email điều phối/thông báo nội bộ TPBank (văn phong + taxonomy phòng ban đúng · template + checklist) | `03_Skills/email-writer/SKILL.md` |

## Lệnh phiên (slash command — riêng repo hub AIOS)
| Lệnh | Mục đích | File |
|---|---|---|
| `/start` | Bắt đầu phiên: nạp context theo cấu trúc hub (AI_CONTEXT không có PROJECT_OVERVIEW) | `.claude/commands/start.md` |
| `/enter <path>` | Nạp context 1 dự án spoke (đọc 4 file AI_CONTEXT, không quét repo) — nhịp 2 xuyên repo | `.claude/commands/enter.md` |
| `/handover` | Bàn giao chuẩn: ghi delta 4 file AI_CONTEXT (6 trường) + Sync-hub + push master | `.claude/commands/handover.md` |

**Luật xuyên repo:** `02_Rules/cross-repo-workflow.md` (sở hữu hub⇄spoke · giao thức truy vết bug · vòng đời 5 nhịp · DoD). Nhật ký: `00_System/CROSS_REPO_LOG.md`.

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
