---
id: TOOL-gas
type: tool
title: Kết nối Google Apps Script (nguồn tác nghiệp)
owner: PER-TTT
version: 1
updated: 2026-08-03
---

## Endpoint
- Web App URL: `https://script.google.com/macros/s/AKfycbydyikBtboeDufx9fsloV3pOT-EVgQfpkggImGH3GrQ8Skct5XC1B1KtE7U008G97f2/exec`
- Spreadsheet ID: `1cpg1p_8TGGbvZNNWZmjsKANqHW1tQijbiQBFLYn56Hk`
- Giao thức: POST, body JSON `{ action: '<tên>' , ... }`

## Sheet & range
| Sheet | Range | Cột | Nội dung |
|---|---|---|---|
| Task_Master | A1:X | 24 | Việc nguyên tử |
| Initiative_Master | A1:O | 15 | Initiative + Milestone |
| Case_Pipeline | A1:T | 20 | Pipeline case KD |
| Issue_Tracker | A1:R | 18 | Sự cố LIVE |
| Dev_Plan | A1:L | 12 | Phát triển bản thân |
| KPI_Summary | — | — | Tổng hợp KPI |
| Notifications | — | — | Nhắc việc / đã đọc |
| User_Master | — | — | Người dùng, RBAC |
| Audit_Log | — | — | Vết kiểm toán |

## Action đọc chính
- `read` → Task_Master (2D array)
- `initiative-read` → Initiative_Master
- (Case/Issue/Dev có route tương ứng trong backend/Code.gs)

## Nguyên tắc dùng
- AI OS **chỉ đọc** cho mục đích tổng hợp/phân tích; hạn chế ghi, ưu tiên để Dashboard là nơi ghi tác nghiệp.
- Chỉ metadata công việc (xem RULE-data-boundary).
- Snapshot đọc có thể lưu tạm ở `00_System/cache/` để làm việc offline; cache không phải nguồn sự thật.
