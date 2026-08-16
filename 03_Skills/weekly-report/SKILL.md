---
name: weekly-report
type: skill
description: Dựng báo cáo tuần cấp KHỐI (Ngân hàng Doanh nghiệp) dưới dạng HTML email responsive (đọc tốt trong email + trên điện thoại không vỡ cấu trúc) kèm .docx lưu trữ, từ dữ liệu LIVE (GAS/Google Sheets). Điều hành-first: Trang 1 đọc 60 giây (cần quyết / quá hạn / hồ sơ treo / thắng lợi / milestone), Sức khỏe THỰC đối chiếu deadline, Ưu tiên 1 core + Ưu tiên 2 (AI & phát triển năng lực). Kích hoạt khi Tuân yêu cầu "báo cáo tuần" hoặc chạy định kỳ chiều thứ 6.
owner: PER-TTT
version: 5
updated: 2026-08-16
---

## Mục tiêu
Rút thời gian dựng báo cáo tuần Khối từ 2–3 giờ xuống dưới 30 phút. Số liệu **LIVE**; lãnh đạo bận nắm việc-cần-quyết + rủi ro trong **60 giây (Trang 1)**. Bản đọc chính là **HTML email** — Giám đốc mở thẳng trong email, xem trên điện thoại không vỡ.

## Cấu trúc báo cáo (điều hành-first)
1. **Trang điều hành (60 giây):** 5 ô KPI (cần BLĐ · quá hạn · hồ sơ blocked · giá trị treo · milestone ≤14d) → ① Cần BLĐ quyết (xếp theo tiền) → ② Cảnh báo (quá hạn theo mảng, hồ sơ treo) → ③ Thắng lợi 2 tuần + ④ Milestone tới hạn ≤14 ngày → bảng Sức khỏe thực + 2 chart.
2. **Ưu tiên 1 — Hoạt động core:** (1) Phát triển sản phẩm mới · (2) Line dự án/initiative lớn · (3) Hồ sơ/case lớn (có tên KH + giá trị + giai đoạn) · (4) Quản lý danh mục & giám sát nợ có vấn đề.
3. **Ưu tiên 2 — AI & Phát triển năng lực:** (5) Chương trình AI (task AI rải rác mọi team) · (6) Phát triển năng lực & bản thân (Dev_Plan — theo chủ đề & người).
4. **Trọng tâm tuần tới.**

> Phạm vi = **toàn bộ task đang chạy** của Khối, phân mảng bằng classifier ưu tiên trong `aggregate.js` (AI → nợ/danh mục thực → SP/quy trình → dự án). Case & Dev xử lý riêng từ bảng nguồn.

## Sức khỏe THỰC (không tin RAG tự tô)
`realHealth` kết hợp RAG team với **hạn thực tế**: quá hạn (deadline<hôm nay, chưa xong) / blocked kéo màu xuống (≥30% hoặc ≥8 việc → Đỏ; ≥1 → Vàng). Lấy màu XẤU hơn giữa RAG và hạn.

## Ngưỡng (cấu hình trong aggregate.js)
- **Hồ sơ lớn** = phức tạp Cao **hoặc** loại hình Dự án **hoặc** giá trị ≥ 50 tỷ, và chưa qua phê duyệt.
- **Quá hạn** = deadline < hôm nay & chưa Hoàn thành. **Milestone tới hạn** = ≤ 14 ngày. **Thắng lợi** = Hoàn thành có deadline trong 14 ngày gần nhất.

