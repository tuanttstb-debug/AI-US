# Dependency & Stakeholder — quản lý phụ thuộc là việc của PO

> Trong ngân hàng, phần lớn task PO không tự làm một mình — phụ thuộc Business, Dev, QA, Risk, Compliance, Legal, Ops, Vendor. Quản dependency = một nửa công việc.

## Dependency là phần việc PO, không phải "việc người khác"
Khi có phụ thuộc, trả lời 6 câu (nối Growth case dependency):
1. Dependency là gì? (chính xác cái gì chờ cái gì)
2. Ai là owner thật sự? (ai gỡ được)
3. Block ở đâu? (điểm nghẽn cụ thể)
4. Tôi tác động được gì? (cắt scope? đổi thứ tự? gỡ block khác cho họ?)
5. Có alternative không? (đường vòng, phân kỳ)
6. Khi nào cần escalate? (ngưỡng nào đẩy lên Leader)

## Dependency map — công cụ
Vẽ trước khi vào iteration:
```
[Story/việc của tôi] ──cần──▶ [cái gì] ──từ──▶ [ai/team nào] ──hạn──▶ [khi nào]
   trạng thái: [OK / đang chờ / block]   rủi ro: [thấp/vừa/cao]
```
→ Xem [dependency-map tool](../tools/dependency-map.md).

## Stakeholder — mỗi bên một mối quan tâm
| Bên | Quan tâm chính | PO cần |
|---|---|---|
| Business | Giá trị, đúng nhu cầu, đúng hạn | Chốt kỳ vọng sớm, demo thường xuyên |
| Dev | Requirement rõ, ít đổi giữa chừng | Story + AC tốt, đổi có kiểm soát |
| QA | Tiêu chí nghiệm thu rõ | AC đo được, DoD |
| Risk/Compliance | Không vi phạm quy định | Đưa ràng buộc vào AC sớm, không để cuối |
| Ops | Vận hành được sau go-live | Runbook, cảnh báo |

## Không đổ lỗi — own dependency (nối Growth)
> "Dev chậm" là đường cụt. "Dependency block ở API scoring, owner là team X, mình đã escalate + chuẩn bị phương án cắt scope" là làm việc của PO.

## Agile trong governance
Quản dependency không có nghĩa tự ý vượt quyền. Thay đổi chạm scope/logic/commitment vẫn qua **Decision Rights** (Level 3). Xem [case AG-C](../cases/case-ag-c-dependency.md) và Growth `decision-tree`.

## Ngày mai áp dụng
Với việc đang làm: vẽ dependency map, xác định owner + ngưỡng escalate cho mỗi phụ thuộc rủi ro cao.
