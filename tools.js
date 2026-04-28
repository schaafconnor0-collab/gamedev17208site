document.addEventListener('DOMContentLoaded', () => {
  setCurrentYear();
  initMenuToggle();
  initImagePlaceholders();
  initActiveLinks();
});

function setCurrentYear() {
  const nodes = document.querySelectorAll('#year');
  const currentYear = new Date().getFullYear();

  nodes.forEach((node) => {
    node.textContent = currentYear;
  });
}

function initMenuToggle() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (!button || !nav) return;

  button.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    });
  });
}

function initImagePlaceholders() {
  const images = document.querySelectorAll('img[data-placeholder]');

  images.forEach((img) => {
    img.addEventListener('error', () => replaceWithPlaceholder(img), { once: true });

    if (img.complete && img.naturalWidth === 0) {
      replaceWithPlaceholder(img);
    }
  });
}

function replaceWithPlaceholder(img) {
  if (!img || img.dataset.replaced === 'true') return;

  const altText = img.getAttribute('alt') || 'placeholder-image.png - Add a replacement image here.';
  const [fileNamePart, ...descriptionParts] = altText.split(' - ');
  const description = descriptionParts.join(' - ') || 'Add a replacement image here.';

  const placeholder = document.createElement('div');
  placeholder.className = 'image-placeholder';
  placeholder.setAttribute('role', 'img');
  placeholder.setAttribute('aria-label', altText);
  placeholder.innerHTML = `
    <strong>${escapeHtml(fileNamePart.trim())}</strong>
    <span>${escapeHtml(description.trim())}</span>
  `;

  img.dataset.replaced = 'true';
  img.replaceWith(placeholder);
}

function initActiveLinks() {
  const page = document.body.dataset.page;
  const navLinks = document.querySelectorAll('.site-nav a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';

    if (page === 'home' && href === 'index.html') {
      link.classList.add('nav-active');
    }

    if (page === 'portfolio' && href === 'portfolio.html') {
      link.classList.add('nav-active');
    }
  });
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
