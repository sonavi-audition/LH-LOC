// ===== FORMULAIRE DE CONTACT =====
(function () {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  const newMessageBtn = document.getElementById('newMessage');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Ici, connecter a un service d'envoi d'email (EmailJS, Formspree, etc.)
    // Pour l'instant, on simule l'envoi

    form.style.display = 'none';
    document.querySelector('.contact-form-wrapper h2').style.display = 'none';
    document.querySelector('.contact-form-intro').style.display = 'none';
    success.style.display = 'block';
  });

  newMessageBtn.addEventListener('click', function () {
    form.reset();
    form.style.display = 'block';
    document.querySelector('.contact-form-wrapper h2').style.display = 'block';
    document.querySelector('.contact-form-intro').style.display = 'block';
    success.style.display = 'none';
  });
})();
