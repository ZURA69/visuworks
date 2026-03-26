import React from 'react';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';

export const LanguageSwitcher = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();
  const isGerman = language === LANGUAGES.DE;

  return (
    <button
      onClick={toggleLanguage}
      data-testid="language-switcher"
      className={`relative flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium transition-all duration-200 ${className}`}
      aria-label={isGerman ? 'Switch to English' : 'Auf Deutsch wechseln'}
    >
      <span className={`transition-colors duration-200 ${
        isGerman ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/35'
      }`}>
        DE
      </span>
      <span className="text-[#1A1A1A]/20">/</span>
      <span className={`transition-colors duration-200 ${
        !isGerman ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/35'
      }`}>
        EN
      </span>
    </button>
  );
};

export default LanguageSwitcher;
