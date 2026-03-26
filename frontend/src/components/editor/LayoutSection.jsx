import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEditor } from '../../contexts/EditorContext';

/* ── Padding maps ── */
const ptMap = {
  none: 'pt-0',
  small: 'pt-8 md:pt-12',
  medium: 'pt-16 md:pt-24',
  large: 'pt-24 md:pt-36',
  xl: 'pt-32 md:pt-48',
};
const pbMap = {
  none: 'pb-0',
  small: 'pb-8 md:pb-12',
  medium: 'pb-16 md:pb-24',
  large: 'pb-24 md:pb-36',
  xl: 'pb-32 md:pb-48',
};

/* ── Content width map ── */
const WIDTH_MAP = {
  narrow: 'max-w-[900px]',
  normal: 'max-w-[1400px]',
  wide: 'max-w-[1600px]',
};

/* ── Style preset map ── */
const PRESET_STYLES = {
  default: {},
  card: { background: '#FFFFFF', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  accent: { background: '#1A1A1A', color: '#FFFFFF' },
  muted: { background: '#EFECE6' },
  highlight: { border: '1px solid rgba(0,0,0,0.07)' },
};

/* ── Animation variants ── */
const ANIMATION_VARIANTS = {
  none: { initial: {}, whileInView: {}, transition: {} },
  'fade-up': { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  'fade-in': { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  'slide-left': { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  'slide-right': { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Device visibility map ── */
const DEVICE_CLASS = {
  all: '',
  desktop: 'hidden md:block',
  mobile: 'md:hidden',
};

export { WIDTH_MAP, PRESET_STYLES, ANIMATION_VARIANTS };

export function LayoutSection({ id, children, className = '', style = {} }) {
  const { getSectionSettings, isActive } = useEditor();
  const settings = getSectionSettings?.(id) || {};

  // Visibility: hidden for public, dimmed for editor
  if (!settings.visible && !isActive) return null;

  const pt = ptMap[settings.paddingTop || 'medium'] || ptMap.medium;
  const pb = pbMap[settings.paddingBottom || 'medium'] || pbMap.medium;
  const deviceClass = DEVICE_CLASS[settings.deviceVisibility || 'all'] || '';
  const alignClass = settings.alignment === 'center' ? 'text-center' : 'text-left';
  const presetStyle = PRESET_STYLES[settings.preset || 'default'] || {};
  const isHidden = settings.visible === false;
  const isAccent = settings.preset === 'accent';

  const animConfig = ANIMATION_VARIANTS[settings.animation || 'fade-up'] || ANIMATION_VARIANTS['fade-up'];
  const hasAnimation = settings.animation !== 'none';
  const cta = settings.cta || {};

  const mergedStyle = { ...presetStyle, ...style };
  const presetClass = settings.preset === 'card' ? 'mx-4 md:mx-8 lg:mx-12 my-4' : '';

  const Wrapper = hasAnimation ? motion.section : 'section';
  const wrapperProps = hasAnimation ? {
    initial: animConfig.initial,
    whileInView: animConfig.whileInView,
    viewport: { once: true, margin: '-60px' },
    transition: animConfig.transition,
  } : {};

  return (
    <Wrapper
      data-layout-section={id}
      data-testid={`layout-section-${id}`}
      className={`relative ${pt} ${pb} ${deviceClass} ${alignClass} ${presetClass} ${className} ${isHidden && isActive ? 'opacity-30' : ''}`}
      style={mergedStyle}
      {...wrapperProps}
    >
      {isActive && isHidden && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">Ausgeblendet</span>
        </div>
      )}
      {children}
      {cta.enabled && cta.label && (
        <div className={`mt-10 ${settings.alignment === 'center' ? 'flex justify-center' : ''}`}>
          <LayoutContainer id={id}>
            <Link to={cta.href || '/kontakt'}>
              <button
                data-testid={`layout-cta-${id}`}
                className={`inline-flex items-center gap-2 px-7 py-3 text-[13px] font-medium tracking-[0.02em] uppercase transition-all duration-300 ${
                  isAccent
                    ? 'bg-white text-[#1A1A1A] hover:bg-white/90'
                    : 'bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/90'
                }`}
              >
                {cta.label}
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </LayoutContainer>
        </div>
      )}
    </Wrapper>
  );
}

export function LayoutContainer({ id, children, className = '' }) {
  const { getSectionSettings } = useEditor();
  const settings = getSectionSettings?.(id) || {};
  const widthClass = WIDTH_MAP[settings.contentWidth || 'normal'] || WIDTH_MAP.normal;

  return (
    <div className={`${widthClass} mx-auto px-6 md:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
