// ===== FAQ ACCORDEON =====
(function () {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fermer tous les autres
      faqItems.forEach(i => i.classList.remove('active'));

      // Ouvrir celui-ci (sauf s'il etait deja ouvert)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
})();
