import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = {
  DE: 'de',
  EN: 'en',
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage first, default to German
    const saved = localStorage.getItem('visuworks-language');
    return saved === LANGUAGES.EN ? LANGUAGES.EN : LANGUAGES.DE;
  });

  useEffect(() => {
    localStorage.setItem('visuworks-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === LANGUAGES.DE ? LANGUAGES.EN : LANGUAGES.DE));
  };

  const t = (key, translations) => {
    if (!translations) return key;
    return translations[language] || translations[LANGUAGES.DE] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isGerman: language === LANGUAGES.DE }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
