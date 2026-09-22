'use client';

import leftImg from "../../public/image.png";
import rightImg from "../../public/protein.png";

/* ── SVG Icon Components ─────────────────────────────────────── */
function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.2 6.2L4.8 9.2L9.8 2.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 4C20 4 18 14 12 18C6 22 2 20 2 20C2 20 4 10 10 6C16 2 20 4 20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 20L10 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DnaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3C7 3 9 7 12 9C15 11 17 15 17 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 3C17 3 15 7 12 9C9 11 7 15 7 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.5 6.5H15.5M8.5 17.5H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MuscleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 10C6 10 4 11 4 13C4 15 5.5 16 7 16H9L10 18H14L15 16H17C18.5 16 20 15 20 13C20 11 18 10 18 10L16 8C16 8 14.5 6 12 6C9.5 6 8 8 8 8L6 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21C12 21 3 14.5 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.8 3.9 12 5C12.2 3.9 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

export default function ComparisonSection() {
  return (
    <section id="compare" className="w-full bg-[#F8F6F2] py-[90px] sm:py-[100px] lg:py-[115px] relative overflow-hidden text-[#141414] font-sans">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#FF683F]/6 blur-[120px] rounded-full pointer-events-none -z-0" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16 pt-2 lg:pt-4">
          <h2 className="font-['Fira_Sans'] text-3xl sm:text-5xl lg:text-[56px] uppercase tracking-tight text-[#141414] leading-[1.08] mb-3">
            NOT ALL PROTEIN <span className="text-[#FF683F]">IS THE SAME</span>
          </h2>
          <p className="text-[#6B625D] text-base sm:text-lg font-medium tracking-normal">
            Same goal. A much better way.
          </p>
        </div>

        {/* Main Dual Comparison Showcase Card */}
        <div className="relative rounded-[28px] sm:rounded-[32px] border border-[#E6E1D8] shadow-[0_16px_45px_rgba(0,0,0,0.035)] overflow-hidden bg-[#FAF8F5]">
          
          {/* Angled Soft Warm Peach Background for Right Half */}
          <div 
            className="absolute top-0 right-0 w-full lg:w-[54%] h-full bg-[#FCECE6] pointer-events-none hidden lg:block"
            style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            
            {/* LEFT HALF: OTHERS */}
            <div className="p-6 sm:p-8 lg:py-10 lg:pl-10 lg:pr-14 flex flex-col justify-between">
              <div>
                <h3 className="font-['Fira_Sans'] text-3xl sm:text-4xl text-[#141414] uppercase tracking-wide">
                  OTHERS
                </h3>
                <p className="text-xs sm:text-sm text-[#6B625D] font-medium mt-1 mb-8">
                  Might fill you up, but at a cost.
                </p>

                {/* Bullets (Left) + Left Image (image.png) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                  
                  {/* Left Bullet List */}
                  <div className="sm:col-span-7 space-y-6">
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full border border-red-300 text-red-500 bg-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                        <XIcon />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#141414] leading-tight">
                          OFTEN CAUSES BLOATING
                        </h4>
                        <p className="text-xs text-[#6B625D] mt-0.5 font-normal">
                          Harder to digest
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full border border-red-300 text-red-500 bg-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                        <XIcon />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#141414] leading-tight">
                          ARTIFICIAL FILLERS
                        </h4>
                        <p className="text-xs text-[#6B625D] mt-0.5 font-normal">
                          Unnecessary additives
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full border border-red-300 text-red-500 bg-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                        <XIcon />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#141414] leading-tight">
                          ARTIFICIAL SWEETENERS
                        </h4>
                        <p className="text-xs text-[#6B625D] mt-0.5 font-normal">
                          Leaves an unnatural aftertaste
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Left Side Image (image.png - Exactly Matched Size) */}
                  <div className="sm:col-span-5 flex justify-center sm:justify-end">
                    <div className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] lg:w-[190px] lg:h-[190px] flex-shrink-0 rounded-2xl overflow-hidden shadow-md border border-black/5 bg-white flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <img
                        src={leftImg.src}
                        alt="Others Protein Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Center VS Badge */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF683F] text-white font-['Fira_Sans'] text-xl sm:text-2xl flex items-center justify-center shadow-lg border-4 border-white">
                VS
              </div>
            </div>

            {/* RIGHT HALF: THE PROTEINEST */}
            <div className="p-6 sm:p-8 lg:py-10 lg:pl-14 lg:pr-10 flex flex-col justify-between bg-[#FCECE6] lg:bg-transparent border-t lg:border-t-0 border-black/5">
              <div>
                <h3 className="font-['Fira_Sans'] text-3xl sm:text-4xl text-[#FF683F] uppercase tracking-wide">
                  THE PROTEINEST
                </h3>
                <p className="text-xs sm:text-sm text-[#6B625D] font-medium mt-1 mb-8">
                  Clean nutrition. Real results.
                </p>

                {/* The Proteinest Brand Image (Left) + Bullets (Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                  
                  {/* Right Side Image (protein.png - Shifted Left Cleanly) */}
                  <div className="sm:col-span-5 flex justify-center sm:justify-start">
                    <div className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] lg:w-[190px] lg:h-[190px] flex-shrink-0 rounded-2xl overflow-hidden shadow-md border border-black/5 bg-white flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <img
                        src={rightImg.src}
                        alt="The Proteinest Product"
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Right Bullet List (Shifted Right with Clear Gap from Image) */}
                  <div className="sm:col-span-7 pl-3 sm:pl-5 lg:pl-6 space-y-6">
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        <CheckIcon />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#141414] leading-tight">
                          LIGHT &amp; EASY-TO-ENJOY
                        </h4>
                        <p className="text-xs text-[#524B46] mt-0.5 font-normal">
                          Gentle on your stomach
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        <CheckIcon />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#141414] leading-tight">
                          CLEAN INGREDIENTS
                        </h4>
                        <p className="text-xs text-[#524B46] mt-0.5 font-normal">
                          No unnecessary additives
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        <CheckIcon />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#141414] leading-tight">
                          SWEETENED WITH MONK FRUIT
                        </h4>
                        <p className="text-xs text-[#524B46] mt-0.5 font-normal">
                          Naturally delicious
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 lg:mt-12 text-center">
          <a
            href="/shop"
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#FF683F] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#FF683F]/25 hover:bg-[#D94D28] hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl hover:shadow-[#FF683F]/35"
          >
            <span>DISCOVER THE PROTEINEST</span>
            <ArrowRightIcon />
          </a>
        </div>

        {/* Micro Trust Features Bar */}
        <div className="mt-12 lg:mt-14 pt-8 border-t border-[#E6E1D8] max-w-4xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-6 text-[#141414] font-semibold text-xs text-center">
          <div className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-full border border-black/5 shadow-2xs">
            <span className="text-[#059669]"><LeafIcon /></span>
            <span>100% Plant-Based</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-full border border-black/5 shadow-2xs">
            <span className="text-[#FF683F]"><DnaIcon /></span>
            <span>Gut Friendly</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-full border border-black/5 shadow-2xs">
            <span className="text-[#FF683F]"><MuscleIcon /></span>
            <span>Builds Lean Muscle</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-full border border-black/5 shadow-2xs">
            <span className="text-[#FF683F]"><HeartIcon /></span>
            <span>No Whey, No Bloat</span>
          </div>
        </div>

      </div>
    </section>
  );
}
