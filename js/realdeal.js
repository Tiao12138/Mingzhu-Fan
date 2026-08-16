document.addEventListener("DOMContentLoaded", function () {
  initializeAccordion();
  applyHoverTextListeners();
  showclickme();
  applyIndependentWorksHover();
  initHorizontalScrollGalleries();
  classifyHScrollMedia();
});

// ---- 缩略图 hover 显示说明文字（主页缩略图墙用） ----
function applyHoverTextListeners() {
  document.querySelectorAll('.cover').forEach(img => {
    img.addEventListener('mouseover', () => showText(img));
    img.addEventListener('mouseout', hideText);
  });
}

function showText(img) {
  const box = img.closest('.box, .box2');
  const hoverText = box ? box.querySelector('.hovertext') : null;
  const hoverTextDisplay = document.getElementById('hover-text-display');
  if (hoverText && hoverTextDisplay) {
    hoverTextDisplay.textContent = hoverText.textContent;
    hoverTextDisplay.classList.add('show');
  }
}

function hideText() {
  const hoverTextDisplay = document.getElementById('hover-text-display');
  if (hoverTextDisplay) {
    hoverTextDisplay.classList.remove('show');
  }
}

// ---- 手风琴（某些项目页里用到） ----
function initializeAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const content = item.querySelector('.accordion-content');
      const icon = this.querySelector('.icon-arrow');

      const isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        icon.textContent = '▼';
        content.style.maxHeight = null;
      } else {
        item.classList.add('open');
        icon.textContent = '▲';
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

// ---- 图片放大/缩小（zoomsize1 / zoomsize2 图片点击用） ----
function zoomImage(image) {
  if (image.classList.contains('zoomed')) {
    image.classList.remove('zoomed');
  } else {
    image.classList.add('zoomed');
  }
}

// ---- Independent Works 页面：hover 缩略图时，在该行类别名后面显示项目名称 ----
function applyIndependentWorksHover() {
  document.querySelectorAll('.iw-row').forEach(row => {
    const nameDisplay = row.querySelector('.iw-hover-name');
    if (!nameDisplay) return;

    row.querySelectorAll('.iw-thumb').forEach(thumb => {
      thumb.addEventListener('mouseover', () => {
        nameDisplay.textContent = thumb.dataset.name || '';
      });
      thumb.addEventListener('mouseout', () => {
        nameDisplay.textContent = '';
      });
    });
  });
}

// ---- 判断 .h-scroll-card 里的视频/图片是横版还是竖版，打上对应 class ----
function classifyHScrollMedia() {
  document.querySelectorAll('.h-scroll-card').forEach(card => {
    const video = card.querySelector('video');
    const img = card.querySelector('img');

    if (video) {
      const apply = () => {
        card.classList.add(video.videoWidth >= video.videoHeight ? 'landscape' : 'portrait');
      };
      if (video.readyState >= 1 && video.videoWidth) {
        apply();
      } else {
        video.addEventListener('loadedmetadata', apply, { once: true });
      }
    } else if (img) {
      const apply = () => {
        card.classList.add(img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait');
      };
      if (img.complete && img.naturalWidth) {
        apply();
      } else {
        img.addEventListener('load', apply, { once: true });
      }
    }
  });
}

// ---- 横向拖拽滑动画廊（.h-scroll-wrap > .h-scroll，比如 social post 合集）----
function initHorizontalScrollGalleries() {
  document.querySelectorAll('.h-scroll').forEach(scrollEl => {
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollEl.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollEl.classList.add('active');
      startX = e.pageX - scrollEl.offsetLeft;
      scrollLeft = scrollEl.scrollLeft;
    });

    scrollEl.addEventListener('mouseleave', () => {
      isDown = false;
      scrollEl.classList.remove('active');
    });

    scrollEl.addEventListener('mouseup', () => {
      isDown = false;
      scrollEl.classList.remove('active');
    });

    scrollEl.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollEl.offsetLeft;
      const walk = (x - startX) * 2;
      scrollEl.scrollLeft = scrollLeft - walk;
    });
  });
}

// ---- The Bedroom 项目页里点击跳转外部体验链接用的（如果页面没有 .col01 会自动跳过） ----
function showclickme() {
  const col01 = document.querySelector('.col01');
  const hoverText = document.getElementById('hover-text');
  if (!col01 || !hoverText) return;

  col01.addEventListener('mousemove', (event) => {
    const rect = col01.getBoundingClientRect();
    const x = event.clientX - rect.left;

    if (x < rect.width * 0.75 && !event.target.closest('.icon')) {
      hoverText.style.display = 'block';
      hoverText.style.left = `${event.clientX}px`;
      hoverText.style.top = `${event.clientY}px`;
      hoverText.textContent = 'click to experience';
    } else {
      hoverText.style.display = 'none';
    }
  });

  col01.addEventListener('click', () => {
    window.location.href = 'https://tiao12138.github.io/The_Bedroom/';
  });

  col01.addEventListener('mouseleave', () => {
    hoverText.style.display = 'none';
  });
}