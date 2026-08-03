# SYSTEM ARCHITECTURE — CURRENT (AI OS)

> Ảnh chụp kiến trúc hiện tại. Lý do đằng sau các quyết định: xem 05_Journal/decisions (DEC-01..05).

## Hai lớp
- **Tác nghiệp (Operational):** SHTD Dashboard + Google Sheets (9 sheet) + GAS. Nguồn sự thật vận hành; động cơ "luôn bật" (NotificationService: trigger ~8h + email digest).
- **Quản trị & trí tuệ (AI OS):** repo markdown này, chạy trên Claude/Cowork (on-demand). Đọc dữ liệu tác nghiệp qua endpoint GAS; làm phần Dashboard không làm (tổng hợp, cảnh báo thông minh, brief quyết định, tri thức).

## Bốn miền dữ liệu
- Operational → Google Sheets (không nằm trong repo; trỏ qua 06_Tools/connectors/gas.md + cache tạm 00_System/cache).
- Knowledge → 04_Knowledge (file, bán tĩnh).
- Journal → 05_Journal (file, append-only).
- Config → 01_Soul + 02_Rules + 03_Skills.

## Cây thư mục
```
00_System/   meta, INDEX, manifest, CHANGELOG, templates, cache
01_Soul/     identity, principles, voice
02_Rules/    naming, tags, data-boundary, reporting, agent-hiring, collaboration-protocol
03_Skills/   weekly-report, deadline-brief, decision-brief, intake-triage
04_Knowledge/ products, people, references
05_Journal/  decisions, meetings, reports
06_Tools/    connectors/gas.md
07_Agents/   (trống tới khi tuyển)
AI_CONTEXT/  bàn giao & trạng thái đa công cụ
_inbox/ _archive/
```

## Nguyên tắc bất biến
Một nguồn sự thật · chỉ metadata công việc · trung lập model · Chuẩn hóa→Đơn giản→Tái sử dụng→Tự động→AI→Scale.
