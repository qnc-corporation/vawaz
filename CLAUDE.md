# QNC ERP — Working rules

Source modular: **`Main/`** · Bundle runtime: **`index.html`** (gốc repo)

## Cấu trúc `Main/`

| Thư mục | Nội dung |
|---------|----------|
| `Main/MAP.txt` | Bản đồ file — **đọc trước khi sửa** |
| `Main/css/` | Style (tokens, sidebar, main) |
| `Main/html/pages/` | HTML từng màn (`data-page`) |
| `Main/js/core/` | Load/bootstrap, navigation, modal |
| `Main/js/nav/` | Sidebar, pin, tìm menu Ctrl+K |
| `Main/js/screens/` | Logic + data theo màn hình |

**Khi sửa UI:** chỉnh file trong `Main/` đúng màn/chức năng → chạy build.

## Workflow

```bash
# Sửa file trong Main/ …

# Gộp lại index.html gốc (file://, screenshot, deploy)
node Main/build.mjs

# Dev với file tách (tùy chọn)
npx serve Main
# mở http://localhost:3000
```

Tách lại từ monolith (nếu cần): `node .claude/split-to-main.mjs`

## Screenshot

Sau thay đổi UI:

```bash
node Main/build.mjs
node .claude/screenshot.mjs index.html C:/tmp/qnc_shot.png
```

## Gợi ý sửa nhanh

- Sidebar / menu / pin → `Main/js/nav/01-sidebar-config.js` + `Main/css/02-sidebar.css`
- Dashboard / pipeline → `Main/js/screens/01-dashboard.js` + `Main/html/pages/dashboard.html`
- Hợp đồng XK → `Main/js/screens/02-hopdong.js`
- Modal → `Main/js/core/04-modal.js`

## Notes

- CDN icons/font có thể thiếu trong screenshot — giới hạn môi trường.
- Màn auto-generated (B1–B9) nằm trong `Main/js/screens/12-auto-generated.js` (file lớn).
