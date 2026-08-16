// build_email.js — Dựng HTML EMAIL responsive BÁO CÁO TUẦN KHỐI (điều hành-first) từ report_data.json.
// Mục tiêu: Giám đốc đọc TỐT ngay trong thân email + xem trên ĐIỆN THOẠI không vỡ cấu trúc.
// Kỹ thuật email-safe: bố cục 1 cột (max-width 640), CSS INLINE, KPI tiles tự xuống dòng (inline-block),
// bảng hồ sơ nhiều cột → stack thành THẺ, chart bằng thanh CSS (không PNG — client di động hay chặn ảnh).
// Data-driven từ report_data.json, chỉ metadata (nội bộ). Song song với build_report.js (.docx).

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'report_data.json'), 'utf8'));

// ── Palette (khớp bản .docx) ──
const PRIMARY = '#4B1FAF', ACCENT = '#FF7A00', G = '#16A34A', A = '#D97706', R = '#DC2626';
const TEXT = '#0F172A', MUT = '#475569', LIGHT = '#F0F2F8', LINE = '#E2E8F0', CARD = '#FFFFFF';
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";
const ragHex = (r) => r === 'Red' ? R : r === 'Amber' ? A : G;

// ── Helpers ──
function esc(x) { return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
const short = (t) => String(t).replace(/^\d+\.\s*/, '');
const shortT = (t) => short(t).split('—')[0].split('&')[0].split('/')[0].trim();
const fmtTy = (n) => n >= 1000 ? (n / 1000).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' nghìn tỷ' : (n || 0).toLocaleString('vi-VN') + ' tỷ';
function fmtTs(iso) { try { return new Date(iso).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }); } catch (e) { return iso; } }

const EX = DATA.exec;
const P1 = DATA.areas.filter((a) => a.priority === 1);
const P2 = DATA.areas.filter((a) => a.priority === 2);

// ── KPI tile (inline-block → tự xuống dòng trên màn hẹp) ──
function tile(num, label, color) {
  return `<div style="display:inline-block;width:30%;min-width:96px;vertical-align:top;box-sizing:border-box;margin:4px 0;padding:10px 6px;text-align:center;background:${LIGHT};border-radius:8px;">
    <div style="font:700 30px/1.05 ${FONT};color:${color};">${esc(num)}</div>
    <div style="font:400 12px/1.3 ${FONT};color:${MUT};margin-top:4px;">${esc(label)}</div>
  </div>`;
}

// ── Box viền màu trái ──
function box(title, titleColor, edge, innerHtml) {
  return `<div style="border:1px solid ${LINE};border-left:5px solid ${edge};border-radius:8px;background:${CARD};padding:12px 14px;margin:0 0 12px;">
    <div style="font:700 14px/1.3 ${FONT};color:${titleColor};margin-bottom:8px;">${title}</div>
    ${innerHtml}
  </div>`;
}
const H1 = (n, txt) => `<div style="font:700 18px/1.3 ${FONT};color:${PRIMARY};margin:26px 0 10px;padding-bottom:6px;border-bottom:2px solid ${LIGHT};">${esc(n)}. ${esc(txt)}</div>`;
const badge = (txt, color) => `<span style="display:inline-block;font:700 11px/1 ${FONT};color:#fff;background:${color};padding:4px 8px;border-radius:20px;white-space:nowrap;">${esc(txt)}</span>`;

// ① Cần BLĐ quyết
const decHtml = (EX.decisions.length
  ? EX.decisions.map((d, i) => `<div style="margin:0 0 7px;font:400 14px/1.45 ${FONT};color:${TEXT};">
      <b style="color:${ACCENT};">${i + 1}.</b> <b style="color:${PRIMARY};">[${esc(d.type)}]</b>
      <b>${esc(d.label)}${d.value ? ` — ${esc(fmtTy(d.value))}` : ''}</b>
      <span style="color:${MUT};">${esc(d.sub)}</span></div>`).join('')
  : `<div style="font:italic 14px/1.4 ${FONT};color:${MUT};">Không có việc cần BLĐ quyết tuần này.</div>`)
  + (EX.nDecisions > EX.decisions.length ? `<div style="font:italic 12px/1.4 ${FONT};color:${MUT};margin-top:4px;">… và ${EX.nDecisions - EX.decisions.length} đề xuất khác.</div>` : '');
const boxDecisions = box('① CẦN BAN LÃNH ĐẠO QUYẾT / CHO Ý KIẾN', '#854F0B', ACCENT, decHtml);

