// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// API Tabs
document.querySelectorAll('.api-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.api-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.api-panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
  });
});

// Copy code
function copyCode(btn) {
  const code = btn.closest('.code-example').querySelector('code').innerText;
  copyText(btn, code);
}

function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = '✅ Copiado!';
    setTimeout(() => { btn.innerHTML = original; }, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const original = btn.innerHTML;
    btn.innerHTML = '✅ Copiado!';
    setTimeout(() => { btn.innerHTML = original; }, 2000);
  });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.feature-card, .tech-item, .deploy-card, .endpoint').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});