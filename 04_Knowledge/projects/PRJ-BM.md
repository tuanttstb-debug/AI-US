---
id: PRJ-BM
type: project-card
title: BeneMatch — API xác minh tên pháp nhân bên thụ hưởng trước giải ngân (PoC/Demo TPBank)
status: active
owner: PER-TTT
tags: [beneficiary, verification, name-matching, legal-entity, dify, gas, poc, tpbank, shtd]
related: [PRJ-SHTD, SYS-TPBANK, REF-TPBANK-DELIVERY, PRJ-SG, PER-TTT]
created: 2026-08-19
updated: 2026-08-19
version: 1
source: https://github.com/tuanttstb-debug/BeneMatch
---

## Một dòng
**PoC/Demo cho TPBank.** API **xác minh tên pháp nhân bên thụ hưởng** trước giải ngân: đối chiếu tên **hóa đơn** vs **đề nghị chuyển tiền** → **MATCH/REVIEW/NOT_MATCH**. Lõi rule-based deterministic đã chạy trên **Dify Cloud**; AI chỉ diễn giải cảnh báo (không quyết định). Mục tiêu bản demo: **nhận diện rủi ro sớm khi tích hợp rộng** vào luồng tín dụng. Chưa production.

## Con trỏ (nguồn sự thật nằm ở repo)
- **Local:** `D:\Workspace\Production\BeneMatch` — remote `https://github.com/tuanttstb-debug/BeneMatch`.
- **Lõi verify:** `Beneficiary Legal Entity Verification V2.yml` (Dify workflow) + `Beneficiary_Verification_Dify_V2_Handover.docx` (bàn giao 2026-08-11).
- **Context:** `AI_CONTEXT/` — 5 lõi + **DESIGN_SYSTEM** + 8 design docs: `SYSTEM_ARCHITECTURE`, `DIFY_WORKFLOW`, `DECISION_RULES`, `NORMALIZATION_SPEC`, `API_CONTRACT`, `INTEGRATION_MAP`, `GOLDEN_DATASET`, `DATA_MODEL`. + `CLAUDE.md` bootstrap.

## Phạm vi & kiến trúc (chốt 2026-08-19)
- **Kiến trúc:** mirror `PRJ-SG` — FE HTML+Bootstrap (tím-first) · **GAS gateway** · **Dify Workflow** (normalize → legal type → similarity → **Rule Engine** → warning route → build response) · Google Sheet (log/config). Configuration-driven.
- **Vị trí:** chốt kiểm **trong luồng SHTD/tín dụng** (giải ngân theo hóa đơn), trước FCC.
- **Demo kể 4 tuyến:** nghiệp vụ core · bản đồ tích hợp · ranh giới AI/rule · chất lượng nhận diện.
- **Bất biến:** quyết định deterministic; khác loại hình pháp nhân → NOT_MATCH (hard rule); account là supporting signal (khác account ≠ NOT_MATCH); AI `used_for_decision=false`.
- **Dữ liệu:** chỉ **synthetic** (được publish artifact) — RULE-data-boundary.

## Quan hệ
- **Nghiệp vụ/luồng:** `PRJ-SHTD`; bối cảnh hệ thống `SYS-TPBANK` (FCC/BPM/ESignHub/CBadmin…).
- **Kiến trúc & UI:** kế thừa `PRJ-SG` (stack + "TPBank BIZ" tím-first).

## Chuẩn hoá
- ✅ Khởi tạo qua `init-project` + dựng đủ bộ context thiết kế (2026-08-19).
- ✅ Ghi nhận 2 tech-debt as-built: **TD-BM-01** Warning Route bỏ qua `ai_eligible` (gọi LLM mọi REVIEW); **TD-BM-02** `generated_by_ai` sai type.
- ⏳ **[CHỜ NỘI DUNG]** endpoint/API key Dify Cloud; dataset synthetic; FE + GAS + Sheet; quyết định vá/giữ TD-BM-01 cho demo.