// ② Cảnh báo
const al = EX.alerts;
const overdueByArea = Object.entries(al.overdueByArea).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${esc(k)} ${n}`).join(' · ');
let alertHtml =
  `<div style="margin:0 0 6px;font:400 14px/1.45 ${FONT};"><b style="color:${R};">Quá hạn:</b> ${al.nOverdue} việc <span style="color:${MUT};">— ${overdueByArea}</span></div>` +
  `<div style="margin:0 0 6px;font:400 14px/1.45 ${FONT};"><b style="color:${A};">Hồ sơ tắc:</b> ${al.blockedCases} hồ sơ lớn Tạm dừng/Blocked, giá trị treo ~${esc(fmtTy(al.blockedValue))}.</div>`;
if (al.redItems && al.redItems.length) alertHtml += `<div style="font:400 14px/1.45 ${FONT};"><b style="color:${R};">Điểm đỏ:</b> ${esc(al.redItems.slice(0, 4).map((x) => `${x.name} (${x.team})`).join(' · '))}</div>`;
const boxAlerts = box('② CẢNH BÁO — RỦI RO & CHẬM TIẾN ĐỘ', R, R, alertHtml);

// ③ Thắng lợi · ④ Milestone (mỗi box full-width, stack tự nhiên trên mobile)
const winHtml = EX.wins.length
  ? EX.wins.slice(0, 6).map((w) => `<div style="margin:0 0 5px;font:400 13px/1.4 ${FONT};"><b style="color:${G};">✓</b> ${esc(w.name)} <span style="color:${MUT};font-size:12px;">· ${esc(w.team)}</span></div>`).join('')
  : `<div style="color:${MUT};">—</div>`;
const msHtml = EX.milestones.length
  ? EX.milestones.slice(0, 6).map((m) => `<div style="margin:0 0 5px;font:400 13px/1.4 ${FONT};"><b style="color:${PRIMARY};">◷</b> ${esc(m.name)} <span style="color:${MUT};font-size:12px;">· ${esc(m.init)} · ${esc(m.deadline)}</span></div>`).join('')
  : `<div style="color:${MUT};">—</div>`;
const boxWins = box(`③ THẮNG LỢI 2 TUẦN (${EX.wins.length})`, G, G, winHtml);
const boxMs = box(`④ MILESTONE TỚI HẠN ≤14 NGÀY (${EX.milestones.length})`, PRIMARY, PRIMARY, msHtml);

// ── Sức khỏe thực: THẺ theo mảng (không dùng bảng nhiều cột → không tràn ngang) ──
function overviewNote(a) {
  if (a.kind === 'case') return `~${fmtTy(a.totalValue)} · ${a.nBlocked} blocked · ${a.needBLD.length} cần BLĐ`;
  if (a.kind === 'dev') { const th = Object.entries(a.byTheme || {}).sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k} ${n}`).join(' · '); return `${a.nPeople} người · ${th}`; }
  const s = []; if (a.nThisWeek) s.push(`${a.nThisWeek} phát sinh tuần`); if (a.needBLD.length) s.push(`${a.needBLD.length} cần BLĐ`); if (a.blockers && a.blockers.length) s.push(`${a.blockers.length} vướng mắc`);
  return s.join(' · ') || 'Không phát sinh đáng chú ý.';
}
const healthCards = DATA.areas.map((a) => `<div style="border:1px solid ${LINE};border-radius:8px;padding:10px 12px;margin:0 0 8px;background:${CARD};">
    <div style="font:400 14px/1.4 ${FONT};">
      <b>${a.no}. ${esc(short(a.title))}</b>${a.priority === 2 ? `<span style="color:${MUT};font-size:12px;"> (ưu tiên 2)</span>` : ''}
      &nbsp;${badge(a.statusText, ragHex(a.rag))}
    </div>
    <div style="font:400 13px/1.4 ${FONT};color:${MUT};margin-top:5px;">
      <b style="color:${TEXT};">${a.nActive}</b> đang chạy${a.nOverdue ? ` · <b style="color:${R};">${a.nOverdue}</b> quá hạn` : ''} · ${esc(overviewNote(a))}
    </div>
  </div>`).join('');

