export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#FBF7F1]/95 backdrop-blur-md text-[#111111]">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Animated Rotating Ring */}
        <div className="w-16 h-16 rounded-full border-3 border-[#111111]/10 border-t-[#EF5A32] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-['Anton'] text-2xl text-[#EF5A32]">P</span>
        </div>
      </div>
      <div className="mt-4 font-['Anton'] text-base uppercase tracking-widest text-[#111111]">
        The Proteinest
      </div>
      <div className="font-['Caveat'] text-sm text-[#C8441F] mt-0.5 font-bold">
        fueling the finest you
      </div>
    </div>
  );
}
