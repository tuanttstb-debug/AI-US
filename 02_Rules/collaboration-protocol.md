---
id: RULE-collaboration
type: rule
title: Quy trình làm việc song song (Cowork + Claude Code)
owner: PER-TTT
version: 1
updated: 2026-08-03
---

Mục tiêu: cho phép Cowork và Claude Code cùng làm trên một repo AI OS mà không xung đột, không tạo hai nguồn sự thật.

## Phân vai theo bản chất việc
- **Cowork (Chief of Staff):** chiến lược, phản biện, phỏng vấn làm giàu Knowledge, log Decision, dựng báo cáo/tài liệu (.docx), vận hành hằng ngày (skill, lịch, connector).
- **Claude Code (Engineer):** việc nặng kỹ thuật gắn repo — tích hợp GAS live, chạy/debug `build_report.js`, script tự động hóa, git hygiene, refactor.
- **Tuân (Owner):** phê duyệt, cập nhật dữ liệu tác nghiệp, chạy thử scheduled task, cung cấp tri thức nghiệp vụ.

## Vùng sở hữu file (tránh sửa chồng)
- Claude Code chủ yếu: `03_Skills/*/build_report.js`, script, `06_Tools`.
- Cowork chủ yếu: `01_Soul`, `04_Knowledge`, `05_Journal`, `00_System/templates`, nội dung `03_Skills/*/SKILL.md`.
- Dùng chung (cập nhật cuối phiên): `AI_CONTEXT/*`, `00_System/INDEX.md`, `00_System/CHANGELOG.md`.

## Nhịp làm việc (bắt buộc mỗi phiên)
1. `git pull` trước khi làm.
2. Đọc `AI_CONTEXT/SESSION_HANDOVER.md` + `TODO_NEXT.md` + `PROJECT_STATE.md`.
3. Làm việc nhỏ, commit nhỏ, message rõ ràng.
4. Cuối phiên: cập nhật `PROJECT_STATE`, `TODO_NEXT`, `SESSION_HANDOVER` → `git add/commit/push`.

## Nguyên tắc chống xung đột
- Không để hai công cụ sửa cùng một file cùng lúc; theo vùng sở hữu trên.
- Một nguồn sự thật: dữ liệu tác nghiệp ở Sheets; tri thức/config ở repo; không nhân bản.
- Nếu vướng `.git/index.lock` (ổ Windows): xóa file lock rồi commit.
