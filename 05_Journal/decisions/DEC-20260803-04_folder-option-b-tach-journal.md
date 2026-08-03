---
id: DEC-20260803-04
type: decision
title: Cấu trúc thư mục Option B — tách 05_Journal thành lớp riêng
status: active
owner: PER-TTT
tags: [quy-trinh]
related: [DEC-20260803-03]
created: 2026-08-03
updated: 2026-08-03
version: 1
source: Phase 3 - Folder Structure
---

## Bối cảnh
Kiến trúc gốc 6 lớp chưa có chỗ cho dữ liệu nhật ký append-only.

## Vấn đề cần quyết
Journal gộp vào 04_Knowledge hay tách thành lớp riêng?

## Phương án đã cân nhắc
- A: gộp vào 04_Knowledge/journal (ít thư mục, trộn hai bản chất).
- B: tách 05_Journal riêng, đẩy Tools→06, Agents→07.

## Quyết định
Chọn B.

## Lý do
Journal (append-only, theo thời gian) khác bản chất Knowledge (tuyển chọn tĩnh). Tách giúp Knowledge không phình, dễ backup/version, và để AI Tuân học từ chuỗi quyết định.

## Đánh đổi chấp nhận
Lệch khỏi bộ 6 lớp ban đầu (thành 8 thư mục). Migration bằng 0 vì chưa có gì được tạo.

## Hệ quả & việc tiếp theo
Triển khai khung thư mục ở Phase 5 Sprint 1 (đã xong).

## Nhìn lại (điền sau)
