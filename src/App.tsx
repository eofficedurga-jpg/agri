/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'motion/react';
import {
  MessageSquare,
  ClipboardList,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Sparkles,
  Phone,
  Send,
  ArrowRight,
  ShieldCheck,
  Check,
  Store,
} from 'lucide-react';

const BUSINESS_NAME = 'RythuDesk';
const FOUNDER_NAME = 'BITTA V V DURGA PRASAN';
const FOUNDER_FIRST_NAME = 'Durga';
const FOUNDER_PHOTO_LINK =
  'https://dashboard.freedomwithai.com/api/hk/site-photo/UKc7j3wM4q4m0UfSNJknu_eM.webp';
const BOOKING_LINK = 'https://cal.com/durga-eoffice-vbujrn/30min';
const CITY = 'Kakinada';
const WHO_I_HELP = 'Agri input dealers';

const THINGS_I_SET_UP = [
  'The Evening WhatsApp Reply Fix',
  'The Order Desk Fix',
];

// Inline SVG Brand Logo Mark
function LogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#141A26" />
      <path
        d="M9 23V9h6.8c2.8 0 4.8 1.9 4.8 4.4 0 1.9-1.1 3.4-2.8 4.1L23 23h-3.8l-4.5-5.2H12.5V23H9zm3.5-8.5h3.3c1 0 1.7-.7 1.7-1.6s-.7-1.6-1.7-1.6h-3.3v3.2z"
        fill="#F7F4F1"
      />
      <circle cx="23.5" cy="8.5" r="3" fill="#FF7A59" />
    </svg>
  );
}

// Brand Logo Component with Wordmark
function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      className="inline-flex items-center gap-2.5 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-lg"
    >
      <LogoMark className="w-8 h-8 transition-transform group-hover:scale-105" />
      <span
        className={`font-heading text-xl font-bold tracking-tight ${
          light ? 'text-[#F7F4F1]' : 'text-[#141A26]'
        }`}
      >
        {BUSINESS_NAME}
      </span>
    </a>
  );
}

