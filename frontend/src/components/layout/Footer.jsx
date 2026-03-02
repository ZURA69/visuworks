import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="border-t border-white/5 bg-[#070910]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Location */}
          <p className="text-white/50 text-sm">
            Standort Düsseldorf · Projekte europaweit
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/impressum"
              data-testid="footer-impressum"
              className="text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              Impressum
            </Link>
            <Link
              to="/datenschutz"
              data-testid="footer-datenschutz"
              className="text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              Datenschutz
            </Link>
            <Link
              to="/agb"
              data-testid="footer-agb"
              className="text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              AGB
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs">
            © {currentYear} VISUWORKS. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};
