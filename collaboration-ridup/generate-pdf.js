const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const htmlPath = 'file://' + path.resolve(__dirname, 'grille-tarifaire.html');
  await page.goto(htmlPath, { waitUntil: 'networkidle' });
  await page.pdf({
    path: path.resolve(__dirname, 'grille-tarifaire.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  console.log('PDF généré : grille-tarifaire.pdf');
})();