// Animated counting number
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 500;
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeOut);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const animId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animId);
  }, [value, shouldReduceMotion]);

  return <span>{displayValue.toLocaleString('en-IN')}</span>;
}

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [founderImgFailed, setFounderImgFailed] = useState(false);
  const [activeChatTab, setActiveChatTab] = useState(0);
  const [userInteractedWithChat, setUserInteractedWithChat] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculator states
  const [farmersMonth, setFarmersMonth] = useState(400);
  const [missedShare, setMissedShare] = useState(15);
  const [averageBill, setAverageBill] = useState(4000);

  // Calculations
  const missedFarmersMonth = Math.round((farmersMonth * missedShare) / 100);
  const monthlyLoss = missedFarmersMonth * averageBill;
  const yearlyLoss = monthlyLoss * 12;

  // Auto-switch chat tabs until user clicks
  useEffect(() => {
    if (userInteractedWithChat) return;
    const timer = setInterval(() => {
      setActiveChatTab((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(timer);
  }, [userInteractedWithChat]);

  // Scroll animations for how-it-works line
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsContainerRef,
    offset: ['start center', 'end center'],
  });

  // Parallax subtle drift for photos
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  });
  const photoParallaxY = useTransform(parallaxProgress, [0, 1], [-20, 20]);

  const chatScenarios = [
    {
      title: 'The Evening WhatsApp Reply Fix',
      shopName: 'Sri Venkateswara Fertilisers, Kakinada',
      messages: [
        {
          id: 1,
          from: 'farmer',
          time: '8:42 PM',
          text: 'Namaste sir. Urea and DAP stock unda? Repu poddunne 20 bags kavali.',
        },
        {
          id: 2,
          from: 'bot',
          time: '8:42 PM',
          text: 'Namaste! Yes, we have IFFCO DAP and KRIBHCO Urea in stock. Our counter opens tomorrow at 7:00 AM. Would you like us to hold 20 bags for your morning pickup?',
        },
        {
          id: 3,
          from: 'farmer',
          time: '8:43 PM',
          text: 'Yes please keep 20 bags ready. I will come at 7:30 AM.',
        },
        {
          id: 4,
          from: 'bot',
          time: '8:43 PM',
          text: 'Confirmed. 20 bags are reserved under your phone number for 7:30 AM pickup. See you at the counter in the morning!',
        },
      ],
    },
    {
      title: 'The Order Desk Fix',
      shopName: 'Godavari Agri Inputs, Kakinada',
      messages: [
        {
          id: 1,
          from: 'farmer',
          time: '7:15 PM',
          text: 'Sir, need 5 liters Coragen and 2 bags micro-nutrients for my paddy field.',
        },
        {
          id: 2,
          from: 'bot',
          time: '7:15 PM',
          text: 'Order received: 5L Coragen (FMC) and 2 bags Paddy Micro-nutrient formula. Please reply 1 to confirm pickup at our Kakinada counter tomorrow.',
        },
        {
          id: 3,
          from: 'farmer',
          time: '7:16 PM',
          text: '1',
        },
        {
          id: 4,
          from: 'bot',
          time: '7:16 PM',
          text: 'Order RD-104 is booked. Your counter slips are printed and packed for your visit tomorrow.',
        },
      ],
    },
  ];

  const faqs = [
    {
      q: 'Who is this for?',
      a: 'Agri input dealers in Kakinada who sell fertiliser, pesticides, and seeds, and want to stop losing sales when their counter is shut.',
    },
    {
      q: 'What does it cost?',
      a: 'It depends on your business. You get a clear plan and a price on the free audit call.',
    },
    {
      q: 'What do we set up?',
      a: 'The Evening WhatsApp Reply Fix and The Order Desk Fix. We build a WhatsApp bot that answers your farmers on stock and price any time, and takes orders cleanly. We write the answers with you once, and you check them before it goes live.',
    },
    {
      q: 'How do you start?',
      a: 'Book a free audit call. We review your counter, show you where you lose farmers after hours, and give you your AI growth plan.',
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-[#F7F4F1] text-[#141A26] flex flex-col font-sans selection:bg-[#FF7A59] selection:text-[#141A26]">
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#141A26]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <BrandLogo light={true} />

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#F7F4F1]/80">
            <a
              href="#what-changes"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              What changes
            </a>
            <a
              href="#sample-builds"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Sample builds
            </a>
            <a
              href="#calculator"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Cost calculator
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              How it works
            </a>
            <a
              href="#founder"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Founder
            </a>
            <a
              href="#questions"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Questions
            </a>
          </nav>

          {/* Zone 3: Primary action pill */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF7A59] text-[#141A26] px-5 py-2 text-xs md:text-sm font-bold rounded-full whitespace-nowrap shrink-0 hover:brightness-105 active:scale-95 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59]"
            >
              Free audit call
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO ON THE DARK COLOUR */}
      <section className="relative bg-[#141A26] text-[#F7F4F1] pt-12 pb-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft highlight glow drifting slowly behind hero */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 30, -25, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 left-1/4 w-96 h-96 bg-[#FF7A59]/15 rounded-full blur-3xl pointer-events-none"
        />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#1F2737] rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Pill: For Who I help in City */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2737] border border-white/10 text-xs md:text-sm font-medium text-[#F7F4F1]">
              <Store className="w-4 h-4 text-[#FF7A59]" />
              <span>
                For {WHO_I_HELP} in {CITY}
              </span>
            </div>

            {/* Headline naming the problem */}
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance"
            >
              Your counter loses farmers who ask about stock at night.
            </motion.h1>

            {/* Plain sentence under it */}
            <p className="text-base sm:text-lg md:text-xl text-[#F7F4F1]/80 max-w-2xl leading-relaxed">
              We set up a WhatsApp bot for your fertiliser and pesticide shop that
              answers your farmers on stock and price any time, so the counter
              stops losing the farmer who asks at night.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col items-start space-y-3 w-full sm:w-auto">
              <motion.a
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FF7A59] text-[#141A26] px-8 py-4 text-base md:text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Book a free audit call</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              {/* One small line under the buttons */}
              <p className="text-xs md:text-sm text-[#F7F4F1]/70">
                Free 1:1 call. You leave with a plan to grow your counter with AI.
              </p>
            </div>
          </div>

          {/* Right Column: Phone showing WhatsApp chat */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Tabs for each thing I set up */}
            <div className="w-full max-w-sm mb-3 flex p-1 bg-[#0D121B] rounded-xl border border-white/10">
              {THINGS_I_SET_UP.map((thing, idx) => (
                <button
                  key={thing}
                  onClick={() => {
                    setActiveChatTab(idx);
                    setUserInteractedWithChat(true);
                  }}
                  className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg transition-all text-center truncate ${
                    activeChatTab === idx
                      ? 'bg-[#FF7A59] text-[#141A26] shadow-sm'
                      : 'text-[#F7F4F1]/60 hover:text-white'
                  }`}
                  title={thing}
                >
                  {idx === 0 ? 'Evening Reply' : 'Order Desk'}
                </button>
              ))}
            </div>

            {/* Smartphone Mockup */}
            <div className="w-full max-w-sm bg-[#0D121B] p-3 rounded-[36px] shadow-2xl border-4 border-[#1F2737]">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-24 h-4 bg-[#141A26] mx-auto rounded-full mb-2" />

              {/* WhatsApp Interface */}
              <div className="bg-[#0b141a] rounded-[24px] overflow-hidden text-[#e9edef] border border-[#222d34]">
                {/* Chat Top Bar */}
                <div className="bg-[#202c33] px-3.5 py-2.5 flex items-center justify-between border-b border-[#2a3942]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#00a884] text-[#111b21] flex items-center justify-center font-bold text-xs shrink-0">
                      RD
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate text-[#e9edef]">
                        {chatScenarios[activeChatTab].shopName}
                      </p>
                      <p className="text-[10px] text-[#00a884] font-medium">
                        online
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#aebac1]">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>

                {/* Chat Message Stream */}
                <div className="p-3 space-y-2.5 bg-[#0b141a] min-h-[300px] flex flex-col justify-end">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeChatTab}
                      initial={shouldReduceMotion ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2.5"
                    >
                      {chatScenarios[activeChatTab].messages.map((msg, index) => (
                        <motion.div
                          key={msg.id}
                          initial={
                            shouldReduceMotion
                              ? {}
                              : { opacity: 0, y: 10, scale: 0.98 }
                          }
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.35,
                            delay: index * 0.25,
                          }}
                          className={`flex ${
                            msg.from === 'farmer'
                              ? 'justify-start'
                              : 'justify-end'
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                              msg.from === 'farmer'
                                ? 'bg-[#202c33] text-[#e9edef] rounded-tl-sm'
                                : 'bg-[#005c4b] text-[#e9edef] rounded-tr-sm'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-[#8696a0]">
                              <span>{msg.time}</span>
                              {msg.from === 'bot' && (
                                <span className="text-[#53bdeb]">✓✓</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Chat Input Bar */}
                <div className="bg-[#202c33] px-3 py-2 flex items-center gap-2 border-t border-[#2a3942]">
                  <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-[11px] text-[#8696a0]">
                    Type a message
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#00a884] flex items-center justify-center text-[#111b21]">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Small caption under it */}
            <p className="mt-3 text-xs text-[#F7F4F1]/60 font-medium">
              Example chat
            </p>
          </div>
        </div>
      </section>

      {/* 3. MARQUEE: Two full-width rows right under hero */}
      <section className="bg-[#0D121B] border-y border-white/10 py-5 overflow-hidden select-none">
        {/* Row 1: Each thing set up, big and bold in white, heading font */}
        <div className="flex overflow-hidden py-1">
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: ['0%', '-50%'],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 24,
              ease: 'linear',
            }}
            whileHover={{ animationPlayState: 'paused' }}
            className="flex items-center gap-8 whitespace-nowrap shrink-0 pr-8"
          >
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                  The Evening WhatsApp Reply Fix
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A59] inline-block shrink-0" />
                <span className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                  The Order Desk Fix
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A59] inline-block shrink-0" />
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Row 2: For [Who I help] · [City] · Runs on your WhatsApp */}
        <div className="flex overflow-hidden pt-3 border-t border-white/5">
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: ['-50%', '0%'],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: 'linear',
            }}
            whileHover={{ animationPlayState: 'paused' }}
            className="flex items-center gap-8 whitespace-nowrap shrink-0 pr-8"
          >
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F7F4F1]/60">
                  For {WHO_I_HELP}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF7A59] inline-block shrink-0" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F7F4F1]/60">
                  {CITY}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF7A59] inline-block shrink-0" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F7F4F1]/60">
                  Runs on your WhatsApp
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF7A59] inline-block shrink-0" />
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. WHAT CHANGES FOR YOU */}
      <section
        id="what-changes"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141A26]">
            What changes for you
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#141A26]/75">
            Two concrete systems built for the day-to-day reality of your counter.
          </p>
        </div>

        {/* One card per thing set up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className="bg-white rounded-[24px] p-8 md:p-10 shadow-sm border border-[#141A26]/5 flex flex-col justify-between transition-all"
          >
            <div>
              {/* Highlight tile icon */}
              <div className="w-16 h-16 rounded-[20px] bg-[#FF7A59] flex items-center justify-center text-[#141A26] mb-6 shadow-sm">
                <MessageSquare className="w-8 h-8" />
              </div>

              {/* Card heading starting with You or Your */}
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#141A26] leading-snug mb-4">
                Your counter goes quiet at night while farmers still need answers
              </h3>

              {/* What changes for you */}
              <p className="text-base text-[#141A26]/80 leading-relaxed">
                Your WhatsApp answers your farmers right away with your current
                stock and prices. The counter stops losing the farmer who asks
                late, and you review every answer with us before we turn it live.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#141A26]/5 text-xs text-[#141A26]/60 font-medium">
              The Evening WhatsApp Reply Fix
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className="bg-white rounded-[24px] p-8 md:p-10 shadow-sm border border-[#141A26]/5 flex flex-col justify-between transition-all"
          >
            <div>
              {/* Highlight tile icon */}
              <div className="w-16 h-16 rounded-[20px] bg-[#FF7A59] flex items-center justify-center text-[#141A26] mb-6 shadow-sm">
                <ClipboardList className="w-8 h-8" />
              </div>

              {/* Card heading starting with You or Your */}
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#141A26] leading-snug mb-4">
                You track repeat orders on paper slips and scattered phone calls
              </h3>

              {/* What changes for you */}
              <p className="text-base text-[#141A26]/80 leading-relaxed">
                Your regular farmers place their seasonal fertiliser and pesticide
                orders straight into a clean order desk on your WhatsApp. Your
                counter staff sees what is booked before morning trucks arrive.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#141A26]/5 text-xs text-[#141A26]/60 font-medium">
              The Order Desk Fix
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. SAMPLE BUILDS */}
      <section
        id="sample-builds"
        ref={parallaxRef}
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16 md:space-y-24"
      >
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141A26]">
            Sample builds
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#141A26]/75">
            How our systems run inside real agricultural counters in Kakinada.
          </p>
        </div>

        {/* Row 1: work-1.jpg on left / content on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-sm border border-[#141A26]/5">
          {/* Photo container with overlapping notification badge */}
          <div className="lg:col-span-6 relative">
            <motion.div
              style={shouldReduceMotion ? {} : { y: photoParallaxY }}
              className="rounded-[20px] overflow-hidden aspect-[3/2] bg-[#141A26]/5 shadow-inner"
            >
              <img
                src="/work-1.jpg"
                alt="Store staff at agricultural input counter in Kakinada checking stock requests on phone"
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
            {/* Overlapping badge */}
            <div className="absolute -bottom-4 right-4 sm:right-6 bg-[#141A26] text-white p-3.5 rounded-2xl shadow-xl max-w-[260px] border border-white/10 text-xs">
              <p className="text-[#FF7A59] font-bold text-[10px] uppercase tracking-wider mb-1">
                Live WhatsApp Reply
              </p>
              <p className="text-white/90">
                Farmer: Urea bags in stock?
              </p>
              <p className="text-[#00a884] font-medium mt-0.5">
                Bot: Yes, 45 bags at counter.
              </p>
            </div>
          </div>

          {/* Row details */}
          <div className="lg:col-span-6 space-y-6 pt-4 lg:pt-0">
            <span className="inline-block px-3 py-1 rounded-full bg-[#141A26] text-[#F7F4F1] text-xs font-semibold">
              Sample build
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#141A26]">
              The Evening WhatsApp Reply Fix
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-heading text-sm font-bold text-[#141A26] uppercase tracking-wider text-opacity-80">
                  What you get
                </h4>
                <p className="mt-1 text-base text-[#141A26]/80 leading-relaxed">
                  A dedicated WhatsApp auto-reply system loaded with your exact
                  stock list, rates, and pack sizes. We write the answers with you
                  once, and you check them before it goes live.
                </p>
              </div>

              <div>
                <h4 className="font-heading text-sm font-bold text-[#141A26] uppercase tracking-wider text-opacity-80">
                  What changes for you
                </h4>
                <p className="mt-1 text-base text-[#141A26]/80 leading-relaxed">
                  You close your shop shutters at dusk knowing your farmers still
                  get clear answers. The counter stops losing the farmer who asks
                  late at night when you are resting with your family.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: content on left / work-2.jpg on right (alternating sides) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-sm border border-[#141A26]/5">
          {/* Row details */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1 pt-4 lg:pt-0">
            <span className="inline-block px-3 py-1 rounded-full bg-[#141A26] text-[#F7F4F1] text-xs font-semibold">
              Sample build
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#141A26]">
              The Order Desk Fix
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-heading text-sm font-bold text-[#141A26] uppercase tracking-wider text-opacity-80">
                  What you get
                </h4>
                <p className="mt-1 text-base text-[#141A26]/80 leading-relaxed">
                  A structured ordering desk inside your WhatsApp where farmers
                  pick products, specify quantities, and confirm pickup hours
                  without missed notes or confusing voice messages.
                </p>
              </div>

              <div>
                <h4 className="font-heading text-sm font-bold text-[#141A26] uppercase tracking-wider text-opacity-80">
                  What changes for you
                </h4>
                <p className="mt-1 text-base text-[#141A26]/80 leading-relaxed">
                  Your morning counter staff opens to organized, verified
                  orders. You stay ahead of peak fertilizer demand without stock
                  getting double-booked or held for farmers who never show up.
                </p>
              </div>
            </div>
          </div>

          {/* Photo container with overlapping notification badge */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <motion.div
              style={shouldReduceMotion ? {} : { y: photoParallaxY }}
              className="rounded-[20px] overflow-hidden aspect-[3/2] bg-[#141A26]/5 shadow-inner"
            >
              <img
                src="/work-2.jpg"
                alt="Agri input dealer in Kakinada reviewing confirmed WhatsApp orders on his phone"
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
            {/* Overlapping badge */}
            <div className="absolute -bottom-4 left-4 sm:left-6 bg-[#141A26] text-white p-3.5 rounded-2xl shadow-xl max-w-[260px] border border-white/10 text-xs">
              <p className="text-[#FF7A59] font-bold text-[10px] uppercase tracking-wider mb-1">
                Order Desk Notification
              </p>
              <p className="text-white/90">
                New Order: 20 DAP + 5L Coragen
              </p>
              <p className="text-[#00a884] font-medium mt-0.5">
                Status: Verified for morning pickup
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: work-3.jpg on left / content on right (alternating sides) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-sm border border-[#141A26]/5">
          {/* Photo container with overlapping notification badge */}
          <div className="lg:col-span-6 relative">
            <motion.div
              style={shouldReduceMotion ? {} : { y: photoParallaxY }}
              className="rounded-[20px] overflow-hidden aspect-[3/2] bg-[#141A26]/5 shadow-inner"
            >
              <img
                src="/work-3.jpg"
                alt="Smiling farmer in Kakinada leaving shop with phone in hand"
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
            {/* Overlapping badge */}
            <div className="absolute -bottom-4 right-4 sm:right-6 bg-[#141A26] text-white p-3.5 rounded-2xl shadow-xl max-w-[260px] border border-white/10 text-xs">
              <p className="text-[#FF7A59] font-bold text-[10px] uppercase tracking-wider mb-1">
                Counter Dispatch
              </p>
              <p className="text-white/90">
                Bags handed over at counter
              </p>
              <p className="text-[#00a884] font-medium mt-0.5">
                Farmer returned home satisfied
              </p>
            </div>
          </div>

          {/* Row details */}
          <div className="lg:col-span-6 space-y-6 pt-4 lg:pt-0">
            <span className="inline-block px-3 py-1 rounded-full bg-[#141A26] text-[#F7F4F1] text-xs font-semibold">
              Sample build
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#141A26]">
              The Farmer Advance Booking Flow
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-heading text-sm font-bold text-[#141A26] uppercase tracking-wider text-opacity-80">
                  What you get
                </h4>
                <p className="mt-1 text-base text-[#141A26]/80 leading-relaxed">
                  Instant pickup notifications sent to your farmer as soon as
                  your counter packs their order, with clear counter timing and
                  invoice details.
                </p>
              </div>

              <div>
                <h4 className="font-heading text-sm font-bold text-[#141A26] uppercase tracking-wider text-opacity-80">
                  What changes for you
                </h4>
                <p className="mt-1 text-base text-[#141A26]/80 leading-relaxed">
                  Your shop entrance stays orderly during peak hours. Farmers
                  pick up their bags quickly and return to your shop every season
                  because your service is dependable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROOF: CALCULATOR (Case studies empty) */}
      <section
        id="calculator"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#141A26]/5"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141A26]">
              What missed farmer orders cost you
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#141A26]/75">
              Slide the numbers to match your counter. See how much sales slip
              away when farmers ask after hours.
            </p>
          </div>

          <div className="bg-[#F7F4F1] rounded-[24px] p-6 sm:p-10 border border-[#141A26]/10 shadow-sm">
            <p className="text-xs uppercase tracking-widest font-bold text-[#141A26]/60 mb-6">
              Your numbers
            </p>

            {/* Sliders */}
            <div className="space-y-8">
              {/* Slider 1: Farmers a month */}
              <div>
                <div className="flex justify-between items-center text-sm md:text-base font-semibold mb-2 text-[#141A26]">
                  <span>Farmers asking about stock each month</span>
                  <span className="font-heading font-bold text-lg text-[#141A26]">
                    {farmersMonth} farmers
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={farmersMonth}
                  onChange={(e) => setFarmersMonth(Number(e.target.value))}
                  className="w-full h-2 bg-[#141A26]/15 rounded-lg cursor-pointer"
                  aria-label="Farmers asking about stock each month"
                />
                <div className="flex justify-between text-[11px] text-[#141A26]/50 mt-1">
                  <span>100</span>
                  <span>1,500</span>
                </div>
              </div>

              {/* Slider 2: Share who ask after hours and walk away */}
              <div>
                <div className="flex justify-between items-center text-sm md:text-base font-semibold mb-2 text-[#141A26]">
                  <span>Share who walk away when the counter is shut</span>
                  <span className="font-heading font-bold text-lg text-[#141A26]">
                    {missedShare}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={missedShare}
                  onChange={(e) => setMissedShare(Number(e.target.value))}
                  className="w-full h-2 bg-[#141A26]/15 rounded-lg cursor-pointer"
                  aria-label="Share who walk away when the counter is shut"
                />
                <div className="flex justify-between text-[11px] text-[#141A26]/50 mt-1">
                  <span>5%</span>
                  <span>40%</span>
                </div>
              </div>

              {/* Slider 3: Average bill */}
              <div>
                <div className="flex justify-between items-center text-sm md:text-base font-semibold mb-2 text-[#141A26]">
                  <span>Average bill per farmer</span>
                  <span className="font-heading font-bold text-lg text-[#141A26]">
                    ₹{averageBill.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={averageBill}
                  onChange={(e) => setAverageBill(Number(e.target.value))}
                  className="w-full h-2 bg-[#141A26]/15 rounded-lg cursor-pointer"
                  aria-label="Average bill per farmer"
                />
                <div className="flex justify-between text-[11px] text-[#141A26]/50 mt-1">
                  <span>₹1,000</span>
                  <span>₹20,000</span>
                </div>
              </div>
            </div>

            {/* Big Numbers Display */}
            <div className="mt-10 pt-8 border-t border-[#141A26]/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="bg-white rounded-2xl p-6 border border-[#141A26]/5">
                <p className="text-xs uppercase tracking-wider text-[#141A26]/60 font-bold mb-1">
                  Estimated money lost a month
                </p>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-[#141A26]">
                  ₹<AnimatedNumber value={monthlyLoss} />
                </div>
                <p className="text-xs text-[#141A26]/60 mt-1">
                  from {missedFarmersMonth} missed farmer orders
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#141A26]/5">
                <p className="text-xs uppercase tracking-wider text-[#141A26]/60 font-bold mb-1">
                  Estimated money lost a year
                </p>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-[#141A26]">
                  ₹<AnimatedNumber value={yearlyLoss} />
                </div>
                <p className="text-xs text-[#141A26]/60 mt-1">
                  accumulated over twelve months
                </p>
              </div>
            </div>

            {/* Disclaimer & CTA */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-xs sm:text-sm text-[#141A26]/70">
                Your estimate. We go through it on the free audit call.
              </p>
              <div>
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF7A59] text-[#141A26] px-8 py-3.5 text-sm md:text-base font-bold rounded-full shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141A26]"
                >
                  <span>Book a free audit call</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS: Three steps joined by a highlight line */}
      <section
        id="how-it-works"
        ref={stepsContainerRef}
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141A26]">
            How it works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#141A26]/75">
            Three simple steps to set up your evening WhatsApp bot.
          </p>
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Highlight line joining steps */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-[#141A26]/10 -translate-y-1/2 z-0">
            <motion.div
              style={
                shouldReduceMotion
                  ? { width: '100%' }
                  : { scaleX: stepsProgress }
              }
              className="h-full bg-[#FF7A59] origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="bg-white rounded-[24px] p-8 border border-[#141A26]/5 shadow-sm text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF7A59] text-[#141A26] flex items-center justify-center font-heading font-bold text-xl mb-6 shadow-sm">
                1
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#141A26] mb-3">
                Book your free audit call
              </h3>
              <p className="text-sm text-[#141A26]/80 leading-relaxed">
                Pick a 30-minute slot on our calendar. We review your current
                counter routine and farmer inquiries.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="bg-white rounded-[24px] p-8 border border-[#141A26]/5 shadow-sm text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF7A59] text-[#141A26] flex items-center justify-center font-heading font-bold text-xl mb-6 shadow-sm">
                2
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#141A26] mb-3">
                Get your plan
              </h3>
              <p className="text-sm text-[#141A26]/80 leading-relaxed">
                We show you where you lose farmers after hours and map the exact
                stock answers your counter needs.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="bg-white rounded-[24px] p-8 border border-[#141A26]/5 shadow-sm text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF7A59] text-[#141A26] flex items-center justify-center font-heading font-bold text-xl mb-6 shadow-sm">
                3
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#141A26] mb-3">
                We set it up on your WhatsApp
              </h3>
              <p className="text-sm text-[#141A26]/80 leading-relaxed">
                We write the answers with you once, you check them before it
                goes live, and your bot starts answering farmers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. FOUNDER */}
      <section
        id="founder"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#141A26]/5"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* 4:5 frame with rounded corners */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-[280px] aspect-[4/5] rounded-[24px] overflow-hidden bg-[#141A26] shadow-md border-4 border-[#F7F4F1] relative">
                {!founderImgFailed ? (
                  <img
                    src="https://dashboard.freedomwithai.com/api/hk/site-photo/UKc7j3wM4q4m0UfSNJknu_eM.webp"
                    alt="BITTA V V DURGA PRASAN, Founder of RythuDesk"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                    onError={() => setFounderImgFailed(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#141A26]">
                    <LogoMark className="w-16 h-16 mb-3" />
                    <span className="font-heading text-white font-bold text-lg">
                      {BUSINESS_NAME}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Founder details */}
            <div className="md:col-span-7 space-y-5 text-center md:text-left">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#141A26]">
                  {FOUNDER_NAME}
                </h3>
                <p className="text-sm font-semibold text-[#141A26]/70 mt-1">
                  Founder, {BUSINESS_NAME}
                </p>
              </div>

              {/* About me (one plain line about who we help) */}
              <p className="text-base text-[#141A26]/80 leading-relaxed">
                We help agri input dealers in Kakinada protect their counter sales
                and answer farmers on stock and price any time with AI on
                WhatsApp.
              </p>

              <div>
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF7A59] text-[#141A26] px-7 py-3.5 text-sm md:text-base font-bold rounded-full shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141A26]"
                >
                  <span>Book a free call with {FOUNDER_FIRST_NAME}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREE AUDIT CALL, ON THE DARK COLOUR */}
      <section className="bg-[#141A26] text-[#F7F4F1] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-[#0D121B] rounded-[24px] p-8 sm:p-12 border border-white/10 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Get your AI growth plan in a free 1:1 call
            </h2>

            {/* The three things you leave with */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="bg-[#141A26] p-5 rounded-2xl border border-white/5 flex flex-col space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#FF7A59] text-[#141A26] flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <h3 className="font-heading text-sm font-bold text-white">
                  Where you lose customers today
                </h3>
                <p className="text-xs text-[#F7F4F1]/70 leading-relaxed">
                  We look at your evening query gaps and see how many farmer sales
                  leave your shop after dark.
                </p>
              </div>

              <div className="bg-[#141A26] p-5 rounded-2xl border border-white/5 flex flex-col space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#FF7A59] text-[#141A26] flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <h3 className="font-heading text-sm font-bold text-white">
                  What to automate first
                </h3>
                <p className="text-xs text-[#F7F4F1]/70 leading-relaxed">
                  We identify your top 10 seasonal stock questions so your bot
                  answers accurately from day one.
                </p>
              </div>

              <div className="bg-[#141A26] p-5 rounded-2xl border border-white/5 flex flex-col space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#FF7A59] text-[#141A26] flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <h3 className="font-heading text-sm font-bold text-white">
                  A clear price for your business
                </h3>
                <p className="text-xs text-[#F7F4F1]/70 leading-relaxed">
                  You receive a simple, transparent quote tailored to your
                  counter with no unexpected surprises.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <motion.a
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#FF7A59] text-[#141A26] px-8 py-4 text-base md:text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Book a free audit call</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. QUESTIONS: Four that open and close */}
      <section
        id="questions"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full"
      >
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141A26]">
            Questions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#141A26]/75">
            Clear answers about what we set up and how it works for your counter.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-[24px] border border-[#141A26]/10 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-heading text-lg sm:text-xl font-bold text-[#141A26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59]"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#F7F4F1] flex items-center justify-center text-[#141A26] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#FF7A59]' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 sm:px-7 pb-6 text-base text-[#141A26]/80 leading-relaxed border-t border-[#141A26]/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. CLOSING: place.jpg under a dark colour layer */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden bg-[#141A26]">
        {/* Background photo under dark colour layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/place.jpg"
            alt="Inside an agricultural supply and pesticide dealership in Kakinada"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark color overlay layer */}
          <div className="absolute inset-0 bg-[#141A26]/90 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
            Stop losing the farmer who asks at night.
          </h2>
          <p className="text-base sm:text-lg text-[#F7F4F1]/80 max-w-xl mx-auto">
            Book your 30-minute audit call today. We write your answers together
            and set up your WhatsApp counter bot.
          </p>
          <div className="pt-2">
            <motion.a
              whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FF7A59] text-[#141A26] px-8 py-4 text-base md:text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Book a free audit call</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D121B] text-[#F7F4F1] border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 pb-24 md:pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <BrandLogo light={true} />

          {/* City */}
          <div className="text-xs sm:text-sm text-[#F7F4F1]/60">
            Based in {CITY}, Andhra Pradesh
          </div>

          {/* Copyright notice */}
          <div className="text-xs text-[#F7F4F1]/40">
            © 2026 {BUSINESS_NAME}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM BAR FOR PHONES (under 15% viewport height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141A26]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-left leading-tight min-w-0">
          <p className="font-heading font-bold text-xs text-white truncate">
            {BUSINESS_NAME}
          </p>
          <p className="text-[10px] text-[#F7F4F1]/60 truncate">
            {CITY} Agri Counter Fix
          </p>
        </div>
        <a
          href={BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FF7A59] text-[#141A26] px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap shrink-0 hover:brightness-105 active:scale-95 transition-all shadow-md focus-visible:outline-none"
        >
          Book a free audit call
        </a>
      </div>
    </div>
  );
}
