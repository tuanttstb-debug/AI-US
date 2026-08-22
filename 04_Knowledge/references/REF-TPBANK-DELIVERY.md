---
id: REF-TPBANK-DELIVERY
type: reference
title: TPBank — Mô hình triển khai dự án, governance & bài học
status: active
owner: PER-TTT
tags: [tpbank, delivery, governance, process, blockers, playbook, reference]
related: [SYS-TPBANK, PRJ-SG, PER-TTT]
created: 2026-08-19
updated: 2026-08-22
version: 2
source: Tổng hợp từ dự án tham chiếu SCF + so sánh PRJ-SG; nhãn confidence theo mục.
---

## Mục đích
Playbook **cách một dự án được triển khai trong TPBank**: ai quyết gì, đi qua cửa nào, hay kẹt ở đâu — để **sẵn sàng phối hợp với phòng ban khác** ở các dự án tương lai. Đọc kèm bản đồ hệ thống [[SYS-TPBANK]].

> **[FACT]** xác nhận từ tài liệu · **[INFERRED]** suy luận · **[OPEN]** cần xác nhận theo dự án. Tri thức tổ chức/quy trình dùng chung — không phải nghiệp vụ riêng dự án nào.

---

## 1. Vai trò tổ chức (org actors) [FACT/INFERRED]

| Viết tắt | Đơn vị | Vai trò trong dự án |
|---|---|---|
| **ĐVKD** | Đơn vị kinh doanh | Client-facing; khởi tạo onboarding; **Maker** trong workflow |
| **HTTD** | Hỗ trợ tín dụng | Kiểm soát tác nghiệp (KST1/tay 1), nhập/kiểm hồ sơ |
| **KSV** | Kiểm soát viên | Phê duyệt tay 2 (KST2) |
| **CGPD** | Cấp phê duyệt/Hội đồng tín dụng | Thẩm định & duyệt hạn mức, khoản giải ngân lớn |
| **CPC / CA** | Chính sách / Quản trị tín dụng | Checker chính sách; ký cuối |
| **CBO / GĐCN** | Giám đốc kinh doanh/chi nhánh | Duyệt bật/tắt tính năng nhạy cảm (vd auto-flow) |
| **ORM** | Quản lý rủi ro vận hành | Ký duyệt rủi ro vận hành (cửa bắt buộc) |
| **Legal / PC** | Pháp chế | Hợp đồng khung, ý kiến pháp lý (có thể **bác** thiết kế) |
| **ITA.IT** | Kiến trúc CNTT | Review & phê duyệt kiến trúc |
| **DCB** | (nguồn lực Dev) | **Bố trí Dev/Tech Lead/Tester** — nút thắt nguồn lực điển hình |
| **BA** | Phân tích nghiệp vụ | BRD, spec, điều phối open questions |
| **QA/QADA** | Kiểm thử | SIT/UAT |
| **TGĐ / Board** | Ban điều hành | Phê duyệt **ngân sách** |

### 1b. Owner hệ thống & đầu mối IT theo vai (owner units) [FACT — dự án PFMP Xây lắp 2026-08]
> Cấp **đơn vị/vai trò** (không lưu danh tính cá nhân). Dùng khi lập Taskforce / gửi email điều phối / phân vai tích hợp. Bổ sung từ thực tế lập Taskforce PFMP.

