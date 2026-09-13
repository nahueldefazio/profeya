// El contenido permanece visible si JavaScript o IntersectionObserver no están disponibles.
(() => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;

  let observer;
  const elements = document.querySelectorAll(
    '.strip > span, .section-heading, .subject, .other-subjects, .steps article, .contact'
  );

  function configureReveals() {
    observer?.disconnect();
    elements.forEach(element => {
      element.classList.remove('reveal-item', 'is-visible');
      element.style.removeProperty('--reveal-delay');
    });
    if (motionPreference.matches) return;

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    elements.forEach(element => {
      // Mantener visible cualquier contenido que ya esté en pantalla.
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) return;
      const siblings = [...element.parentElement.children];
      const staggered = element.matches('.subject, .steps article, .strip > span');
      if (staggered) element.style.setProperty('--reveal-delay', `${(siblings.indexOf(element) % 3) * 80}ms`);
      element.classList.add('reveal-item');
      observer.observe(element);
    });
  }

  configureReveals();
  motionPreference.addEventListener('change', configureReveals);
})();
