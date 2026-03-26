import React from 'react';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

export const LanguageSwitcher = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();
  const isGerman = language === LANGUAGES.DE;
  const location = useLocation();
  const isLight = location.pathname === '/';

  return (
    <button
      onClick={toggleLanguage}
      data-testid="language-switcher"
      className={`relative flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium transition-all duration-200 ${className}`}
      aria-label={isGerman ? 'Switch to English' : 'Auf Deutsch wechseln'}
    >
      <span className={`transition-colors duration-200 ${
        isGerman
          ? (isLight ? 'text-[#1A1A1A]' : 'text-white')
          : (isLight ? 'text-[#1A1A1A]/35' : 'text-white/40')
      }`}>
        DE
      </span>
      <span className={isLight ? 'text-[#1A1A1A]/20' : 'text-white/20'}>/</span>
      <span className={`transition-colors duration-200 ${
        !isGerman
          ? (isLight ? 'text-[#1A1A1A]' : 'text-white')
          : (isLight ? 'text-[#1A1A1A]/35' : 'text-white/40')
      }`}>
        EN
      </span>
    </button>
  );
};

export default LanguageSwitcher;
