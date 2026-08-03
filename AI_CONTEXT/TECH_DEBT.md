# TECH DEBT — AI OS

Nợ kỹ thuật & hiện tượng lặp lại. Mới nhất trên cùng.

## TD-GIT-01 — Lock git stale chặn commit (2026-08-03)
**Hiện tượng:** Commit vướng `.git/index.lock` rồi `.git/HEAD.lock` (`fatal: Unable to create ... lock: File exists`). Gặp cả từ Cowork sandbox lẫn Claude Code khi một lần commit trước bị gián đoạn giữa chừng.

**Nguyên nhân:** Lock stale để lại sau thao tác git bị ngắt; KHÔNG do tiến trình git đang chạy. Hai tiến trình `git.exe` thấy trong session chỉ là `fsmonitor--daemon` (theo dõi filesystem), không giữ lock.

**Cách xử lý an toàn:**
1. Kiểm tra tiến trình git thật đang chạy: `Get-CimInstance Win32_Process -Filter "Name='git.exe'" | Select ProcessId, CommandLine`.
2. Nếu chỉ có `fsmonitor--daemon` → lock là stale, an toàn xoá: `rm -f .git/index.lock .git/HEAD.lock`.
3. KHÔNG kill tiến trình git khi chưa xác minh; KHÔNG xoá lock nếu đang có commit/merge/rebase thật chạy.

**Nợ còn lại (chưa làm):** Cân nhắc tắt `core.fsmonitor` cho repo này nếu lock tái diễn, hoặc thêm script pre-commit dọn lock stale. Ưu tiên thấp — chỉ xử lý nếu lặp lại.
