let currentLang = 'es';

function setPortalLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-eu][data-es]').forEach((el) => {
    el.innerHTML = lang === 'eu'
      ? el.dataset.eu
      : (lang === 'ar' ? (el.dataset.ar || el.dataset.es) : el.dataset.es);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setPortalLang(btn.dataset.lang));
  });
  setPortalLang('es');
});
