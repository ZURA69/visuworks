import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { Button } from './ui/button';

const COOKIE_CONSENT_KEY = 'visuworks_cookie_consent';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (acceptAll = false) => {
    const consentData = {
      necessary: true,
      analytics: acceptAll ? true : preferences.analytics,
      marketing: acceptAll ? true : preferences.marketing,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setIsVisible(false);
    if (consentData.analytics) {
      window.dispatchEvent(new CustomEvent('cookieConsent', { detail: consentData }));
    }
  };

  const handleAcceptAll = () => saveConsent(true);
  const handleAcceptSelected = () => saveConsent(false);
  const handleRejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    saveConsent(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        data-testid="cookie-banner"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="relative bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="relative p-6 md:p-8">
              {!showSettings ? (
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1 flex items-start gap-4">
                    <div className="hidden sm:flex w-12 h-12 border border-black/[0.08] items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-[#6B6B6B]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-[#1A1A1A]">Cookie-Einstellungen</h3>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
                        Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                        Einige Cookies sind notwendig, während andere uns helfen, die Website zu verbessern und 
                        Ihnen personalisierte Inhalte anzuzeigen.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                      className="order-3 sm:order-1"
                      data-testid="cookie-settings-button"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Einstellungen
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleRejectAll}
                      className="order-2"
                      data-testid="cookie-reject-button"
                    >
                      Nur notwendige
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      className="order-1 sm:order-3"
                      data-testid="cookie-accept-button"
                    >
                      Alle akzeptieren
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-[#1A1A1A]">Cookie-Einstellungen</h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 text-[#9A9A9A] hover:text-[#1A1A1A] transition-colors"
                      aria-label="Schließen"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start justify-between p-4 bg-black/[0.02] border border-black/[0.07]">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[#1A1A1A]">Notwendige Cookies</h4>
                          <span className="px-2 py-0.5 text-xs bg-green-50 text-green-700 border border-green-200">Erforderlich</span>
                        </div>
                        <p className="text-sm text-[#6B6B6B]">
                          Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                        </p>
                      </div>
                      <div className="w-12 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-end px-1 cursor-not-allowed">
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#1A1A1A]" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start justify-between p-4 bg-black/[0.02] border border-black/[0.07]">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-[#1A1A1A] mb-1">Analyse-Cookies</h4>
                        <p className="text-sm text-[#6B6B6B]">
                          Helfen uns zu verstehen, wie Besucher mit der Website interagieren, um sie zu verbessern.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-12 h-7 rounded-full transition-colors duration-200 flex items-center px-1 ${
                          preferences.analytics ? 'bg-[#1A1A1A] justify-end' : 'bg-black/[0.1] justify-start'
                        }`}
                        data-testid="cookie-analytics-toggle"
                      >
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                          {preferences.analytics && <Check className="w-3 h-3 text-[#1A1A1A]" />}
                        </div>
                      </button>
                    </div>

                    <div className="flex items-start justify-between p-4 bg-black/[0.02] border border-black/[0.07]">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-[#1A1A1A] mb-1">Marketing-Cookies</h4>
                        <p className="text-sm text-[#6B6B6B]">
                          Werden verwendet, um Besuchern relevante Werbung und Marketingkampagnen anzuzeigen.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-12 h-7 rounded-full transition-colors duration-200 flex items-center px-1 ${
                          preferences.marketing ? 'bg-[#1A1A1A] justify-end' : 'bg-black/[0.1] justify-start'
                        }`}
                        data-testid="cookie-marketing-toggle"
                      >
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                          {preferences.marketing && <Check className="w-3 h-3 text-[#1A1A1A]" />}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                    <Button variant="secondary" size="sm" onClick={handleRejectAll}>
                      Alle ablehnen
                    </Button>
                    <Button size="sm" onClick={handleAcceptSelected} data-testid="cookie-save-button">
                      Auswahl speichern
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-black/[0.06] text-center">
                <a href="/datenschutz" className="text-xs text-[#9A9A9A] hover:text-[#1A1A1A] transition-colors">
                  Mehr Informationen in unserer Datenschutzerklärung
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
