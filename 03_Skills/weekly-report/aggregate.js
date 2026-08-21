// aggregate.js — Gom dữ liệu tác nghiệp (cache GAS) thành số liệu BÁO CÁO KHỐI theo 5 mảng nghiệp vụ.
// Nguồn: 00_System/cache/gas_snapshot.json (chạy fetch_gas.js trước). Ra: report_data.json.
//
// 5 MẢNG (duyệt PER-TTT 2026-08-14, cấp Khối):
//   1 Phát triển sản phẩm mới
//   2 Các line dự án chính đang chạy
//   3 Hồ sơ / case lớn đang theo dõi           (từ Case_Pipeline — ẨN TÊN KH)
//   4 Quản lý danh mục & giám sát nợ có vấn đề
//   5 Chương trình AI của Khối
//
// Phạm vi = toàn bộ task ĐANG CHẠY (status ≠ Hoàn thành) của Khối. Task phân vào 1 mảng bằng
// classifier ưu tiên (AI trước, rồi nợ/danh mục, sản phẩm, dự án). Case xử lý riêng từ bảng Case_Pipeline.
// Chỉ metadata; TUYỆT ĐỐI không xuất tên khách hàng (Case_Pipeline cột "Khách hàng / Case").

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const CACHE = path.join(REPO, '00_System', 'cache', 'gas_snapshot.json');
const OUT = path.join(__dirname, 'report_data.json');

// ── Map cột theo TÊN HEADER (TD-WR-02) ──
// Chống vỡ khi Dashboard chèn/xoá/đổi thứ tự cột: mỗi cột dò theo regex trên header row.
// Nếu không khớp → dùng index MẶC ĐỊNH bên dưới (không tệ hơn bản index cứng cũ) + cảnh báo.
// C/I/K/DV được gán trong main() từ header row của cache; giữ `let` để các hàm đọc qua closure.
const C_DEFAULT = { id: 0, tuanBC: 1, initId: 2, category: 3, teamMain: 4, teamCo: 5, loai: 6, name: 7,
  picAcc: 8, picResp: 9, picSup: 10, start: 11, deadline: 12, pct: 13, status: 14, milestone: 15,
  ketQua: 16, keHoach: 17, vuongMac: 18, canBLD: 19, noiDungBLD: 20, crossTeam: 21, highlight: 22, ykienBLD: 23, rag: 24 };
const I_DEFAULT = { id: 0, name: 1, cat: 2, acc: 3, start: 4, deadline: 5, pct: 6, msTrack: 7, msDeadline: 8, status: 9, type: 14 };
const K_DEFAULT = { id: 0, tuanBC: 1, team: 2, pic: 3, dvkd: 4, khach: 5, loaiHinh: 6, complexity: 7, phuongAn: 8,
  giaTri: 9, stage: 10, vuong: 11, nextStep: 12, start: 13, deadline: 14, rag: 15, canBLD: 16, highlight: 17 };
const DV_DEFAULT = { id: 0, noiDung: 1, ketQua: 2, pic: 3, phoiHop: 4, start: 5, end: 6, status: 7, pct: 8, note: 9, review: 10 };

// Regex khớp header (đã lowercase + gom khoảng trắng). Thứ tự key không quan trọng; mỗi key dò độc lập.
const C_SPEC = { id: /^id$/, tuanBC: /tuần bc/, initId: /initiative id/, category: /^category$/, teamMain: /team chính/,
  teamCo: /team phối hợp/, loai: /^loại/, name: /deliverable/, picAcc: /pic accountable/, picResp: /pic responsible/,
  picSup: /pic support/, start: /start date/, deadline: /^deadline$/, pct: /%\s*ht/, status: /trạng thái/,
  milestone: /milestone hiện tại/, ketQua: /kết quả tuần/, keHoach: /kế hoạch tuần/, vuongMac: /vướng mắc/,
  canBLD: /^cần blđ/, noiDungBLD: /nội dung cần blđ/, crossTeam: /cross-?team/, highlight: /highlight/, ykienBLD: /ý kiến blđ/, rag: /^rag$/ };
const I_SPEC = { id: /^id$/, name: /tên initiative/, cat: /^category$/, acc: /accountable/, start: /start date/,
  deadline: /deadline.*target/, pct: /%\s*ht/, msTrack: /milestone đang track/, msDeadline: /deadline milestone/, status: /trạng thái/, type: /^type$/ };
