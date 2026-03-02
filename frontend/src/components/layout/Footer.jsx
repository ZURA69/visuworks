import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';
import { NewsletterSignup } from '../NewsletterSignup';

const navigation = {
  services: [
    { name: 'Mobilität', href: '/mobilitaet' },
    { name: 'Raum & Architektur', href: '/architektur-raum' },
    { name: 'Markenkommunikation', href: '/markenkommunikation' },
    { name: 'Design & Konzeption', href: '/design-konzepte' },
    { name: 'Projektmanagement', href: '/projektmanagement' },
  ],
  company: [
    { name: 'Projekte', href: '/projekte' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/visuworks' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/visuworks' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/visuworks' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@visuworks' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="border-t border-white/5 bg-[#070910]">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight">VISUWORKS</span>
            </Link>
            <p className="text-sm text-white/50 mb-6 max-w-sm">
              Premium visuelle Marken- und Oberflächenlösungen für Mobilität, 
              Architektur und Kommunikation – europaweit umgesetzt.
            </p>
            
            {/* Newsletter Compact */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white/70 mb-3">Newsletter</p>
              <NewsletterSignup variant="minimal" />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  aria-label={social.name}
                  data-testid={`social-${social.name.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Leistungen
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Unternehmen
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Projekt starten
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    data-testid={`footer-${item.name.toLowerCase()}`}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
              <p className="text-xs text-white/40">Standort Düsseldorf</p>
              <p className="text-xs text-white/40">Projekte europaweit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {currentYear} VISUWORKS GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <a href="tel:+4921112345678" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                +49 211 123 456 78
              </a>
              <a href="mailto:info@visuworks.de" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                info@visuworks.de
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
