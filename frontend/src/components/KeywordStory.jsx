import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const KEYWORDS_DEFAULT = [
  'DESIGN',
  'VEREDLUNG',
  'PRÄSENZ',
  'ARCHITEKTUR',
  'MATERIAL',
  'PRÄZISION',
];

const C = {
  bg: '#F5F2ED',
  text: '#1A1A1A',
  muted: '#6B6B6B',
  light: '#9A9A9A',
  border: 'rgba(0,0,0,0.07)',
};

function WordItem({ word, index, scrollProgress }) {
  const distance = useTransform(scrollProgress, (p) => index - p);

  /* y offset from center; distance * spacing px */
  const y = useTransform(distance, (d) => d * 90);
  const opacity = useTransform(distance, (d) => {
    const abs = Math.abs(d);
    if (abs < 0.3) return 1;
    if (abs > 1.6) return 0;
    return 1 - (abs - 0.3) / 1.3;
  });
  const scale = useTransform(distance, (d) => {
    const abs = Math.abs(d);
    return Math.max(0.85, 1 - abs * 0.05);
  });
  const blur = useTransform(distance, (d) => {
    const abs = Math.abs(d);
    if (abs < 0.3) return 'blur(0px)';
    const px = Math.min((abs - 0.3) * 10, 14);
    return `blur(${px}px)`;
  });
  const color = useTransform(distance, (d) => {
    const abs = Math.abs(d);
    if (abs < 0.3) return C.text;
    const t = Math.min((abs - 0.3) / 1.3, 1);
    const v = Math.round(26 + t * 190);
    return `rgb(${v},${v},${v})`;
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        y, opacity, scale, filter: blur,
        willChange: 'transform, opacity, filter',
      }}
      className="pointer-events-none select-none"
    >
      <motion.span
        style={{
          fontSize: 'clamp(3rem, 10vw, 9rem)',
          fontWeight: 700,
          letterSpacing: '-0.045em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          color,
        }}
      >
        {word}
      </motion.span>
    </motion.div>
  );
}

export function KeywordStory({
  keywords = KEYWORDS_DEFAULT,
  subline = 'Visuelle Identität auf Fahrzeugen, in Räumen und auf Oberflächen.',
  ctaLabel = 'Projekt anfragen',
  ctaHref = '/kontakt',
  secondaryLabel = 'Arbeiten ansehen',
  secondaryHref = '/projekte',
}) {
  const sectionRef = useRef(null);
  const total = keywords.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [-0.2, total - 0.8]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bottomOpacity = useTransform(scrollYProgress, [0, 0.06, 0.88, 1], [0.7, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      data-testid="keyword-hero"
      className="relative"
      style={{ height: `${total * 45}vh`, paddingTop: 0, paddingBottom: 0 }}
    >
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh' }}
      >
          {/* Top edge fade */}
          <div
            className="absolute inset-x-0 top-0 h-28 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${C.bg}, transparent)` }}
          />
          {/* Bottom edge fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-28 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${C.bg}, transparent)` }}
          />

          {/* Keywords — anchor at 35% viewport height */}
          <div style={{ position: 'absolute', top: '35%', left: 0, right: 0, height: 0 }}>
            {keywords.map((word, i) => (
              <WordItem key={word} word={word} index={i} scrollProgress={progress} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="absolute bottom-8 md:bottom-12 inset-x-0 z-20 flex flex-col items-center gap-5 px-6 text-center"
            style={{ opacity: bottomOpacity }}
          >
            <p
              className="text-[13px] md:text-[15px] max-w-sm leading-relaxed tracking-wide"
              style={{ color: C.muted }}
            >
              {subline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to={ctaHref}>
                <button
                  data-testid="hero-cta-primary"
                  className="inline-flex items-center gap-2 px-7 py-3 text-[13px] font-medium rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: C.text, color: '#fff' }}
                >
                  {ctaLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <Link to={secondaryHref}>
                <button
                  data-testid="hero-cta-secondary"
                  className="inline-flex items-center gap-2 px-7 py-3 text-[13px] font-medium rounded-full transition-all duration-300 hover:bg-black/[0.04]"
                  style={{ border: `1.5px solid ${C.border}`, color: C.text }}
                >
                  {secondaryLabel}
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute right-5 md:right-12 top-1/2 -translate-y-1/2 z-20">
            <div className="w-px h-[90px] relative" style={{ background: 'rgba(0,0,0,0.06)' }}>
              <motion.div
                className="absolute top-0 left-0 w-full origin-top"
                style={{ background: 'rgba(0,0,0,0.18)', scaleY: barScale, height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>
  );
}

export default KeywordStory;
