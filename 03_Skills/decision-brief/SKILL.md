---
name: decision-brief
type: skill
description: Brief hỗ trợ quyết định nhanh — gom context liên quan, trình phương án + đánh đổi + khuyến nghị + độ tự tin, rồi log lại thành Decision. Kích hoạt khi Tuân cần quyết một việc hoặc yêu cầu "chuẩn bị quyết định X".
owner: PER-TTT
version: 1
updated: 2026-08-03
---

## Mục tiêu
Giúp ra quyết định nhanh mà không thiếu dữ liệu — đúng nỗi đau "quyết sai khi gấp".

## Đầu vào
- Câu hỏi quyết định cần trả lời.
- Context: dữ liệu operational liên quan (Task/Initiative/Case/Issue) + Knowledge (SYS/PER) + Journal (DEC/MTG trước, Risk).

## Các bước
1. Làm rõ đúng câu hỏi cần quyết (một câu).
2. Gom context liên quan theo `related` ID và tag.
3. Trình 2–3 phương án, mỗi phương án ưu/nhược + đánh đổi, nhìn từ các góc: Product, Business, IT, Operations, Risk, Compliance khi phù hợp.
4. Nêu giả định đang tồn tại và dữ liệu còn thiếu.
5. Đưa **một** khuyến nghị rõ + lý do + chủ trì + KPI + rủi ro + độ tự tin.
6. Khi Tuân chốt: ghi `DEC-YYYYMMDD-nn` vào 05_Journal/decisions theo template + cập nhật INDEX.

## Đầu ra
Brief quyết định ngắn; và (khi chốt) một file Decision trong Journal.

## Kiểm tra chất lượng
- [ ] Giả định nêu rõ ràng, không giấu.
- [ ] Chỉ một khuyến nghị chính, không mơ hồ.
- [ ] Có lý do — để nuôi AI Tuân.
- [ ] Quyết định được log kèm lý do.
