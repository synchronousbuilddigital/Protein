'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is super-fine grade pea protein?',
      a: 'Ultra-fine pea protein isolate processed to remove grittiness and chalkiness. It blends clean, digests easily, and delivers a complete amino acid profile without compromise.',
    },
    {
      q: 'Why combine pea protein with rice protein?',
      a: 'Together they form a complete amino acid profile — the same science behind traditional Indian meals that pair grains with lentils. Maximum absorption. Zero waste.',
    },
    {
      q: 'Is it safe for PCOS or hormonal conditions?',
      a: 'Yes. Low in additives, gut-friendly, and formulated with a pumpkin seed and flax seed blend specifically chosen for hormonal balance. Every ingredient is accountable.',
    },
    {
      q: 'What is the shelf life?',
      a: '12 months from the date of manufacturing. Store in a cool, dry place away from direct sunlight.',
    },
    {
      q: 'Where do your ingredients come from?',
      a: 'Every source is traceable. Our cocoa is Spanish-sourced. Pea protein and brown rice protein are single-origin. Radical transparency is not a marketing claim — it is a standard.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="learn">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="section-head">
          <p
            className="mt-0 mb-3 text-xs font-bold uppercase tracking-[0.14em]"
            style={{ fontFamily: 'var(--font-fira-sans)', color: '#FF683F' }}
          >
            Frequently Asked Questions
          </p>
          <h2 style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800 }}>
            Every ingredient, every answer
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <div
                  className="faq-q"
                  onClick={() => toggleFAQ(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFAQ(idx);
                    }
                  }}
                >
                  <span>{faq.q}</span>
                  <span className="plus">+</span>
                </div>
                <div className="faq-a">
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
