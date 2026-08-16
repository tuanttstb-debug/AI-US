// make_charts.js — 2 biểu đồ PNG cho báo cáo tuần TRUNG TÂM (Node canvas, không cần Python).
//   prog_bars.png : số việc/hồ sơ ĐANG CHẠY theo 5 mảng, tô theo sức khỏe mảng.
//   rag_donut.png : phân bố RAG của toàn bộ hạng mục đang chạy (task + case).
// Dùng: require('./make_charts').makeCharts(reportData, outDir)

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('@napi-rs/canvas');

const COL = { PRIMARY: '#4B1FAF', TEXT: '#0F172A', MUT: '#475569', TRACK: '#EEF0F7',
  GREEN: '#16A34A', AMBER: '#D97706', RED: '#DC2626' };
const ragColor = (rag) => rag === 'Red' ? COL.RED : rag === 'Amber' ? COL.AMBER : COL.GREEN;
const shortName = (title) => title.replace(/^\d+\.\s*/, '').split('—')[0].split('&')[0].trim();

function makeBars(areas, outPath) {
  const S = 2, W = 430 * S, H = 176 * S;
  const cv = createCanvas(W, H); const c = cv.getContext('2d');
  c.fillStyle = '#FFFFFF'; c.fillRect(0, 0, W, H); c.textBaseline = 'middle';
  const padL = 176 * S, padR = 46 * S, top = 12 * S;
  const rowH = (H - top - 10 * S) / areas.length, barH = 14 * S;
  const maxV = Math.max(1, ...areas.map((a) => a.nActive || 0));
  const trackW = W - padL - padR;
  areas.forEach((a, i) => {
    const cy = top + rowH * i + rowH / 2;
    c.fillStyle = COL.TEXT; c.font = `${10.5 * S}px Arial`; c.textAlign = 'right';
    c.fillText(`${a.no}. ${shortName(a.title)}`.slice(0, 30), padL - 10 * S, cy);
    const bx = padL, by = cy - barH / 2;
    c.fillStyle = COL.TRACK; roundRect(c, bx, by, trackW, barH, barH / 2); c.fill();
    const w = Math.max(barH, trackW * (a.nActive || 0) / maxV);
    c.fillStyle = ragColor(a.rag); roundRect(c, bx, by, w, barH, barH / 2); c.fill();
    c.fillStyle = COL.TEXT; c.font = `bold ${11 * S}px Arial`; c.textAlign = 'left';
    c.fillText(String(a.nActive || 0), bx + trackW + 7 * S, cy);
  });
  fs.writeFileSync(outPath, cv.toBuffer('image/png'));
}

function makeDonut(counts, outPath) {
  const S = 2, W = 200 * S, H = 200 * S;
  const cv = createCanvas(W, H); const c = cv.getContext('2d');
  c.fillStyle = '#FFFFFF'; c.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2, rO = 78 * S, rI = 48 * S;
  const segs = [['Green', counts.Green, COL.GREEN], ['Amber', counts.Amber, COL.AMBER], ['Red', counts.Red, COL.RED]].filter((s) => s[1] > 0);
  const total = segs.reduce((s, x) => s + x[1], 0) || 1;
  let a0 = -Math.PI / 2;
  if (!segs.length) { c.strokeStyle = COL.TRACK; c.lineWidth = rO - rI; c.beginPath(); c.arc(cx, cy, (rO + rI) / 2, 0, 2 * Math.PI); c.stroke(); }
  segs.forEach(([, n, col]) => { const a1 = a0 + (n / total) * 2 * Math.PI; c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, rO, a0, a1); c.closePath(); c.fillStyle = col; c.fill(); a0 = a1; });
  c.beginPath(); c.arc(cx, cy, rI, 0, 2 * Math.PI); c.fillStyle = '#FFFFFF'; c.fill();
  c.fillStyle = COL.TEXT; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = `bold ${26 * S}px Arial`; c.fillText(String(total), cx, cy - 6 * S);
  c.fillStyle = COL.MUT; c.font = `${10 * S}px Arial`; c.fillText('đang chạy', cx, cy + 16 * S);
  fs.writeFileSync(outPath, cv.toBuffer('image/png'));
}

function roundRect(c, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

function makeCharts(data, outDir) {
  const prog = path.join(outDir, 'prog_bars.png');
  const donut = path.join(outDir, 'rag_donut.png');
  makeBars(data.areas, prog);
  // Donut = ĐÚNG HẠN (xanh) vs QUÁ HẠN (đỏ) trên task đang chạy — trung thực hơn RAG tự tô.
  const overdue = (data.totals && data.totals.tasksOverdue) || 0;
  const active = (data.totals && data.totals.tasksActive) || 0;
  const seg = { Green: Math.max(0, active - overdue), Amber: 0, Red: overdue };
  makeDonut(seg, donut);
  return { prog, donut, onTime: seg.Green, overdue };
}

module.exports = { makeCharts };

if (require.main === module) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'report_data.json'), 'utf8'));
  const r = makeCharts(data, __dirname);
  console.log('charts OK', JSON.stringify(r.ragCounts));
}
