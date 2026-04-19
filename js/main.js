// ===== NAVIGATION MOBILE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== LIEN ACTIF SELON LA PAGE =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a:not(.btn)').forEach(link => {
  link.classList.remove('active');
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
