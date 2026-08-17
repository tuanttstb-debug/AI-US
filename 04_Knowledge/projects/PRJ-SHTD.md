---
id: PRJ-SHTD
type: project-card
title: SHTD Dashboard — Số Hóa Tín Dụng (hệ tác nghiệp Khối KHDN)
status: active
owner: PER-TTT
tags: [dashboard, banking, credit, operational-source, gas]
related: [SYS-GNOL, SYS-BLOL, PER-TTT]
created: 2026-08-17
updated: 2026-08-17
version: 1
source: https://github.com/tuanttstb-debug/SHTD-Dashboard.git
---

## Một dòng
Web app nội bộ của **Khối Ngân hàng Doanh nghiệp** (một NHTM VN): theo dõi công việc realtime, báo cáo tuần, tầm nhìn điều hành. SPA monolithic, ~v6.2.

## Con trỏ (nguồn sự thật nằm ở repo)
- **Local:** `D:\Workspace\Production\SHTD-Dashboard`
- **Context:** `AI_CONTEXT/` *(đã đúng chuẩn hoa)* — OVERVIEW, BUSINESS_FLOW, PROJECT_STATE, SESSION_HANDOVER, TECH_DEBT, CHANGE_LOG, IMPACT_ANALYSIS…
- **Nhánh/last:** `main` · 2026-08-16 `docs(S74): stamp commit hash`.

## Stack
Static SPA + Google Apps Script + Google Sheets (9 sheet: Task/Initiative/Case/Issue/Dev…).

## Quan hệ
- **AIOS ⟵ đọc metadata ⟵ PRJ-SHTD**: skill `weekly-report` của AIOS đọc GAS (`auth-login`+`batch-read`) từ chính Dashboard này để dựng báo cáo tuần Khối. Đây là **nguồn tác nghiệp** trong kiến trúc AIOS (xem `AI_CONTEXT/SYSTEM_ARCHITECTURE_CURRENT.md`).

## Mở
- (không) — context đã đúng chuẩn khung.