const K_SPEC = { id: /^id$/, tuanBC: /tuần bc/, team: /^team$/, pic: /^pic$/, dvkd: /đvkd/, khach: /khách hàng/,
  loaiHinh: /loại hình/, complexity: /phức tạp/, phuongAn: /phương án/, giaTri: /giá trị/, stage: /^stage$/,
  vuong: /vướng mắc/, nextStep: /next step/, start: /start date/, deadline: /^deadline$/, rag: /^rag$/, canBLD: /cần blđ/, highlight: /highlight/ };
const DV_SPEC = { id: /^id$/, noiDung: /nội dung công việc/, ketQua: /kết quả mục tiêu|sản phẩm.*kết quả/, pic: /^pic$/,
  phoiHop: /phối hợp|phụ thuộc/, start: /bắt đầu/, end: /kết thúc/, status: /trạng thái/, pct: /tỷ lệ hoàn thành/, note: /ghi chú/, review: /review cuối/ };

// Dò index cột theo header-name; thiếu → fallback index mặc định + gom cảnh báo.
function buildCols(header, spec, fallback, label) {
  const H = (header || []).map((h) => String(h == null ? '' : h).toLowerCase().replace(/\s+/g, ' ').trim());
  const cols = {}, missing = [];
  for (const [key, re] of Object.entries(spec)) {
    let idx = H.findIndex((h) => re.test(h));
    if (idx < 0) { idx = fallback[key]; missing.push(key); }
    cols[key] = idx;
  }
  if (missing.length) console.warn(`[aggregate] ${label}: header không khớp [${missing.join(', ')}] → dùng index mặc định (Dashboard đổi cột?).`);
  return cols;
}

// Gán trong main() từ header row của cache. Mặc định = index cứng (an toàn nếu chạy trực tiếp trước khi gán).
let C = C_DEFAULT, I = I_DEFAULT, K = K_DEFAULT;

const norm = (s) => String(s == null ? '' : s).trim();
const DONE_RE = /hoàn thành$|^hoàn thành|done|xong/i;
const isDone = (s) => DONE_RE.test(norm(s));
const yn = (v) => /^y|^có|^true/i.test(norm(v));

// ── ISO week ──
function parseVNDate(s) {
  s = norm(s); let m;
  if ((m = s.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})/))) { let y = +m[3]; if (y < 100) y += 2000; return new Date(Date.UTC(y, +m[2] - 1, +m[1])); }
  if ((m = s.match(/^(\d{4})-(\d{2})-(\d{2})/))) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if ((m = s.match(/^(\d{1,2})[-\s]*(?:tháng|thg)\s*(\d{1,2})[-\s]*(\d{2,4})/i))) { let y = +m[3]; if (y < 100) y += 2000; return new Date(Date.UTC(y, +m[2] - 1, +m[1])); }
  return null;
}
function isoWeekParts(d) { const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); const day = (t.getUTCDay() + 6) % 7; t.setUTCDate(t.getUTCDate() - day + 3); const y = t.getUTCFullYear(); const jan4 = new Date(Date.UTC(y, 0, 4)); const w = 1 + Math.round(((t - jan4) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7); return { y, w }; }
function isoWeekMonday(y, w) { const jan4 = new Date(Date.UTC(y, 0, 4)); const day = (jan4.getUTCDay() + 6) % 7; const mon = new Date(jan4); mon.setUTCDate(jan4.getUTCDate() - day + (w - 1) * 7); return mon; }
// "Hoạt động phát sinh trong tuần BC": pin tay đúng tuần, HOẶC Start/Deadline rơi trong tuần.
function isThisWeek(r, target) {
  const mon = isoWeekMonday(target.y, target.w); const sun = new Date(mon); sun.setUTCDate(mon.getUTCDate() + 6);
  const pins = norm(r[C.tuanBC]).split(/[;,]/).map((s) => s.trim()).filter(Boolean);
  if (pins.some((p) => { const pp = labelToParts(p); return pp && pp.y === target.y && pp.w === target.w; })) return true;
  const s = parseVNDate(r[C.start]), d = parseVNDate(r[C.deadline]);
  if (s && s >= mon && s <= sun) return true;
  if (d && d >= mon && d <= sun) return true;
  return false;
}
function fmtDMY(s) { const d = parseVNDate(s); if (!d) return norm(s); const p = (n) => String(n).padStart(2, '0'); return `${p(d.getUTCDate())}/${p(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`; }

