'use client';

import { useEffect, useState } from 'react';

/*
 * Sticky sidebar: "On this page" outline with the current section highlighted,
 * plus share actions. Anchor clicks glide via Lenis (SmoothScroll handles #links).
 */
export default function ArticleAside({ outline, title }) {
  const [active, setActive] = useState(outline[0]?.id);
  const [copied, setCopied] = useState(false);

  // Highlight the last section heading that has passed the reading line (works with Lenis — it scrolls the window).
  useEffect(() => {
    const els = outline.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 140;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top - line <= 0) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [outline]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        /* dismissed */
      }
    } else copy();
  };

  const whatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${window.location.href}`)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside className="ar-aside" aria-label="Article tools">
      {outline.length > 1 && (
        <nav className="ar-toc" aria-labelledby="ar-toc-title">
          <p id="ar-toc-title">On this page</p>
          <ol>
            {outline.map((h, i) => (
              <li key={h.id}>
                <a href={`#${h.id}`} aria-current={active === h.id ? 'true' : undefined}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="ar-share">
        <p>Share</p>
        <div>
          <button type="button" onClick={share} aria-label="Share this article">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </button>
          <button type="button" onClick={whatsapp} aria-label="Share on WhatsApp">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z" />
            </svg>
          </button>
          <button type="button" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} data-copied={copied || undefined}>
            {copied ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
              </svg>
            )}
          </button>
        </div>
        <span className="ar-share-note" aria-live="polite">
          {copied ? 'Link copied' : ''}
        </span>
      </div>
    </aside>
  );
}
