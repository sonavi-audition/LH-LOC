// ===== FORMULAIRE DE CONTACT =====
(function () {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  const newMessageBtn = document.getElementById('newMessage');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.style.display = 'none';
        document.querySelector('.contact-form-wrapper h2').style.display = 'none';
        document.querySelector('.contact-form-intro').style.display = 'none';
        success.style.display = 'block';
      } else {
        alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
      }
    } catch (error) {
      alert('Erreur de connexion. Veuillez réessayer ou nous contacter par téléphone.');
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });

  newMessageBtn.addEventListener('click', function () {
    form.reset();
    form.style.display = 'block';
    document.querySelector('.contact-form-wrapper h2').style.display = 'block';
    document.querySelector('.contact-form-intro').style.display = 'block';
    success.style.display = 'none';
  });
})();