// ── Freshness guard (TD-WR-08) ──
// Báo cáo chỉ TƯƠI bằng lần fetch_gas.js gần nhất. Nếu snapshot cũ / chụp trước tuần BC,
// số liệu (deadline, quá hạn…) có thể LỆCH với Sheet live → cảnh báo (hoặc TỪ CHỐI nếu REPORT_REQUIRE_FRESH=1).
const MAX_SNAPSHOT_AGE_HOURS = Number(process.env.MAX_SNAPSHOT_AGE_HOURS || 12);
function checkFreshness(snap, target) {
  const warns = [];
  const fetchedAt = snap && snap.fetchedAt ? new Date(snap.fetchedAt) : null;
  if (!fetchedAt || isNaN(fetchedAt.getTime())) {
    return { stale: true, ageHours: null, fetchedAt: (snap && snap.fetchedAt) || null, warns: ['snapshot thiếu `fetchedAt` hợp lệ (chưa fetch_gas.js?)'] };
  }
  const ageHours = (Date.now() - fetchedAt.getTime()) / 3.6e6;
  if (ageHours > MAX_SNAPSHOT_AGE_HOURS) warns.push(`snapshot cũ ${ageHours.toFixed(1)}h > ngưỡng ${MAX_SNAPSHOT_AGE_HOURS}h`);
  if (ageHours < -1) warns.push(`\`fetchedAt\` ở TƯƠNG LAI (${snap.fetchedAt}) — đồng hồ lệch?`);
  const weekMon = isoWeekMonday(target.y, target.w);
  if (fetchedAt < weekMon) warns.push(`snapshot chụp TRƯỚC tuần BC (${snap.fetchedAt} < Thứ 2 tuần ${target.w}/${target.y} = ${weekMon.toISOString().slice(0, 10)})`);
  return { stale: warns.length > 0, ageHours: Math.round(ageHours * 10) / 10, fetchedAt: snap.fetchedAt, warns };
}
function labelToParts(l) { const m = norm(l).match(/Tuần\s*(\d{1,2})\s*\/\s*(\d{4})/i); return m ? { w: +m[1], y: +m[2] } : null; }

function ragKey(rag) { const r = norm(rag).toLowerCase(); if (/red|đỏ|do$/.test(r)) return 'Red'; if (/amber|vàng|yellow|cam/.test(r)) return 'Amber'; if (/green|xanh/.test(r)) return 'Green'; return 'Green'; }
// Sức khỏe mảng theo TỶ TRỌNG (không để 1 điểm đỏ kéo cả mảng thành "rủi ro cao"):
//   Red  nếu tỷ lệ đỏ ≥ 15% hoặc ≥ 3 mục; Amber nếu có ≥1 đỏ/vàng nhưng thiểu số; ngược lại Green.
function areaRagFromCounts(c) {
  const total = (c.Green || 0) + (c.Amber || 0) + (c.Red || 0);
  if (!total) return 'Green';
  if (c.Red / total >= 0.15 || c.Red >= 3) return 'Red';
  if (c.Red >= 1 || c.Amber >= 1) return 'Amber';
  return 'Green';
}
function statusTextFromRag(r) { return r === 'Red' ? 'Rủi ro cao' : r === 'Amber' ? 'Cần lưu ý' : 'Đúng tiến độ'; }

