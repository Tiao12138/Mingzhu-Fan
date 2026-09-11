document.addEventListener("DOMContentLoaded", function () {
  initializeAccordion();
  showclickme();
  applyIndependentWorksHover();
  initHorizontalScrollGalleries();
  classifyHScrollMedia();
});

// The homepage hover-title functions were intentionally removed: project titles
// now live beneath each image in the HTML.

function initializeAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const content = item.querySelector('.accordion-content');
      const icon = this.querySelector('.icon-arrow');
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      icon.textContent = isOpen ? '▼' : '▲';
      content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
    });
  });
}

function zoomImage(image) { image.classList.toggle('zoomed'); }

function applyIndependentWorksHover() {
  document.querySelectorAll('.iw-row').forEach(row => {
    const nameDisplay = row.querySelector('.iw-hover-name');
    if (!nameDisplay) return;
    row.querySelectorAll('.iw-thumb').forEach(thumb => {
      thumb.addEventListener('mouseover', () => { nameDisplay.textContent = thumb.dataset.name || ''; });
      thumb.addEventListener('mouseout', () => { nameDisplay.textContent = ''; });
    });
  });
}

function classifyHScrollMedia() {
  document.querySelectorAll('.h-scroll-card').forEach(card => {
    const media = card.querySelector('video, img');
    if (!media) return;
    const apply = () => card.classList.add(
      (media.videoWidth || media.naturalWidth) >= (media.videoHeight || media.naturalHeight) ? 'landscape' : 'portrait'
    );
    if ((media.tagName === 'VIDEO' && media.readyState >= 1) || (media.tagName === 'IMG' && media.complete)) apply();
    else media.addEventListener(media.tagName === 'VIDEO' ? 'loadedmetadata' : 'load', apply, { once: true });
  });
}

function initHorizontalScrollGalleries() {
  document.querySelectorAll('.h-scroll').forEach(scrollEl => {
    let isDown = false, startX, scrollLeft;
    scrollEl.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - scrollEl.offsetLeft; scrollLeft = scrollEl.scrollLeft; });
    ['mouseleave', 'mouseup'].forEach(event => scrollEl.addEventListener(event, () => { isDown = false; }));
    scrollEl.addEventListener('mousemove', e => { if (isDown) { e.preventDefault(); scrollEl.scrollLeft = scrollLeft - (e.pageX - scrollEl.offsetLeft - startX) * 2; } });
  });
}

function showclickme() {
  const col01 = document.querySelector('.col01');
  const hoverText = document.getElementById('hover-text');
  if (!col01 || !hoverText) return;
  col01.addEventListener('mousemove', event => {
    const rect = col01.getBoundingClientRect();
    const show = event.clientX - rect.left < rect.width * 0.75 && !event.target.closest('.icon');
    hoverText.style.display = show ? 'block' : 'none';
    if (show) { hoverText.style.left = `${event.clientX}px`; hoverText.style.top = `${event.clientY}px`; hoverText.textContent = 'click to experience'; }
  });
  col01.addEventListener('click', () => { window.location.href = 'https://tiao12138.github.io/The_Bedroom/'; });
  col01.addEventListener('mouseleave', () => { hoverText.style.display = 'none'; });
}
