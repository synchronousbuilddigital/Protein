'use client';

/**
 * Intro overlay for the site: on every full page load it plays the 3D shaker loader through
 * its splash reveal (and until the page has finished loading), then fades out.
 * Click anywhere to skip. Visit /?intro-hold to keep it on screen while tuning.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ProteinLoader = dynamic(() => import('./ProteinLoader/ProteinLoader'), { ssr: false });

const MIN_SHOW_MS = 4400; // rise-in → shake → pop & splash (loop is 5.4 s)
const MAX_SHOW_MS = 10000;
const EXIT_MS = 700;

export default function SiteLoader() {
  const [phase, setPhase] = useState('showing'); // showing | exiting | done
  const mountedAt = useRef(0);
  const readyAt = useRef(0); // set when the 3D scene is warmed up and actually starts playing

  const beginExit = useCallback(() => {
    setPhase((p) => (p === 'showing' ? 'exiting' : p));
  }, []);

  useEffect(() => {
    mountedAt.current = performance.now();
    document.documentElement.style.overflow = 'hidden';

    // Dev convenience: visit /?intro-hold to keep the intro on screen indefinitely.
    const hold = new URLSearchParams(window.location.search).has('intro-hold');
    if (hold) return () => { document.documentElement.style.overflow = ''; };

    let loaded = document.readyState === 'complete';
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', onLoad);

    const tick = setInterval(() => {
      const now = performance.now();
      const played = readyAt.current ? now - readyAt.current : 0;
      if ((loaded && played >= MIN_SHOW_MS) || now - mountedAt.current >= MAX_SHOW_MS) {
        clearInterval(tick);
        beginExit();
      }
    }, 100);

    return () => {
      clearInterval(tick);
      window.removeEventListener('load', onLoad);
      document.documentElement.style.overflow = '';
    };
  }, [beginExit]);

  useEffect(() => {
    if (phase === 'exiting') {
      // lets the page's scroll choreography start as the loader lifts
      window.__proteinestIntroDone = true; // read by useIntroDone()
      window.dispatchEvent(new Event('proteinest:intro-done'));
      const t = setTimeout(() => setPhase('done'), EXIT_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'done') document.documentElement.style.overflow = '';
  }, [phase]);

  if (phase === 'done') return null;
  const exiting = phase === 'exiting';
  const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';

  return (
    <div
      id="proteinest-intro"
      role="status"
      aria-label="The Proteinest is loading"
      onClick={beginExit}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0E2016',
        cursor: 'pointer',
        overflow: 'hidden',
        opacity: exiting ? 0 : 1,
        transition: `opacity ${EXIT_MS}ms ${ease}`,
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* soft brand glows */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1200,
          height: 900,
          background: 'radial-gradient(closest-side, rgba(255,104,63,0.15), rgba(255,104,63,0.05) 55%, transparent)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1100,
          height: 900,
          background: 'radial-gradient(closest-side, rgba(26,64,48,0.55), rgba(26,64,48,0.2) 55%, transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* 3D shaker (camera lowered so the bottle sits clear of the lockup, which is rendered
          inside the loader so it can dip away while the bottle rises in / sinks out) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: exiting ? 'scale(1.06)' : 'scale(1)',
          transition: `transform ${EXIT_MS}ms ${ease}`,
        }}
      >
        <ProteinLoader
          theme="forest"
          size="large"
          fit={0.8}
          lookOffset={0.26}
          active={!exiting} // hold the last frame during the fade so it runs purely on the compositor
          onReady={() => {
            if (!readyAt.current) readyAt.current = performance.now();
          }}
        >
          {/* brand lockup: dips away while the bottle is in transit (data-transit on the loader) */}
          <div
            className="pl-lockup"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '3vh',
              textAlign: 'center',
              pointerEvents: 'none',
              padding: '0 16px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-fira-sans)',
                fontWeight: 800,
                fontSize: 'clamp(20px, 2.6vw, 30px)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1,
                color: '#F8F6F2',
              }}
            >
              The Proteinest
            </div>
            <div
              style={{
                fontFamily: 'var(--font-playfair)',
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                color: '#FF683F',
                marginTop: 6,
              }}
            >
              fueling the finest you
            </div>
            <div
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-inter)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(248,246,242,0.5)',
              }}
            >
              Mixing your shake
              <span className="pl-dots" />
            </div>
            <div className="pl-progress" aria-hidden>
              <span style={{ animationDuration: `${MIN_SHOW_MS}ms` }} />
            </div>
          </div>
        </ProteinLoader>
      </div>

    </div>
  );
}
