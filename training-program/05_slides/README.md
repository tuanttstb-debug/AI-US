# 05_slides — Slide chương trình (chuẩn TPBank)

Dựng bằng skill [`tpbank-deck`](../../03_Skills/tpbank-deck/SKILL.md) (python-pptx, nhận diện TPBank).

## Đã dựng
| File | Module | Slide |
|---|---|---|
| `M1-design-thinking.pptx` | Design Thinking | title · section · 5 bước · Solution-first vs DT · Double Diamond · closing |
| `M2-agile.pptx` | Agile | title · section · mindset · Story/AC · MoSCoW (KPI) · iteration/retro/dependency · closing |
| `M4-capstone.pptx` | Capstone | title · section · 3 trụ · ngôn ngữ chung (table) · luồng 2h · closing |

M3 Growth có deck riêng ở [`../03_growth/06_slides/`](../03_growth/06_slides/) (hiện teal — rebrand sang TPBank khi thống nhất).

## Dựng lại
```
cd training-program/05_slides
PYTHONUTF8=1 python build_slides.py
```
Sửa nội dung: mở `build_slides.py` (dùng API `Deck` của skill). Đổi brand/màu/layout: sửa trong skill `tpbank-deck`.

## Render kiểm tra (PowerPoint COM)
```powershell
$pp = New-Object -ComObject PowerPoint.Application
$d = $pp.Presentations.Open("M1-design-thinking.pptx",$true,$false,$false)
$i=1; foreach($s in $d.Slides){ $s.Export("s$i.png","PNG",1280,720); $i++ }
$d.Close(); $pp.Quit()
```
