export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#111111] text-white pt-16 pb-10">
      {/* Background Watermark Text BEHIND the footer content */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
        <h2 className="font-['Anton'] text-[80px] sm:text-[140px] md:text-[190px] lg:text-[240px] uppercase tracking-wider leading-none text-white/[0.06] font-normal whitespace-nowrap">
          THE PROTEINEST
        </h2>
      </div>

      <div className="wrap relative z-10">
        <div className="foot-grid grid grid-cols-1 md:grid-cols-4 gap-8 items-start mb-12">
          
          {/* Left Side: Brand Name & Description */}
          <div>
            <div className="font-['Anton'] text-3xl uppercase tracking-wider text-white mb-2">
              The Proteinest
            </div>
            <p className="text-xs sm:text-sm text-white/60 max-w-[260px] leading-relaxed">
              A brand of Gizinest Wellness Pvt Ltd. Clean, gentle, great-tasting protein for every kitchen.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5 text-white/90">Shop</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li><a href="#shop" className="hover:text-white transition-colors">Choco Buddy</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Kulfi Mate</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">All products</a></li>
            </ul>
          </div>

          {/* Learn Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5 text-white/90">Learn</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li><a href="#learn" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#learn" className="hover:text-white transition-colors">Hormone dictionary</a></li>
              <li><a href="#learn" className="hover:text-white transition-colors">Trust wall</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3.5 text-white/90">Company</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li><a href="#about" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Protein calculator</a></li>
              <li><a href="#learn" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="foot-bottom border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-4">
          <span>© 2026 The Proteinest. All rights reserved.</span>
          <span>Privacy policy · Terms of service · Shipping · Refunds</span>
        </div>
      </div>
    </footer>
  );
}
