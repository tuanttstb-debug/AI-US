---
id: DEC-20260803-01
type: decision
title: Kiến trúc AI OS hai lớp, ngồi trên Dashboard (Option C)
status: active
owner: PER-TTT
tags: [ai, quy-trinh]
related: [TOOL-gas]
created: 2026-08-03
updated: 2026-08-03
version: 1
source: Phase 1 - Architecture
---

## Bối cảnh
Đã có SHTD Dashboard vận hành. Cần xác định AI OS quan hệ thế nào với nó.

## Vấn đề cần quyết
AI OS thay thế, chạy song song, hay ngồi trên Dashboard? Và cấu trúc lớp nội bộ ra sao?

## Phương án đã cân nhắc
- A Lean: tối giản, nhanh nhưng dễ phải tái cấu trúc khi scale.
- B Full 6 lớp: đầy đủ nhưng over-engineering sớm.
- C Phân lớp theo giai đoạn: khoá tên lớp làm đích, đổ đầy theo 80/20.

## Quyết định
Chọn C. AI OS = lớp quản trị & trí tuệ ngồi trên; Dashboard = hệ tác nghiệp, nguồn sự thật vận hành. AI OS đọc dữ liệu tác nghiệp, không thay thế.

## Lý do
Tránh hai nguồn sự thật và gánh nhập liệu kép. C tôn trọng tầm nhìn 6 lớp nhưng thực thi theo thang Chuẩn hóa→Đơn giản→...→Scale, tránh over-engineering.

## Đánh đổi chấp nhận
Cần kỷ luật để không đổ đầy Tools/Agents quá sớm.

## Hệ quả & việc tiếp theo
Thêm lớp Journal; đặt động cơ luôn bật ở GAS (DEC-20260803-02).

## Nhìn lại (điền sau)
