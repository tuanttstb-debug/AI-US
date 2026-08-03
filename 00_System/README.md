# AI OS — Hệ quản trị & trí tuệ cá nhân của Trần Thế Tuân

AI OS là lớp **quản trị và trí tuệ** ngồi trên SHTD Dashboard (hệ tác nghiệp). Nó không thay thế Dashboard; nó đọc dữ liệu tác nghiệp từ Google Sheets (qua GAS) và bổ sung phần Dashboard không làm: tổng hợp báo cáo, nâng chất cảnh báo, brief hỗ trợ quyết định, và tích lũy tri thức để dần trở thành một "AI Tuân" — nhận lệnh và tư duy như chủ thể.

## Nguyên tắc nền
- Một nguồn sự thật: dữ liệu tác nghiệp ở Google Sheets; AI OS chỉ đọc/tham chiếu, không sao chép làm nguồn.
- Chỉ metadata công việc — không dữ liệu khách hàng.
- Trung lập model: mọi tri thức là markdown + front-matter, đọc được bởi Claude/GPT/Gemini.
- Chuẩn hóa → Đơn giản → Tái sử dụng → Tự động → AI → Scale. Tránh over-engineering.

## Bản đồ thư mục
- `00_System/` — meta, mục lục (INDEX), manifest, changelog, templates, cache đọc offline.
- `01_Soul/` — bản sắc: vai trò, nguyên tắc tư duy, giọng văn.
- `02_Rules/` — luật & quy ước điều khiển hành vi.
- `03_Skills/` — quy trình lặp lại (mỗi skill một thư mục).
- `04_Knowledge/` — tham chiếu bán tĩnh: sản phẩm/hệ thống, người, tài liệu.
- `05_Journal/` — nhật ký append-only: quyết định, họp, báo cáo.
- `06_Tools/` — cấu hình kết nối (GAS).
- `07_Agents/` — định nghĩa agent (rỗng tới khi "tuyển").
- `_inbox/` — bắt việc nhanh, chờ triage. `_archive/` — lưu trữ cũ.
- `AI_CONTEXT/` — bàn giao & trạng thái cho cộng tác đa công cụ (Cowork + Claude Code): SESSION_HANDOVER, PROJECT_STATE, TODO_NEXT, SYSTEM_ARCHITECTURE_CURRENT.

## Làm việc song song (Cowork + Claude Code)
Cả hai công cụ cùng đọc một repo markdown trung lập. Mỗi phiên: `git pull` → đọc `AI_CONTEXT/` → làm việc nhỏ → cập nhật `AI_CONTEXT/` → `git push`. Phân vai và chống xung đột: xem `02_Rules/collaboration-protocol.md`.

## Cách dùng nhanh
Mở AI OS trong Cowork/Claude và ra lệnh, ví dụ: "Dựng báo cáo tuần này", "Có việc gì sắp trễ hạn?", "Ghi lại quyết định X kèm lý do". AI OS đọc Rules + Soul + Knowledge + dữ liệu tác nghiệp để thực thi.

Xem `00_System/INDEX.md` để tra cứu toàn bộ entity theo ID.
