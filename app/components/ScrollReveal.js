'use client';

/**
 * Site-wide scroll choreography (GSAP ScrollTrigger). Mount once per page.
 *
 * Tag elements with data attributes:
 *   data-reveal="up|down|left|right|scale|fade"   animate this element (default: up)
 *   data-reveal-stagger[="0.1"]                    animate the element's children one after another
 *   data-reveal-delay="0.2"                        extra delay in seconds
 *   data-reveal-class="cls"                        toggle a class instead (for CSS-driven reveals)
 *   data-split                                     headline: words rise out of a mask, one after another
 *   .band sections                                 scroll-scrubbed chapter transition: the section opens
 *                                                  from an inset rounded window as it arrives and recedes
 *                                                  (scale + rounded corners) as it leaves
 *   data-parallax="0.2"                            drift vertically at a fraction of the scroll speed
 *                                                  (positive = lags behind the page, negative = leads)
 *
 * Every reveal is directional and reversible: entering from below rises in, scrolling back
 * out through the bottom sinks away, re-entering from above drops in. Elements that have
 * scrolled fully past the top are parked hidden so they play again on the way back.
 *
 * On the home page the triggers start when the intro loader begins to fade
 * ("proteinest:intro-done"), so the hero plays in as the loader lifts.
 * Disabled under prefers-reduced-motion (everything simply stays visible).
 */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OFFSETS = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: -56 },
  right: { x: 56 },
  scale: { scale: 1.06 },
  fade: {},
};
const SHOWN = { x: 0, y: 0, scale: 1, opacity: 1 };

/** Hidden pose for a reveal type; dir +1 = coming from below, -1 = coming from above. */
function hidden(type, dir) {
  const o = OFFSETS[type] || OFFSETS.up;
  return { opacity: 0, x: o.x ?? 0, y: (o.y ?? 0) * dir, scale: o.scale ?? 1 };
}

function collect() {
  const items = [];
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    items.push({ trigger: el, targets: [el], type: el.dataset.reveal || 'up', delay: parseFloat(el.dataset.revealDelay || '0'), step: 0 });
  });
  document.querySelectorAll('[data-reveal-stagger]').forEach((el) => {
    const targets = Array.from(el.children).filter((c) => !c.hasAttribute('data-reveal-skip') && !['SCRIPT', 'STYLE'].includes(c.tagName));
    if (!targets.length) return;
    items.push({ trigger: el, targets, type: el.dataset.reveal || 'up', delay: parseFloat(el.dataset.revealDelay || '0'), step: parseFloat(el.dataset.revealStagger || '') || 0.1 });
  });
  const classed = Array.from(document.querySelectorAll('[data-reveal-class]')).map((el) => ({ el, cls: el.dataset.revealClass }));
  return { items, classed };
}

function createReveal({ trigger, targets, type, delay, step }) {
  // Kill pending (possibly still-delayed) tweens first: a staggered show that has not started
  // yet would otherwise outlive a hide that fires right after it.
  const show = (dir) => {
    gsap.killTweensOf(targets);
    return gsap.fromTo(targets, hidden(type, dir), {
      ...SHOWN,
      duration: 1.05,
      ease: 'power3.out',
      delay,
      stagger: step ? { each: step, from: dir > 0 ? 'start' : 'end' } : 0,
    });
  };
  const hide = (dir, animate) => {
    gsap.killTweensOf(targets);
    return animate
      ? gsap.to(targets, { ...hidden(type, dir), duration: 0.55, ease: 'power2.in', stagger: step ? { each: step * 0.5, from: dir > 0 ? 'end' : 'start' } : 0 })
      : gsap.set(targets, hidden(type, dir));
  };

  return ScrollTrigger.create({
    trigger,
    start: 'top 88%',
    end: 'bottom top',
    onEnter: () => show(1), // scrolling down, arriving from below
    onLeaveBack: () => hide(1, true), // scrolling up, leaving through the bottom
    onEnterBack: () => show(-1), // scrolling up, arriving from above
    onLeave: () => hide(-1, false), // scrolled fully past the top: park hidden
  });
}

