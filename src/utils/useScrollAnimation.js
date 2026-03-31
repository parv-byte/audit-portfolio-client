import { useEffect } from 'react';

/**
 * Initialises two global scroll behaviors:
 * 1. Scroll-progress bar (#scroll-progress)
 * 2. IntersectionObserver that adds .is-visible to any element
 *    carrying one of the scroll-reveal classes defined in index.css
 */
const REVEAL_CLASSES = [
  'scroll-hidden',
  'scroll-slide-left',
  'scroll-slide-right',
  'scroll-scale',
  'stagger-children',
];

export default function useScrollAnimation() {
  useEffect(() => {
    // --- 1. Scroll progress bar ---
    let bar = document.getElementById('scroll-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'scroll-progress';
      bar.style.width = '0%';
      document.body.prepend(bar);
    }

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- 2. Scroll-reveal observer ---
    const selector = REVEAL_CLASSES.map(c => `.${c}`).join(', ');
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      bar?.remove();
    };
  }, []);
}
