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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const leftLinks = [
    { href: '/mobilitaet', label: 'Leistungen' },
    { href: '/projekte', label: 'Projekte' },
  ];

  const rightLinks = [
    { href: '/projektmanagement', label: 'Projektmanagement' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <>
      <nav
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#070910]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Left Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {leftLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-link-${link.href.replace('/', '')}`}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.href ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logo - Centered */}
            <Link
              to="/"
              data-testid="nav-logo"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
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
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.href ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
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
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden pt-20 bg-[#070910]/98 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {[...leftLinks, ...rightLinks].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    location.pathname === link.href ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/kontakt" className="mt-4">
                <Button>Projekt starten</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
