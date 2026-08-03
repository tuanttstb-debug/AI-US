---
name: intake-triage
type: skill
description: Thu thập việc đột xuất với ma sát tối thiểu — phân loại và định tuyến email/cuộc gọi/họp gấp/ý tưởng về đúng nơi (Task/Case/Issue/Decision/Meeting/Knowledge). Kích hoạt khi Tuân thả một mẩu việc vào _inbox hoặc chat và muốn ghi nhận.
owner: PER-TTT
version: 1
updated: 2026-08-03
---

## Mục tiêu
Vá "lỗ hổng thu thập" — mọi việc phát sinh đều có chỗ, không rơi rụng, mà không tốn công nhập liệu.

## Đầu vào
- Một mẩu ghi chú thô (dán từ email/ghi nhanh sau cuộc gọi/họp).

## Các bước
1. Ghi nhận nội dung thô.
2. Phân loại vào một trong: Task (việc lẻ) · Case (việc KD) · Issue (sự cố LIVE) · Decision (cần quyết) · Meeting (biên bản) · Knowledge (thông tin nền).
3. Trích trường chính: chủ trì, hạn, liên quan (SYS/INI), mức ưu tiên.
4. Định tuyến:
   - Task/Case/Issue → tạo bản ghi ở sheet tương ứng (qua Dashboard/GAS).
   - Decision/Meeting → tạo file trong 05_Journal theo template.
   - Knowledge → cập nhật file 04_Knowledge tương ứng.
5. Nếu thiếu thông tin bắt buộc, hỏi đúng một câu.
6. Đánh dấu mục trong _inbox là đã xử lý.

## Đầu ra
Bản ghi/entity ở đúng nơi + xác nhận ngắn cho Tuân.

## Kiểm tra chất lượng
- [ ] Không mất mẩu việc nào.
- [ ] Mỗi mục kết thúc ở một "nhà" rõ ràng.
- [ ] Tối thiểu câu hỏi (lý tưởng: 0).
- [ ] Chỉ metadata công việc.