// ── Classifier: task đang chạy → 1 trong 4 mảng task (case là mảng 3, tính riêng) ──
const AREA = { SANPHAM: 'SANPHAM', DUAN: 'DUAN', DANHMUC: 'DANHMUC', AI: 'AI' };
const RE_AI = /\bAI\b|GenAI|chatbot|\bbot\b|\bGem\b|use ?case ?ai|use ai|trợ lý ảo|\bLLM\b|copilot|tự động hóa.*(bot|ai)/i;
// Nợ có vấn đề / giám sát danh mục THỰC SỰ (giám sát 1 KH cụ thể, truy đòi, tái cấu trúc dư nợ, CIC, OD…).
const RE_DEBT = /truy đòi|nợ quá hạn|tái cấu trúc.*(nợ|dư nợ)|\bOD\d|\bCIC\b|nợ có vấn đề|giám sát.*(nợ|dư nợ|kh |khách)|rà soát.*(kh|case|dư nợ|truy đòi)|thu hồi nợ|xử lý nợ|cảnh báo sớm|early warning|chuyển dịch dư nợ|nợ xấu/i;
// Phát triển sản phẩm / xây quy trình / chính sách (mảng 1) — do BL/CV1/CV2 phụ trách chính.
const RE_PROCESS = /quy trình|chính sách|\bpolicy\b|cẩm nang|hướng dẫn|ban hành|sản phẩm|pricing|thấu chi|scorecard|bao thanh toán|biểu mẫu|khung (phân loại|tín dụng|rủi ro)|điều kiện phê duyệt|eiso|đề xuất sửa đổi|SP\b/i;
const RE_PRODUCT_INI = /^(SCF|BESS|TC[-\s]?0|TC-|DL\s?OTO|SCORECARD|BDS|SP[_\s-]?0|HSUT|BTT|HST)/i;
const RE_PROJECT_INI = /^(GNOL|BL[O0]L|ECONTRACT|SCF-MVP|CRM|ESMS|VHĐT|IDNES)/i;
const RE_PROJECT_KW = /\bdự án\b|initiative|branch\s?tour|branchtour|NOXH|bán mới|tệp lớn|rollout|triển khai kênh|go-?live|\bCRM\b|\bESMS\b|sale ?agent|\bapp\b|phase \d|sprint/i;

const isProductLike = (name, cat, init) => /Sản phẩm/i.test(cat) || RE_PRODUCT_INI.test(init) || RE_PROCESS.test(name);
const isDebtLike = (name, cat, team, init) => team === 'QLDM' || /Rủi ro\/QLDM|Room\/GHTD/i.test(cat) || /^RISK/i.test(init) || RE_DEBT.test(name);

function classifyTask(r) {
  const name = norm(r[C.name]), cat = norm(r[C.category]), team = norm(r[C.teamMain]), init = norm(r[C.initId]);
  // 1) AI — cross-cutting, ưu tiên cao nhất
  if (RE_AI.test(name) || /AI\/Năng suất/i.test(cat)) return AREA.AI;
  const prod = isProductLike(name, cat, init), debt = isDebtLike(name, cat, team, init);
  // 2) Danh mục & nợ có vấn đề — chỉ giữ giám sát nợ THỰC; việc SP/quy trình lẫn vào → đẩy sang mảng 1.
  if (debt && !prod) return AREA.DANHMUC;
  // 3) Phát triển sản phẩm / quy trình / chính sách (kể cả khi lẫn ở team QLDM)
  if (prod) return AREA.SANPHAM;
  // 4) Line dự án / initiative lớn đang chạy (số hóa + dự án KD)
  if (/Số hóa/i.test(cat) || RE_PROJECT_INI.test(init) || RE_PROJECT_KW.test(name)) return AREA.DUAN;
  return AREA.DUAN;
}

const AREA_META = [
  { key: AREA.SANPHAM, no: 1, priority: 1, title: 'Công tác phát triển sản phẩm mới' },
  { key: AREA.DUAN, no: 2, priority: 1, title: 'Các line dự án / initiative lớn đang chạy' },
  { key: '__CASE', no: 3, priority: 1, title: 'Hồ sơ / case lớn đang theo dõi' },
  { key: AREA.DANHMUC, no: 4, priority: 1, title: 'Quản lý danh mục & giám sát nợ có vấn đề' },
  { key: AREA.AI, no: 5, priority: 2, title: 'Chương trình AI của Khối' },
  { key: '__DEV', no: 6, priority: 2, title: 'Phát triển năng lực & bản thân' },
];

// Sức khỏe THỰC: kết hợp RAG team tự đánh giá với hạn thực tế (quá hạn/blocked kéo màu xuống).
function realHealth(ragCounts, nOff, nActive) {
  let base = areaRagFromCounts(ragCounts);              // từ RAG team tự tô
  const ratio = nActive ? nOff / nActive : 0;
  let byOff = 'Green';
  if (ratio >= 0.3 || nOff >= 8) byOff = 'Red';
  else if (nOff >= 1 || ratio >= 0.1) byOff = 'Amber';
  const rank = { Green: 1, Amber: 2, Red: 3 };
  return rank[base] >= rank[byOff] ? base : byOff;       // lấy màu XẤU hơn
}
const isOverdueTask = (r, today) => { const dl = parseVNDate(r[C.deadline]); return !!dl && dl < today && !isDone(r[C.status]); };

