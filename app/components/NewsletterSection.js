'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="newsletter">
      <div className="wrap">
        <section style={{ padding: '72px 0' }}>
          <div className="news-row">
            <div style={{ maxWidth: '460px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-fira-sans)',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,104,63,0.85)',
                  marginBottom: '12px',
                }}
              >
                Stay in the loop
              </p>
              <h2>Your protein. Upgraded.</h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                  fontSize: '15px',
                  color: 'rgba(248,246,242,0.6)',
                  marginTop: '12px',
                  lineHeight: '1.65',
                }}
              >
                Clean science, sourcing transparency, and performance insight — delivered to your inbox.
              </p>
            </div>
            {submitted ? (
              <p
                style={{
                  fontFamily: 'var(--font-fira-sans)',
                  fontWeight: 600,
                  color: '#FF683F',
                  fontSize: '15px',
                }}
              >
                You are in. Welcome to the finest.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="news-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                />
                <button type="submit">Join Now</button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
