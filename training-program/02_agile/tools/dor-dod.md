# Công cụ — Definition of Ready & Definition of Done

> Hai "cửa" chất lượng: DoR = story đủ điều kiện để **bắt đầu**; DoD = việc đủ điều kiện để coi là **xong**. Team tự chốt, dán lên bảng.

## Definition of Ready (trước khi vào iteration)
Story chỉ được đưa vào Planning khi:
- [ ] Có vai / hành động / **giá trị ("để…")**.
- [ ] Có **AC đo được** (Given/When/Then), gồm case lỗi.
- [ ] **Ràng buộc Risk/Compliance** đã được soát và đưa vào AC (nếu có).
- [ ] Dependency đã xác định (ai/khi nào).
- [ ] Dev **ước lượng được** (không quá mơ hồ).
- [ ] Đủ nhỏ để làm trong 1 iteration.

> DoR chính là thứ ngăn "story mơ hồ lọt vào rồi Dev đoán" (case AG-A, AG-D).

## Definition of Done (trước khi coi là xong)
Một việc chỉ "Done" khi:
- [ ] Code xong + đạt **toàn bộ AC**.
- [ ] QA test pass (gồm case lỗi).
- [ ] Không tạo lỗi/regression mới (nối Growth: Track).
- [ ] Ràng buộc Risk/Compliance được kiểm.
- [ ] Tài liệu/decision log cập nhật nếu chạm quy định (nối Growth: audit).
- [ ] Với production: theo dõi đủ để xác nhận, **không đóng vội** (nối Growth nguyên tắc 06).

## Cách dùng
- In DoR/DoD, dán nơi làm việc.
- Planning: chỉ nhận story đạt DoR.
- Nghiệm thu: chỉ đóng việc đạt DoD.
- Retro: nếu lỗi lọt → soát lại DoR/DoD thiếu gì → cập nhật (standardize).
