// THE LIVING ROOM STUDIOS — shared front-end behavior

document.addEventListener('DOMContentLoaded', () => {
  /* ---- nav scroll state ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile nav toggle ---- */
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? '\u2715' : '\u2630';
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => { links.classList.remove('is-open'); burger.textContent = '\u2630'; })
    );
  }

  /* ---- mark current page in nav ---- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a[data-page]').forEach(a => {
    if (a.dataset.page === here) a.classList.add('is-active');
  });

  /* ---- reveal-on-scroll ---- */
  const revealables = document.querySelectorAll('[data-reveal]');
  if (revealables.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-visible'));
  }
});

/* ---- portfolio loader (used on work.html and index.html featured strip) ---- */
async function loadPortfolio() {
  try {
    const res = await fetch('content/portfolio.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('no portfolio file yet');
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch (err) {
    console.warn('Portfolio not loaded:', err.message);
    return [];
  }
}

function portfolioCard(item) {
  const img = item.image || 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=60';
  return `
    <article class="work-card" data-category="${(item.category || '').toLowerCase()}">
      <div class="work-card__frame">
        <img src="${img}" alt="${item.title || ''}" loading="lazy">
      </div>
      <div class="work-card__meta">
        <span class="tag tag--ghost">${item.category || 'Work'}</span>
        <h3>${item.title || 'Untitled'}</h3>
      </div>
    </article>`;
}
