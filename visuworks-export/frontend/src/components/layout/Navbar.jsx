import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { navStructure, allLeistungenPaths } from '../../content/services';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';
import * as t from '../../i18n/translations';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState({});
  const location = useLocation();
  const megaRef = useRef(null);
  const megaTriggerRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const { language } = useLanguage();
  const isDE = language === 'de';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaOpen(false);
    setMobileAccordion({});
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMegaOpen(false);
    };
    if (isMegaOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMegaOpen]);

  const openMega = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setIsMegaOpen(false), 180);
  }, []);

  const isLeistungenActive = allLeistungenPaths.some((p) => location.pathname.startsWith(p));

  const isLinkActive = (href) => {
    if (href === '/projekte') return location.pathname.startsWith('/projekte');
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const toggleMobileAccordion = (key) => {
    setMobileAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { leistungen, simpleLinks } = navStructure;

  return (
    <>
      <header
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F5F2ED]/90 backdrop-blur-xl border-b border-black/[0.06]'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" role="navigation" aria-label="Hauptnavigation">
          <div className="flex items-center justify-between h-20">

            {/* Left: Leistungen + Projekte (with dropdown) */}
            <div className="hidden lg:flex items-center gap-1">
              <div
                ref={megaTriggerRef}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <button
                  onClick={() => setIsMegaOpen((v) => !v)}
                  data-testid="nav-leistungen-trigger"
                  className={`nav-link-base flex items-center gap-1.5 ${isLeistungenActive ? 'nav-link-active' : ''}`}
                  aria-expanded={isMegaOpen}
                  aria-haspopup="true"
                >
                  {isDE ? t.nav.leistungen.de : t.nav.leistungen.en}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaOpen ? 'rotate-180' : ''}`} />
                  {isLeistungenActive && <span className="nav-accent" />}
                </button>
              </div>

              {/* Projekte with Projektmanagement dropdown */}
              <div className="relative group">
                <Link
                  to="/projekte"
                  data-testid="nav-link-projekte"
                  className={`nav-link-base flex items-center gap-1.5 ${isLinkActive('/projekte') || isLinkActive('/projektmanagement') ? 'nav-link-active' : ''}`}
                >
                  {isDE ? t.nav.projekte.de : t.nav.projekte.en}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  {(isLinkActive('/projekte') || isLinkActive('/projektmanagement')) && <span className="nav-accent" />}
                </Link>
                
                {/* Projekte Dropdown */}
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white/95 backdrop-blur-xl border border-black/[0.08] rounded-lg shadow-lg py-2 min-w-[200px]">
                    <Link
                      to="/projekte"
                      className="block px-4 py-2 text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-black/[0.03] transition-colors"
                    >
                      Alle Projekte
                    </Link>
                    <Link
                      to="/projektmanagement"
                      className="block px-4 py-2 text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-black/[0.03] transition-colors"
                    >
                      {isDE ? t.nav.projektmanagement.de : t.nav.projektmanagement.en}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo - Always Centered */}
            <Link
              to="/"
              data-testid="nav-logo"
              className="absolute left-1/2 -translate-x-1/2"
              aria-label="VISUWORKS - Zur Startseite"
            >
              <span className="text-2xl font-bold tracking-tight transition-colors duration-300 text-[#1A1A1A]">VISUWORKS</span>
            </Link>

            {/* Right: Kontakt + Language + CTA */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/kontakt"
                data-testid="nav-link-kontakt"
                className={`nav-link-base ${isLinkActive('/kontakt') ? 'nav-link-active' : ''}`}
              >
                {isDE ? t.nav.kontakt.de : t.nav.kontakt.en}
                {isLinkActive('/kontakt') && <span className="nav-accent" />}
              </Link>
              <LanguageSwitcher className="ml-1" />
              <Link to="/kontakt" className="ml-2">
                <button data-testid="nav-cta-button" className="px-5 py-2 text-[13px] font-medium tracking-[0.02em] uppercase transition-all duration-300 rounded-full bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/90">
                  {isDE ? t.nav.projektStarten.de : t.nav.projektStarten.en}
                </button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 transition-colors z-50 text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* ─── MEGA MENU ─── */}
        <AnimatePresence>
          {isMegaOpen && (
            <motion.div
              ref={megaRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-20 z-40 hidden lg:block"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              data-testid="mega-menu"
            >
              <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="bg-white/[0.97] border border-black/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.08)] backdrop-blur-[40px] rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-4 gap-0 divide-x divide-black/[0.06]">
                    {leistungen.pillars.map((pillar) => (
                      <div key={pillar.href} className="p-5">
                        <Link
                          to={pillar.href}
                          className="group flex items-center gap-2 mb-3"
                        >
                          <span className={`text-sm font-semibold transition-colors duration-200 ${
                            isLinkActive(pillar.href)
                              ? 'text-[#1A1A1A]'
                              : 'text-[#1A1A1A]/90 group-hover:text-[#1A1A1A]'
                          }`}>
                            {pillar.label}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all duration-200 text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]/70" />
                        </Link>
                        <p className="text-xs mb-4 text-[#1A1A1A]/50">{pillar.desc}</p>

                        {pillar.subItems.length > 0 && (
                          <ul className="space-y-0.5">
                            {pillar.subItems.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  to={sub.href}
                                  data-testid={`mega-link-${sub.href.split('/').pop()}`}
                                  className={`flex flex-col gap-0.5 px-3.5 py-2.5 rounded-lg transition-all duration-300 ${
                                    location.pathname === sub.href
                                      ? 'bg-black/[0.05]'
                                      : 'hover:bg-black/[0.04]'
                                  }`}
                                >
                                  <span className={`text-[13px] font-medium transition-colors duration-200 ${
                                    location.pathname === sub.href ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/70'
                                  }`}>{sub.label}</span>
                                  <span className="text-[11px] leading-tight text-[#1A1A1A]/40">{sub.desc}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA bar */}
                  <div className="border-t px-5 py-3 flex items-center justify-between border-black/[0.06]">
                    <p className="text-xs text-[#1A1A1A]/50">{isDE ? t.nav.alleLeistungen.de : t.nav.alleLeistungen.en}</p>
                    <Link to="/kontakt" className="flex items-center gap-2 text-xs font-medium transition-colors duration-300 text-[#1A1A1A]/65 hover:text-[#1A1A1A]">
                      {isDE ? t.nav.projektBesprechen.de : t.nav.projektBesprechen.en}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── MOBILE MENU (Light) ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#F5F2ED]/98 backdrop-blur-xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <nav className="pt-24 pb-12 px-6">
              <div className="flex justify-end mb-4 px-4">
                <LanguageSwitcher />
              </div>
              
              {/* Leistungen accordion */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMobileAccordion('leistungen')}
                  data-testid="mobile-leistungen-toggle"
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-left text-lg font-medium transition-all duration-200 ${
                    isLeistungenActive ? 'text-[#1A1A1A] bg-black/[0.04]' : 'text-[#1A1A1A]/60'
                  }`}
                >
                  {isDE ? t.nav.leistungen.de : t.nav.leistungen.en}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileAccordion.leistungen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileAccordion.leistungen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-2 pt-1 space-y-1">
                        {leistungen.pillars.map((pillar) => (
                          <div key={pillar.href}>
                            {pillar.subItems.length > 0 ? (
                              <>
                                <button
                                  onClick={() => toggleMobileAccordion(pillar.href)}
                                  className={`w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-base font-medium transition-all ${
                                    isLinkActive(pillar.href) ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50'
                                  }`}
                                >
                                  {pillar.label}
                                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion[pillar.href] ? 'rotate-90' : ''}`} />
                                </button>

                                <AnimatePresence>
                                  {mobileAccordion[pillar.href] && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pl-3 pb-1 space-y-0.5">
                                        <Link
                                          to={pillar.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                                            location.pathname === pillar.href ? 'text-[#1A1A1A] bg-black/[0.05]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70'
                                          }`}
                                        >
                                          {isDE ? t.nav.uebersicht.de : t.nav.uebersicht.en} {pillar.label}
                                        </Link>
                                        {pillar.subItems.map((sub) => (
                                          <Link
                                            key={sub.href}
                                            to={sub.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                                              location.pathname === sub.href ? 'text-[#1A1A1A] bg-black/[0.05]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70'
                                            }`}
                                          >
                                            {sub.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            ) : (
                              <Link
                                to={pillar.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                                  isLinkActive(pillar.href) ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50'
                                }`}
                              >
                                {pillar.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple links */}
              <Link
                to="/projekte"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-200 mb-1 ${
                  isLinkActive('/projekte') ? 'text-[#1A1A1A] bg-black/[0.04]' : 'text-[#1A1A1A]/60'
                }`}
              >
                {isDE ? t.nav.projekte.de : t.nav.projekte.en}
              </Link>
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-200 mb-1 ${
                    isLinkActive(link.href) ? 'text-[#1A1A1A] bg-black/[0.04]' : 'text-[#1A1A1A]/60'
                  }`}
                >
                  {link.href === '/projektmanagement' 
                    ? (isDE ? t.nav.projektmanagement.de : t.nav.projektmanagement.en)
                    : (isDE ? t.nav.kontakt.de : t.nav.kontakt.en)
                  }
                </Link>
              ))}

              {/* CTA */}
              <div className="mt-6 px-4">
                <Link to="/kontakt" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-3 text-[13px] font-medium tracking-[0.02em] uppercase bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/90 transition-all duration-300">
                    {isDE ? t.nav.projektStarten.de : t.nav.projektStarten.en}
                  </button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link-base {
          position: relative;
          display: flex;
          align-items: center;
          padding: 6px 14px;
          border-radius: 0;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(26,26,26,0.65);
          border: none;
          transition: color 400ms cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          background: none;
        }
        .nav-link-base:hover {
          color: rgba(26,26,26,0.95);
          background-color: transparent;
        }
        .nav-link-active {
          color: #1A1A1A !important;
          background-color: transparent !important;
        }
        .nav-accent {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(26,26,26,0.5);
        }
      `}</style>
    </>
  );
};