/** Wraps every word of an element in a mask + inner span, keeping nested elements (em, span). */
function splitWords(root) {
  if (root.dataset.splitDone) return Array.from(root.querySelectorAll('.split-i'));
  root.dataset.splitDone = '1';
  const walk = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        const parts = child.textContent.split(/(\s+)/);
        if (parts.every((p) => !p.trim())) return;
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (!part.trim()) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const w = document.createElement('span');
          w.className = 'split-w';
          const i = document.createElement('span');
          i.className = 'split-i';
          i.textContent = part;
          w.appendChild(i);
          frag.appendChild(w);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1 && child.tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(root);
  return Array.from(root.querySelectorAll('.split-i'));
}

function createSplit(el) {
  const words = splitWords(el);
  gsap.set(words, { yPercent: 115 });
  const show = (dir) => {
    gsap.killTweensOf(words);
    gsap.fromTo(words, { yPercent: dir > 0 ? 115 : -115 }, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.06, delay: 0.1 });
  };
  const hide = (dir) => {
    gsap.killTweensOf(words);
    gsap.to(words, { yPercent: dir > 0 ? 115 : -115, duration: 0.45, ease: 'power2.in', stagger: 0.02 });
  };
  return ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    end: 'bottom top',
    onEnter: () => show(1),
    onLeaveBack: () => hide(1),
    onEnterBack: () => show(-1),
    onLeave: () => gsap.set(words, { yPercent: -115 }),
  });
}

/** Chapter transition for a full-width section, scrubbed to the scroll in both directions. */
function createSectionTransition(sec) {
  gsap.set(sec, { transformOrigin: '50% 100%', willChange: 'transform, clip-path' });
  const enter = gsap.fromTo(
    sec,
    { clipPath: 'inset(7% 4% 0% 4% round 56px)', y: 70 },
    { clipPath: 'inset(0% 0% 0% 0% round 0px)', y: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 30%', scrub: 0.7 } }
  );
  const leave = gsap.fromTo(
    sec,
    { scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)' },
    {
      scale: 0.94,
      clipPath: 'inset(0% 2% 5% 2% round 48px)',
      ease: 'none',
      immediateRender: false,
      scrollTrigger: { trigger: sec, start: 'bottom 75%', end: 'bottom top', scrub: 0.7 },
    }
  );
  return [enter.scrollTrigger, leave.scrollTrigger];
}

/** Parallax via the standalone `translate` property, so it never fights transform-based reveals. */
function createParallax(el) {
  const speed = parseFloat(el.dataset.parallax) || 0.2;
  const trigger = el.closest('section, footer') || el;
  return ScrollTrigger.create({
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const span = self.end - self.start;
      el.style.translate = `0 ${((self.progress - 0.5) * span * speed).toFixed(1)}px`;
    },
    onRefresh: (self) => {
      const span = self.end - self.start;
      el.style.translate = `0 ${((self.progress - 0.5) * span * speed).toFixed(1)}px`;
    },
  });
}

function createClassToggle({ el, cls }) {
  const add = () => el.classList.add(cls);
  const remove = () => el.classList.remove(cls);
  return ScrollTrigger.create({ trigger: el, start: 'top 80%', end: 'bottom top', onEnter: add, onEnterBack: add, onLeave: remove, onLeaveBack: remove });
}

export default function ScrollReveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {});
      const { items, classed } = collect();

      // park everything hidden right away (no flash of unstyled content)
      ctx.add(() => items.forEach((it) => gsap.set(it.targets, hidden(it.type, 1))));

      let started = false;
      let timer;
      const start = () => {
        if (started) return;
        started = true;
        ctx.add(() => {
          items.forEach(createReveal);
          classed.forEach(createClassToggle);
          document.querySelectorAll('[data-parallax]').forEach(createParallax);
          document.querySelectorAll('[data-split]').forEach(createSplit);
          document.querySelectorAll('.band').forEach(createSectionTransition);
          ScrollTrigger.refresh();
        });
      };

      const intro = document.getElementById('proteinest-intro');
      if (intro && intro.style.opacity !== '0') {
        window.addEventListener('proteinest:intro-done', start);
        timer = setTimeout(start, 12000); // safety net (e.g. ?intro-hold)
      } else {
        start();
      }
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('proteinest:intro-done', start);
        window.removeEventListener('load', onLoad);
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
