(function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const scrollProgress = document.getElementById('scrollProgress');
  const isMobile = () => window.innerWidth <= 768;

  // initialize video thumbnails (YouTube + Instagram)
  document.querySelectorAll('.video-wrap').forEach(wrap => {
    const thumbSrc = wrap.dataset.thumb;
    const ytId = wrap.dataset.id;
    const href = wrap.dataset.href;

    if (!thumbSrc) return;

    const img = document.createElement('img');
    img.src = thumbSrc;
    img.alt = '';
    img.loading = 'lazy';

    const playBtn = document.createElement('div');
    playBtn.className = 'play-btn';

    wrap.appendChild(img);
    wrap.appendChild(playBtn);

    if (ytId) {
      // YouTube: click to replace with iframe
      wrap.addEventListener('click', function () {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        wrap.innerHTML = '';
        wrap.style.cursor = 'default';
        wrap.appendChild(iframe);
      });
    } else if (href) {
      // Instagram: click to open in new tab
      wrap.addEventListener('click', function () {
        window.open(href, '_blank', 'noopener');
      });
    }
  });

  // smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // update active nav + scroll progress
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (isMobile()) {
      scrollProgress.style.height = '2px';
      scrollProgress.style.width = scrollPercent + '%';
    } else {
      scrollProgress.style.width = '3px';
      scrollProgress.style.height = scrollPercent + '%';
    }

    // find current section (skip hero)
    let current = '';
    sections.forEach(section => {
      if (section.id === 'home') return;
      const top = section.offsetTop - window.innerHeight * 0.4;
      if (scrollTop >= top) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
