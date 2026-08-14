---
name: weekly-report
type: skill
description: Dựng báo cáo tuần cấp TRUNG TÂM dưới dạng .docx từ dữ liệu LIVE (GAS/Google Sheets). Tổng quan "nhìn 15 giây" theo 5 mảng nghiệp vụ + chi tiết + trọng tâm tuần tới. Kích hoạt khi Tuân yêu cầu "báo cáo tuần" hoặc chạy định kỳ chiều thứ 6.
owner: PER-TTT
version: 3
updated: 2026-08-14
---

## Mục tiêu
Rút thời gian dựng báo cáo tuần Trung tâm từ 2–3 giờ xuống dưới 30 phút. Số liệu **LIVE** từ hệ tác nghiệp (không nhập tay), lãnh đạo nắm trong 15 giây.

## 5 mảng nghiệp vụ (cấp Trung tâm)
1. **Công tác phát triển sản phẩm mới** — thiết kế/ban hành sản phẩm, chính sách (SCF, BESS, Thấu chi, OTO, BĐS, HSUT, BTT…).
2. **Các line dự án chính đang chạy** — dự án số hóa (GNOL, BLOL, Econtract, SCF-MVP) + dự án KD (CRM, ESMS, NOXH, branch tour, bán mới tệp lớn).
3. **Hồ sơ / case lớn đang theo dõi** — từ Case_Pipeline; case đang mở & lớn (phức tạp Cao / loại hình Dự án / giá trị ≥ 50 tỷ). **Ẩn tên KH** — chỉ ĐVKD + loại hình + giá trị + giai đoạn + bước tiếp theo.
4. **Quản lý danh mục & giám sát nợ có vấn đề** — QLDM, RISK-*, giám sát/truy đòi/tái cấu trúc/CIC/nợ quá hạn, room/hạn mức ngành.
5. **Chương trình AI của Trung tâm** — task AI rải rác mọi team (GenAI, chatbot, Gem, usecase AI) + Category AI/Năng suất.

> Phạm vi = **toàn bộ task đang chạy** (status ≠ Hoàn thành) của Trung tâm, phân vào 1 mảng bằng classifier ưu tiên trong `aggregate.js` (AI → nợ/danh mục → dự án → sản phẩm). Case xử lý riêng từ bảng Case_Pipeline.

## Nguồn dữ liệu (LIVE)
- GAS Web App (SHTD Dashboard) — xem `06_Tools/connectors/gas.md`. Đọc qua `auth-login` (lấy token) → `batch-read` (tasks/initiatives/cases/issues).
- Credential lưu untracked `06_Tools/connectors/.gas-secret.json` (đã gitignore) hoặc biến môi trường `GAS_USER/GAS_PASS/GAS_URL`.
- Quy tắc: `02_Rules/reporting-rules.md` · `02_Rules/data-boundary` · Giọng văn `01_Soul/voice.md`.

## Pipeline (4 module + orchestrator)
| File | Vai trò |
|---|---|
| `fetch_gas.js` | login → `batch-read` → cache `00_System/cache/gas_snapshot.json` |
| `aggregate.js` | gom 5 mảng, membership ISO tuần, RAG theo tỷ trọng, cần BLĐ, case (ẩn KH) → `report_data.json` |
| `make_charts.js` | 2 chart PNG (Node `@napi-rs/canvas`, không cần Python): bars khối lượng/mảng + donut RAG |
| `build_report.js` | dựng `.docx` từ `report_data.json` → `05_Journal/reports/RPT-YYYY-Wnn_bao-cao-tuan.docx` |
| `run.js` | chạy cả pipeline: `node run.js` (hoặc `--cache` bỏ qua fetch) |

## Cách chạy
```
cd 03_Skills/weekly-report
node run.js                     # full: fetch → aggregate → charts → build (kỳ = tuần ISO hôm nay)
node run.js --cache             # dựng lại từ snapshot sẵn có (không gọi GAS)
REPORT_WEEK=2026-W33 node run.js   # chốt kỳ báo cáo cụ thể
```
Phụ thuộc Node (đã cài trong repo): `docx`, `@napi-rs/canvas`.

## Đầu ra
File `.docx` (bìa → Tổng quan điều hành + 2 chart + hộp Cần BLĐ → Chi tiết 5 mảng → Trọng tâm tuần tới) ở `05_Journal/reports/`.

## Kiểm tra chất lượng
- [ ] Bảng tổng quan phản ánh đúng sức khỏe (RAG theo tỷ trọng) + số việc đang chạy từng mảng.
- [ ] Mọi việc/hồ sơ cần BLĐ xuất hiện ở hộp nổi bật.
- [ ] Mảng 3 (case) **không lộ tên KH** — chỉ ĐVKD/giá trị/giai đoạn.
- [ ] Số liệu khớp nguồn LIVE (timestamp fetch ghi trong báo cáo).
- [ ] Văn phong điều hành, ngắn gọn.

## Ghi chú quyết định
- Báo cáo **nội bộ** gửi Giám đốc Trung tâm: tên KH trong mô tả task (mảng 4) **giữ nguyên** (duyệt PER-TTT 2026-08-14) — data-boundary áp cho truyền ra ngoài/cloud, không cấm ngữ cảnh nội bộ. Nếu cần chuyển tiếp ra ngoài → bật redact.
- Nguồn đọc: chọn **GAS `batch-read`** (sạch, đủ) thay vì connector Drive làm phẳng cả spreadsheet (lossy).
