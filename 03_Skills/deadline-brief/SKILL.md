---
name: deadline-brief
type: skill
description: Nâng chất cảnh báo hạn — đọc việc quá hạn/sắp hạn chéo các sheet, ưu tiên hóa theo tác động và kèm hành động đề xuất. Kích hoạt khi Tuân hỏi "việc gì sắp trễ", "cảnh báo hạn", hoặc như một brief đầu ngày.
owner: PER-TTT
version: 1
updated: 2026-08-03
---

## Mục tiêu
Không chỉ liệt kê như chuông nhắc của Dashboard, mà cho Tuân biết cần xử lý gì trước, vì sao, và làm gì.

## Đầu vào
- Nguồn qua GAS (06_Tools/connectors/gas.md): Task_Master, Case_Pipeline, Issue_Tracker, Initiative_Master (Milestone), Dev_Plan.
- Ngày hiện tại; chỉ metadata công việc.

## Các bước
1. Đọc các mục có Deadline/hạn; tính khoảng cách tới hạn.
2. Phân nhóm: Quá hạn · Đến hạn hôm nay · ≤3 ngày · ≤7 ngày.
3. Ưu tiên theo tác động: RAG Đỏ > Cần BLĐ > liên quan Milestone > cross-team > còn lại.
4. Với mỗi mục: một dòng "vì sao gấp" + hành động đề xuất + chủ trì (PIC).
5. Xuất brief ngắn: nhóm Quá hạn/đến hạn trước; nêu Top 3 việc cần xử lý ngay.

## Đầu ra
Brief văn bản ngắn (có thể gửi Cowork/email). Không tạo file bắt buộc.

## Kiểm tra chất lượng
- [ ] Không bỏ sót mục quá hạn.
- [ ] Mỗi mục có hành động cụ thể, không chỉ mô tả.
- [ ] Sắp xếp theo tác động, không theo thứ tự ngẫu nhiên.
- [ ] Ngắn gọn, văn phong điều hành.
