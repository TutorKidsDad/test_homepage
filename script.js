const nav = document.getElementById('mainNav');
const menuButton = document.getElementById('mobileMenuButton');
const navItems = [...document.querySelectorAll('.nav-item')];

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('mobile-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.dropdown-toggle').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const item = button.closest('.nav-item');
    const willOpen = !item.classList.contains('open');
    navItems.forEach(other => {
      other.classList.remove('open');
      const toggle = other.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-item')) {
    navItems.forEach(item => {
      item.classList.remove('open');
      const toggle = item.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }
});

document.querySelectorAll('.dropdown-menu a, .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const translations = {
  en: {
    title: 'Jyotish Academy | Learn • Practice • Excel'
  },
  hi: {
    title: 'ज्योतिष अकादमी | सीखें • अभ्यास करें • प्रगति करें'
  }
};
document.querySelectorAll('.lang').forEach(button => {
  button.addEventListener('click', () => {
    const language = button.dataset.lang;
    document.querySelectorAll('.lang').forEach(b => b.classList.toggle('active', b === button));
    document.querySelectorAll('[data-en][data-hi]').forEach(element => {
      element.innerHTML = element.dataset[language];
    });
    document.documentElement.lang = language;
    document.title = translations[language].title;
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
