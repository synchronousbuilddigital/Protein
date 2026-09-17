"use client";
import { useState } from "react";

/* ── SVG Icon Components for Reels ─────────────────────────── */
function ClapperIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="20" height="15" rx="2" stroke="white" strokeWidth="1.6" fill="white" fillOpacity="0.08"/>
      <path d="M2 11h20" stroke="white" strokeWidth="1.6"/>
      <path d="M7 7V2M12 7V2M17 7V2" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M2 7L7 2M12 7L17 2" stroke="white" strokeWidth="1.3" strokeOpacity="0.6"/>
    </svg>
  );
}

function DumbbellIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1" y="10" width="4" height="4" rx="1" fill="white" fillOpacity="0.7"/>
      <rect x="19" y="10" width="4" height="4" rx="1" fill="white" fillOpacity="0.7"/>
      <rect x="3" y="8" width="3" height="8" rx="1.5" fill="white" fillOpacity="0.5"/>
      <rect x="18" y="8" width="3" height="8" rx="1.5" fill="white" fillOpacity="0.5"/>
      <rect x="6" y="11" width="12" height="2" rx="1" fill="white" fillOpacity="0.9"/>
    </svg>
  );
}

function LeafReelIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 3C21 3 19 13 13 17C7 21 3 19 3 19C3 19 5 9 11 5C17 1 21 3 21 3Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="white" fillOpacity="0.14"/>
      <path d="M3 19L11 11" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function FlameReelIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C12 2 10 6 7 8C4 10 3 13 3 15C3 19.4 7.1 22 12 22C16.9 22 21 19.4 21 15C21 13 20 10 17 8C14 6 12 2 12 2Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="white" fillOpacity="0.14"/>
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l2-8z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="white" fillOpacity="0.18"/>
    </svg>
  );
}

const reels = [
  {
    id: 1,
    label: "Reel Coming Soon",
    tag: "#ProteinGoals",
    Icon: ClapperIcon,
    gradient: "linear-gradient(160deg,#2a1a14 0%,#3b1f10 40%,#0d0704 100%)",
    accent: "rgba(239,90,50,0.22)",
  },
  {
    id: 2,
    label: "Reel Coming Soon",
    tag: "#CleanEating",
    Icon: DumbbellIcon,
    gradient: "linear-gradient(160deg,#0e1f14 0%,#1a3320 40%,#050d07 100%)",
    accent: "rgba(50,180,80,0.18)",
  },
  {
    id: 3,
    label: "Reel Coming Soon",
    tag: "#GutHealth",
    Icon: LeafReelIcon,
    gradient: "linear-gradient(160deg,#10131e 0%,#1a2038 40%,#06080f 100%)",
    accent: "rgba(80,110,239,0.18)",
  },
  {
    id: 4,
    label: "Reel Coming Soon",
    tag: "#HighProtein",
    Icon: FlameReelIcon,
    gradient: "linear-gradient(160deg,#1e1208 0%,#3a2308 40%,#0a0600 100%)",
    accent: "rgba(250,160,30,0.22)",
  },
  {
    id: 5,
    label: "Reel Coming Soon",
    tag: "#StayFit",
    Icon: BoltIcon,
    gradient: "linear-gradient(160deg,#1a0e1f 0%,#2e1540 40%,#0a0510 100%)",
    accent: "rgba(180,60,230,0.18)",
  },
];

export default function ReelsSection() {
  const [active, setActive] = useState(2); // center index

  const prev = () => setActive((a) => (a - 1 + reels.length) % reels.length);
  const next = () => setActive((a) => (a + 1) % reels.length);

  // Returns wrapped index
  const idx = (offset) => (active + offset + reels.length) % reels.length;

  // Cards to show: far-left, left, center, right, far-right
  const slots = [-2, -1, 0, 1, 2];

  return (
    <section className="reels-section">
      {/* Heading */}
      <div className="reels-head">

        <h2 className="reels-title">Watch Us In Action</h2>
        <p className="reels-sub">
          Real stories, real results — follow us for daily protein inspiration.
        </p>
      </div>

      {/* Carousel wrapper */}
      <div className="reel-carousel-outer">
        {/* Left arrow */}
        <button
          className="reel-arrow reel-arrow-left"
          onClick={prev}
          aria-label="Previous reel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Track */}
        <div className="reel-carousel-track">
          {slots.map((offset) => {
            const reel = reels[idx(offset)];
            const isCenter = offset === 0;
            const isAdj = Math.abs(offset) === 1;
            const isFar = Math.abs(offset) === 2;

            return (
              <div
                key={`${offset}-${reel.id}`}
                className={`reel-cf-card ${isCenter ? "reel-cf-center" : ""} ${isAdj ? "reel-cf-adj" : ""} ${isFar ? "reel-cf-far" : ""}`}
                onClick={() => !isCenter && setActive(idx(offset))}
                style={{ cursor: isCenter ? "default" : "pointer" }}
              >
                {/* Placeholder video area */}
                <div
                  className="reel-cf-inner"
                  style={{ background: reel.gradient }}
                >
                  {/* Radial accent glow */}
                  <div
                    className="reel-cf-glow"
                    style={{
                      background: `radial-gradient(ellipse at 50% 25%, ${reel.accent} 0%, transparent 65%)`,
                    }}
                  />

                  {/* Icon */}
                  <span className="reel-cf-emoji"><reel.Icon /></span>

                  {/* Play icon */}
                  <div className="reel-cf-play">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>

                  {/* Center card: SHOP NOW hover + bottom info */}
                  {isCenter && (
                    <>
                      <div className="reel-cf-shopnow-wrap">
                        <span className="reel-cf-shopnow">Coming Soon</span>
                      </div>
                      <div className="reel-cf-bottom">
                        <p className="reel-cf-label">{reel.tag}</p>
                        <a
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="reel-cf-view-btn"
                        >
                          View on Instagram
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          className="reel-arrow reel-arrow-right"
          onClick={next}
          aria-label="Next reel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="reel-dots">
        {reels.map((_, i) => (
          <button
            key={i}
            className={`reel-dot-btn ${i === active ? "reel-dot-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Go to reel ${i + 1}`}
          />
        ))}
      </div>

      {/* Section label below */}
      <div className="reel-section-label">
        <h3>Our Latest Reels</h3>
      </div>
    </section>
  );
}