// ── Chart bằng thanh CSS (không PNG) ──
const maxActive = Math.max(1, ...DATA.areas.map((a) => a.nActive || 0));
const barChart = DATA.areas.map((a) => {
  const w = Math.round((a.nActive || 0) / maxActive * 100);
  return `<div style="margin:0 0 6px;font:400 12px/1.3 ${FONT};">
    <div style="color:${MUT};margin-bottom:2px;">${esc(shortT(a.title))} <b style="color:${TEXT};">${a.nActive}</b></div>
    <div style="background:${LIGHT};border-radius:4px;height:14px;"><div style="width:${w}%;height:14px;background:${ragHex(a.rag)};border-radius:4px;"></div></div>
  </div>`;
}).join('');
const onTime = Math.max(0, (DATA.totals.tasksActive || 0) - (DATA.totals.tasksOverdue || 0));
const overdue = DATA.totals.tasksOverdue || 0;
const totActive = Math.max(1, onTime + overdue);
const donutBar = `<div style="margin-top:4px;">
    <div style="display:flex;height:18px;border-radius:5px;overflow:hidden;background:${LIGHT};">
      <div style="width:${Math.round(onTime / totActive * 100)}%;background:${G};"></div>
      <div style="width:${Math.round(overdue / totActive * 100)}%;background:${R};"></div>
    </div>
    <div style="font:400 12px/1.4 ${FONT};color:${MUT};margin-top:5px;">
      <span style="color:${G};">■</span> Đúng hạn ${onTime} &nbsp; <span style="color:${R};">■</span> Quá hạn ${overdue}
    </div>
  </div>`;