| Viết tắt | Vai trò / phụ trách |
|---|---|
| **PM.IT** | Điều phối Taskforce/dự án, kế hoạch & timeline, quản lý phạm vi |
| **Dev1 + Dev3** | Owner **BPM** (ĐXGN & QTGN) — phân hệ quản lý công trình, luồng maker-checker, nguồn dữ liệu tự động (BPM/**CCP**) |
| **Dev2** | Owner **CRM** — lớp xem/khai thác cho CR/CM/CB/RM |
| **CBS** | Owner **FCC** — nguồn dữ liệu core (dư nợ, BL, LC, thu nợ…) |
| **ITA.IT** | **Kiến trúc hệ thống** — phương án tích hợp BPM–CRM–FCC & các hệ liên quan (đầu mối quyết kiến trúc) |
| **DP + Data** | **Quy hoạch & khai thác dữ liệu dùng chung**, tích hợp/chuẩn hoá nguồn nội bộ, Mã công trình làm khóa liên thông |
| **CA.CB** | (phía **CB**, không phải IT) — tư vấn **nghiệp vụ vận hành nguồn dữ liệu**, phối hợp điều chỉnh QTNV owner |
| **CCP** | Nền tảng core cấp nguồn dữ liệu tự động cho BPM (đi kèm FCC) |

> ⚠️ **Đừng lẫn:** `ITA.IT` = kiến trúc CNTT (quyết kiến trúc) ≠ `CA.CB` = đơn vị nghiệp vụ phía CB. `CBS`=owner FCC, `Dev2`=owner CRM, `Dev1/Dev3`=owner BPM. `ORM` = review rủi ro vận hành (cửa bắt buộc, nhưng có thể **không** nằm trong Taskforce cấp đầu mối tuỳ dự án).

## 2. Thẩm quyền quyết định [FACT]
| Quyết định | Ai |
|---|---|
| Ngân sách | **TGĐ / Board** |
| Kiến trúc | **ITA.IT** |
| Rủi ro vận hành | **ORM** |
| Hạn mức chương trình/tín dụng | **CGPD / Hội đồng** |
| Giải ngân lớn / chuẩn | CGPD / (CPC/CA) |
| Bật/tắt tính năng nhạy cảm | CBO / GĐCN |
| Ý kiến pháp lý sản phẩm | Legal/PC |
| Go-live | **[OPEN] — xác định theo dự án** |

## 3. Vòng đời triển khai điển hình [FACT từ SCF]
```
BRD (BA) → Đánh giá ORM → Review kiến trúc ITA.IT → Đánh giá kỹ thuật + kế hoạch
→ 🔴 Phê duyệt NGÂN SÁCH (TGĐ) → 🔴 Bố trí NGUỒN LỰC Dev (DCB)
→ Phát triển → SIT → UAT → Pentest/ANBM → Go-live
```
> Hai cửa **🔴** (ngân sách TGĐ, nguồn lực DCB) là nơi dự án hay **đứng vô thời hạn** dù plan đã xong.

## 4. Pattern phê duyệt Maker–Checker (BPM) [FACT]
- Chuỗi điển hình: **ĐVKD (Maker) → HTTD (KST1) → KSV (KST2) → CGPD/CPC → thực thi (FCC)**.
- **Role group `QTTD_*` có sẵn** trong BPM — reuse thay vì tạo mới.
- Hàng đợi mẫu: khởi tạo → chờ bổ sung → chờ xử lý → chờ interface.
- Tham chiếu luồng có sẵn (GNOL/BLOL) để không thiết kế lại từ đầu.

## 5. Bối cảnh pháp lý & tuân thủ [FACT]
- Chọn **khung pháp lý** đúng cho sản phẩm sớm (vd bao thanh toán TT20/2024; cho vay TT39; bảo lãnh/đấu thầu theo vòng đời thông tư TT06-07→TT22→TT40→TT79). **Pháp chế có thể bác thiết kế** → hỏi PC trước khi khoá luồng chi phí/cấu trúc sản phẩm.
- **Ký số:** CA trong danh sách **NEAC**.
- **Báo cáo SBV/định chế:** map vào requirement **ngay từ đầu** (hay bị bỏ sót tới sát go-live).
- **Ranh giới dữ liệu:** không đưa dữ liệu KH nhạy cảm ra ngoài môi trường cấp phép.

## 6. Blocker & failure mode thường gặp (checklist rủi ro) [FACT]
| Nhóm | Biểu hiện điển hình | Phòng ngừa |
|---|---|---|
| **Nguồn lực** | Chờ Dev từ DCB, chưa có định biên → timeline vô định | Xác nhận cam kết DCB **trước khi** cam kết timeline |
| **Ngân sách** | Chờ TGĐ; thiếu căn cứ khả thi | Có feasibility + (tốt nhất) PoC để de-risk quyết định |
| **Cấu hình core** | Linecode/mã sản phẩm FCC chưa mở; dùng lại hay tạo mới chưa quyết | Trình cấu hình FCC **song song** phát triển, quyết sớm |
| **NFR trống** | "Chờ IT đánh giá" → không sizing được | Định nghĩa NFR trước khi thiết kế |
| **Spec/template thiếu** | Mẫu chứng từ (vd KUNN/DNUT) "gen tự động" nhưng chưa có template | Chuẩn bị template + rule trước sprint liên quan |
| **Tích hợp chưa test** | "Không rõ cơ chế hiện tại" của job/hệ cũ | Sprint tích hợp riêng + parallel run |
| **UI/onboarding treo** | Còn đàm phán → rơi về Excel thủ công | Chốt scope UI tối thiểu sớm |
| **Bảo mật** | Pentest lên lịch muộn → delay go-live | Pentest **song song** UAT |
| **Extensibility** | Kiến trúc không chừa chỗ cho pha sau → retrofit đắt | Thiết kế điểm mở rộng ngay (dù chưa implement) |

## 7. Hai archetype triển khai — chọn đúng đường
| | **Heavy self-build** (vd SCF) | **Lean PoC** (vd PRJ-SG) |
|---|---|---|
| Khi nào | Sản phẩm production, đụng core/tiền thật | Chứng minh giá trị trước khi đầu tư lớn |
| Stack | Microservices + tích hợp core (FCC/BPM/ESignHub...) | GAS + Dify + Google Sheet/Drive, gần zero core |
| Nguồn lực | Team lớn từ DCB + ngân sách TGĐ | 1 người + AI, chi phí ~0 |
| Rủi ro | Kẹt ở 2 cửa 🔴; blast radius lớn | Accuracy/ổn định AI; blast radius hẹp |
| **Bài học** | Plan giỏi vẫn kẹt vì **phụ thuộc ngoài** | **Dùng PoC lean để de-risk** rồi mới self-build |

> **Nguyên tắc áp dụng:** với đổi mới ở TPBank, **chứng minh bằng PoC rẻ trước**; chỉ chuyển sang self-build nặng khi giá trị đã được duyệt — tránh đúng failure mode của các dự án đứng ở vạch xuất phát.

## 8. Pre-flight checklist cho dự án TPBank mới
- [ ] Khung pháp lý chọn đúng? Đã hỏi **PC/Legal**?
- [ ] Chạm hệ thống nào trong [[SYS-TPBANK]]? Ai **sở hữu** từng hệ? Giao thức?
- [ ] Có **cấu hình core** (linecode/mã sản phẩm) cần mở? Ai trình, khi nào?
- [ ] **NFR** đã định nghĩa? Chiến lược môi trường/DR?
- [ ] **Nguồn lực DCB** đã cam kết? **Ngân sách** có căn cứ (feasibility/PoC)?
- [ ] **Template/chứng từ** & **rule** đã sẵn cho các sprint tương ứng?
- [ ] **Báo cáo SBV** & **pentest** đã đưa vào kế hoạch (song song, không để cuối)?
- [ ] **Bộ test/nghiệm thu** định nghĩa trước để đo được KPI?
- [ ] **Ranh giới dữ liệu KH** được tôn trọng?

---

## Nguồn & liên quan
- Bản đồ hệ thống: **[[SYS-TPBANK]]**.
- Dự án tham chiếu: `D:\Workspace\SCF\AI_CONTEXT\` (PROJECT_OVERVIEW, STAKEHOLDER_MAP, OPEN_QUESTION, TECH_DEBT, PROCESS_MAP) — lấy tri thức tổ chức/quy trình, **không** lấy nguyên tắc nghiệp vụ SCF.
- Áp dụng trực tiếp: [[PRJ-SG]] (Smart Guarantee — archetype lean PoC).
