# -*- coding: utf-8 -*-
"""Demo: dựng deck mẫu bằng thư viện tpbank_deck để kiểm tra chuẩn brand."""
import os
from tpbank_deck import Deck, C

d = Deck()

# 1. Title
d.title_slide("BÁO CÁO DỰ ÁN", "Mẫu chuẩn nhận diện TPBank",
              "Team Số hóa Tín dụng · 2026")

# 2. Section divider
d.section_slide("Phần 1", "Tổng quan & tiến độ")

# 3. Content + bullets
s = d.content_slide("Tình hình triển khai", kicker="Cập nhật tuần")
d.bullets(s, [
    "Hoàn tất phân tích nghiệp vụ luồng phê duyệt.",
    "Đang tích hợp API scoring với Core.",
    ("Rủi ro: ", "phụ thuộc lịch release của đối tác."),
    ("Đề xuất: ", "cắt scope MVP để giữ mốc go-live."),
], size=17)

# 4. KPI
d.kpi_slide("Chỉ số chính", [("12", "Hồ sơ đang chạy"),
    ("3", "Chờ phê duyệt"), ("95%", "Đúng hạn"), ("2", "Rủi ro cao")],
    kicker="Snapshot")

# 5. Table
d.table_slide("Kế hoạch hạng mục", [
    ["Hạng mục", "Chủ trì", "Hạn", "Trạng thái"],
    ["Phân tích nghiệp vụ", "PO", "30/06", "Hoàn thành"],
    ["Tích hợp Core", "Dev", "15/07", "Đang làm"],
    ["UAT", "QA", "30/07", "Chưa bắt đầu"],
    ["Go-live", "PM", "15/08", "Kế hoạch"],
], col_widths=[3, 1.4, 1.2, 1.6], kicker="Roadmap")

# 6. Closing
d.closing_slide("Trân trọng cảm ơn", "Vì chúng tôi hiểu bạn")

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "demo-tpbank-deck.pptx")
d.save(out)
print("Saved:", out, "| slides:", len(d.prs.slides._sldIdLst))
