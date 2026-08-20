// send_email.js — Gửi HTML báo cáo tuần (ĐÃ dựng) tới GAS action 'send-report'.
// GAS tự phân giải người nhận từ User_Master: To=CuongVM1, Cc=Teamlead(active, dedup) → MailApp.
// Chỉ gửi metadata báo cáo nội bộ tới email nội bộ (KHÔNG lên cloud ngoài).
//
// Dùng:
//   node send_email.js            → GỬI THẬT (To + Cc phân giải server-side)
//   node send_email.js --dry      → chỉ phân giải + in người nhận, KHÔNG gửi (soi trước)
//   OUT_HTML=<path> node send_email.js  → chỉ định file HTML cụ thể (mặc định: bản kỳ hiện tại)
const fs = require('fs');
const path = require('path');
const { loadSecret, login, gasPost } = require('./fetch_gas');

const REPO = path.resolve(__dirname, '..', '..');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'report_data.json'), 'utf8'));

// Suy đường dẫn HTML giống build_email.js (RPT-<year>-W<nn>_bao-cao-tuan.html).
function htmlPath() {
  if (process.env.OUT_HTML) return process.env.OUT_HTML;
  const wk = String(DATA.weekLabel || '').match(/Tuần\s*(\d+)\/(\d+)/);
  const wnn = wk ? `${wk[2]}-W${String(wk[1]).padStart(2, '0')}` : 'kydacthu';
  return path.join(REPO, '05_Journal', 'reports', `RPT-${wnn}_bao-cao-tuan.html`);
}

async function main() {
  const dry = process.argv.includes('--dry');
  const p = htmlPath();
  if (!fs.existsSync(p)) {
    throw new Error('Chưa có HTML báo cáo: ' + p + ' → chạy build_email.js (hoặc run.js) trước.');
  }
  const html = fs.readFileSync(p, 'utf8');
  const subject = `[Báo cáo tuần] Khối Ngân hàng Doanh nghiệp — ${DATA.weekLabel}`;

  const secret = loadSecret();
  const token = await login(secret);
  const d = await gasPost(secret.webAppUrl, {
    action: 'send-report', token, subject, html, dryRun: dry,
  });

  const r = d.report || {};
  const head = dry ? '🔎 DRY-RUN (chưa gửi)' : (r.sent ? '✅ ĐÃ GỬI' : '⚠ CHƯA GỬI');
  console.log(`${head} — báo cáo ${DATA.weekLabel}`);
  if (r.fromSheet !== undefined) {
    console.log('  Cấu hình   :', r.fromSheet ? 'Report_Config (sheet)' : 'mặc định (hardcode)',
      '· Enabled =', r.enabled === false ? 'false ⛔ (gửi thật bị chặn)' : 'true');
  }
  console.log('  Nguồn HTML :', p);
  console.log('  To :', (r.to || '(trống)') + (r.toName ? `  [${r.toName}]` : ''));
  console.log('  Cc :', (r.count || 0) + ' teamlead' + (r.cc && r.cc.length ? ' — ' + r.cc.join(', ') : ''));
  if (r.warnings && r.warnings.length) r.warnings.forEach((w) => console.log('  ⚠', w));
}

main().catch((e) => { console.error('SEND LỖI:', e.message); process.exit(1); });
