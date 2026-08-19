---
id: SYS-TPBANK
type: system
title: TPBank — Landscape hệ thống, kiến trúc & phụ thuộc tích hợp
status: active
owner: PER-TTT
tags: [tpbank, architecture, landscape, integration, fcc, esignhub, bpm, reference]
related: [SYS-GNOL, SYS-BLOL, PRJ-SG, PRJ-SHTD, REF-TPBANK-DELIVERY]
created: 2026-08-19
updated: 2026-08-19
version: 1
source: Tổng hợp từ dự án tham chiếu SCF (D:\Workspace\SCF\AI_CONTEXT) + PRJ-SG; nhãn confidence theo mục.
---

## Mục đích & cách dùng
Bản đồ **hệ thống CNTT + pattern kiến trúc + phụ thuộc tích hợp** của TPBank, tái dùng cho **mọi dự án** (không riêng SG) — nhất là việc phối hợp với phòng ban/hệ thống khác. Khi khởi động một dự án đụng core/kênh số TPBank, đọc file này trước để biết **sẽ chạm hệ thống nào, qua giao thức gì, rủi ro thay đổi ra sao, ai sở hữu**.

> Nhãn: **[FACT]** = xác nhận từ tài liệu · **[INFERRED]** = suy luận theo chuẩn/ngữ cảnh · **[OPEN]** = cần xác nhận khi vào dự án cụ thể. Đây là tri thức hạ tầng dùng chung — **không phải** nguyên tắc nghiệp vụ của riêng dự án nào.

---

## 1. Nguyên tắc hai lớp
- **Lớp lõi tác nghiệp (Core/Operational):** Core Banking **FCC (T24/Finacle)** + các hệ vận hành (BPM, CBadmin, ECM...) — nguồn sự thật giao dịch, tiền, hạch toán. Thay đổi ở đây **rủi ro cao nhất**.
- **Lớp kênh số & domain nghiệp vụ (Digital/Channel):** **TPBank BIZ** (Digital Corporate Banking, Web+App) là kênh KHDN; sản phẩm mới thường **mở rộng BIZ** thay vì dựng portal riêng, và bổ sung một **business domain microservices** mới ngồi sau API Gateway.

---

## 2. Danh mục hệ thống (systems catalog)

| Hệ thống | Vai trò | Giao thức | Khi nào chạm | Rủi ro đổi |
|---|---|---|---|---|
| **FCC** (Core Banking, T24/Finacle) | Hạch toán, tạo/giải ngân khoản vay, thu phí, auto-debit, hạn mức (linecode), GL | REST qua Kong / (có thể) IBM ACE | Mọi luồng có tiền/khoản vay/hạn mức | 🔴 Cao |
| **ESignHub / SignHub** (+**HSM**) | Ký số: KH (thường CKS **FPT**), NCC, TPBank auto-sign qua HSM | REST | Mọi luồng cần ký hồ sơ/chứng từ | 🟡 TB |
| **BPM** | Workflow phê duyệt thủ công maker/checker; có sẵn **role group `QTTD_*`** reuse | REST / Event | Luồng cần phê duyệt tay | 🟡 TB |
| **CBadmin** | Admin portal cấu hình sản phẩm/khách hàng/hạn mức/chứng thư số | REST | Cấu hình master data, onboarding | 🟡 TB |
| **ECM** (Filenet) | Lưu trữ hồ sơ/hợp đồng/log giao dịch | **CMIS** | Lưu trữ chứng từ pháp lý | 🟢 Thấp |
| **Kong API Gateway** (internal) | Routing REST nội bộ giữa các domain/microservice | REST | Mọi API nội bộ | 🟢 Thấp |
| **IBM Data Power / API Connect** (external) | Cổng API đối tác/bên ngoài (ERP KH...) | Open API | Tích hợp bên thứ ba | 🟡 TB |
| **Kafka Event Hub** | Bus sự kiện bất đồng bộ | Kafka | Thao tác async (giải ngân, callback) | 🟡 TB |
| **Credit Limits System** | Quản lý & enforce hạn mức | REST | Kiểm tra/cập nhật hạn mức | 🟡 TB |
| **LMS** (Loan Management) | Vòng đời khoản vay | REST | Sản phẩm cho vay | 🟡 TB |
| **Treasury** | Nguồn vốn/thanh khoản giải ngân | REST | Luồng cấp vốn | 🟡 TB |
| **eKYC / BIO / OCR** | Định danh khách hàng | REST | Onboarding KH mới | 🟢 Thấp |
| **AML / FATCA / Swift Screening / Fraud (VMS)** | Sàng lọc tuân thủ | REST | Sản phẩm có giao dịch/KH mới | 🟡 TB |
| **Scoring (SLS / Diasoft RLOS / LOS)** | Chấm điểm, khởi tạo khoản vay | REST | Thẩm định tín dụng | 🟡 TB |
| **CDH / CDP** | Customer 360 | REST | Cần dữ liệu KH tổng hợp | 🟢 Thấp |
| **DWH** (DB2 / Oracle / AWS Lakehouse) | Báo cáo & phân tích | Batch/SQL | Reporting sau go-live | 🟢 Thấp |