function taskAreaSummary(key, tasks, target, today) {
  const mine = tasks.filter((r) => classifyTask(r) === key);
  const week = mine.filter((r) => isThisWeek(r, target));
  const thisWeek = week.slice(0, 8).map((r) => ({ name: r[C.name], pct: norm(r[C.pct]) || '—', team: norm(r[C.teamMain]), status: norm(r[C.status]), rag: ragKey(r[C.rag]), ketQua: norm(r[C.ketQua]) || norm(r[C.keHoach]) }));
  const overdue = mine.filter((r) => isOverdueTask(r, today));
  const overdueList = overdue.map((r) => ({ name: r[C.name], team: norm(r[C.teamMain]), deadline: fmtDMY(r[C.deadline]), pct: norm(r[C.pct]) || '—' }));
  const rag = { Green: 0, Amber: 0, Red: 0 }; mine.forEach((r) => rag[ragKey(r[C.rag])]++);
  const areaRag = realHealth(rag, overdue.length, mine.length);
  const pcts = mine.map((r) => parseFloat(norm(r[C.pct]).replace('%', ''))).filter((x) => !isNaN(x));
  const pct = pcts.length ? Math.round(pcts.reduce((s, x) => s + x, 0) / pcts.length) : null;
  const bld = mine.filter((r) => yn(r[C.canBLD])).map((r) => ({ id: r[C.id], name: r[C.name], noiDung: norm(r[C.noiDungBLD]) || r[C.name], team: r[C.teamMain] }));
  const blockers = mine.filter((r) => norm(r[C.vuongMac])).map((r) => ({ name: r[C.name], vuong: r[C.vuongMac] }));
  // highlight: task gắn cờ Highlight hoặc %HT cao nhất
  const highlights = mine
    .filter((r) => yn(r[C.highlight]))
    .concat(mine.filter((r) => !yn(r[C.highlight])).sort((a, b) => (parseFloat(b[C.pct]) || 0) - (parseFloat(a[C.pct]) || 0)))
    .slice(0, 6)
    .map((r) => ({ name: r[C.name], pct: norm(r[C.pct]) || '—', team: norm(r[C.teamMain]), rag: ragKey(r[C.rag]), next: norm(r[C.keHoach]) }));
  // top teams tham gia
  const teamCount = {}; mine.forEach((r) => (teamCount[norm(r[C.teamMain]) || '—'] = (teamCount[norm(r[C.teamMain])] || 0) + 1));
  const teams = Object.entries(teamCount).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([t, n]) => `${t} (${n})`);
  return { nActive: mine.length, nThisWeek: week.length, nOverdue: overdue.length, rag: areaRag, statusText: statusTextFromRag(areaRag), ragCounts: rag, pct,
    needBLD: bld, blockers, highlights, thisWeek, overdueList, teams };
}

