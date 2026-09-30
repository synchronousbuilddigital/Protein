'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import catalog from '@/public/products/manifest.json';

const photos = (slug) => catalog[slug]?.images ?? [];

/** Counts to its new value whenever it changes (writes the DOM directly, no re-renders). */
function AnimatedNumber({ value, className }) {
  const ref = useRef(null);
  const shown = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = String(value);
      shown.current = value;
      return;
    }
    const n = { v: shown.current };
    const tw = gsap.to(n, {
      v: value,
      duration: 0.6,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = String(Math.round(n.v));
      },
      onComplete: () => {
        shown.current = value;
      },
    });
    return () => {
      shown.current = Math.round(n.v);
      tw.kill();
    };
  }, [value]);
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

function MaleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="10" cy="14" r="6" />
      <path d="M14.5 9.5 20 4M15 4h5v5" />
    </svg>
  );
}
function FemaleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7M9 19h6" />
    </svg>
  );
}

const FAQS = [
  { q: 'Will high protein damage my kidneys or liver?', a: 'In healthy individuals, studies consistently show intakes between 1.6 and 2.4 g/kg have no adverse effect on kidney filtration (GFR) or liver enzymes. Drink 3 to 3.5 litres of water a day to support nitrogen clearance.' },
  { q: 'Does protein powder cause acne or bloating?', a: 'Many market powders contain gums, fillers, thickeners and lactose that upset digestion. The Proteinest is plant-based, free of fillers, and includes a digestive enzyme blend made for Indian gut profiles.' },
  { q: 'Do women need as much protein as men for fat loss and toning?', a: 'Yes. Women carry slightly less muscle overall, but the need per kilogram during fat loss is almost identical, around 1.8 to 2.2 g/kg. Protein won’t bulk you up; it builds lean tone and curbs cravings.' },
  { q: 'When is the best time to take The Proteinest?', a: 'Total protein across the day matters most. That said, a scoop within 60–90 minutes after training supports muscle protein synthesis, and a mid-afternoon shake helps curb 4 PM sweet cravings.' },
  { q: 'Why does the calculator recommend more for vegetarians?', a: 'Plant proteins like dal, beans and grains score lower on PDCAAS and carry less leucine and methionine. An 8–10% buffer makes sure you absorb an optimal amino acid profile.' },
];

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

  const recoPhoto = activeGoal.idealFlavour.startsWith('Kulfi') ? photos('kulfi-mate')[0] : photos('choco-buddy')[0];
  const rangePct = Math.min(100, Math.max(6, (Number(calculation.perKgRatio) / 3) * 100));
  const mealNames = ['Breakfast', 'Lunch', 'Pre / post workout', 'Dinner', 'Evening snack'];

  return (
    <main className="shop calc min-h-screen text-[#141414]">
      <Navbar />
      <ScrollReveal />

      {/* ── hero ── */}
      <section className="shop-hero" aria-labelledby="calc-title">
        <div className="shop-hero-glow" aria-hidden />
        <div className="shop-hero-grain" aria-hidden />
        <span className="shop-hero-ghost" aria-hidden data-parallax="0.25">
          {calculation.sweetSpot}G
        </span>
        <div className="shop-hero-inner" data-reveal-stagger="0.1">
          <span className="shop-kicker">
            <i aria-hidden />
            Protein calculator
            <i aria-hidden />
          </span>
          <h1 id="calc-title" className="shop-hero-title" data-split>
            Find your <em>daily number.</em>
          </h1>
          <p className="shop-hero-sub">Calibrated for Indian diets, your goal and how you train. Adjust anything and your target updates instantly.</p>
          <ul className="shop-hero-chips" aria-label="How it works">
            <li>
              <TargetIcon className="w-4 h-4" /> Goal-specific ranges
            </li>
            <li>
              <SparklesIcon className="w-4 h-4" /> Vegetarian and vegan buffers
            </li>
            <li>
              <DropletIcon className="w-4 h-4" /> Water and meal split included
            </li>
          </ul>
        </div>
      </section>

      {/* ── calculator ── */}
      <section className="cx-section band band--ivory" aria-label="Calculator">
        <div className="cx-grid">
          {/* form */}
          <form className="cx-form" onSubmit={(e) => e.preventDefault()} data-reveal="left">
            <header className="cx-form-head">
              <div>
                <h2 className="cx-h2">Your metrics</h2>
                <p className="cx-muted">Tell us about you. Everything recalculates live.</p>
              </div>
              <div className="cx-seg" role="radiogroup" aria-label="Units">
                <button type="button" role="radio" aria-checked={unit === 'metric'} data-active={unit === 'metric'} onClick={() => setUnit('metric')}>
                  kg / cm
                </button>
                <button type="button" role="radio" aria-checked={unit === 'imperial'} data-active={unit === 'imperial'} onClick={() => setUnit('imperial')}>
                  lbs / ft
                </button>
              </div>
            </header>

            {/* 1 */}
            <fieldset className="cx-step">
              <legend className="cx-legend">
                <span>01</span> Biological sex
              </legend>
              <div className="cx-two">
                {[
                  { id: 'male', label: 'Male', sub: 'Higher lean-mass baseline', glyph: <MaleIcon /> },
                  { id: 'female', label: 'Female', sub: 'Calibrated for hormonal balance', glyph: <FemaleIcon /> },
                ].map((g) => (
                  <button key={g.id} type="button" role="radio" aria-checked={gender === g.id} className="cx-choice" data-active={gender === g.id} onClick={() => setGender(g.id)}>
                    <span className="cx-choice-icon">{g.glyph}</span>
                    <span className="cx-choice-text">
                      <strong>{g.label}</strong>
                      <small>{g.sub}</small>
                    </span>
                    <span className="cx-tick" aria-hidden>
                      <CheckIcon className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
              {gender === 'female' && (
                <p className="cx-note">
                  <SparklesIcon className="w-4 h-4" />
                  <span>
                    <strong>Good to know:</strong> high protein won&apos;t make you bulky. It sculpts lean tone, helps burn fat and supports hair and skin.
                  </span>
                </p>
              )}
            </fieldset>

            {/* 2 */}
            <fieldset className="cx-step">
              <legend className="cx-legend">
                <span>02</span> Body metrics
              </legend>
              <div className="cx-three">
                <label className="cx-field">
                  <span className="cx-field-label">Age</span>
                  <span className="cx-field-row">
                    <input type="number" inputMode="numeric" min="16" max="85" value={age} onChange={(e) => setAge(Math.max(16, Math.min(85, Number(e.target.value) || 16)))} />
                    <em>yrs</em>
                  </span>
                </label>
                <label className="cx-field">
                  <span className="cx-field-label">Weight</span>
                  <span className="cx-field-row">
                    {unit === 'metric' ? (
                      <input type="number" inputMode="numeric" min="35" max="160" value={weightKg} onChange={(e) => setWeightKg(Math.max(35, Math.min(160, Number(e.target.value) || 35)))} />
                    ) : (
                      <input type="number" inputMode="numeric" min="77" max="350" value={weightLbs} onChange={(e) => handleWeightChangeLbs(Number(e.target.value) || 77)} />
                    )}
                    <em>{unit === 'metric' ? 'kg' : 'lbs'}</em>
                  </span>
                </label>
                {unit === 'metric' ? (
                  <label className="cx-field">
                    <span className="cx-field-label">Height</span>
                    <span className="cx-field-row">
                      <input type="number" inputMode="numeric" min="120" max="220" value={heightCm} onChange={(e) => setHeightCm(Math.max(120, Math.min(220, Number(e.target.value) || 120)))} />
                      <em>cm</em>
                    </span>
                  </label>
                ) : (
                  <div className="cx-field">
                    <span className="cx-field-label">Height</span>
                    <span className="cx-field-row">
                      <input aria-label="Height, feet" type="number" inputMode="numeric" min="4" max="7" value={heightFeet} onChange={(e) => handleHeightFeetChange(Number(e.target.value) || 4, heightInches)} className="cx-short" />
                      <em>ft</em>
                      <input aria-label="Height, inches" type="number" inputMode="numeric" min="0" max="11" value={heightInches} onChange={(e) => handleHeightFeetChange(heightFeet, Number(e.target.value) || 0)} className="cx-short" />
                      <em>in</em>
                    </span>
                  </div>
                )}
              </div>
              <label className="cx-range">
                <span className="cx-range-top">
                  <span>Quick weight</span>
                  <strong>
                    {weightKg} kg <em>· {weightLbs} lbs</em>
                  </strong>
                </span>
                <input type="range" min="40" max="140" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} style={{ '--p': `${((weightKg - 40) / 100) * 100}%` }} />
                <span className="cx-range-ends">
                  <span>40 kg</span>
                  <span>140 kg</span>
                </span>
              </label>
            </fieldset>

            {/* 3 */}
            <fieldset className="cx-step">
              <legend className="cx-legend">
                <span>03</span> Primary goal
              </legend>
              <div className="cx-goals" role="radiogroup" aria-label="Primary goal">
                {GOALS.map((g) => {
                  const Icon = g.icon;
                  return (
                    <button key={g.id} type="button" role="radio" aria-checked={goalId === g.id} className="cx-goal" data-active={goalId === g.id} onClick={() => setGoalId(g.id)}>
                      <span className="cx-choice-icon">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="cx-choice-text">
                        <strong>{g.title}</strong>
                        <small>{g.tagline}</small>
                      </span>
                      <span className="cx-tick" aria-hidden>
                        <CheckIcon className="w-3 h-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 4 */}
            <fieldset className="cx-step">
              <legend className="cx-legend">
                <span>04</span> Activity level
              </legend>
              <div className="cx-activity" role="radiogroup" aria-label="Activity level">
                {ACTIVITY_LEVELS.map((act, i) => (
                  <button key={act.id} type="button" role="radio" aria-checked={activityId === act.id} className="cx-act" data-active={activityId === act.id} onClick={() => setActivityId(act.id)}>
                    <span className="cx-bars" aria-hidden>
                      {[0, 1, 2, 3, 4].map((b) => (
                        <i key={b} data-on={b <= i} />
                      ))}
                    </span>
                    <span className="cx-act-text">
                      <strong>{act.label}</strong>
                      <small>{act.desc}</small>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* 5 */}
            <fieldset className="cx-step cx-step--last">
              <legend className="cx-legend">
                <span>05</span> Dietary style
              </legend>
              <div className="cx-seg cx-seg--wide" role="radiogroup" aria-label="Dietary style">
                {DIET_TYPES.map((dt) => (
                  <button key={dt.id} type="button" role="radio" aria-checked={dietId === dt.id} data-active={dietId === dt.id} onClick={() => setDietId(dt.id)}>
                    {dt.label}
                  </button>
                ))}
              </div>
              <p className="cx-hint">
                <SparklesIcon className="w-3.5 h-3.5" /> {DIET_TYPES.find((d) => d.id === dietId)?.note}
              </p>
            </fieldset>
          </form>

          {/* results */}
          <aside className="cx-results" aria-live="polite" data-reveal="right">
            <div className="cx-target">
              <div className="cx-target-glow" aria-hidden />
              <div className="cx-target-top">
                <span className="cx-pill">Your daily target</span>
                <button type="button" className="cx-copy" onClick={copyResults}>
                  <CopyIcon className="w-3.5 h-3.5" /> {copied ? 'Copied' : 'Copy plan'}
                </button>
              </div>
              <div className="cx-hero-num">
                <svg className="cx-ring" viewBox="0 0 120 120" aria-hidden>
                  <circle cx="60" cy="60" r="52" />
                  <circle cx="60" cy="60" r="52" className="cx-ring-fill" style={{ strokeDashoffset: `${327 - (327 * rangePct) / 100}` }} />
                </svg>
                <div className="cx-num-wrap">
                  <AnimatedNumber value={calculation.sweetSpot} className="cx-num" />
                  <span className="cx-unit">grams / day</span>
                </div>
              </div>
              <div className="cx-chips">
                <span>
                  Range <strong>{calculation.minTarget}–{calculation.maxTarget} g</strong>
                </span>
                <span className="cx-chip-accent">{calculation.perKgRatio} g / kg</span>
              </div>
              <p className="cx-why">
                <strong>Why this for {activeGoal.title.toLowerCase()}:</strong> {activeGoal.rationale}
              </p>
              <div className="cx-mini">
                <div>
                  <DropletIcon className="w-4 h-4" />
                  <strong>{calculation.waterLitres} L</strong>
                  <small>water a day</small>
                </div>
                <div>
                  <FlameIcon className="w-4 h-4" />
                  <strong>{calculation.proteinCalories.toLocaleString('en-IN')} kcal</strong>
                  <small>from protein</small>
                </div>
              </div>
            </div>

            <div className="cx-card">
              <div className="cx-card-head">
                <div>
                  <h3 className="cx-h3">Meal split</h3>
                  <p className="cx-muted">Hit the ~3 g leucine threshold every meal</p>
                </div>
                <div className="cx-seg cx-seg--sm" role="radiogroup" aria-label="Meals per day">
                  {[3, 4, 5].map((c) => (
                    <button key={c} type="button" role="radio" aria-checked={mealCount === c} data-active={mealCount === c} onClick={() => setMealCount(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="cx-split" aria-hidden>
                {Array.from({ length: mealCount }).map((_, i) => (
                  <i key={i} style={{ '--d': `${i * 60}ms` }} />
                ))}
              </div>
              <ol className="cx-meals">
                {Array.from({ length: mealCount }).map((_, i) => (
                  <li key={i}>
                    <span className="cx-meal-num">{i + 1}</span>
                    <span className="cx-meal-name">{mealNames[i] || `Meal ${i + 1}`}</span>
                    <strong>~{calculation.perMeal} g</strong>
                  </li>
                ))}
              </ol>
            </div>

            <div className="cx-reco">
              <span className="cx-pill cx-pill--light">Your match</span>
              <h3 className="cx-reco-title">
                Close the gap with {calculation.recommendedScoops} scoop{calculation.recommendedScoops > 1 ? 's' : ''} a day
              </h3>
              <p className="cx-reco-copy">The average Indian diet falls 40–50 g short. One scoop adds 24 g of clean plant protein with zero bloat, lab tested every batch.</p>
              <div className="cx-reco-product">
                <img src={recoPhoto} alt="" loading="lazy" />
                <div>
                  <strong>{activeGoal.idealFlavour}</strong>
                  <small>24 g protein · 5.5 g BCAA · digestive enzymes</small>
                  <span>From ₹1,499 / 1 kg</span>
                </div>
              </div>
              <a href="/shop" className="cx-reco-cta">
                Shop your formula <span aria-hidden>→</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ── food cheat-sheet ── */}
      <section className="cx-section band band--sage" aria-labelledby="food-title">
        <div className="cx-wrap">
          <div className="cx-head" data-reveal-stagger="0.1">
            <span className="shop-kicker cx-kicker-dark">
              <i aria-hidden />
              Indian whole-food cheat-sheet
              <i aria-hidden />
            </span>
            <h2 id="food-title" className="cx-big" data-split>
              How to hit <em>{calculation.sweetSpot} g</em> daily
            </h2>
            <p className="cx-lead">Protein per serving across everyday Indian foods, and where one scoop fits in.</p>
          </div>
          <div className="cx-foods" data-reveal-stagger="0.07">
            {[
              { name: 'The Proteinest', serve: '1 scoop (33 g)', g: 24, kcal: 118, tag: 'Easiest', featured: true },
              { name: 'Soya chunks', serve: '50 g raw', g: 26, kcal: 170, tag: 'Plant source' },
              { name: 'Low-fat paneer', serve: '100 g', g: 18, kcal: 200, tag: 'Dairy' },
              { name: 'Whole eggs', serve: '3 large', g: 18, kcal: 210, tag: 'Complete amino' },
              { name: 'Hung curd', serve: '150 g', g: 15, kcal: 130, tag: 'Gut friendly' },
              { name: 'Cooked dal', serve: '1 big katori', g: 9, kcal: 160, tag: 'High carb' },
            ].map((f) => (
              <div key={f.name} className="cx-food" data-featured={!!f.featured}>
                {f.featured && <span className="cx-food-badge">{f.tag}</span>}
                <strong className="cx-food-name">{f.name}</strong>
                <small>{f.serve}</small>
                <span className="cx-food-g">
                  {f.g}
                  <em>g</em>
                </span>
                <span className="cx-food-bar" aria-hidden>
                  <i style={{ width: `${(f.g / 26) * 100}%` }} />
                </span>
                <small className="cx-food-meta">
                  {f.kcal} kcal{!f.featured && ` · ${f.tag}`}
                </small>
              </div>
            ))}
          </div>
          <p className="cx-callout" data-reveal="up">
            <strong>Why dal alone isn&apos;t enough:</strong> reaching 24 g from dal takes about three big bowls, 450+ kcal and 60 g of carbs. One scoop gets you there in 118 kcal.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="cx-section band band--blush" aria-labelledby="calc-faq-title">
        <div className="cx-wrap cx-wrap--narrow">
          <div className="cx-head" data-reveal-stagger="0.1">
            <span className="shop-kicker cx-kicker-dark">
              <i aria-hidden />
              Evidence-based answers
              <i aria-hidden />
            </span>
            <h2 id="calc-faq-title" className="cx-big" data-split>
              Questions, <em>answered.</em>
            </h2>
          </div>
          <div className="faq-list" data-reveal-stagger="0.07">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <article key={faq.q} className="faq-item" data-open={isOpen}>
                  <button type="button" className="faq-q" onClick={() => toggleFaq(idx)} aria-expanded={isOpen} aria-controls={`cfaq-${idx}`}>
                    <span className="faq-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="faq-q-body">
                      <span className="faq-q-text">{faq.q}</span>
                    </span>
                    <span className="faq-icon" aria-hidden>
                      <i />
                      <i />
                    </span>
                  </button>
                  <div className="faq-a" id={`cfaq-${idx}`} role="region">
                    <div className="faq-a-inner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="cx-end" data-reveal="up">
            <p className="cx-muted">Ready to hit your number with the cleanest plant protein in India?</p>
            <a href="/shop" className="shop-cta cx-end-cta">
              Explore products <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
