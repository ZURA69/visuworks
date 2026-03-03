import React from 'react';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageSwitcher = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();
  const isGerman = language === LANGUAGES.DE;

  return (
    <button
      onClick={toggleLanguage}
      data-testid="language-switcher"
      className={`relative flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-white/[0.06] ${className}`}
      aria-label={isGerman ? 'Switch to English' : 'Auf Deutsch wechseln'}
    >
      <span className={`transition-colors duration-200 ${isGerman ? 'text-white' : 'text-white/40'}`}>
        DE
      </span>
      <span className="text-white/20">/</span>
      <span className={`transition-colors duration-200 ${!isGerman ? 'text-white' : 'text-white/40'}`}>
        EN
      </span>
      
      {/* Active indicator */}
      <motion.div
        layoutId="lang-indicator"
        className="absolute bottom-0.5 h-0.5 bg-indigo-400/60 rounded-full"
        initial={false}
        animate={{
          left: isGerman ? '8px' : '28px',
          width: isGerman ? '16px' : '14px',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
};

export default LanguageSwitcher;
