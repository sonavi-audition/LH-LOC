const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

const HORSICAR_URL = 'https://www.horsicar.com/annonce/1681165302412x125229945974847820';

// Cache en mémoire
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const MONTH_REGEX = /^(Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre)\s+\d{4}$/;
const MONTH_MAP = {
  'Janvier': 0, 'Février': 1, 'Mars': 2, 'Avril': 3, 'Mai': 4, 'Juin': 5,
  'Juillet': 6, 'Août': 7, 'Septembre': 8, 'Octobre': 9, 'Novembre': 10, 'Décembre': 11
};

// Extraire les jours indisponibles du mois actuellement affiché
async function extractMonthData(page) {
  return page.evaluate(() => {
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
        const isGreen = bgComputed === 'rgb(20, 209, 162)';
        if (isRed || isGreen) {
          colorBars.push({ color: isRed ? 'red' : 'green', top: Math.round(rect.top), left: Math.round(rect.left) });
        }
      }
    }

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
}

// Cliquer sur le bouton "mois suivant" (>) et attendre le changement
async function goToNextMonth(page, currentTitle) {
  await page.evaluate(() => {
    const allEls = document.querySelectorAll('.bubble-element');

    // Trouver le titre du calendrier
    let titleEl = null;
    let titleRect = null;
    for (const el of allEls) {
      const text = el.textContent.trim();
      if (/^(Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre)\s+\d{4}$/.test(text)) {
        titleEl = el;
        titleRect = el.getBoundingClientRect();
        break;
      }
    }

    if (!titleRect) return;

    // Chercher les petits éléments sur la même ligne que le titre (boutons < et >)
    let candidates = [];
    for (const el of allEls) {
      const rect = el.getBoundingClientRect();
      if (Math.abs(rect.top - titleRect.top) < 40 &&
          rect.width > 10 && rect.width < 80 &&
          rect.height > 10 && rect.height < 80 &&
          el !== titleEl &&
          !el.contains(titleEl) &&
          !titleEl.contains(el)) {
        candidates.push({ el, left: rect.left });
      }
    }

    // Cliquer sur le plus à droite (bouton >)
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.left - a.left);
      candidates[0].el.click();
    }
  });

  // Attendre que le titre du mois change
  try {
    await page.waitForFunction((oldTitle) => {
      const allEls = document.querySelectorAll('.bubble-element');
      for (const el of allEls) {
        const text = el.textContent.trim();
        if (/^(Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre)\s+\d{4}$/.test(text)) {
          return text !== oldTitle;
        }
      }
      return false;
    }, { timeout: 8000 }, currentTitle);
  } catch (e) {
    return false;
  }

  // Attendre le chargement des barres de couleur
  await new Promise(r => setTimeout(r, 2000));
  return true;
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=300');

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

    const unavailableDates = [];

    // Scraper le mois en cours + les 4 mois suivants (5 mois au total)
    for (let i = 0; i < 5; i++) {
      const monthData = await extractMonthData(page);

      if (monthData.monthTitle) {
        const [mName, yStr] = monthData.monthTitle.split(' ');
        const m = MONTH_MAP[mName];
        const y = parseInt(yStr);

        for (const day of monthData.unavailableDays) {
          const mm = String(m + 1).padStart(2, '0');
          const dd = String(day).padStart(2, '0');
          unavailableDates.push(`${y}-${mm}-${dd}`);
        }
      }

      // Passer au mois suivant (sauf pour le dernier)
      if (i < 4) {
        const title = monthData.monthTitle;
        const changed = await goToNextMonth(page, title);
        if (!changed) break; // Arrêter si la navigation échoue
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
