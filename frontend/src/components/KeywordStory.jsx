import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const KEYWORDS_DEFAULT = [
  'DESIGN',
  'VEREDLUNG',
  'PRÄSENZ',
  'ARCHITEKTUR',
  'MATERIAL',
  'PRÄZISION',
];

function WordItem({ word, index, scrollProgress }) {
  const distance = useTransform(scrollProgress, (p) => index - p);

  const y = useTransform(distance, (d) => d * 130);
  const opacity = useTransform(distance, (d) => {
    const abs = Math.abs(d);
    if (abs < 0.35) return 1;
    if (abs > 2.2) return 0;
    return 1 - ((abs - 0.35) / 1.85);
  });
  const scale = useTransform(distance, (d) => {
    const abs = Math.abs(d);
    return Math.max(0.8, 1 - abs * 0.07);
  });
  const blur = useTransform(distance, (d) => {
    const abs = Math.abs(d);
    if (abs < 0.4) return 'blur(0px)';
    const px = Math.min((abs - 0.4) * 6, 14);
    return `blur(${px}px)`;
  });
  const color = useTransform(distance, (d) => {
    const abs = Math.abs(d);
    if (abs < 0.35) return '#1A1A1A';
    const t = Math.min((abs - 0.35) / 2, 1);
    const v = Math.round(26 + t * 170);
    return `rgb(${v},${v},${v})`;
  });

  return (
    <motion.div
      className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
      style={{ y, opacity, scale, filter: blur, willChange: 'transform, opacity, filter' }}
    >
      <motion.span
        className="text-[clamp(2.5rem,8vw,7.5rem)] font-bold tracking-[-0.04em] leading-none whitespace-nowrap"
        style={{ color }}
      >
        {word}
      </motion.span>
    </motion.div>
  );
}

export function KeywordStory({ keywords = KEYWORDS_DEFAULT }) {
  const sectionRef = useRef(null);
  const total = keywords.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  /* Map scroll 0→1 to keyword index 0→last */
  const progress = useTransform(scrollYProgress, [0, 1], [0, total - 1]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      data-testid="keyword-story"
      className="relative"
      style={{ height: `${total * 70}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Edge fades */}
        <div className="absolute inset-x-0 top-0 h-44 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #F5F2ED, transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-44 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #F5F2ED, transparent)' }} />

        {/* Words */}
        <div className="relative w-full h-full flex items-center justify-center">
          {keywords.map((word, i) => (
            <WordItem key={word} word={word} index={i} scrollProgress={progress} />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2">
          <div className="w-px h-[120px] relative" style={{ background: 'rgba(0,0,0,0.06)' }}>
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{ background: 'rgba(0,0,0,0.22)', scaleY: barScale, height: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeywordStory;
