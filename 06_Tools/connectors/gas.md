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

## Xác thực (bắt buộc cho mọi read)
Trừ `auth-login`, mọi action đều cần `token`. Luồng:
1. POST `{ action:'auth-login', username, password }` → `{ token, user }`.
2. Gửi kèm `token` ở các request sau.
- Credential lưu untracked `06_Tools/connectors/.gas-secret.json` (đã gitignore — **không commit**) hoặc env `GAS_USER/GAS_PASS/GAS_URL`.

## Action đọc chính
- `batch-read` `{ token, domains:['tasks','initiatives','cases','issues'] }` → `{ data:{ tasks:{values}, ... }, serverTs, ver }` — **1 request, sạch, đủ** (đường dùng cho weekly-report).
- `read` → Task_Master (2D array) · `initiative-read` → Initiative_Master · `case-pipeline-read` · `issue-read` · `dev-read`.
- Mỗi domain là mảng 2D `[header, ...rows]` (display values).

> ⚠️ KHÔNG dùng connector Google Drive `read_file_content` để đọc spreadsheet này cho pipeline: nó làm phẳng & trộn lẫn các sheet, có thể cắt bớt file lớn (lossy). Dùng `batch-read`.

## Action gửi báo cáo (weekly-report)
- `send-report` `{ token, html, subject, dryRun? }` → `{ report:{ to, toName, cc:[], count, sent, warnings } }`. **Admin-only.** GAS tự phân giải người nhận từ `User_Master` (To=`CuongVM1`, Cc=`Role=Teamlead` active có email, dedup) rồi `MailApp.sendEmail`. `dryRun:true` → trả người nhận, **không gửi**.
- Định nghĩa ở SHTD `backend/ReportEmailService.gs` + route `Code.gs`; **phải redeploy** GAS Web App mới có action (nếu không → `action không hợp lệ`).

## Nguyên tắc dùng
- AI OS **chỉ đọc** cho mục đích tổng hợp/phân tích; hạn chế ghi, ưu tiên để Dashboard là nơi ghi tác nghiệp.
- Chỉ metadata công việc (xem RULE-data-boundary).
- Snapshot đọc có thể lưu tạm ở `00_System/cache/` để làm việc offline; cache không phải nguồn sự thật.
