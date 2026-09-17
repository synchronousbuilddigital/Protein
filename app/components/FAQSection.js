'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is "super-fine grade" pea protein?',
      a: 'Ultra-fine pea protein isolate processed to remove grittiness and chalkiness, giving a smooth texture that blends easily into any drink.',
    },
    {
      q: 'Why mix pea protein with rice protein?',
      a: 'Together they form a complete amino acid profile — the same principle behind traditional Indian meals that pair grains with lentils.',
    },
    {
      q: 'Is it safe for PCOS or hormonal issues?',
      a: 'Yes. It\'s low in additives, gut-friendly, supports satiety, and includes a pumpkin seed and flax seed blend as hormone balancers.',
    },
    {
      q: 'What is the shelf life?',
      a: '12 months from the date of manufacturing.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="learn">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="section-head">
          <h2>FAQ</h2>
          <p className="mt-2 text-sm font-semibold text-[#EF5A32] uppercase tracking-widest" style={{fontFamily: 'var(--font-inter)',textTransform:'uppercase'}}>Frequently Asked Questions</p>
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