**Các building block khác quan sát được [FACT]:** SLS, DBS (Deal Booking), FXS, TopGun, Flex Collateral/Evaluation, CBEX, DCB, C-Contract, edoc, Bot RPA; Payment Hub (Payment Engine, PayGate, FCC RT — Citad/VCB/BIDV, DPH batch).

---

## 3. Pattern kiến trúc TPBank hay dùng (cho domain mới) [FACT/INFERRED]
1. **Microservices-first, self-build** cho business domain mới — **Java Spring Boot**.
2. **Schema-per-microservice** — mỗi service sở hữu schema riêng; **cấm truy cập DB chéo**. Giao tiếp qua REST (sync) hoặc Event Bus (async).
3. **Event-driven** cho thao tác bất đồng bộ (giải ngân, callback thu nợ) — cần **persistent queue + dead-letter + retry** (rủi ro nếu thiếu).
4. **Mở rộng kênh BIZ hiện hữu** thay vì dựng UI mới; thêm một *service* trong Digital Corp Banking.
5. **Kong làm điểm vào nội bộ** (mọi traffic qua Kong → cần rate-limit, circuit breaker).
6. **Configuration-driven** (bài học PRJ-SG): đẩy metadata/rule/alias ra tầng cấu hình để thêm mẫu/field **không phải deploy code**.
7. **Tách Rule khỏi Template/Data** — logic nghiệp vụ (vd validity, routing) là Rule Engine, không hard-code.

---

## 4. Bản đồ phụ thuộc & điểm chết đơn (SPOF)
**Critical path điển hình (sản phẩm tín dụng chuỗi):**
```
CBadmin (config/onboard) → Domain nghiệp vụ (tạo hồ sơ) → Ký số (ESignHub/HSM)
→ FCC (giải ngân/hạch toán) → LMS (khoản vay) → ECM (lưu trữ) → thu nợ/đối soát (FCC callback)
```
**Điểm chết đơn cần thiết kế phòng vệ [FACT từ SCF]:**
- **FCC down → không có dòng tiền** (không giải ngân/thu nợ được).
- **ESignHub nghẽn/hỏng → chặn ký → chặn giải ngân** (cân nhắc ký async, load test).
- **CBadmin thiếu cấu hình → chặn toàn luồng** (onboarding là tiền đề).
- **Event Bus mất message → sai trạng thái giải ngân** (cần guaranteed delivery).
- **Mọi traffic qua Kong** → nghẽn gateway = nghẽn hệ.

**Nguyên tắc rút ra:** giữ **logic quyết định ở lớp mình kiểm soát**, coi hệ ngoài/LLM/bus là lớp cần validate + có retry/fallback (PRJ-SG đã áp: rút route/parse khỏi Dify về GAS).

---

## 5. Chữ ký số & tài liệu [FACT]
- **CKS khách hàng:** thường dùng **FPT** (cùng cơ chế GNOL/BLOL). CA hợp lệ phải nằm trong danh sách **NEAC**; kiểm MST khớp, còn hiệu lực, serial không thu hồi.
- **TPBank auto-sign:** qua **HSM** (vd ký DNUT/chứng từ ngân hàng).
- **Chứng thư số đối tác** (Anchor/DN): đăng ký & duyệt tại **CBadmin → ESignHub** trước khi dùng.
- **Lưu trữ:** hồ sơ pháp lý/hợp đồng vào **ECM qua CMIS**.

## 6. Quy ước API & sự kiện [INFERRED]
- **Nội bộ:** REST qua **Kong**; **bên ngoài:** Open API qua **IBM Data Power/API Connect**.
- **Auth [OPEN]:** OAuth2 / API key / mTLS — xác nhận theo dự án.
- **Async:** Kafka events (vd `*.confirmed`, `disbursement.approved/completed`, `repayment.received`, `notification.send`).

## 7. Ranh giới dữ liệu & tuân thủ (RULE-data-boundary)
- **Không** đưa dữ liệu KH nhạy cảm (tên KH, hồ sơ, thư/hợp đồng) lên cloud/artifact công khai; xử lý trong môi trường được cấp phép của dự án.
- Nghĩ tới **báo cáo SBV/định chế** ngay từ requirement (thường bị bỏ sót — xem [[REF-TPBANK-DELIVERY]]).

## 8. Thường **[OPEN]** ở giai đoạn sớm (hỏi ngay khi vào dự án)
NFR (performance/uptime/concurrent), chiến lược môi trường (DEV/SIT/UAT/PROD), on-prem/cloud, container/orchestration, CI/CD, DR & backup, cơ chế auth API, phiên bản Spring Boot/DB cụ thể.

---

## Nguồn & liên quan
- Dự án tham chiếu: `D:\Workspace\SCF\AI_CONTEXT\` (SYSTEM_ARCHITECTURE, TECH_STACK, MODULE_DEPENDENCY, API_FLOW, PROCESS_MAP). **Chỉ lấy tri thức hạ tầng — không lấy nguyên tắc nghiệp vụ SCF.**
- Playbook triển khai & governance: **[[REF-TPBANK-DELIVERY]]**.
- Sản phẩm liên quan: [[SYS-GNOL]] (giải ngân online), [[SYS-BLOL]] (bảo lãnh online). Dự án: [[PRJ-SG]], [[PRJ-SHTD]].