// ── Mảng 3: Case lớn đang theo dõi ──
// "đang theo dõi" = chưa qua phê duyệt/triển khai (đã xong phương án vẫn đang theo dõi để trình).
const CASE_CLOSED = /đã phê duyệt|đang triển khai|chờ giải ngân/i;
// Giá trị (tỷ đồng): dấu "." là thập phân (vd "449.9"), "," là thập phân kiểu VN; không có dấu ngăn nghìn.
function parseValue(s) {
  let v = norm(s); if (!v) return 0;
  if (v.includes('.') && v.includes(',')) v = v.replace(/,/g, ''); // "1,234.5" → thousands=,
  else v = v.replace(',', '.');                                     // "449,9" → "449.9"
  const x = parseFloat(v.replace(/[^\d.]/g, ''));
  return isNaN(x) ? 0 : x;
}
function caseSummary(cases) {
  const open = cases.filter((r) => !CASE_CLOSED.test(norm(r[K.stage])) && !/blocked/i.test(norm(r[K.stage])) === false ? true : !CASE_CLOSED.test(norm(r[K.stage])));
  // "lớn & đang theo dõi": đang mở (chưa phê duyệt) & (phức tạp Cao | loại hình Dự án | giá trị ≥ 50 tỷ)
  const tracked = cases.filter((r) => {
    const stage = norm(r[K.stage]);
    const openCase = !CASE_CLOSED.test(stage);
    const big = /cao/i.test(norm(r[K.complexity])) || /dự án/i.test(norm(r[K.loaiHinh])) || parseValue(r[K.giaTri]) >= 50;
    return openCase && big;
  });
  const rag = { Green: 0, Amber: 0, Red: 0 }; tracked.forEach((r) => rag[ragKey(r[K.rag])]++);
  const blocked = tracked.filter((r) => /tạm dừng|blocked/i.test(norm(r[K.stage])));
  const blockedValue = Math.round(blocked.reduce((s, r) => s + parseValue(r[K.giaTri]), 0));
  const caseRag = realHealth(rag, blocked.length, tracked.length);
  const byStage = {}; tracked.forEach((r) => (byStage[norm(r[K.stage]) || '—'] = (byStage[norm(r[K.stage])] || 0) + 1));
  const totalValue = tracked.reduce((s, r) => s + parseValue(r[K.giaTri]), 0);
  const bld = tracked.filter((r) => yn(r[K.canBLD])).map((r) => ({ khach: norm(r[K.khach]), dvkd: norm(r[K.dvkd]), loai: norm(r[K.loaiHinh]), giaTri: parseValue(r[K.giaTri]), stage: norm(r[K.stage]), vuong: norm(r[K.vuong]) }));
  // top theo giá trị (báo cáo nội bộ → có tên KH để phân biệt): KH + ĐVKD + loại hình + giá trị + stage + next
  const top = tracked.slice().sort((a, b) => parseValue(b[K.giaTri]) - parseValue(a[K.giaTri])).slice(0, 8)
    .map((r) => ({ khach: norm(r[K.khach]), dvkd: norm(r[K.dvkd]), loai: norm(r[K.loaiHinh]), complexity: norm(r[K.complexity]), giaTri: parseValue(r[K.giaTri]), stage: norm(r[K.stage]), next: norm(r[K.nextStep]), rag: ragKey(r[K.rag]) }));
  const byTeam = {}; tracked.forEach((r) => (byTeam[norm(r[K.team]) || '—'] = (byTeam[norm(r[K.team])] || 0) + 1));
  return {
    nActive: tracked.length, totalCases: cases.length, nBlocked: blocked.length, blockedValue,
    rag: caseRag, statusText: statusTextFromRag(caseRag),
    ragCounts: rag, byStage, totalValue: Math.round(totalValue), needBLD: bld, top,
    teams: Object.entries(byTeam).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([t, n]) => `${t} (${n})`),
  };
}

// ── Ưu tiên 2: Phát triển năng lực & bản thân (Dev_Plan) ──
let DV = DV_DEFAULT; // gán trong main() từ header row
function devSummary(rows) {
  const active = rows.filter((r) => !isDone(r[DV.status]));
  const theme = (n) => /\bAI\b|genai|studio|prompt|chatgpt|gemini/i.test(n) ? 'AI/Công cụ số'
    : /tiếng|hsk|ngoại ngữ|english|trung|nhật/i.test(n) ? 'Ngoại ngữ'
      : /kỹ năng|thuyết trình|đào tạo|trình bày|giao tiếp|lãnh đạo|quản lý/i.test(n) ? 'Kỹ năng mềm' : 'Chuyên môn nghiệp vụ';
  const byTheme = {}; active.forEach((r) => (byTheme[theme(norm(r[DV.noiDung]))] = (byTheme[theme(norm(r[DV.noiDung]))] || 0) + 1));
  const byPic = {}; active.forEach((r) => (byPic[norm(r[DV.pic]) || '—'] = (byPic[norm(r[DV.pic]) || '—'] || 0) + 1));
  const pcts = active.map((r) => parseFloat(norm(r[DV.pct]).replace('%', ''))).filter((x) => !isNaN(x));
  const pct = pcts.length ? Math.round(pcts.reduce((s, x) => s + x, 0) / pcts.length) : null;
  const top = active.slice().sort((a, b) => (parseFloat(b[DV.pct]) || 0) - (parseFloat(a[DV.pct]) || 0)).slice(0, 6)
    .map((r) => ({ noiDung: norm(r[DV.noiDung]), pic: norm(r[DV.pic]), pct: norm(r[DV.pct]) || '—', status: norm(r[DV.status]) }));
  return { nActive: active.length, nPeople: Object.keys(byPic).length, pct, byTheme,
    byPic: Object.entries(byPic).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([p, n]) => `${p} (${n})`), top,
    rag: 'Green', statusText: 'Đang triển khai', ragCounts: { Green: active.length, Amber: 0, Red: 0 }, needBLD: [], nOverdue: 0, nThisWeek: 0 };
}

