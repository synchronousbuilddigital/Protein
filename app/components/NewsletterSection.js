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
        <section style={{ padding: '56px 0' }}>
          <div className="news-row">
            <h2>Stay updated on stories, science, and offers</h2>
            {submitted ? (
              <p style={{ fontWeight: 600, color: 'var(--orange-deep)' }}>
                Thank you for joining our community!
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
                <button type="submit">Join</button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
