// run.js — Orchestrator weekly-report: fetch (LIVE GAS) → aggregate (5 mảng) → charts → build .docx.
// Dùng:
//   node run.js              → chạy full pipeline, kỳ = tuần ISO hôm nay
//   node run.js --cache      → bỏ qua fetch, dùng cache sẵn có (00_System/cache/gas_snapshot.json)
//   REPORT_WEEK=2026-W33 node run.js   → chốt kỳ báo cáo cụ thể
const { execFileSync } = require('child_process');
const path = require('path');
const D = __dirname;
const run = (f) => { console.log(`\n▶ ${f}`); execFileSync(process.execPath, [path.join(D, f)], { stdio: 'inherit', env: process.env }); };

const useCache = process.argv.includes('--cache');
try {
  if (!useCache) run('fetch_gas.js'); else console.log('↻ --cache: dùng snapshot sẵn có');
  run('aggregate.js');
  run('build_report.js');
  console.log('\n✅ Pipeline xong.');
} catch (e) {
  console.error('\n❌ Pipeline lỗi ở bước trên. Xem log.');
  process.exit(1);
}
