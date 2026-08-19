const body = document.body;
const navLinks = Array.from(document.querySelectorAll('.menu a'));
const headerTitle = document.querySelector('header h1');
const headerText = document.querySelector('header > p, .subjudul, main > p');
const sections = Array.from(document.querySelectorAll('.perkenalan, .foto, .info, .tentang, .pengalaman, .kontak-wrapper'));
const skillCards = Array.from(document.querySelectorAll('.skill'));

function setActiveNavLink() {
  const currentFile = window.location.pathname.split('/').pop().toLowerCase();
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetFile = href.split('/').pop().toLowerCase();
    if (targetFile === currentFile || (!currentFile && targetFile.includes('porfolio'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function revealElement(element, delay = 0) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`;
  requestAnimationFrame(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
}

function initScrollReveal() {
  if (!window.IntersectionObserver) {
    sections.concat(skillCards).forEach((el, index) => revealElement(el, index * 80));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealElement(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  sections.concat(skillCards).forEach(el => observer.observe(el));
}

function initPointerParallax() {
  if (!headerTitle) return;
  window.addEventListener('pointermove', event => {
    const x = ((event.clientX / window.innerWidth) - 0.5) * 12;
    const y = ((event.clientY / window.innerHeight) - 0.5) * 8;
    headerTitle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
  window.addEventListener('pointerleave', () => {
    headerTitle.style.transform = '';
  });
}

function initHoverNav() {
  navLinks.forEach(link => {
    link.addEventListener('pointerenter', () => {
      link.style.transform = 'translateY(-2px) scale(1.02)';
      link.style.transition = 'transform 0.2s ease';
    });
    link.addEventListener('pointerleave', () => {
      link.style.transform = '';
    });
  });
}

function initTypewriter() {
  if (!headerText) return;
  const text = headerText.textContent.trim();
  if (!text) return;
  headerText.textContent = '';
  let index = 0;

  const interval = setInterval(() => {
    headerText.textContent += text[index] || '';
    index += 1;
    if (index >= text.length) clearInterval(interval);
  }, 30);
}

function initPortfolio() {
  body.classList.add('js-enabled');
  setActiveNavLink();
  initScrollReveal();
  initPointerParallax();
  initHoverNav();
  initTypewriter();
}

window.addEventListener('DOMContentLoaded', initPortfolio);
