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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaOpen(false);
    setMobileAccordion({});
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close mega on ESC
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#070910]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav className="max-w-[1200px] mx-auto px-6 md:px-12" role="navigation" aria-label="Hauptnavigation">
          <div className="flex items-center justify-between h-20">

            {/* Left: Leistungen + Projekte */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Leistungen with mega menu */}
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
                  Leistungen
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaOpen ? 'rotate-180' : ''}`} />
                  {isLeistungenActive && <span className="nav-accent" />}
                </button>
              </div>

              {/* Projekte link */}
              <Link
                to="/projekte"
                data-testid="nav-link-projekte"
                className={`nav-link-base ${isLinkActive('/projekte') ? 'nav-link-active' : ''}`}
              >
                Projekte
                {isLinkActive('/projekte') && <span className="nav-accent" />}
              </Link>
            </div>

            {/* Logo */}
            <Link
              to="/"
              data-testid="nav-logo"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
              aria-label="VISUWORKS - Zur Startseite"
            >
              <span className="text-2xl font-bold tracking-tight">VISUWORKS</span>
            </Link>

            {/* Right: Projektmanagement + Kontakt + CTA */}
            <div className="hidden lg:flex items-center gap-1">
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-link-${link.href.replace(/\//g, '')}`}
                  className={`nav-link-base ${isLinkActive(link.href) ? 'nav-link-active' : ''}`}
                >
                  {link.label}
                  {isLinkActive(link.href) && <span className="nav-accent" />}
                </Link>
              ))}
              <Link to="/kontakt" className="ml-3">
                <button data-testid="nav-cta-button" className="px-5 py-2 text-sm font-medium rounded-full bg-white text-[#070910] hover:bg-white/90 transition-all duration-200">
                  Projekt starten
                </button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors z-50"
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
                <div className="mega-panel">
                  <div className="grid grid-cols-4 gap-0 divide-x divide-white/[0.06]">
                    {leistungen.pillars.map((pillar) => (
                      <div key={pillar.href} className="p-5">
                        <Link
                          to={pillar.href}
                          className="group flex items-center gap-2 mb-3"
                        >
                          <span className={`text-sm font-semibold transition-colors duration-200 ${
                            isLinkActive(pillar.href) ? 'text-white' : 'text-white/80 group-hover:text-white'
                          }`}>
                            {pillar.label}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200" />
                        </Link>
                        <p className="text-xs text-white/35 mb-4">{pillar.desc}</p>

                        {pillar.subItems.length > 0 && (
                          <ul className="space-y-0.5">
                            {pillar.subItems.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  to={sub.href}
                                  data-testid={`mega-link-${sub.href.split('/').pop()}`}
                                  className={`mega-sub-link ${
                                    location.pathname === sub.href ? 'bg-white/[0.06] text-white' : ''
                                  }`}
                                >
                                  <span className="text-[13px] font-medium">{sub.label}</span>
                                  <span className="text-[11px] text-white/30 leading-tight">{sub.desc}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA bar */}
                  <div className="border-t border-white/[0.06] px-5 py-3 flex items-center justify-between">
                    <p className="text-xs text-white/40">Alle Leistungen auch als Komplettpaket verfügbar</p>
                    <Link to="/kontakt" className="flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                      Projekt besprechen
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#070910]/98 backdrop-blur-xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <nav className="pt-24 pb-12 px-6">
              {/* Leistungen accordion */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMobileAccordion('leistungen')}
                  data-testid="mobile-leistungen-toggle"
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-left text-lg font-medium transition-all duration-200 ${
                    isLeistungenActive ? 'text-white bg-white/[0.04]' : 'text-white/60'
                  }`}
                >
                  Leistungen
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
                                    isLinkActive(pillar.href) ? 'text-white' : 'text-white/50'
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
                                            location.pathname === pillar.href ? 'text-white bg-white/[0.05]' : 'text-white/40 hover:text-white/70'
                                          }`}
                                        >
                                          Übersicht {pillar.label}
                                        </Link>
                                        {pillar.subItems.map((sub) => (
                                          <Link
                                            key={sub.href}
                                            to={sub.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                                              location.pathname === sub.href ? 'text-white bg-white/[0.05]' : 'text-white/40 hover:text-white/70'
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
                                  isLinkActive(pillar.href) ? 'text-white' : 'text-white/50'
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
                  isLinkActive('/projekte') ? 'text-white bg-white/[0.04]' : 'text-white/60'
                }`}
              >
                Projekte
              </Link>
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-200 mb-1 ${
                    isLinkActive(link.href) ? 'text-white bg-white/[0.04]' : 'text-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA */}
              <div className="mt-6 px-4">
                <Link to="/kontakt" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-3 text-base font-medium rounded-xl bg-white text-[#070910] hover:bg-white/90 transition-all">
                    Projekt starten
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
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          border: 1px solid transparent;
          transition: color 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out;
          cursor: pointer;
          background: none;
        }
        .nav-link-base:hover {
          color: rgba(255,255,255,0.9);
          background-color: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.10);
        }
        .nav-link-active {
          color: #fff !important;
          background-color: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
        .nav-accent {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          border-radius: 1px;
          background: linear-gradient(90deg, rgba(129,140,248,0.6), rgba(167,139,250,0.6));
        }
        .mega-panel {
          background: rgba(10,12,20,0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0,0,0,0.4);
        }
        .mega-sub-link {
          display: flex;
          flex-direction: column;
          gap: 1px;
          padding: 7px 10px;
          border-radius: 8px;
          color: rgba(255,255,255,0.55);
          transition: color 180ms ease-out, background-color 180ms ease-out;
        }
        .mega-sub-link:hover {
          color: #fff;
          background-color: rgba(255,255,255,0.05);
        }
      `}</style>
    </>
  );
};
