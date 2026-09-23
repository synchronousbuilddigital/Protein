'use client';

const reviews = [
  {
    quote: '"Finally a truly delicious and quality protein powder."',
    name: 'Arjun Bakali',
    role: 'Owner & Coach at CrossFit Third Eye',
    image: '/rv1.png',
  },
  {
    quote: '"It\'s so tasty, I didn\'t even feel like I was having a protein shake"',
    name: 'Prerna Maarvikurne',
    role: 'Student of Oberoi International',
    image: '/rv2.png',
  },
  {
    quote: '"Found my go-to protein — clean, tasty and keeps me full"',
    name: 'Shailin Suvarna',
    role: 'Antal International, India Partner',
    image: '/rv3.png',
  },
  {
    quote: '"Tastes like it\'s been freshly squeezed — absolutely love it"',
    name: 'Riya Shah',
    role: 'Yoga Instructor',
    image: '/avatar_riya.png',
  },
  {
    quote: '"Smooth texture, zero bloat, and super delicious flavor!"',
    name: 'Manav Joshi',
    role: 'Software Engineer',
    image: '/avatar_manav.png',
  },
];

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon({ filled = false }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? 'white' : 'none'} aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={filled ? 'none' : '#d63384'} strokeWidth="2" />
    </svg>
  );
}

export default function TestimonialsSection() {
  return (
    <section style={{ background: '#F8F6F2', padding: '24px 0 52px' }}>
      {/* Contained wrapper — wider max-width and smaller side padding to push closer to edges */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>

        {/* ── Header Row ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            {/* Heart badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: '#d63384', color: '#fff',
              padding: '4px 10px', borderRadius: '999px',
              fontSize: '11px', fontWeight: 700, marginBottom: '10px',
            }}>
              <HeartIcon filled />
              228K
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
              fontWeight: 900,
              color: '#141414',
              lineHeight: 1.1,
              margin: 0,
              fontFamily: 'var(--font-fira-sans, inherit)',
            }}>
              Real people.<br />Real love.
            </h2>
          </div>

          <p style={{ fontSize: '13px', color: '#4A4642', textAlign: 'right', maxWidth: '200px', lineHeight: 1.5 }}>
            We&apos;re blessed! Because we have you&nbsp;<HeartIcon />
          </p>
        </div>

        {/* ── 5-column card grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
        }}>
          {reviews.map((r, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '1.5px solid #e9a0bf',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(214,51,132,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Quote */}
              <div style={{ padding: '16px 14px 12px' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#141414', lineHeight: 1.4, margin: 0 }}>
                  {r.quote}
                </p>
              </div>

              {/* Rectangular photo */}
              <div style={{ margin: '0 12px', borderRadius: '10px', overflow: 'hidden', height: '160px', flexShrink: 0 }}>
                <img
                  src={r.image}
                  alt={r.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              </div>

              {/* Name + role + arrow */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '12px 14px 14px', marginTop: 'auto' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 800, color: '#141414', margin: 0 }}>{r.name}</p>
                  <p style={{ fontSize: '11px', color: '#4A4642', margin: '2px 0 0', lineHeight: 1.3 }}>{r.role}</p>
                </div>
                <button
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: '#fce4ef', color: '#d63384',
                    border: '1px solid #e9a0bf',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0,
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  aria-label={`Read ${r.name}'s review`}
                >
                  <ArrowIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
