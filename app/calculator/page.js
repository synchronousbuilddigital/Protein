'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import proteinImg from '../../public/protein.png';
import kulfiImg from '../../public/badamkhulfi.png';

/* ── Inline SVG Icons ─────────────────────────────────────────── */
function CheckIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FlameIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23c4.97 0 9-3.8 9-8.5 0-4.5-4-8-6.5-12.5C12.5 5 11 8 9.5 10 7.5 7.5 7 5 7 5c-3 4.5-5 8-5 9.5C2 19.2 6.03 23 12 23z" />
    </svg>
  );
}

function DumbbellIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 5v14M18 5v14M3 8v8M21 8v8M6 12h12" />
    </svg>
  );
}

function TargetIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function DropletIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function SparklesIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
    </svg>
  );
}

function CopyIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Primary Goals Definition ──────────────────────────────────── */
const GOALS = [
  {
    id: 'fat_loss',
    title: 'Fat Loss & Cutting',
    tagline: 'Preserve lean muscle while dropping fat in a caloric deficit',
    icon: FlameIcon,
    accent: 'from-orange-500 to-amber-500',
    multiplierMale: [1.9, 2.3],
    multiplierFemale: [1.8, 2.2],
    rationale:
      'High protein is vital during fat loss: it boosts metabolic satiety, keeps hunger hormones in check, and signals your body to burn stored adipose tissue rather than precious muscle.',
    idealFlavour: 'Choco Buddy (Rich Dutch Cocoa)',
  },
  {
    id: 'muscle_gain',
    title: 'Muscle Gain & Hypertrophy',
    tagline: 'Maximize muscle protein synthesis and lean tissue growth',
    icon: DumbbellIcon,
    accent: 'from-emerald-500 to-teal-500',
    multiplierMale: [1.7, 2.2],
    multiplierFemale: [1.6, 2.0],
    rationale:
      'Optimal hypertrophy requires steady amino acid influx to stimulate mTOR and trigger Muscle Protein Synthesis (MPS) past your leucine threshold after workouts.',
    idealFlavour: 'Kulfi Mate (Desi Badam Kulfi)',
  },
  {
    id: 'weight_training',
    title: 'Weight Training & Strength',
    tagline: 'Heavy lifting, power development, dense muscular recovery',
    icon: TargetIcon,
    accent: 'from-blue-500 to-indigo-500',
    multiplierMale: [1.8, 2.3],
    multiplierFemale: [1.7, 2.1],
    rationale:
      'Heavy resistance loads inflict deep micro-tears in contractile muscle fibers and strain connective tendons. High bioavailable protein accelerates structural rebuild and strength recovery.',
    idealFlavour: 'Choco Buddy + Shaker Bundle',
  },
  {
    id: 'endurance',
    title: 'Endurance & Athletics',
    tagline: 'Running, cycling, sports, and cardio energy repair',
    icon: SparklesIcon,
    accent: 'from-purple-500 to-pink-500',
    multiplierMale: [1.4, 1.8],
    multiplierFemale: [1.3, 1.7],
    rationale:
      'Endurance athletes burn through branched-chain amino acids (BCAAs) as secondary fuel during long sessions. Protein repairs mitochondrial infrastructure and reduces delayed-onset soreness (DOMS).',
    idealFlavour: 'Choco Buddy',
  },
  {
    id: 'maintenance',
    title: 'Daily Vitality & Health',
    tagline: 'Immune support, hormone balance, hair, skin, & longevity',
    icon: DropletIcon,
    accent: 'from-amber-500 to-orange-400',
    multiplierMale: [1.1, 1.4],
    multiplierFemale: [1.0, 1.3],
    rationale:
      'Most Indian adults consume only ~37g/day, far below ICMR recommendations. Maintenance protein supports enzymatic digestion, immune antibodies, keratin for hair/skin, and bone density.',
    idealFlavour: 'Kulfi Mate',
  },
];