function main() {
  if (!fs.existsSync(CACHE)) { console.error('Chưa có cache. Chạy: node fetch_gas.js'); process.exit(1); }
  const snap = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
  // TD-WR-02: map cột theo header-name (fallback index mặc định nếu không khớp).
  C = buildCols((snap.tasks || [])[0], C_SPEC, C_DEFAULT, 'Task_Master');
  I = buildCols((snap.initiatives || [])[0], I_SPEC, I_DEFAULT, 'Initiative_Master');
  K = buildCols((snap.cases || [])[0], K_SPEC, K_DEFAULT, 'Case_Pipeline');
  DV = buildCols((snap.dev || [])[0], DV_SPEC, DV_DEFAULT, 'Dev_Plan');
  const tasks = (snap.tasks || []).slice(1);
  const cases = (snap.cases || []).slice(1);
  const inis = (snap.initiatives || []).slice(1);
  const devRows = (snap.dev || []).slice(1);
  const today = new Date();
  const target = process.env.REPORT_WEEK && labelToParts(process.env.REPORT_WEEK.replace(/^(\d{4})-W(\d+)$/i, 'Tuần $2/$1'))
    ? labelToParts(process.env.REPORT_WEEK.replace(/^(\d{4})-W(\d+)$/i, 'Tuần $2/$1')) : isoWeekParts(today);
  const weekLabel = `Tuần ${target.w}/${target.y}`;

  // ── Freshness guard: chặn build trên dữ liệu cũ khi gửi thật (REPORT_REQUIRE_FRESH=1); ngược lại chỉ cảnh báo ──
  const fresh = checkFreshness(snap, target);
  if (fresh.stale) {
    const msg = `[aggregate] ⚠ DỮ LIỆU KHÔNG TƯƠI: ${fresh.warns.join(' · ')}\n            → chạy \`node fetch_gas.js\` để làm mới snapshot trước khi build/gửi.`;
    if (process.env.REPORT_REQUIRE_FRESH === '1') {
      console.error(msg);
      throw new Error('Snapshot KHÔNG tươi — TỪ CHỐI build (REPORT_REQUIRE_FRESH=1). Fetch live rồi chạy lại.');
    }
    console.warn(msg);
  } else {
    console.log(`[aggregate] ✓ Snapshot tươi (${fresh.ageHours}h) @ ${fresh.fetchedAt}`);
  }

  const activeTasks = tasks.filter((r) => !isDone(r[C.status]));

  const areas = AREA_META.map((m) => {
    if (m.key === '__CASE') return { no: m.no, priority: m.priority, title: m.title, kind: 'case', ...caseSummary(cases) };
    if (m.key === '__DEV') return { no: m.no, priority: m.priority, title: m.title, kind: 'dev', ...devSummary(devRows) };
    return { no: m.no, priority: m.priority, title: m.title, kind: 'task', ...taskAreaSummary(m.key, activeTasks, target, today) };
  });
  const shortT = (t) => t.replace(/^\d+\.\s*/, '').split('—')[0].split('&')[0].split('/')[0].trim();

  // ── KHỐI ĐIỀU HÀNH ──
  const caseArea = areas.find((a) => a.kind === 'case');
  // 1) Quyết định cần BLĐ — hồ sơ (theo giá trị) trước, rồi task
  const decisions = [];
  caseArea.needBLD.slice().sort((a, b) => b.giaTri - a.giaTri).forEach((b) =>
    decisions.push({ type: 'Hồ sơ', label: `${b.khach || b.dvkd}${b.dvkd ? ' (' + b.dvkd + ')' : ''}`, sub: `${b.loai} · ${b.stage}${b.vuong ? ' — ' + b.vuong : ''}`, value: b.giaTri }));
  areas.filter((a) => a.kind === 'task').forEach((a) => a.needBLD.forEach((b) =>
    decisions.push({ type: shortT(a.title), label: b.noiDung, sub: b.team || '', value: 0 })));
  // 2) Cảnh báo
  const nOverdue = areas.filter((a) => a.kind === 'task').reduce((s, a) => s + (a.nOverdue || 0), 0);
  const overdueByArea = {}; areas.filter((a) => a.kind === 'task').forEach((a) => { if (a.nOverdue) overdueByArea[shortT(a.title)] = a.nOverdue; });
  const redTasks = activeTasks.filter((r) => ragKey(r[C.rag]) === 'Red').map((r) => ({ name: norm(r[C.name]), team: norm(r[C.teamMain]) }));
  const alerts = { nOverdue, overdueByArea, blockedCases: caseArea.nBlocked, blockedValue: caseArea.blockedValue, redItems: redTasks };
  // 3) Thắng lợi — task Hoàn thành có deadline trong 14 ngày gần nhất
  const back14 = new Date(today); back14.setUTCDate(today.getUTCDate() - 14);
  const wins = tasks.filter((r) => isDone(r[C.status])).map((r) => ({ r, d: parseVNDate(r[C.deadline]) }))
    .filter((x) => x.d && x.d >= back14 && x.d <= today)
    .sort((a, b) => b.d - a.d).slice(0, 8).map((x) => ({ name: norm(x.r[C.name]), team: norm(x.r[C.teamMain]) }));
  // 4) Milestone tới hạn ≤14 ngày
  const fwd14 = new Date(today); fwd14.setUTCDate(today.getUTCDate() + 14);
  const milestones = inis.filter((r) => /milestone/i.test(norm(r[I.type])) && !isDone(r[I.status]))
    .map((r) => ({ name: norm(r[I.name]), init: norm(r[I.id]).replace(/-M\d+.*/, ''), d: parseVNDate(r[I.msDeadline] || r[I.deadline]) }))
    .filter((x) => x.d && x.d >= today && x.d <= fwd14).sort((a, b) => a.d - b.d).slice(0, 8)
    .map((x) => ({ name: x.name, init: x.init, deadline: fmtDMY(x.d.toISOString().slice(0, 10)) }));

  const out = {
    generatedAt: new Date().toISOString(), weekLabel,
    scope: 'Khối Ngân hàng Doanh nghiệp — toàn bộ task đang chạy + case lớn + Dev_Plan',
    source: { fetchedAt: snap.fetchedAt, serverTs: snap.serverTs, ageHours: fresh.ageHours, stale: fresh.stale, staleWarns: fresh.stale ? fresh.warns : [] },
    totals: { tasksAll: tasks.length, tasksActive: activeTasks.length, tasksOverdue: nOverdue, casesAll: cases.length, devActive: (areas.find((a) => a.kind === 'dev') || {}).nActive || 0 },
    exec: { decisions: decisions.slice(0, 8), nDecisions: decisions.length, alerts, wins, milestones },
    areas,
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');

  // ── In tóm tắt ──
  console.log(`\n=== BÁO CÁO KHỐI ${weekLabel} · nguồn @ ${snap.fetchedAt} ===`);
  console.log(`Task ${tasks.length} (đang chạy ${activeTasks.length}, QUÁ HẠN ${nOverdue}) · Case ${cases.length} · Dev ${out.totals.devActive}`);
  console.log(`ĐIỀU HÀNH: ${decisions.length} cần quyết · ${nOverdue} quá hạn · ${alerts.blockedCases} hồ sơ blocked (~${alerts.blockedValue} tỷ) · ${wins.length} xong 14d · ${milestones.length} milestone ≤14d\n`);
  console.log('MẢNG'.padEnd(42), 'ƯT', 'Health'.padEnd(12), 'Active', 'Quá hạn', 'BLĐ');
  areas.forEach((a) => console.log(
    (a.no + '. ' + a.title).padEnd(42), 'P' + a.priority, a.statusText.padEnd(12),
    String(a.nActive).padEnd(6), String(a.nOverdue || 0).padEnd(7), String(a.needBLD.length)));
  console.log('→ report_data.json đã ghi.');
}

main();
