import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';
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

/* ────────────────────────────────────────
   WordItem: visual state from distance
   ──────────────────────────────────────── */
function WordItem({ word, distance }) {
  const a = Math.abs(distance);

  const y = distance * 100;
  const opacity = a < 0.4 ? 1 : a > 1.5 ? 0 : 1 - (a - 0.4) / 1.1;
  const scale = a < 0.3 ? 1 : Math.max(0.82, 1 - (a - 0.3) * 0.08);
  const blurPx = a < 0.35 ? 0 : Math.min((a - 0.35) * 12, 16);
  const colorV = a < 0.35 ? 26 : Math.round(26 + Math.min((a - 0.35) / 1.15, 1) * 200);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        filter: `blur(${blurPx}px)`,
        willChange: 'transform, opacity, filter',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontSize: 'clamp(3rem, 10vw, 9rem)',
          fontWeight: 700,
          letterSpacing: '-0.045em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          color: `rgb(${colorV},${colorV},${colorV})`,
        }}
      >
        {word}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   KeywordStory — Pinned Scroll Storytelling Hero
   ══════════════════════════════════════════════════════
   Approach: position:fixed overlay while the section
   is in view. This avoids position:sticky issues caused
   by ancestor overflow:hidden.

   Math:
   ─ Section height = N * 100vh (scroll runway)
   ─ When section top <= 0 && section bottom >= viewport:
     overlay is visible (fixed to viewport)
   ─ progress = scrolled / (sectionHeight - viewportHeight)
   ─ progress [0→1] maps to keyword index [0→N-1]
   ══════════════════════════════════════════════════════ */
export function KeywordStory({
  keywords = KEYWORDS_DEFAULT,
  subline = 'Visuelle Identität auf Fahrzeugen, in Räumen und auf Oberflächen.',
  ctaLabel = 'Projekt anfragen',
  ctaHref = '/kontakt',
  secondaryLabel = 'Arbeiten ansehen',
  secondaryHref = '/projekte',
}) {
  const sectionRef = useRef(null);
  const N = keywords.length;
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);

  /* Scroll handler: compute progress from section position */
  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollable = el.offsetHeight - vh;

    /* Section top relative to viewport: 0 = at top, negative = scrolled past */
    const scrolled = -rect.top;

    if (scrolled < 0) {
      /* Section hasn't reached top yet — show first keyword */
      setIsActive(true);
      setProgress(0);
    } else if (scrolled > scrollable) {
      /* Section has scrolled past — hide overlay */
      setIsActive(false);
    } else {
      /* Within the pinned zone */
      setIsActive(true);
      setProgress((scrolled / scrollable) * (N - 1));
    }
  }, [N]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); /* Initial calc */
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  /* Bar fill: 0→1 across the scroll range */
  const barFill = Math.min(1, Math.max(0, progress / (N - 1)));
  const bottomOpacity = isActive ? (barFill > 0.92 ? 0.4 : 1) : 0;

  return (
    <>
      {/* ── Scroll runway ── */}
      <section
        ref={sectionRef}
        data-testid="keyword-hero"
        className="relative"
        style={{
          height: `${N * 100}vh`,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      />

      {/* ── Fixed overlay (visible while section is in range) ── */}
      {isActive && (
        <div
          data-testid="keyword-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
            background: C.bg,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {/* Top edge fade */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '7rem',
              background: `linear-gradient(to bottom, ${C.bg}, transparent)`,
              zIndex: 10,
            }}
          />
          {/* Bottom edge fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '7rem',
              background: `linear-gradient(to top, ${C.bg}, transparent)`,
              zIndex: 10,
            }}
          />

          {/* Keywords — anchor at ~38% from top */}
          <div
            style={{
              position: 'absolute',
              top: '38%',
              left: 0,
              right: 0,
              height: 0,
            }}
          >
            {keywords.map((word, i) => (
              <WordItem
                key={word}
                word={word}
                distance={i - progress}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '0 1.5rem',
              textAlign: 'center',
              zIndex: 20,
              opacity: bottomOpacity,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'auto',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                maxWidth: '24rem',
                lineHeight: 1.6,
                letterSpacing: '0.025em',
                color: C.muted,
                margin: 0,
              }}
            >
              {subline}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <Link to={ctaHref}>
                <button
                  data-testid="hero-cta-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.75rem',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    background: C.text,
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {ctaLabel}
                  <ArrowRight style={{ width: '14px', height: '14px' }} />
                </button>
              </Link>
              <Link to={secondaryHref}>
                <button
                  data-testid="hero-cta-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.75rem',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    background: 'transparent',
                    border: `1.5px solid ${C.border}`,
                    color: C.text,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {secondaryLabel}
                </button>
              </Link>
            </div>
          </div>

          {/* Progress bar (right edge) */}
          <div
            style={{
              position: 'absolute',
              right: 'clamp(1.25rem, 3vw, 3rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: '1px',
                height: '100px',
                position: 'relative',
                background: 'rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.2)',
                  transformOrigin: 'top',
                  transform: `scaleY(${barFill})`,
                }}
              />
            </div>
          </div>

          {/* Keyword counter */}
          <div
            style={{
              position: 'absolute',
              right: 'clamp(1.25rem, 3vw, 3rem)',
              bottom: '2rem',
              zIndex: 20,
              fontSize: '11px',
              letterSpacing: '0.1em',
              pointerEvents: 'none',
            }}
          >
            <span style={{ color: C.light, fontWeight: 500 }}>
              {Math.min(N, Math.round(progress) + 1)}
            </span>
            <span style={{ color: 'rgba(0,0,0,0.15)' }}>
              {' '}/ {N}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default KeywordStory;
