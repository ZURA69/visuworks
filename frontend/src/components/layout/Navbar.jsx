import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const leftLinks = [
    { href: '/mobilitaet', label: 'Leistungen' },
    { href: '/projekte', label: 'Projekte' },
  ];

  const rightLinks = [
    { href: '/projektmanagement', label: 'Projektmanagement' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  // Check if current path is active or is a child route
  const isActive = (href) => {
    if (href === '/mobilitaet') {
      return ['/mobilitaet', '/architektur-raum', '/markenkommunikation', '/design-konzepte'].includes(location.pathname);
    }
    if (href === '/projekte') {
      return location.pathname.startsWith('/projekte');
    }
    return location.pathname === href;
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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
            {/* Left Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {leftLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-link-${link.href.replace('/', '')}`}
                  className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                    isActive(link.href) ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Logo - Centered */}
            <Link
              to="/"
              data-testid="nav-logo"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
              aria-label="VISUWORKS - Zur Startseite"
            >
              <span className="text-2xl font-bold tracking-tight">VISUWORKS</span>
            </Link>

            {/* Right Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {rightLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-link-${link.href.replace('/', '')}`}
                  className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                    isActive(link.href) ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-indicator-right"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <Link to="/kontakt">
                <Button data-testid="nav-cta-button" size="sm">
                  Projekt starten
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors z-50"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#070910]/98 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6 p-8">
              {allLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={handleMobileLinkClick}
                    className={`text-xl font-medium transition-colors duration-200 ${
                      isActive(link.href) ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: allLinks.length * 0.05 }}
                className="mt-4"
              >
                <Link to="/kontakt" onClick={handleMobileLinkClick}>
                  <Button>Projekt starten</Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
