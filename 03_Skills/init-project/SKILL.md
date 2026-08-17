---
id: SKILL-init-project
type: skill
title: Init Project — onboard dự án mới vào registry bằng 1 lệnh
owner: PER-TTT
version: 1
updated: 2026-08-17
---

# Init Project

Onboard 1 dự án coding mới vào **AI OS Registry (Hub-and-Spoke)** trong 1 lệnh: vừa **scaffold repo mới** (khung `AI_CONTEXT/` + `CLAUDE.md` bootstrap) vừa **đăng ký vào AIOS** (thẻ PRJ + PORTFOLIO + INDEX + projects.json). Đây là cách "khai báo" để phiên Claude Code sau tự lấy đúng kiến trúc/quy trình.

## Vì sao cần
- **`CLAUDE.md` ở gốc repo mới** là mắt xích để Claude Code **tự nạp** chuẩn (thứ tự đọc `AI_CONTEXT/`, quy tắc commit/handover/data-boundary) — không phải nhắc tay mỗi phiên.
- Đăng ký trung tâm để dự án hiện trong `PORTFOLIO.md` + `portfolio-digest` gom trạng thái tự động.

## Chạy
```
# Xem trước, không ghi:
node 03_Skills/init-project/init.js --id PRJ-CRM --name "CRM App" --folder "crm-app" --role "Quản lý khách hàng" --repo <url> --dry

# Thực thi:
node 03_Skills/init-project/init.js --id PRJ-CRM --name "CRM App" --folder "crm-app" --role "Quản lý khách hàng" --repo <url>
```
- `--id` dạng `PRJ-<MÃ>` (VIẾT HOA). `--folder` = thư mục repo dưới `D:\Workspace\Production\`; hoặc `--path <tuyệt đối>`.
- `--dry` in kế hoạch không ghi · `--force` cho ghi đè (mặc định **skip** file đã có).

## Làm gì (10 thao tác)
**Repo đích:** tạo `AI_CONTEXT/{PROJECT_OVERVIEW,SESSION_HANDOVER,PROJECT_STATE,TODO_NEXT,TECH_DEBT}.md` + `CLAUDE.md` (điền sẵn id/tên/vai trò/ngày).
**AIOS:** tạo thẻ `04_Knowledge/projects/PRJ-<MÃ>.md`; chèn dòng vào `PORTFOLIO.md` + `INDEX.md` (tại anchor `<!-- init-project:* -->`); thêm mục vào `03_Skills/portfolio-digest/projects.json`.

## An toàn
- **Không ghi đè** file đã có (trừ `--force`); **không tự git commit** — bạn review rồi commit ở từng repo.
- Chỉ chạm đúng các file trên; không đụng code repo đích.

## Sau khi chạy
1. Điền nội dung thật cho `AI_CONTEXT/PROJECT_OVERVIEW.md` (+ STATE/TODO) của dự án.
2. Repo đích: `git add AI_CONTEXT CLAUDE.md && commit`.
3. AIOS: `git add 00_System 03_Skills 04_Knowledge && commit`.
4. (tuỳ chọn) `node 03_Skills/portfolio-digest/digest.js`.

## Giới hạn
- Cần anchor `<!-- init-project:portfolio-active -->` / `<!-- init-project:index-prj -->` trong PORTFOLIO/INDEX (đã đặt sẵn). Nếu mất anchor → script cảnh báo, chèn tay.
- Repo đích nên đã `git init` sẵn (script vẫn tạo file nếu chưa, nhưng bạn tự tạo git/remote).
