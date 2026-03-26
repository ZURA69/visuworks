import React from 'react';
import { useEditor } from '../../contexts/EditorContext';

/* ── Padding map ── */
const PADDING_MAP = {
  none: '',
  small: 'py-8 md:py-12',
  medium: 'py-16 md:py-24',
  large: 'py-24 md:py-36',
  xl: 'py-32 md:py-48',
};

/* ── Content width map ── */
const WIDTH_MAP = {
  narrow: 'max-w-[900px]',
  normal: 'max-w-[1400px]',
  wide: 'max-w-[1600px]',
};

export { PADDING_MAP, WIDTH_MAP };

export function LayoutSection({ id, children, className = '', style = {} }) {
  const { getSectionSettings, isActive } = useEditor();
  const settings = getSectionSettings?.(id) || {};

  if (!settings.visible && settings.visible !== undefined && !isActive) {
    return null;
  }

  const paddingClass = PADDING_MAP[settings.paddingTop] !== undefined
    ? '' // We'll use individual top/bottom
    : '';

  const ptClass = PADDING_MAP[settings.paddingTop || 'medium'] || '';
  const pbClass = PADDING_MAP[settings.paddingBottom || 'medium'] || '';

  // Extract individual top/bottom from the padding map
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

  const pt = ptMap[settings.paddingTop || 'medium'] || ptMap.medium;
  const pb = pbMap[settings.paddingBottom || 'medium'] || pbMap.medium;

  const isHidden = settings.visible === false;

  return (
    <section
      data-layout-section={id}
      className={`relative ${pt} ${pb} ${className} ${isHidden && isActive ? 'opacity-30' : ''}`}
      style={style}
    >
      {isActive && isHidden && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">Ausgeblendet</span>
        </div>
      )}
      {children}
    </section>
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
