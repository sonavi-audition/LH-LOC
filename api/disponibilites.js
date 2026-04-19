const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

const HORSICAR_URL = 'https://www.horsicar.com/annonce/1681165302412x125229945974847820';

// Cache en mémoire (durée de vie : 1h)
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  // Retourner le cache s'il est frais
  if (cache.data && Date.now() - cache.timestamp < CACHE_DURATION) {
    return res.json(cache.data);
  }

  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 900 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(HORSICAR_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    // Attendre que le calendrier se charge
    await page.waitForFunction(() => {
      const els = document.querySelectorAll('.bubble-element');
      let hasColorBar = false;
      for (const el of els) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg === 'rgb(230, 0, 78)' || bg === 'rgb(20, 209, 162)') {
          hasColorBar = true;
          break;
        }
      }
      return hasColorBar;
    }, { timeout: 20000 });

    // Extraire le mois/année affiché
    const calendarData = await page.evaluate(() => {
      const allEls = document.querySelectorAll('.bubble-element');
      const dayCells = [];
      const colorBars = [];

      // Trouver le titre du mois (ex: "Avril 2026")
      let monthTitle = '';
      for (const el of allEls) {
        const text = el.textContent.trim();
        if (/^(Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre)\s+\d{4}$/.test(text)) {
          monthTitle = text;
          break;
        }
      }

      for (const el of allEls) {
        const rect = el.getBoundingClientRect();
        const text = el.textContent.trim();
        const bgComputed = getComputedStyle(el).backgroundColor;

        if (rect.top > 500 && /^\d{1,2}$/.test(text) && rect.width < 90 && rect.height < 40) {
          dayCells.push({ day: parseInt(text), top: Math.round(rect.top), left: Math.round(rect.left) });
        }

        if (rect.top > 500 && rect.height >= 3 && rect.height <= 25 && rect.width > 20) {
          const isRed = bgComputed === 'rgb(230, 0, 78)';
          const isGreen = bgComputed === 'rgb(20, 209, 162)';
          if (isRed || isGreen) {
            colorBars.push({ color: isRed ? 'red' : 'green', top: Math.round(rect.top), left: Math.round(rect.left) });
          }
        }
      }

      // Mapper les barres aux jours
      const unavailableDays = [];
      for (const bar of colorBars) {
        if (bar.color === 'red') {
          const matchingCells = dayCells.filter(c => c.left === bar.left && c.top < bar.top);
          const closest = matchingCells.sort((a, b) => b.top - a.top)[0];
          if (closest) unavailableDays.push(closest.day);
        }
      }

      return { monthTitle, unavailableDays };
    });

    // Convertir le mois français en numéro
    const monthMap = {
      'Janvier': 0, 'Février': 1, 'Mars': 2, 'Avril': 3, 'Mai': 4, 'Juin': 5,
      'Juillet': 6, 'Août': 7, 'Septembre': 8, 'Octobre': 9, 'Novembre': 10, 'Décembre': 11
    };

    const [monthName, yearStr] = calendarData.monthTitle.split(' ');
    const month = monthMap[monthName];
    const year = parseInt(yearStr);

    // Construire les dates ISO
    const unavailableDates = calendarData.unavailableDays.map(day => {
      const m = String(month + 1).padStart(2, '0');
      const d = String(day).padStart(2, '0');
      return `${year}-${m}-${d}`;
    });

    // Naviguer au mois suivant et récupérer aussi ces données
    const nextMonthBtn = await page.$('button[class*="ionic-IonicIcon"]');
    // Chercher le bouton ">" pour le mois suivant
    const buttons = await page.$$('.bubble-element.ionic-IonicIcon');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent.trim(), btn);
      const rect = await page.evaluate(el => {
        const r = el.getBoundingClientRect();
        return { top: r.top, left: r.left };
      }, btn);
      // Le bouton "suivant" est généralement à droite
      if (rect.left > 700 && rect.top > 500) {
        await btn.click();
        break;
      }
    }

    // Attendre le changement de mois
    await page.waitForTimeout(2000);

    const nextMonthData = await page.evaluate(() => {
      const allEls = document.querySelectorAll('.bubble-element');
      const dayCells = [];
      const colorBars = [];
      let monthTitle = '';

      for (const el of allEls) {
        const text = el.textContent.trim();
        if (/^(Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre)\s+\d{4}$/.test(text)) {
          monthTitle = text;
          break;
        }
      }

      for (const el of allEls) {
        const rect = el.getBoundingClientRect();
        const text = el.textContent.trim();
        const bgComputed = getComputedStyle(el).backgroundColor;

        if (rect.top > 500 && /^\d{1,2}$/.test(text) && rect.width < 90 && rect.height < 40) {
          dayCells.push({ day: parseInt(text), top: Math.round(rect.top), left: Math.round(rect.left) });
        }

        if (rect.top > 500 && rect.height >= 3 && rect.height <= 25 && rect.width > 20) {
          const isRed = bgComputed === 'rgb(230, 0, 78)';
          if (isRed) {
            colorBars.push({ top: Math.round(rect.top), left: Math.round(rect.left) });
          }
        }
      }

      const unavailableDays = [];
      for (const bar of colorBars) {
        const matchingCells = dayCells.filter(c => c.left === bar.left && c.top < bar.top);
        const closest = matchingCells.sort((a, b) => b.top - a.top)[0];
        if (closest) unavailableDays.push(closest.day);
      }

      return { monthTitle, unavailableDays };
    });

    // Ajouter les dates du mois suivant
    if (nextMonthData.monthTitle) {
      const [nextMonthName, nextYearStr] = nextMonthData.monthTitle.split(' ');
      const nextMonth = monthMap[nextMonthName];
      const nextYear = parseInt(nextYearStr);

      for (const day of nextMonthData.unavailableDays) {
        const m = String(nextMonth + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        unavailableDates.push(`${nextYear}-${m}-${d}`);
      }
    }

    const result = {
      unavailableDates: [...new Set(unavailableDates)].sort(),
      lastUpdated: new Date().toISOString(),
      source: 'horsicar'
    };

    // Mettre en cache
    cache = { data: result, timestamp: Date.now() };

    return res.json(result);
  } catch (error) {
    // En cas d'erreur, retourner le cache périmé s'il existe
    if (cache.data) {
      return res.json({ ...cache.data, stale: true });
    }
    return res.status(500).json({ error: 'Impossible de charger les disponibilités', details: error.message });
  } finally {
    if (browser) await browser.close();
  }
};
