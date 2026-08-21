# -*- coding: utf-8 -*-
"""Dựng slide TPBank cho M1 (Design Thinking), M2 (Agile), M4 (Capstone)
bằng skill tpbank-deck. Chạy: PYTHONUTF8=1 python build_slides.py"""
import os, sys
sys.path.insert(0, r"D:\Workspace\AIOS\03_Skills\tpbank-deck")
from tpbank_deck import Deck

HERE = os.path.dirname(os.path.abspath(__file__))

# ================= M1 — DESIGN THINKING =================
d = Deck()
d.title_slide("DESIGN THINKING", "Khám phá đúng vấn đề", "Team Số hóa Tín dụng · M1")
d.section_slide("M1 · 2.5h", "Chọn đúng việc trước khi build")

s = d.content_slide("Vì sao Design Thinking", kicker="Why")
d.bullets(s, [
    ("Lỗi đắt nhất: ", "build đúng một thứ không ai cần."),
    ("DT đứng trước phân tích nghiệp vụ ", "— để phân tích đúng thứ."),
    ("Yêu cầu của Business ", "thường là giải pháp giả định, không phải vấn đề."),
], size=17)

s = d.content_slide("5 bước", kicker="Framework")
d.bullets(s, [
    ("Empathize — ", "hiểu người dùng thật (RM, teller, cán bộ duyệt, khách)."),
    ("Define — ", "chốt Problem Statement + How Might We."),
    ("Ideate — ", "bung ≥3 ý tưởng (= Options của Growth)."),
    ("Prototype — ", "làm thử rẻ trên giấy trước khi giao Dev."),
    ("Test — ", "học từ phản hồi người dùng (= Harvest)."),
], size=16)

d.table_slide("Solution-first vs Design Thinking", [
    ["Tình huống", "Solution-first", "Design Thinking"],
    ["Nhận yêu cầu", "“Thêm nút X, làm thôi”", "“Chị dùng X để làm gì?”"],
    ["Requirement mơ hồ", "“User chả biết muốn gì”", "“Mình cần hỏi/quan sát gì?”"],
    ["Có nhiều ý tưởng", "“Chốt cái đầu cho nhanh”", "“Bung 3 hướng, thử rẻ”"],
    ["Chê mockup", "“Họ khó tính”", "“Prototype sai ở đâu?”"],
], col_widths=[1.5, 2.2, 2.4], kicker="Đổi cách nghĩ")

s = d.content_slide("Double Diamond", kicker="Nhịp")
d.bullets(s, [
    ("Kim cương 1 — đúng vấn đề: ", "Discover (mở) → Define (đóng)."),
    ("Kim cương 2 — đúng giải pháp: ", "Develop (mở) → Deliver (đóng)."),
    ("Hai lỗi: ", "đóng vấn đề quá sớm / mở giải pháp mãi."),
    ("Deliver → ", "bàn giao sang Agile để build."),
], size=17)

d.closing_slide("Cam kết", "Trước mỗi BRD: hỏi “để làm gì” + nói chuyện 1 người dùng thật")
d.save(os.path.join(HERE, "M1-design-thinking.pptx"))
print("M1 OK")

# ================= M2 — AGILE =================
d = Deck()
d.title_slide("AGILE", "Giao đúng cách trong ràng buộc ngân hàng", "Team Số hóa Tín dụng · M2")
d.section_slide("M2 · 2.5h", "Giao giá trị tăng dần, học từng vòng")

s = d.content_slide("Agile mindset (không phải tuỳ tiện)", kicker="Why")
d.bullets(s, [
    ("Requirement không bao giờ hoàn hảo từ đầu ", "→ giao dần, học, điều chỉnh."),
    ("Rủi ro lớn nhất: ", "build 6 tháng rồi mới biết sai → chia nhỏ, phát hiện sớm."),
    ("Agile trong ngân hàng = ", "thích ứng nhanh TRONG khuôn khổ, không bỏ khuôn khổ."),
    ("Agile KHÔNG phá Decision Rights.", ""),
], size=16)

