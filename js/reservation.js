// ===== RESERVATION - CALENDRIER & FORMULAIRE =====

(function () {
  // --- Config ---
  // 130€/jour en semaine, 135€/jour WE et jours fériés
  const PRICE_WEEKDAY = 130;
  const PRICE_WEEKEND = 135;
  const MONTHS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Dates indisponibles - mis à jour depuis Horsicar (calendrier visuel)
  const UNAVAILABLE_DATES = [
    '2026-04-20', '2026-04-21', '2026-04-24', '2026-04-25', '2026-04-26', '2026-04-27',
    '2026-05-01', '2026-05-08',
    '2026-06-14'
  ];

  // Jours fériés (tarif WE appliqué : 135€)
  const JOURS_FERIES = [
    '01-01', '04-06', '05-01', '05-08', '05-14', '05-25',
    '07-14', '08-15', '11-01', '11-11', '12-25'
  ];

  // --- State ---
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let startDate = null;
  let endDate = null;

  // --- DOM ---
  const calendarDays = document.getElementById('calendarDays');
  const calendarTitle = document.getElementById('calendarTitle');
  const prevMonth = document.getElementById('prevMonth');
  const nextMonth = document.getElementById('nextMonth');
  const summaryStart = document.getElementById('summaryStart');
  const summaryEnd = document.getElementById('summaryEnd');
  const summaryDuration = document.getElementById('summaryDuration');
  const summaryPrice = document.getElementById('summaryPrice');
  const toStep2Btn = document.getElementById('toStep2');

  if (!calendarDays) return; // Pas sur la page reservation

  // --- Calendrier ---
  function isUnavailable(date) {
    const str = formatDateISO(date);
    return UNAVAILABLE_DATES.includes(str);
  }

  function isPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  function isWeekend(date) {
    const day = date.getDay(); // 0=dim, 6=sam
    if (day === 0 || day === 6) return true;
    const mmdd = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return JOURS_FERIES.includes(mmdd);
  }

  function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatDateFR(date) {
    if (!date) return '-';
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function isSameDay(a, b) {
    return a && b &&
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();
  }

  function isInRange(date) {
    if (!startDate || !endDate || isSameDay(startDate, endDate)) return false;
    return date > startDate && date < endDate;
  }

  function renderCalendar() {
    calendarTitle.textContent = `${MONTHS_FR[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1);
    let startWeekDay = firstDay.getDay();
    if (startWeekDay === 0) startWeekDay = 7;
    startWeekDay--;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    calendarDays.innerHTML = '';

    // Jours vides avant
    for (let i = 0; i < startWeekDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar-day disabled other-month';
      calendarDays.appendChild(empty);
    }

    // Jours du mois
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'calendar-day';
      btn.textContent = d;

      if (isPast(date)) {
        btn.classList.add('disabled');
      } else if (isUnavailable(date)) {
        btn.classList.add('unavailable');
      } else {
        btn.addEventListener('click', () => selectDate(date));
      }

      if (isSameDay(date, today)) {
        btn.classList.add('today');
      }

      if (isSameDay(startDate, endDate) && isSameDay(date, startDate)) {
        btn.classList.add('selected');
      } else if (isSameDay(date, startDate)) {
        btn.classList.add('selected', 'range-start');
      } else if (isSameDay(date, endDate)) {
        btn.classList.add('selected', 'range-end');
      } else if (isInRange(date)) {
        btn.classList.add('in-range');
      }

      calendarDays.appendChild(btn);
    }
  }

  function selectDate(date) {
    if (!startDate || (startDate && endDate)) {
      // Premier clic ou reset après sélection complète
      startDate = date;
      endDate = null;
    } else if (startDate && !endDate) {
      if (isSameDay(date, startDate)) {
        // Même date = réservation d'une seule journée
        endDate = date;
      } else if (date < startDate) {
        // Clic avant la date de départ = on change la date de départ
        startDate = date;
      } else {
        // Vérifier qu'il n'y a pas de date indisponible dans la plage
        const hasUnavailable = checkRangeAvailability(startDate, date);
        if (hasUnavailable) {
          alert('Certaines dates dans cette période sont indisponibles. Veuillez choisir d\'autres dates.');
          return;
        }
        endDate = date;
      }
    }

    updateSummary();
    renderCalendar();
  }

  function checkRangeAvailability(start, end) {
    const current = new Date(start);
    current.setDate(current.getDate() + 1);
    while (current <= end) {
      if (isUnavailable(current)) return true;
      current.setDate(current.getDate() + 1);
    }
    return false;
  }

  // Calcul du prix : chaque jour coché = 130€ (semaine) ou 135€ (WE/férié)
  function calculatePrice(start, end) {
    if (!start || !end) return 0;
    let total = 0;
    const current = new Date(start);
    // Si même jour, compter 1 jour
    if (isSameDay(start, end)) {
      return isWeekend(start) ? PRICE_WEEKEND : PRICE_WEEKDAY;
    }
    // Sinon, compter chaque jour de start à end inclus
    while (current <= end) {
      total += isWeekend(current) ? PRICE_WEEKEND : PRICE_WEEKDAY;
      current.setDate(current.getDate() + 1);
    }
    return total;
  }

  function getDayCount(start, end) {
    if (!start || !end) return 0;
    if (isSameDay(start, end)) return 1;
    const diff = end - start;
    return Math.round(diff / (1000 * 60 * 60 * 24)) + 1; // +1 car jour de départ inclus
  }

  function updateSummary() {
    summaryStart.textContent = formatDateFR(startDate);
    summaryEnd.textContent = formatDateFR(endDate);

    if (startDate && endDate) {
      const days = getDayCount(startDate, endDate);
      const price = calculatePrice(startDate, endDate);
      summaryDuration.textContent = days === 1 ? '1 jour' : `${days} jours`;
      summaryPrice.textContent = `${price}€ *`;
      toStep2Btn.disabled = false;

      // Afficher le message téléphone si plus de 5 jours
      const phoneCta = document.getElementById('phoneCta');
      if (phoneCta) {
        phoneCta.style.display = days > 5 ? 'block' : 'none';
      }
    } else {
      summaryDuration.textContent = '-';
      summaryPrice.textContent = '-';
      toStep2Btn.disabled = true;
    }
  }

  // Navigation mois
  prevMonth.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  nextMonth.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // --- Étapes ---
  const steps = document.querySelectorAll('.step');
  const panels = {
    1: document.getElementById('step1'),
    2: document.getElementById('step2'),
    3: document.getElementById('step3'),
  };

  function goToStep(n) {
    Object.values(panels).forEach(p => { if (p) p.style.display = 'none'; });
    if (panels[n]) panels[n].style.display = 'block';

    steps.forEach(s => {
      const stepNum = parseInt(s.dataset.step);
      s.classList.remove('active', 'completed');
      if (stepNum === n) s.classList.add('active');
      if (stepNum < n) s.classList.add('completed');
    });

    document.querySelector('.booking-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Étape 1 -> 2 (coordonnées, ex étape 3)
  toStep2Btn.addEventListener('click', () => goToStep(2));

  // Étape 2 -> 1
  document.getElementById('backToStep1').addEventListener('click', () => goToStep(1));

  // Soumission formulaire
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(bookingForm);
    const days = getDayCount(startDate, endDate);
    const price = calculatePrice(startDate, endDate);

    // Afficher le récap
    const recap = document.getElementById('confirmationRecap');
    recap.innerHTML = `
      <div class="summary-row">
        <span class="summary-label">Nom</span>
        <span class="summary-value">${formData.get('firstName')} ${formData.get('lastName')}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Email</span>
        <span class="summary-value">${formData.get('email')}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Téléphone</span>
        <span class="summary-value">${formData.get('phone')}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Dates</span>
        <span class="summary-value">${formatDateFR(startDate)} → ${formatDateFR(endDate)}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Durée</span>
        <span class="summary-value">${days} jour${days > 1 ? 's' : ''}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Chevaux</span>
        <span class="summary-value">${formData.get('horses')}</span>
      </div>
      <div class="summary-row summary-total">
        <span class="summary-label">Estimation</span>
        <span class="summary-value">${price}€ *</span>
      </div>
    `;

    goToStep(3);
  });

  // --- Init ---
  renderCalendar();
})();