/* ── Activity Levels ───────────────────────────────────────────── */
const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentary', desc: 'Desk job, minimal daily movement', factor: 1.0 },
  { id: 'light', label: 'Lightly Active', desc: '1–2 workouts or 7k daily steps', factor: 1.03 },
  { id: 'moderate', label: 'Moderately Active', desc: '3–4 workouts / week with moderate intensity', factor: 1.07 },
  { id: 'heavy', label: 'Very Active', desc: '5–6 intense lifting/cardio sessions / week', factor: 1.12 },
  { id: 'athlete', label: 'Athlete / High Intensity', desc: 'Double sessions or rigorous manual training', factor: 1.18 },
];

/* ── Diet Types ────────────────────────────────────────────────── */
const DIET_TYPES = [
  { id: 'vegetarian', label: 'Vegetarian', note: '+8% buffer for plant amino acid bioavailability' },
  { id: 'non_vegetarian', label: 'Non-Vegetarian', note: 'High bioavailable animal sources included' },
  { id: 'eggetarian', label: 'Eggetarian', note: 'Eggs + dairy providing complete PDCAAS proteins' },
  { id: 'vegan', label: '100% Vegan', note: '+10% buffer for plant-protein amino profiling' },
];

export default function ProteinCalculatorPage() {
  // Inputs State
  const [gender, setGender] = useState('male'); // 'male' | 'female'
  const [unit, setUnit] = useState('metric'); // 'metric' | 'imperial'
  const [age, setAge] = useState(26);
  const [weightKg, setWeightKg] = useState(72);
  const [heightCm, setHeightCm] = useState(175);
  const [goalId, setGoalId] = useState('muscle_gain');
  const [activityId, setActivityId] = useState('moderate');
  const [dietId, setDietId] = useState('vegetarian');
  const [mealCount, setMealCount] = useState(4);
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Imperial conversions
  const weightLbs = Math.round(weightKg * 2.20462);
  const heightInchesTotal = Math.round(heightCm / 2.54);
  const heightFeet = Math.floor(heightInchesTotal / 12);
  const heightInches = heightInchesTotal % 12;

  const handleWeightChangeLbs = (valLbs) => {
    const kg = Math.round(valLbs / 2.20462);
    setWeightKg(Math.max(35, Math.min(160, kg)));
  };

  const handleHeightFeetChange = (ft, inch) => {
    const totalIn = ft * 12 + inch;
    const cm = Math.round(totalIn * 2.54);
    setHeightCm(Math.max(120, Math.min(220, cm)));
  };

  // Selected Goal
  const activeGoal = useMemo(() => GOALS.find((g) => g.id === goalId) || GOALS[1], [goalId]);
  const activeActivity = useMemo(() => ACTIVITY_LEVELS.find((a) => a.id === activityId) || ACTIVITY_LEVELS[2], [activityId]);

  // Scientific Calculation Engine
  const calculation = useMemo(() => {
    const isMale = gender === 'male';
    const rawMultipliers = isMale ? activeGoal.multiplierMale : activeGoal.multiplierFemale;

    // Diet adjustment factor (+8% for veg, +10% for vegan)
    let dietAdjustment = 1.0;
    if (dietId === 'vegetarian') dietAdjustment = 1.08;
    else if (dietId === 'vegan') dietAdjustment = 1.1;

    // Age adjustment: adults over 45 require slightly higher leucine to overcome anabolic resistance
    const ageAdjustment = age >= 45 ? 1.05 : 1.0;

    const activityFactor = activeActivity.factor;

    const minPerKg = rawMultipliers[0] * dietAdjustment * ageAdjustment * activityFactor;
    const maxPerKg = rawMultipliers[1] * dietAdjustment * ageAdjustment * activityFactor;

    const minTarget = Math.round(weightKg * minPerKg);
    const maxTarget = Math.round(weightKg * maxPerKg);
    const sweetSpot = Math.round((minTarget + maxTarget) / 2);

    // Per meal breakdown
    const perMeal = Math.round(sweetSpot / mealCount);

    // Water target (approx 36 - 40 ml per kg body weight)
    const waterLitres = (weightKg * 0.038).toFixed(1);

    // Daily calories from protein (4 kcal / gram)
    const proteinCalories = sweetSpot * 4;

    // The Proteinest Scoops to bridge typical gap (typical Indian diet has 35g-45g protein, leaving a gap)
    const recommendedScoops = sweetSpot >= 120 ? 2 : 1;

    return {
      minTarget,
      maxTarget,
      sweetSpot,
      perKgRatio: (sweetSpot / weightKg).toFixed(1),
      perMeal,
      waterLitres,
      proteinCalories,
      recommendedScoops,
    };
  }, [gender, weightKg, age, activeGoal, activeActivity, dietId, mealCount]);

  const copyResults = () => {
    const text = `🥗 My Personalized Protein Target from The Proteinest:
• Goal: ${activeGoal.title} (${gender === 'male' ? 'Male' : 'Female'}, ${weightKg}kg)
• Daily Target: ${calculation.sweetSpot}g (${calculation.minTarget}g - ${calculation.maxTarget}g/day)
• Per Meal (${mealCount} meals): ~${calculation.perMeal}g / meal
• Daily Water: ${calculation.waterLitres} Litres
Calculated at https://theproteinest.com/calculator`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1] text-[#111111] flex flex-col antialiased">
      <Navbar />

      {/* Main Interactive Calculator Section */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── Left Column: Inputs Form ─────────────────────── */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#111111]/8">
              
              {/* Top Controls: Unit Switcher */}
              <div className="flex items-center justify-between pb-6 border-b border-[#111111]/10 mb-6">
                <div>
                  <h2 className="font-['Anton'] text-2xl uppercase tracking-wide text-[#111111]">
                    Your Metrics
                  </h2>
                  <p className="text-xs text-[#111111]/60 mt-0.5">Customize your body parameters & plan</p>
                </div>

                {/* Unit Switcher */}
                <div className="flex items-center bg-[#FBF7F1] p-1 rounded-full border border-[#111111]/10 text-xs font-semibold">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                      unit === 'metric' ? 'bg-[#EF5A32] text-white shadow-sm' : 'text-[#111111]/60 hover:text-[#111111]'
                    }`}
                  >
                    Metric (kg / cm)
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                      unit === 'imperial' ? 'bg-[#EF5A32] text-white shadow-sm' : 'text-[#111111]/60 hover:text-[#111111]'
                    }`}
                  >
                    Imperial (lbs / ft)
                  </button>
                </div>
              </div>

              {/* Step 1: Gender Selector */}
              <div className="mb-7">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]/70 mb-2.5">
                  1. Biological Sex
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden flex items-center justify-between ${
                      gender === 'male'
                        ? 'border-[#EF5A32] bg-[#EF5A32]/5 ring-2 ring-[#EF5A32]/20'
                        : 'border-[#111111]/15 hover:border-[#111111]/40 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                          gender === 'male' ? 'bg-[#EF5A32] text-white' : 'bg-[#FBF7F1] text-[#111111]'
                        }`}
                      >
                        ♂
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#111111]">Male</div>
                        <div className="text-[11px] text-[#111111]/50">Higher natural lean mass baseline</div>
                      </div>
                    </div>
                    {gender === 'male' && (
                      <span className="w-5 h-5 rounded-full bg-[#EF5A32] text-white flex items-center justify-center">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden flex items-center justify-between ${
                      gender === 'female'
                        ? 'border-[#EF5A32] bg-[#EF5A32]/5 ring-2 ring-[#EF5A32]/20'
                        : 'border-[#111111]/15 hover:border-[#111111]/40 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                          gender === 'female' ? 'bg-[#EF5A32] text-white' : 'bg-[#FBF7F1] text-[#111111]'
                        }`}
                      >
                        ♀
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#111111]">Female</div>
                        <div className="text-[11px] text-[#111111]/50">Calibrated for hormonal balance</div>
                      </div>
                    </div>
                    {gender === 'female' && (
                      <span className="w-5 h-5 rounded-full bg-[#EF5A32] text-white flex items-center justify-center">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                </div>
                {gender === 'female' && (
                  <p className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 mt-2.5 flex items-center gap-2">
                    <span>💡</span>
                    <span>
                      <strong>Good to know:</strong> High protein will <em>never</em> make women look bulky — it sculpts
                      lean muscle tone, burns fat faster, and fortifies hair & skin vitality.
                    </span>
                  </p>
                )}
              </div>

              {/* Step 2: Body Stats (Age, Weight, Height) */}
              <div className="mb-7">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]/70 mb-2.5">
                  2. Body Metrics
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Age */}
                  <div className="p-3.5 bg-[#FBF7F1] rounded-2xl border border-[#111111]/10">
                    <div className="text-xs text-[#111111]/60 font-semibold mb-1">Age</div>
                    <div className="flex items-center justify-between">
                      <input
                        type="number"
                        min="16"
                        max="85"
                        value={age}
                        onChange={(e) => setAge(Math.max(16, Math.min(85, Number(e.target.value) || 16)))}
                        className="w-20 bg-transparent font-['Anton'] text-2xl text-[#111111] focus:outline-none"
                      />
                      <span className="text-xs font-bold text-[#111111]/40 uppercase">Years</span>
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="p-3.5 bg-[#FBF7F1] rounded-2xl border border-[#111111]/10">
                    <div className="text-xs text-[#111111]/60 font-semibold mb-1">
                      Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                    </div>
                    <div className="flex items-center justify-between">
                      {unit === 'metric' ? (
                        <input
                          type="number"
                          min="35"
                          max="160"
                          value={weightKg}
                          onChange={(e) => setWeightKg(Math.max(35, Math.min(160, Number(e.target.value) || 35)))}
                          className="w-20 bg-transparent font-['Anton'] text-2xl text-[#111111] focus:outline-none"
                        />
                      ) : (
                        <input
                          type="number"
                          min="77"
                          max="350"
                          value={weightLbs}
                          onChange={(e) => handleWeightChangeLbs(Number(e.target.value) || 77)}
                          className="w-20 bg-transparent font-['Anton'] text-2xl text-[#111111] focus:outline-none"
                        />
                      )}
                      <span className="text-xs font-bold text-[#111111]/40 uppercase">
                        {unit === 'metric' ? 'KG' : 'LBS'}
                      </span>
                    </div>
                  </div>

                  {/* Height */}
                  <div className="p-3.5 bg-[#FBF7F1] rounded-2xl border border-[#111111]/10">
                    <div className="text-xs text-[#111111]/60 font-semibold mb-1">
                      Height {unit === 'metric' ? '(cm)' : '(ft / in)'}
                    </div>
                    {unit === 'metric' ? (
                      <div className="flex items-center justify-between">
                        <input
                          type="number"
                          min="120"
                          max="220"
                          value={heightCm}
                          onChange={(e) => setHeightCm(Math.max(120, Math.min(220, Number(e.target.value) || 120)))}
                          className="w-20 bg-transparent font-['Anton'] text-2xl text-[#111111] focus:outline-none"
                        />
                        <span className="text-xs font-bold text-[#111111]/40 uppercase">CM</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="4"
                          max="7"
                          value={heightFeet}
                          onChange={(e) => handleHeightFeetChange(Number(e.target.value) || 4, heightInches)}
                          className="w-8 bg-transparent font-['Anton'] text-2xl text-[#111111] focus:outline-none"
                        />
                        <span className="text-xs font-bold text-[#111111]/40 mr-1">FT</span>
                        <input
                          type="number"
                          min="0"
                          max="11"
                          value={heightInches}
                          onChange={(e) => handleHeightFeetChange(heightFeet, Number(e.target.value) || 0)}
                          className="w-8 bg-transparent font-['Anton'] text-2xl text-[#111111] focus:outline-none"
                        />
                        <span className="text-xs font-bold text-[#111111]/40">IN</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Weight Interactive Slider for Quick adjustment */}
                <div className="mt-3 px-1">
                  <input
                    type="range"
                    min="40"
                    max="140"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-[#EF5A32] cursor-pointer h-1.5 bg-[#111111]/15 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-[#111111]/40 mt-1 font-mono">
                    <span>40 kg (88 lbs)</span>
                    <span className="font-bold text-[#EF5A32]">Current: {weightKg} kg ({weightLbs} lbs)</span>
                    <span>140 kg (308 lbs)</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Fitness Goal Selection */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#111111]/70">
                    3. Your Primary Fitness Goal
                  </label>
                  <span className="text-[11px] text-[#EF5A32] font-semibold">Select 1 goal</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GOALS.map((g) => {
                    const isSelected = goalId === g.id;
                    const Icon = g.icon;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoalId(g.id)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
                          isSelected
                            ? 'border-[#EF5A32] bg-[#EF5A32]/5 ring-2 ring-[#EF5A32]/20 shadow-sm'
                            : 'border-[#111111]/10 hover:border-[#111111]/30 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-[#EF5A32] text-white shadow-sm' : 'bg-[#FBF7F1] text-[#111111]'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm text-[#111111]">{g.title}</span>
                              {isSelected && <CheckIcon className="w-4 h-4 text-[#EF5A32] shrink-0" />}
                            </div>
                            <p className="text-[11px] text-[#111111]/60 mt-1 leading-snug">{g.tagline}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Activity Level & Exercise Frequency */}
              <div className="mb-7">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]/70 mb-2.5">
                  4. Current Physical Activity Level
                </label>

                <div className="space-y-2">
                  {ACTIVITY_LEVELS.map((act) => {
                    const isSelected = activityId === act.id;
                    return (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => setActivityId(act.id)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-150 ${
                          isSelected
                            ? 'border-[#EF5A32] bg-[#EF5A32]/5 font-medium'
                            : 'border-[#111111]/10 hover:bg-[#FBF7F1]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#EF5A32] bg-[#EF5A32]' : 'border-[#111111]/30'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-[#111111]">{act.label}</span>
                            <span className="text-[11px] text-[#111111]/50 ml-2">— {act.desc}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: Dietary Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]/70 mb-2.5">
                  5. Dietary Style (Indian Calibrated)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DIET_TYPES.map((dt) => {
                    const isSelected = dietId === dt.id;
                    return (
                      <button
                        key={dt.id}
                        type="button"
                        onClick={() => setDietId(dt.id)}
                        className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                          isSelected
                            ? 'border-[#EF5A32] bg-[#EF5A32] text-white font-bold shadow-sm'
                            : 'border-[#111111]/10 bg-[#FBF7F1] text-[#111111] hover:border-[#111111]/30 font-semibold'
                        }`}
                      >
                        <div className="text-xs">{dt.label}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 text-[11px] text-[#111111]/60 italic">
                  💡 {DIET_TYPES.find((d) => d.id === dietId)?.note}
                </div>
              </div>

            </div>

            {/* ── Right Column: Live Results Panel ──────────────── */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              {/* Primary Target Card */}
              <div className="bg-[#111111] text-white rounded-3xl p-7 shadow-2xl relative overflow-hidden border border-white/10">
                {/* Background decorative watermark */}
                <div className="absolute top-2 right-4 font-['Anton'] text-7xl text-white/[0.04] select-none pointer-events-none">
                  TARGET
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#EF5A32]/20 border border-[#EF5A32]/30 text-[#EF5A32] text-[11px] font-bold uppercase tracking-wider">
                      Your Daily Prescription
                    </span>
                    <button
                      onClick={copyResults}
                      className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-lg transition-colors"
                      title="Copy plan to clipboard"
                    >
                      <CopyIcon className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied!' : 'Share / Copy'}</span>
                    </button>
                  </div>

                  {/* Target Hero Metric */}
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-['Anton'] text-6xl sm:text-7xl text-white tracking-tight leading-none">
                      {calculation.sweetSpot}
                    </span>
                    <div>
                      <span className="font-['Anton'] text-2xl text-[#EF5A32]">GRAMS</span>
                      <span className="block text-xs text-white/60 font-sans -mt-1">per day</span>
                    </div>
                  </div>

                  {/* Range and Ratio Pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white/90">
                      Target Range: <strong className="text-white">{calculation.minTarget}g – {calculation.maxTarget}g</strong>
                    </div>
                    <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#EF5A32]">
                      {calculation.perKgRatio} g / kg
                    </div>
                  </div>

                  {/* Rationale explanation */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs text-white/80 leading-relaxed mb-6">
                    <strong className="text-white block mb-1">Why this amount for {activeGoal.title}:</strong>
                    {activeGoal.rationale}
                  </div>

                  {/* Secondary Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <div className="p-3 rounded-xl bg-white/[0.04]">
                      <div className="text-[11px] text-white/50 font-medium">Daily Water Target</div>
                      <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-1.5">
                        <DropletIcon className="w-4 h-4 text-sky-400" />
                        <span>{calculation.waterLitres} L</span>
                      </div>
                      <div className="text-[10px] text-white/40 mt-0.5">Supports nitrogen clearance</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04]">
                      <div className="text-[11px] text-white/50 font-medium">Calorie Contribution</div>
                      <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-1.5">
                        <FlameIcon className="w-4 h-4 text-[#EF5A32]" />
                        <span>{calculation.proteinCalories} kcal</span>
                      </div>
                      <div className="text-[10px] text-white/40 mt-0.5">High thermic effect (TEF)</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Meal Distribution Breakdown Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#111111]/8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-['Anton'] text-lg uppercase tracking-wide text-[#111111]">
                      Meal Distribution
                    </h3>
                    <p className="text-[11px] text-[#111111]/60">Hit the 3g leucine threshold every meal</p>
                  </div>

                  {/* Meal count selector */}
                  <div className="flex items-center bg-[#FBF7F1] p-1 rounded-full border border-[#111111]/10 text-xs font-bold">
                    {[3, 4, 5].map((count) => (
                      <button
                        key={count}
                        onClick={() => setMealCount(count)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          mealCount === count ? 'bg-[#111111] text-white shadow-sm' : 'text-[#111111]/60 hover:text-[#111111]'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meals Visual Breakdown */}
                <div className="space-y-2.5">
                  {Array.from({ length: mealCount }).map((_, idx) => {
                    const mealNames = [
                      'Breakfast',
                      'Lunch',
                      'Pre / Post Workout Snack',
                      'Dinner',
                      'Evening / Bedtime Snack',
                    ];
                    const name = mealNames[idx] || `Meal ${idx + 1}`;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#FBF7F1] border border-[#111111]/5"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#EF5A32]/10 text-[#EF5A32] text-[10px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-[#111111]">{name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-['Anton'] text-base text-[#EF5A32]">~{calculation.perMeal}g</span>
                          <span className="text-[10px] text-[#111111]/40 ml-1">protein</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended The Proteinest Match Card */}
              <div className="bg-gradient-to-br from-[#EF5A32] to-[#C8441F] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider mb-3">
                    Personalized Supplement Match
                  </div>

                  <h3 className="font-['Anton'] text-2xl uppercase tracking-wide leading-tight mb-2">
                    Close Your Gap With {calculation.recommendedScoops} Scoop{calculation.recommendedScoops > 1 ? 's' : ''} Daily
                  </h3>

                  <p className="text-xs text-white/90 leading-relaxed mb-4">
                    The average Indian diet falls 40–50g short of optimal protein. 1 scoop of The Proteinest gives you{' '}
                    <strong>25g clean whey</strong> with zero digestive bloat, tested by NABL accredited labs.
                  </p>

                  <div className="flex items-center gap-4 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm mb-4 border border-white/20">
                    <div className="w-16 h-16 relative shrink-0 bg-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={activeGoal.id === 'muscle_gain' ? kulfiImg : proteinImg}
                        alt="The Proteinest"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Recommended: {activeGoal.idealFlavour}
                      </div>
                      <div className="text-[11px] text-white/80 mt-0.5">
                        25g Protein · 5.5g BCAA · Digestive Enzymes
                      </div>
                      <div className="text-sm font-['Anton'] text-white mt-1">₹2,499 / 1kg tub</div>
                    </div>
                  </div>

                  <a
                    href="/shop"
                    style={{ color: '#111111', backgroundColor: '#FFFFFF' }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:bg-[#FBE3DC] hover:shadow-lg active:scale-[0.98] cursor-pointer !text-[#111111]"
                  >
                    <span>Shop Recommended Formula</span>
                    <span className="text-sm font-black">→</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Food Blueprint: How to Hit Your Target on an Indian Diet ── */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#111111]/10">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF5A32] block mb-2">
              Indian Whole Food Cheat-Sheet
            </span>
            <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-tight text-[#111111]">
              How To Hit {calculation.sweetSpot}g Daily
            </h2>
            <p className="text-sm text-[#111111]/60 mt-2">
              Compare protein density across popular Indian food choices and see how seamlessly 1-2 scoops of The Proteinest fits in.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* The Proteinest Scoop (Featured) */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#EF5A32]/10 to-[#EF5A32]/5 border-2 border-[#EF5A32] text-center flex flex-col justify-between relative shadow-sm">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#EF5A32] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full whitespace-nowrap">
                Easiest
              </span>
              <div>
                <div className="text-xs font-bold text-[#111111] mt-1">The Proteinest</div>
                <div className="text-[10px] text-[#111111]/50">1 Scoop (33g)</div>
              </div>
              <div className="my-3">
                <span className="font-['Anton'] text-3xl text-[#EF5A32]">25g</span>
                <span className="block text-[10px] text-[#111111]/60 font-semibold">Protein · 118 kcal</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 rounded-md py-0.5 font-bold">
                100% Bioavailable
              </span>
            </div>

            {/* Soya Chunks */}
            <div className="p-4 rounded-2xl bg-[#FBF7F1] border border-[#111111]/10 text-center flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#111111]">Soya Chunks</div>
                <div className="text-[10px] text-[#111111]/50">50g (Raw)</div>
              </div>
              <div className="my-3">
                <span className="font-['Anton'] text-3xl text-[#111111]">26g</span>
                <span className="block text-[10px] text-[#111111]/60 font-semibold">Protein · 170 kcal</span>
              </div>
              <span className="text-[10px] text-[#111111]/60 bg-white rounded-md py-0.5 border border-[#111111]/10">
                Plant Source
              </span>
            </div>

            {/* Low-Fat Paneer */}
            <div className="p-4 rounded-2xl bg-[#FBF7F1] border border-[#111111]/10 text-center flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#111111]">Low Fat Paneer</div>
                <div className="text-[10px] text-[#111111]/50">100g</div>
              </div>
              <div className="my-3">
                <span className="font-['Anton'] text-3xl text-[#111111]">18g</span>
                <span className="block text-[10px] text-[#111111]/60 font-semibold">Protein · 200 kcal</span>
              </div>
              <span className="text-[10px] text-[#111111]/60 bg-white rounded-md py-0.5 border border-[#111111]/10">
                Dairy Source
              </span>
            </div>

            {/* Whole Eggs */}
            <div className="p-4 rounded-2xl bg-[#FBF7F1] border border-[#111111]/10 text-center flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#111111]">Whole Eggs</div>
                <div className="text-[10px] text-[#111111]/50">3 Large Eggs</div>
              </div>
              <div className="my-3">
                <span className="font-['Anton'] text-3xl text-[#111111]">18g</span>
                <span className="block text-[10px] text-[#111111]/60 font-semibold">Protein · 210 kcal</span>
              </div>
              <span className="text-[10px] text-[#111111]/60 bg-white rounded-md py-0.5 border border-[#111111]/10">
                Complete Amino
              </span>
            </div>

            {/* Greek Yogurt */}
            <div className="p-4 rounded-2xl bg-[#FBF7F1] border border-[#111111]/10 text-center flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#111111]">Greek Yogurt / Hung Curd</div>
                <div className="text-[10px] text-[#111111]/50">150g</div>
              </div>
              <div className="my-3">
                <span className="font-['Anton'] text-3xl text-[#111111]">15g</span>
                <span className="block text-[10px] text-[#111111]/60 font-semibold">Protein · 130 kcal</span>
              </div>
              <span className="text-[10px] text-[#111111]/60 bg-white rounded-md py-0.5 border border-[#111111]/10">
                Gut Friendly
              </span>
            </div>

            {/* Cooked Moong Dal */}
            <div className="p-4 rounded-2xl bg-[#FBF7F1] border border-[#111111]/10 text-center flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#111111]">Cooked Dal</div>
                <div className="text-[10px] text-[#111111]/50">1 Big Katori (180g)</div>
              </div>
              <div className="my-3">
                <span className="font-['Anton'] text-3xl text-[#111111]">9g</span>
                <span className="block text-[10px] text-[#111111]/60 font-semibold">Protein · 160 kcal</span>
              </div>
              <span className="text-[10px] text-[#111111]/60 bg-white rounded-md py-0.5 border border-[#111111]/10">
                High Carb Base
              </span>
            </div>

          </div>

          <div className="mt-8 p-4 rounded-2xl bg-[#FBF7F1] border border-[#111111]/10 text-center max-w-xl mx-auto text-xs text-[#111111]/70">
            <strong>Why Dal Alone Isn&apos;t Enough:</strong> To get 25g of protein from dal, you would need to consume 3 large bowls
            with 450+ calories and 60g carbohydrates. Adding 1 scoop of The Proteinest gives you 25g pure protein with only 118 calories.
          </div>
        </div>
      </section>

      {/* ── FAQ & Science Section ─────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#FBF7F1]">
        <div className="wrap max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF5A32] block mb-2">
              Evidence-Based Insights
            </span>
            <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-tight text-[#111111]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Will high protein damage my kidneys or liver?',
                a: 'In healthy individuals, scientific studies consistently show that protein intakes between 1.6g to 2.4g/kg have zero adverse effects on kidney filtration (GFR) or liver enzymes. Remember to drink 3 to 3.5 litres of water daily to maintain peak nitrogen clearance.',
              },
              {
                q: 'Does whey protein cause acne or bloating?',
                a: 'Standard market wheys often contain cheap gums, fillers, artificial thickeners, and excessive lactose that trigger gastrointestinal distress. The Proteinest is formulated with a multi-enzyme digestive blend specifically for Indian gut profiles, ensuring zero bloating.',
              },
              {
                q: 'Do women need as much protein as men for fat loss and toning?',
                a: 'Yes! While women generally have slightly lower absolute muscle mass, their relative protein need per kilogram of body weight during fat loss is almost identical (1.8g – 2.2g/kg). Protein will not bulk you up; it sculpts lean tone and curbs cravings.',
              },
              {
                q: 'What is the best time to take The Proteinest?',
                a: 'Total daily protein intake across 24 hours is the primary driver of results. However, taking 1 scoop within 60-90 minutes post-workout maximizes muscle protein synthesis, and having it as a mid-day snack curbs 4 PM sweet cravings.',
              },
              {
                q: 'Why does the calculator recommend more protein for vegetarians?',
                a: 'Plant-based proteins (dal, beans, grains) have lower PDCAAS (Protein Digestibility-Corrected Amino Acid Scores) and lower concentrations of essential amino acids like Leucine and Methionine. A 8-10% buffer ensures your body absorbs the optimal amino profile.',
              },
            ].map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#111111]/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm text-[#111111] hover:text-[#EF5A32] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#EF5A32]' : 'text-[#111111]/40'}`}>
                      <ChevronDownIcon className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#111111]/70 leading-relaxed border-t border-[#111111]/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-xs text-[#111111]/60 mb-4">
              Ready to fuel your daily targets with the cleanest protein in India?
            </p>
            <a
              href="/shop"
              style={{ color: '#FFFFFF' }}
              className="inline-block px-8 py-4 rounded-full bg-[#EF5A32] hover:bg-[#C8441F] !text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Products & Bundles →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