// ── Chi tiết mảng ──
function labelRow(l, v) { return `<div style="margin:0 0 5px;font:400 14px/1.45 ${FONT};"><b style="color:${PRIMARY};">${esc(l)}</b> ${esc(v)}</div>`; }
function caseCards(a) {
  return a.top.map((r) => `<div style="border:1px solid ${LINE};border-radius:8px;padding:9px 11px;margin:0 0 7px;background:${LIGHT};">
      <div style="font:700 14px/1.35 ${FONT};color:${TEXT};">${esc(r.khach || '—')} <span style="color:${PRIMARY};">· ${esc(fmtTy(r.giaTri))}</span></div>
      <div style="font:400 12px/1.4 ${FONT};color:${MUT};margin-top:3px;">${esc(r.loai || '')}${r.complexity ? ` · ${esc(r.complexity)}` : ''}${r.dvkd ? ` · ĐVKD ${esc(r.dvkd)}` : ''} · ${esc(r.stage || '')}</div>
      ${r.next ? `<div style="font:400 13px/1.4 ${FONT};color:${TEXT};margin-top:4px;"><b style="color:${MUT};">Bước tiếp:</b> ${esc(r.next)}</div>` : ''}
    </div>`).join('');
}
function areaBlock(a) {
  let h = `<div style="font:700 16px/1.35 ${FONT};color:${PRIMARY};margin:18px 0 8px;">${a.no}. ${esc(short(a.title))} &nbsp;${badge(a.statusText, ragHex(a.rag))}${a.nOverdue ? ` <span style="color:${R};font-size:13px;font-weight:700;">· ${a.nOverdue} quá hạn</span>` : ''}</div>`;
  if (a.kind === 'case') {
    const stages = Object.entries(a.byStage).sort((x, y) => y[1] - x[1]).slice(0, 6).map(([s, n]) => `${s} (${n})`).join(' · ');
    h += labelRow('Quy mô:', `${a.nActive} hồ sơ lớn đang theo dõi, ~${fmtTy(a.totalValue)}. ${a.nBlocked} tắc/blocked (~${fmtTy(a.blockedValue)}). Sức khỏe: ${a.ragCounts.Green} xanh · ${a.ragCounts.Amber} vàng.`);
    h += labelRow('Giai đoạn:', stages);
    if (a.teams && a.teams.length) h += labelRow('Đơn vị chủ trì:', a.teams.join(', '));
    h += `<div style="font:700 13px/1.4 ${FONT};color:${MUT};margin:8px 0 6px;">Top hồ sơ theo giá trị:</div>`;
    h += caseCards(a);
    return h;
  }
  if (a.kind === 'dev') {
    const th = Object.entries(a.byTheme || {}).sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k}: ${n}`).join(' · ');
    h += labelRow('Quy mô:', `${a.nActive} mục phát triển của ${a.nPeople} CBNV${a.pct != null ? `, tiến độ TB ${a.pct}%` : ''}.`);
    h += labelRow('Theo chủ đề:', th);
    h += a.top.slice(0, 5).map((x) => `<div style="margin:0 0 4px;font:400 13px/1.4 ${FONT};"><b style="color:${PRIMARY};">•</b> ${esc(x.noiDung)} <span style="color:${MUT};">— ${esc(x.pct)} · ${esc(x.pic)}</span></div>`).join('');
    return h;
  }
  const parts = [`${a.nActive} việc đang chạy`]; if (a.nThisWeek) parts.push(`${a.nThisWeek} phát sinh tuần này`); if (a.teams && a.teams.length) parts.push('Team: ' + a.teams.join(', '));
  h += labelRow('Tình hình:', parts.join(' · ') + '.');
  if (a.overdueList && a.overdueList.length) h += labelRow('Quá hạn:', a.overdueList.slice(0, 4).map((x) => `${x.name} (${x.team}, hạn ${x.deadline})`).join(' · '));
  if (a.highlights && a.highlights.length) {
    h += `<div style="font:700 13px/1.4 ${FONT};color:${MUT};margin:8px 0 6px;">Việc trọng tâm:</div>`;
    h += a.highlights.slice(0, 4).map((x) => `<div style="margin:0 0 4px;font:400 13px/1.4 ${FONT};"><b style="color:${PRIMARY};">•</b> <b>${esc(x.name)}</b> <span style="color:${MUT};">— ${esc(x.pct)} · ${esc(x.team)}${x.next ? ' · KH tuần tới: ' + esc(x.next) : ''}</span></div>`).join('');
  }
  if (a.blockers && a.blockers.length) h += labelRow('Vướng mắc:', a.blockers.slice(0, 2).map((b) => b.vuong).filter(Boolean).join(' · ') || '—');
  return h;
}

// ── Trọng tâm tuần tới ──
const planItems = P1.concat(P2).map((a) => {
  const nm = shortT(a.title);
  if (a.kind === 'case') return `${nm}: gỡ ${a.nBlocked} hồ sơ blocked (~${fmtTy(a.blockedValue)}); xử lý ${a.needBLD.length} hồ sơ cần BLĐ.`;
  if (a.kind === 'dev') return `${nm}: duy trì ${a.nActive} mục học tập/nâng năng lực của ${a.nPeople} CBNV.`;
  let s = `tiếp tục ${a.nActive} việc`; if (a.nOverdue) s += `; xử lý ${a.nOverdue} việc quá hạn`; if (a.needBLD.length) s += `; trình BLĐ ${a.needBLD.length}`;
  return `${nm}: ${s}.`;
}).map((x) => `<li style="margin:0 0 5px;">${esc(x)}</li>`).join('');

// ── Ráp HTML ──
const html = `<!doctype html>
<html lang="vi"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>Báo cáo tuần — Khối Ngân hàng Doanh nghiệp — ${esc(DATA.weekLabel)}</title>
<style>
  body{margin:0;padding:0;background:#EEF0F6;-webkit-text-size-adjust:100%;}
  a{color:${PRIMARY};}
  @media only screen and (max-width:480px){
    .wrap{padding:10px 8px !important;}
    .pad{padding:14px 14px !important;}
    .tile{width:46% !important;}
    .h-title{font-size:19px !important;}
  }
</style>
</head>
<body>
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Điều hành 60 giây: ${EX.nDecisions} việc cần BLĐ · ${al.nOverdue} quá hạn · ${al.blockedCases} hồ sơ blocked (~${esc(fmtTy(al.blockedValue))}).</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF0F6;"><tr><td align="center" class="wrap" style="padding:16px 12px;">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:${CARD};border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(15,23,42,.08);">

  <!-- Header -->
  <tr><td style="background:${PRIMARY};padding:20px 22px;">
    <div class="h-title" style="font:700 21px/1.25 ${FONT};color:#fff;">BÁO CÁO TUẦN — KHỐI NGÂN HÀNG DOANH NGHIỆP</div>
    <div style="font:400 13px/1.4 ${FONT};color:#E9E4FB;margin-top:5px;">Trung tâm Sản phẩm &amp; Giải pháp Tín dụng · TPBank</div>
  </td></tr>
  <tr><td style="padding:12px 22px;background:#F7F5FD;border-bottom:1px solid ${LINE};font:400 13px/1.5 ${FONT};color:${MUT};">
    <b style="color:${TEXT};">Kỳ:</b> ${esc(DATA.weekLabel)} · số liệu LIVE đến ${esc(fmtTs(DATA.source.fetchedAt))}<br>
    <b style="color:${TEXT};">Nơi nhận:</b> Giám đốc Trung tâm (cc: đầu mối liên quan)
  </td></tr>

  <tr><td class="pad" style="padding:18px 22px;">

    ${H1(1, 'Điều hành — đọc trong 60 giây')}
    <div style="text-align:center;font-size:0;margin:0 0 12px;">
      <div class="tile" style="display:inline-block;width:30%;min-width:96px;vertical-align:top;box-sizing:border-box;margin:4px 1%;padding:10px 6px;text-align:center;background:${LIGHT};border-radius:8px;"><div style="font:700 30px/1.05 ${FONT};color:${ACCENT};">${EX.nDecisions}</div><div style="font:400 12px/1.3 ${FONT};color:${MUT};margin-top:4px;">Cần BLĐ quyết</div></div>
      <div class="tile" style="display:inline-block;width:30%;min-width:96px;vertical-align:top;box-sizing:border-box;margin:4px 1%;padding:10px 6px;text-align:center;background:${LIGHT};border-radius:8px;"><div style="font:700 30px/1.05 ${FONT};color:${R};">${al.nOverdue}</div><div style="font:400 12px/1.3 ${FONT};color:${MUT};margin-top:4px;">Việc quá hạn</div></div>
      <div class="tile" style="display:inline-block;width:30%;min-width:96px;vertical-align:top;box-sizing:border-box;margin:4px 1%;padding:10px 6px;text-align:center;background:${LIGHT};border-radius:8px;"><div style="font:700 30px/1.05 ${FONT};color:${A};">${al.blockedCases}</div><div style="font:400 12px/1.3 ${FONT};color:${MUT};margin-top:4px;">Hồ sơ blocked</div></div>
      <div class="tile" style="display:inline-block;width:30%;min-width:96px;vertical-align:top;box-sizing:border-box;margin:4px 1%;padding:10px 6px;text-align:center;background:${LIGHT};border-radius:8px;"><div style="font:700 24px/1.1 ${FONT};color:${A};">${esc(fmtTy(al.blockedValue))}</div><div style="font:400 12px/1.3 ${FONT};color:${MUT};margin-top:4px;">Giá trị đang treo</div></div>
      <div class="tile" style="display:inline-block;width:30%;min-width:96px;vertical-align:top;box-sizing:border-box;margin:4px 1%;padding:10px 6px;text-align:center;background:${LIGHT};border-radius:8px;"><div style="font:700 30px/1.05 ${FONT};color:${PRIMARY};">${EX.milestones.length}</div><div style="font:400 12px/1.3 ${FONT};color:${MUT};margin-top:4px;">Milestone ≤14 ngày</div></div>
    </div>

    ${boxDecisions}
    ${boxAlerts}
    ${boxWins}
    ${boxMs}

    <div style="font:700 13px/1.4 ${FONT};color:${MUT};margin:14px 0 8px;">SỨC KHỎE THỰC (đối chiếu deadline, không chỉ RAG tự tô)</div>
    ${healthCards}

    <div style="font:700 13px/1.4 ${FONT};color:${MUT};margin:16px 0 8px;">Khối lượng đang chạy theo mảng</div>
    ${barChart}
    <div style="font:700 13px/1.4 ${FONT};color:${MUT};margin:14px 0 4px;">Đúng hạn / Quá hạn (việc đang chạy)</div>
    ${donutBar}

    ${H1(2, 'Ưu tiên 1 — Hoạt động core')}
    ${P1.map(areaBlock).join('')}

    ${H1(3, 'Ưu tiên 2 — AI & Phát triển năng lực')}
    ${P2.map(areaBlock).join('')}

    ${H1(4, 'Trọng tâm tuần tới')}
    <ul style="margin:6px 0 0;padding-left:20px;font:400 14px/1.5 ${FONT};color:${TEXT};">${planItems}</ul>

    <div style="margin-top:22px;padding-top:12px;border-top:1px solid ${LINE};font:italic 12px/1.5 ${FONT};color:${MUT};text-align:center;">
      Nguồn: SHTD Dashboard (Google Sheets) đọc LIVE: ${DATA.totals.tasksAll} task (${DATA.totals.tasksActive} đang chạy, ${DATA.totals.tasksOverdue} quá hạn) · ${DATA.totals.casesAll} hồ sơ · ${DATA.totals.devActive} mục Dev_Plan.<br>
      Sức khỏe “thực” đối chiếu deadline, không chỉ RAG tự đánh giá. Báo cáo nội bộ — chỉ metadata công việc.
    </div>

  </td></tr>
</table>
</td></tr></table>
</body></html>`;

const wk = DATA.weekLabel.match(/Tuần\s*(\d+)\/(\d+)/);
const wnn = wk ? `${wk[2]}-W${String(wk[1]).padStart(2, '0')}` : 'kydacthu';
const outDir = path.join(REPO, '05_Journal', 'reports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = process.env.OUT_HTML || path.join(outDir, `RPT-${wnn}_bao-cao-tuan.html`);
fs.writeFileSync(outPath, html, 'utf8');
console.log('HTML OK', Buffer.byteLength(html), '→', outPath);
