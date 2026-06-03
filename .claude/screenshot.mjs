// Render an HTML file with headless Chromium and save a screenshot.
// Usage: node .claude/screenshot.mjs [htmlFile] [outPng]
//   htmlFile defaults to index.html, outPng defaults to /tmp/qnc_shot.png
// Resolves playwright from the global node_modules so it works regardless of cwd.
import { createRequire } from 'module';
import { pathToFileURL } from 'url';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const globalRoot = execSync('npm root -g').toString().trim();
const require = createRequire(resolve(globalRoot) + '/');
const { chromium } = require('playwright');

const htmlArg = process.argv[2] || 'index.html';
const out = process.argv[3] || '/tmp/qnc_shot.png';
const htmlPath = resolve(process.cwd(), htmlArg);
if (!existsSync(htmlPath)) {
  console.error('HTML not found:', htmlPath);
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2,
});
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' }).catch(() => {});
await page.waitForTimeout(1500);
await page.screenshot({ path: out, fullPage: false });

console.log('TITLE:', await page.title());
console.log('OUT:', out);
console.log('JS_ERRORS:', errors.filter((e) => e.startsWith('PAGEERROR')).length ? errors.join('\n') : 'none');
await browser.close();
