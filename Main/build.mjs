/**
 * Gộp Main/ → index.html ở thư mục gốc repo (file:// + screenshot).
 * Chạy: node Main/build.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const MAIN = resolve(dirname(fileURLToPath(import.meta.url)));
const OUT = resolve(MAIN, '..', 'index.html');

const shell = readFileSync(resolve(MAIN, 'index.html'), 'utf8');

// Inline CSS
let html = shell.replace(
  /<link rel="stylesheet" href="css\/[^"]+">\n?/g,
  ''
);
const cssDir = resolve(MAIN, 'css');
const cssFiles = readdirSync(cssDir).filter(f => f.endsWith('.css')).sort();
const cssBundle = cssFiles.map(f => readFileSync(resolve(cssDir, f), 'utf8')).join('\n\n');
html = html.replace('</head>', `<style>\n${cssBundle}\n</style>\n</head>`);

// Inline page HTML
const pagesDir = resolve(MAIN, 'html', 'pages');
const orderMatch = readFileSync(resolve(MAIN, 'js/core/00-bootstrap.js'), 'utf8').match(/const PAGES=\[([^\]]+)\]/);
const pageOrder = orderMatch ? orderMatch[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')) : null;
const pageFiles = readdirSync(pagesDir).filter(f => f.endsWith('.html')).sort((a, b) => {
  if (!pageOrder) return a.localeCompare(b);
  return pageOrder.indexOf(a.replace('.html', '')) - pageOrder.indexOf(b.replace('.html', ''));
});
const pagesHtml = pageFiles.map(f => readFileSync(resolve(pagesDir, f), 'utf8')).join('\n');
html = html.replace(
  /<div class="content">[\s\S]*?<\/div>\s*<\/main>/,
  `<div class="content">\n${pagesHtml}    </div>\n  </main>`
);

// Inline JS (bỏ load-pages)
const jsOrder = [
  'js/core/01-density-toggle.js',
  'js/core/02-sidebar-toggle.js',
  'js/nav/01-sidebar-config.js',
  'js/screens/01-dashboard.js',
  'js/core/03-page-navigation.js',
  'js/screens/02-hopdong.js',
  'js/screens/03-canhbao.js',
  'js/screens/04-phuluc.js',
  'js/screens/05-donhang.js',
  'js/screens/06-chitiet-donhang.js',
  'js/screens/07-phanbo-nhamay.js',
  'js/screens/08-vobao.js',
  'js/screens/09-chuyentau.js',
  'js/screens/10-phieusalan.js',
  'js/screens/11-khvcnoidia.js',
  'js/core/04-modal.js',
  'js/screens/12-auto-generated.js',
  'js/screens/13-danhmuc-hethong-baocao.js',
  'js/screens/14-hoso-lo-360.js',
  'js/screens/15-vobao-360.js',
  'js/screens/16-doichieu.js',
  'js/screens/17-approval-inbox.js',
  'js/vendor/cytoscape.min.js',
  'js/screens/18-flow.js',
  'js/core/05-flow-strip.js',
  'js/nav/02-nav-search.js',
];
const jsBundle = jsOrder.map(rel => readFileSync(resolve(MAIN, rel), 'utf8')).join('\n\n');
html = html.replace(/<script src="js\/[^"]+"><\/script>\n?/g, '');
html = html.replace('</body>', `<script>\n${jsBundle}\n</script>\n</body>`);

writeFileSync(OUT, html);
console.log('Built', OUT, `(${Math.round(html.length / 1024)} KB)`);
