---
id: PRJ-AIUS
type: project-card
title: ai-usecase-platform — Quản trị AI Use-Case (SPTD)
status: active
owner: PER-TTT
tags: [ai-governance, usecase, leaderboard, gas]
related: [PRJ-SHTD, PER-TTT]
created: 2026-08-17
updated: 2026-08-17
version: 1
source: https://github.com/tuanttstb-debug/ai-usecase-platform.git
---

## Một dòng
Nền **quản trị AI use-case** (AI-US-SPTD): danh mục US của SPTD, kiến trúc AI governance, leaderboard/champion, hướng dẫn cập nhật tuần.

## Con trỏ (nguồn sự thật nằm ở repo)
- **Local:** `D:\Workspace\Production\ai-usecase-platform`
- **Context:** `ai_context/` *(cần đổi → `AI_CONTEXT/`)* — ARCHITECTURE_SUMMARY, PROJECT_STATE, SESSION_HANDOVER, TECH_DEBT, TODO_NEXT.
- **Nhánh/last:** `docs/v3.15.0-deployed` · 2026-08-02 · **12 file dirty chưa commit**.

## Stack
FE tĩnh (nhiều .html: dashboard/leaderboard/login/manager-review) + Google Apps Script; design system + tokens riêng.

## Quan hệ
- Cùng chủ đề **quản trị AI** với AIOS → ứng viên chia sẻ chuẩn/tri thức AI governance.

## Chuẩn hoá
- ⚠ **Đổi tên thư mục** `ai_context/` → `AI_CONTEXT/`. An toàn về code (grep: **không nơi nào tham chiếu** `ai_context`), nhưng lưu ý rename chỉ-khác-hoa trên Windows (case-insensitive) cần làm qua `git mv` 2 bước.
- ⏸ **Đang làm dở:** repo ở nhánh `docs/v3.15.0-deployed` (không phải main), 12 file ảnh `evd/weekly-update/*.png` dirty + `H2/` chưa track → **hoãn** chuẩn hoá tới khi [TT] gom xong việc dở, tránh trộn commit.
- (tuỳ chọn, không bắt buộc) ~20 file .md ở root (DESIGN_SYSTEM, MODULE_DEPENDENCY, AI_GOVERNANCE_ARCHITECTURE…) có thể gom về `AI_CONTEXT/docs/`; đây là tài liệu kỹ thuật của sản phẩm, không thuộc khung tối thiểu → ưu tiên thấp.
