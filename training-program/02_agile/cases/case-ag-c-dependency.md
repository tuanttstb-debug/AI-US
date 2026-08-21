# Case AG-C — Sprint vỡ vì dependency Core

> Neo: **Dependency & stakeholder** · nối Growth (case dependency, không đổ lỗi)
> Dòng công việc: Integration / Core

## Tình huống
Giữa iteration, phần tích hợp với Core bị chặn: API cần dùng chưa sẵn sàng, team Core báo "còn 2 tuần nữa". 60% story của iteration phụ thuộc API này. Iteration có nguy cơ vỡ.

## Bẫy
> "Dev/Core chậm, mình bó tay, báo Business là do Core."

Đổ lỗi không cứu iteration, không giúp lần sau tốt hơn, làm hỏng quan hệ với team mình cần nhất.

## Chạy 6 câu dependency + GROWTH

**Dependency là gì / owner / block ở đâu:** API scoring từ Core, owner team Core, block vì lịch release của họ lệch.

**Tôi tác động được gì:**
- Đổi thứ tự: kéo các story **không phụ thuộc** API lên làm trước trong iteration này.
- Dựng **mock/stub** API để Dev làm song song phần front, ghép sau.
- Gỡ block giúp Core nếu có (làm rõ spec, ưu tiên đúng endpoint mình cần trước).

**Có alternative:** phân kỳ — go-live phần không phụ thuộc trước, phần Core theo sau.

**Escalate (đúng lúc, đúng cấp):** báo Leader sớm (nguyên tắc 05) kèm đề xuất, không đợi sát cuối iteration. Đổi cam kết = Level 3.

**Track/Harvest:** iteration được cứu một phần; retro rút ra "cần map dependency Core **trước** khi cam kết iteration".

## Kết quả
Iteration không vỡ hoàn toàn; quan hệ với Core giữ được; team học cách map dependency sớm.

## Câu hỏi thảo luận
1. Liệt kê 3 việc PO tác động được thay vì chỉ chờ Core.
2. Việc nào tự làm (Level 1-2), việc nào phải escalate (Level 3)?
3. Retro nên standardize điều gì để iteration sau không dính lại?