## Nguồn dữ liệu (LIVE)
- GAS Web App (SHTD Dashboard) — xem `06_Tools/connectors/gas.md`. Đọc qua `auth-login` (lấy token) → `batch-read` (tasks/initiatives/cases/issues/**dev**).
- Credential lưu untracked `06_Tools/connectors/.gas-secret.json` (đã gitignore) hoặc biến môi trường `GAS_USER/GAS_PASS/GAS_URL`.
- Quy tắc: `02_Rules/reporting-rules.md` · `02_Rules/data-boundary` · Giọng văn `01_Soul/voice.md`.

## Pipeline (4 module + orchestrator)
| File | Vai trò |
|---|---|
| `fetch_gas.js` | login → `batch-read` (tasks/initiatives/cases/issues/dev) → cache `00_System/cache/gas_snapshot.json` |
| `aggregate.js` | phân 6 mảng (P1 core + P2 AI/Dev), **realHealth** theo hạn, khối điều hành (cần BLĐ/quá hạn/thắng lợi/milestone) → `report_data.json` |
| `make_charts.js` | 2 chart PNG (Node `@napi-rs/canvas`): bars khối lượng/mảng + donut Đúng hạn/Quá hạn — **chỉ cho bản .docx** |
| `build_email.js` | **bản chính** — dựng `HTML email` responsive từ `report_data.json` → `RPT-YYYY-Wnn_bao-cao-tuan.html` (1 cột, CSS inline, tiles tự xuống dòng, bảng hồ sơ → thẻ, chart bằng thanh CSS — mobile không chặn ảnh) |
| `build_report.js` | dựng `.docx` (bản lưu trữ/đính kèm) từ `report_data.json` → `RPT-YYYY-Wnn_bao-cao-tuan.docx` |
| `run.js` | chạy cả pipeline: `node run.js` (hoặc `--cache` bỏ qua fetch) → xuất cả HTML + .docx |

## Cách chạy
```
cd 03_Skills/weekly-report
node run.js                     # full: fetch → aggregate → charts → build (kỳ = tuần ISO hôm nay)
node run.js --cache             # dựng lại từ snapshot sẵn có (không gọi GAS)
REPORT_WEEK=2026-W33 node run.js   # chốt kỳ báo cáo cụ thể
```
Phụ thuộc Node (đã cài trong repo): `docx`, `@napi-rs/canvas`.

## Đầu ra
Ở `05_Journal/reports/` (đều **local-only**, gitignore — chứa tên KH):
- **`RPT-YYYY-Wnn_bao-cao-tuan.html`** — **bản chính** gửi Giám đốc. Dán thẳng vào thân email (hoặc gửi kèm .html); đọc trên điện thoại không vỡ. Bố cục điều hành-first: header Khối → 5 KPI → ① Cần BLĐ → ② Cảnh báo → ③ Thắng lợi + ④ Milestone → Sức khỏe thực (thẻ) → chart CSS → chi tiết 5 mảng → Trọng tâm tuần tới.
- `RPT-YYYY-Wnn_bao-cao-tuan.docx` — bản lưu trữ/đính kèm (có 2 chart PNG).

### Ghi chú email-safe (build_email.js)
1 cột `max-width:640`; **CSS inline** (client email bỏ `<style>` ngoài); KPI tiles `inline-block` tự xuống dòng; **bảng hồ sơ nhiều cột → stack thành THẺ** để không tràn ngang; chart bằng **thanh `<div>` CSS** (nhiều client di động chặn ảnh) — không nhúng PNG. Media query `≤480px` chỉ để tinh chỉnh thêm, bố cục vốn fluid nên không phụ thuộc.

## Kiểm tra chất lượng
- [ ] Trang điều hành phản ánh đúng: số cần BLĐ, quá hạn, hồ sơ blocked + giá trị treo, milestone ≤14d.
- [ ] Sức khỏe = **thực** (đối chiếu deadline), không chỉ RAG tự tô.
- [ ] ① Cần BLĐ xếp theo giá trị; ② cảnh báo có quá hạn theo mảng.
- [ ] Số liệu khớp nguồn LIVE (timestamp fetch ghi trong báo cáo).
- [ ] Văn phong điều hành, Trang 1 đọc được trong 60 giây.
- [ ] **HTML email mở trên điện thoại không vỡ cấu trúc**: 1 cột, không tràn ngang, tiles & thẻ hồ sơ đọc được; không phụ thuộc ảnh (chart là thanh CSS).

## Ghi chú quyết định
- Đơn vị báo cáo = **Khối Ngân hàng Doanh nghiệp** (đổi từ "Trung tâm SP&GP Tín dụng" — duyệt PER-TTT 2026-08-16); **nơi nhận vẫn là Giám đốc Trung tâm**.
- **Đầu ra chính = HTML email responsive** (đọc trong email + di động), giữ `.docx` làm bản lưu trữ/đính kèm (duyệt 2026-08-16).
- Báo cáo **nội bộ** gửi Giám đốc Trung tâm: **hiển thị tên KH** ở bảng hồ sơ + mục cần-BLĐ + mô tả task để phân biệt (duyệt PER-TTT 2026-08-14). Data-boundary áp cho truyền ra ngoài/cloud → artifacts (`.html`/`.docx`/`report_data.json`/cache) **gitignore, không đẩy GitHub**. Nếu chuyển ra ngoài → bật redact.
- Nguồn đọc: **GAS `batch-read`** (sạch, đủ) thay vì connector Drive làm phẳng spreadsheet (lossy).
- **Sức khỏe THỰC** đè RAG tự tô: kỳ W33 team tô 267/272 xanh nhưng 75 việc quá hạn → core chuyển "Rủi ro cao".
