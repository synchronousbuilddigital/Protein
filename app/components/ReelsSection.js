'use client';

/**
 * Instagram reels strip: an endless, full-bleed marquee of portrait reel cards.
 * The track holds two identical groups and slides by exactly one group, so the loop is
 * seamless. It pauses on hover and becomes a plain swipeable row under reduced motion.
 * Styles live under "Reels marquee" in globals.css.
 */

const IG_URL = 'https://www.instagram.com/theproteinest/';

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const REELS = [
  { id: 'gym', tag: '#ProteinGoals', caption: 'Post-workout, done right', src: '/rv1.png', pos: '50% 20%' },
  { id: 'morning', tag: '#MorningFuel', caption: 'Start strong', src: '/protein_gym_woman.png', pos: '50% 25%' },
  { id: 'run', tag: '#StayFit', caption: 'Sunrise miles', src: '/protein_outdoor_runner.png', pos: '50% 30%' },
  { id: 'desk', tag: '#CleanEating', caption: 'Fuel for focus', src: '/protein_office_man.png', pos: '50% 25%' },
  { id: 'go', tag: '#OnTheGo', caption: 'Shake in hand, city ahead', src: '/lifestyle-on-the-go.png', pos: '50% 30%' },
  { id: 'work', tag: '#HighProtein', caption: 'Deadline fuel', src: '/lifestyle-at-work.png', pos: '50% 30%' },
  { id: 'trail', tag: '#FuelUp', caption: 'Trail days', src: '/lifestyle-outdoors.png', pos: '50% 35%' },
  { id: 'office', tag: '#GutHealth', caption: 'Light, clean, no bloat', src: '/rv3.png', pos: '50% 20%' },
];

function ReelCard({ reel, index, hidden }) {
  return (
    <a
      href={IG_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="reel-card"
      data-offset={index % 2 === 1}
      aria-label={hidden ? undefined : `${reel.tag} reel on Instagram`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : 0}
    >
      <img src={reel.src} alt="" className="reel-card-img" style={{ objectPosition: reel.pos }} loading="lazy" decoding="async" />
      <span className="reel-card-shade" aria-hidden />
      <span className="reel-card-top">
        <span className="reel-card-tag">{reel.tag}</span>
        <span className="reel-card-ig">
          <InstagramIcon size={13} />
        </span>
      </span>
      <span className="reel-card-play" aria-hidden>
        <PlayIcon />
      </span>
      <span className="reel-card-bottom">
        <span className="reel-card-caption">{reel.caption}</span>
        <span className="reel-card-handle">@theproteinest</span>
      </span>
    </a>
  );
}

export default function ReelsSection() {
  return (
    <section className="reels band band--peach" aria-labelledby="reels-title">
      <div className="reels-head" data-reveal-stagger="0.12">
        <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="reels-kicker">
          <InstagramIcon size={13} />
          @theproteinest
        </a>
        <h2 id="reels-title" className="reels-title" data-split>
          From the <span>community</span>
        </h2>
        <p className="reels-sub editorial">Real routines, real fuel. Tap any reel to watch on Instagram.</p>
      </div>

      <div className="reels-marquee" data-reveal="fade" data-reveal-delay="0.15">
        <div className="reels-track">
          <div className="reels-group">
            {REELS.map((r, i) => (
              <ReelCard key={r.id} reel={r} index={i} />
            ))}
          </div>
          <div className="reels-group" aria-hidden>
            {REELS.map((r, i) => (
              <ReelCard key={`${r.id}-dup`} reel={r} index={i} hidden />
            ))}
          </div>
        </div>
      </div>

      <div className="reels-foot" data-reveal="up">
        <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="reels-cta">
          <InstagramIcon size={15} />
          Follow @theproteinest
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}