s = d.content_slide("User Story & Acceptance Criteria", kicker="Dev không phải đoán")
d.bullets(s, [
    ("Story: ", "Là [vai] muốn [hành động] để [giá trị]. “Để…” là quan trọng nhất."),
    ("INVEST: ", "Independent · Negotiable · Valuable · Estimable · Small · Testable."),
    ("AC (Given/When/Then): ", "đo được + case lỗi + ràng buộc Risk/Compliance."),
    ("AC = Reality của Growth ", "áp vào requirement."),
], size=16)

d.kpi_slide("Prioritization — MoSCoW", [
    ("M", "Must — thiếu thì không go-live"),
    ("S", "Should — hoãn ngắn được"),
    ("C", "Could — bỏ được"),
    ("W", "Won't now — ghi cho sau"),
], kicker="Biết cắt gì")

s = d.content_slide("Iteration, Ceremonies & Dependency", kicker="Nhịp giao")
d.bullets(s, [
    ("MVP = ", "lát mỏng DÙNG THẬT ĐƯỢC, không phải làm một nửa cẩu thả."),
    ("Ceremonies: ", "Standup (bắt block sớm) · Review · Retro = Harvest."),
    ("Retro không ra action = ", "Harvest hỏng, lỗi lặp lại (nguyên tắc 09)."),
    ("Dependency là việc của PO: ", "ai owner, tác động được gì, khi nào escalate."),
], size=16)

d.closing_slide("Cam kết", "Mỗi story: ≥1 AC đo được + case lỗi trước khi đưa Dev")
d.save(os.path.join(HERE, "M2-agile.pptx"))
print("M2 OK")

# ================= M4 — CAPSTONE =================
d = Deck()
d.title_slide("CAPSTONE", "1 sáng kiến chạy xuyên 3 trụ", "Team Số hóa Tín dụng · M4")
d.section_slide("M4 · 2h", "Ráp Design Thinking · Agile · Growth")

s = d.content_slide("3 trụ là một vòng", kicker="Định vị")
d.bullets(s, [
    ("Design Thinking ", "→ chọn đúng việc (đúng vấn đề/giải pháp)."),
    ("Agile ", "→ giao đúng cách (tăng dần, thích ứng)."),
    ("Growth ", "→ mindset nền, khiến mỗi vòng giỏi hơn vòng trước."),
    ("Vòng khép kín: ", "khám phá → giao → học → khám phá lại."),
], size=17)

d.table_slide("Ngôn ngữ chung — một tư duy, ba tên gọi", [
    ["Growth", "Design Thinking", "Agile"],
    ["Options", "Ideate", "Prioritization (MoSCoW)"],
    ["Harvest", "Test-learning", "Retrospective"],
    ["Reality", "Empathize / Define", "Acceptance Criteria"],
    ["Goal", "Point of View / HMW", "Sprint / Product Goal"],
], col_widths=[1.3, 1.9, 2.0], kicker="Kết dính")

s = d.content_slide("Luồng capstone 2h", kicker="Cách chạy")
d.bullets(s, [
    ("0. Chọn 1 sáng kiến thật ", "+ viết Goal (10')."),
    ("1. Design Thinking: ", "Empathize → Define → Ideate → Prototype (40')."),
    ("2. Agile: ", "User Story + MoSCoW + MVP + dependency map (40')."),
    ("3. Growth: ", "Track + Harvest + Decision Rights (20')."),
    ("4. Chốt playbook + cam kết ", "(10')."),
], size=16)

d.closing_slide("Mỗi vòng để lại một cách làm tốt hơn",
                "Hiểu đúng vấn đề · Giao gọn hơn · Learning được ghi lại")
d.save(os.path.join(HERE, "M4-capstone.pptx"))
print("M4 OK")
print("All decks saved to", HERE)
