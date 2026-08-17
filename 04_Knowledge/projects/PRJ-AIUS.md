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
- ✅ **Đổi tên thư mục `ai_context/` → `AI_CONTEXT/`** XONG (2026-08-17, commit AIUS `e377098` trên nhánh `docs/v3.15.0-deployed`). `git mv` 2 bước (rename thuần R100, giữ lịch sử); cập nhật 2 con trỏ active trong `TECH_DEBT.md` gốc; không đụng 12 png `evd/` + `H2/` đang làm dở. Bảng lịch sử trong `SESSION_HANDOVER.md` giữ nguyên (ghi nhận quá khứ).
- **Lưu ý nhánh:** thay đổi nằm trên `docs/v3.15.0-deployed` (nhánh [TT] đang làm), chưa merge `main`.
- (tuỳ chọn, ưu tiên thấp) ~20 file .md ở root (DESIGN_SYSTEM, MODULE_DEPENDENCY, AI_GOVERNANCE_ARCHITECTURE…) có thể gom về `AI_CONTEXT/docs/`; là tài liệu kỹ thuật sản phẩm, không thuộc khung tối thiểu.
