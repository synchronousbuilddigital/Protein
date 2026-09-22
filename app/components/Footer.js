export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-16 pb-10" style={{ background: '#141414', color: 'rgba(248,246,242,0.5)' }}>
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
        <h2
          className="text-[80px] sm:text-[140px] md:text-[190px] lg:text-[240px] uppercase tracking-wider leading-none whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-fira-sans)',
            fontWeight: 800,
            color: 'rgba(248,246,242,0.03)',
          }}
        >
          THE PROTEINEST
        </h2>
      </div>

      <div className="wrap relative z-10">
        <div className="foot-grid grid grid-cols-1 md:grid-cols-4 gap-8 items-start mb-12">

          {/* Brand Column */}
          <div>
            <div
              className="text-3xl uppercase tracking-wide mb-3"
              style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: '#F8F6F2' }}
            >
              The Proteinest
            </div>
            <p
              className="text-xs leading-relaxed max-w-[260px]"
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, color: 'rgba(248,246,242,0.5)' }}
            >
              Premium plant-based protein. Clean, potent, responsibly sourced. A brand of Gizinest Wellness Pvt Ltd.
            </p>
            <p
              className="text-xs mt-3 max-w-[260px]"
              style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: 'rgba(255,104,63,0.75)', lineHeight: '1.5' }}
            >
              Fueling the finest you.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5" style={{ fontFamily: 'var(--font-fira-sans)', color: 'rgba(248,246,242,0.9)', letterSpacing: '0.1em' }}>Shop</h4>
            <ul className="space-y-2.5 text-xs" style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, color: 'rgba(248,246,242,0.5)' }}>
              <li><a href="/shop" className="hover:text-[#F8F6F2] transition-colors">Choco Buddy</a></li>
              <li><a href="/shop" className="hover:text-[#F8F6F2] transition-colors">Kulfi Mate</a></li>
              <li><a href="/shop" className="hover:text-[#F8F6F2] transition-colors">All Products</a></li>
            </ul>
          </div>

          {/* Learn Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5" style={{ fontFamily: 'var(--font-fira-sans)', color: 'rgba(248,246,242,0.9)', letterSpacing: '0.1em' }}>Learn</h4>
            <ul className="space-y-2.5 text-xs" style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, color: 'rgba(248,246,242,0.5)' }}>
              <li><a href="/blog" className="hover:text-[#F8F6F2] transition-colors">Blog</a></li>
              <li><a href="/calculator" className="hover:text-[#F8F6F2] transition-colors">Protein Calculator</a></li>
              <li><a href="/blog" className="hover:text-[#F8F6F2] transition-colors">Ingredient Glossary</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5" style={{ fontFamily: 'var(--font-fira-sans)', color: 'rgba(248,246,242,0.9)', letterSpacing: '0.1em' }}>Company</h4>
            <ul className="space-y-2.5 text-xs" style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, color: 'rgba(248,246,242,0.5)' }}>
              <li><a href="/about" className="hover:text-[#F8F6F2] transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-[#F8F6F2] transition-colors">Contact</a></li>
              <li><a href="#learn" className="hover:text-[#F8F6F2] transition-colors">FAQs</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div
          className="foot-bottom border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-4"
          style={{ borderColor: 'rgba(248,246,242,0.08)', color: 'rgba(248,246,242,0.35)', fontFamily: 'var(--font-inter)', fontWeight: 300 }}
        >
          <span>© 2026 The Proteinest. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service · Shipping · Refunds</span>
        </div>
      </div>
    </footer>
  );
}
