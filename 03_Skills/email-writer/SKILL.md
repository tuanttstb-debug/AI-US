---
id: SKILL-email-writer
type: skill
title: email-writer — soạn email điều phối/thông báo nội bộ TPBank
status: active
owner: PER-TTT
related: [REF-TPBANK-DELIVERY, SYS-TPBANK, brd-writer]
created: 2026-08-22
updated: 2026-08-22
version: 1
---

# Skill: email-writer

Soạn **email nội bộ TPBank** (thông báo chủ trương, điều phối Taskforce, mời họp, xin cử nhân sự, báo cáo cấp trên) **đúng văn phong + đúng taxonomy phòng ban**, sẵn sàng gửi sau khi điền đầu mối.

> **Không trùng lặp:** tri thức org actors / owner-unit sống **một chỗ** ở [[REF-TPBANK-DELIVERY]] §1 + §1b (canonical). Skill này chỉ lo **quy trình soạn + văn phong + template + checklist**, và **trỏ về REF** khi cần map phòng ban. Kiến trúc chống trùng như [[brd-writer]].

## Khi nào dùng
- Thông báo/điều phối dự án tới nhiều phòng ban (IT + nghiệp vụ).
- Xin cử đầu mối, mời kickoff/họp, chốt mốc phản hồi.
- Báo cáo lên cấp trên (Cc Giám đốc Khối "để báo cáo").

## Nguyên tắc văn phong (rút từ bản chuẩn đã dùng — PFMP 2026-08)
Bản nháp đầu tay **dài, liệt kê, map phòng ban sai** → sau khi [TT] sửa rút ra 6 luật:

1. **Subject ngắn, hành-động-first** — mở bằng động từ/kết quả, không nhồi tag.
   - ✅ `Khởi động Taskforce – Số hóa Quản lý Công trình Xây lắp trên BPM và CRM`
   - ❌ `[Chủ trương đã duyệt] … — Đề nghị cử đầu mối Taskforce & họp khởi động`
   - Dùng **"và"** (không `&`), gạch **en-dash "–"** (không `—`/`|`).
2. **Xưng hô theo NHÓM, không liệt kê placeholder tên** ở đầu thư.
   - ✅ `Kính gửi các Anh chị Trưởng Phòng IT, CA, CM` + `Cc các anh chị Giám Đốc Khối để báo cáo`.
   - Tên/đầu mối cụ thể để **ở chữ ký cuối thư** (mục "Đầu mối"), không nhồi vào dòng To.
3. **Framing rủi ro làm động lực** — nêu 1 câu vì sao cấp thiết (rủi ro không nhận diện sớm, thiếu kiểm soát) ngay sau hiện trạng, trước khi vào giải pháp.
4. **Thân thư = văn xuôi mạch lạc**, chỉ dùng bảng cho **phân vai đơn vị**. Không bê nguyên bullet-list dài (9 hạng mục → gộp 1 câu). Giữ 4 mục: Mục tiêu & định hướng · Đề nghị cử đầu mối · Bước tiếp theo · Tài liệu đính kèm.
5. **Có mốc cụ thể + nhạy văn hoá** — chốt ngày phản hồi + tuần kickoff thật; lưu ý lịch VN ("Sau lễ" 2/9, Tết…). Không để "[ngày]" nếu đã biết.
6. **Đúng taxonomy owner-unit** — map phòng ban theo [[REF-TPBANK-DELIVERY]] §1b. **Đừng bịa/đoán**: `ITA.IT`=kiến trúc ≠ `CA.CB`=nghiệp vụ CB; owner FCC=`CBS`, owner CRM=`Dev2`, owner BPM=`Dev1/Dev3` (+`CCP`). Chỉ đưa `ORM` vào đầu mối khi dự án thật cần.

## Quy trình 6 bước
1. **Xác định loại email + người nhận** (nhóm To / Cc-để-báo-cáo) — đối chiếu REF §1/§1b để gọi đúng đơn vị.
2. **Chốt CTA** (1 hành động chính: cử đầu mối trước ngày X? / xác nhận dự họp? / duyệt?) + mốc thời gian thật.
3. **Viết Subject** theo luật 1.
4. **Dựng thân** theo `EMAIL_TEMPLATE.md` (4 mục), áp luật 3–5.
5. **Bảng phân vai** — lấy owner-unit từ REF §1b, mỗi dòng "Đơn vị | Vai trò dự kiến".
6. **Chữ ký + đầu mối** (theo nhóm Nghiệp vụ / Hệ thống) → chạy `CHECKLIST.md` → xuất (`.md` để dán, hoặc nhờ dựng bản HTML giữ định dạng bảng cho Outlook/Gmail).

## Data-boundary
- **KHÔNG** tự gửi email. Xuất **bản nháp** để [TT] soát & gửi (hoặc tạo Gmail draft khi được phép).
- Lưu tri thức org **cấp đơn vị/vai trò**; **không** đưa danh tính/handle cá nhân vào tài liệu commit.
- Không đưa dữ liệu khách hàng/secret vào email/đính kèm lên cloud ngoài.

## Đầu ra
- Bản nháp email (`.md`) đủ Subject · To/Cc theo nhóm · 4 mục thân · bảng phân vai · chữ ký + đầu mối · danh mục đính kèm.
- (Tuỳ chọn) bản **HTML** dán thẳng Outlook/Gmail giữ bảng.

## Neo tri thức
- Org actors & owner units → [[REF-TPBANK-DELIVERY]] §1, §1b.
- Bức tranh hệ thống (BPM/CRM/FCC/CCP/ECM) → [[SYS-TPBANK]].
- Nếu email kèm/trình BRD → [[brd-writer]].
