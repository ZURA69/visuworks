import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';
import { NewsletterSignup } from '../NewsletterSignup';
import { company, footerNav } from '../../content/site';
import { useLanguage } from '../../contexts/LanguageContext';
import * as t from '../../i18n/translations';

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.44v-7.15a8.16 8.16 0 005.58 2.18V11.2a4.85 4.85 0 01-2.65-.78V6.69h2.65z" />
  </svg>
);

const socialIcons = { LinkedIn: Linkedin, Instagram, Facebook, YouTube: Youtube, TikTok: TikTokIcon };

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const isDE = language === 'de';

  return (
    <footer data-testid="footer" className="border-t border-white/5 bg-[#070910]">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight">{company.name}</span>
            </Link>
            <p className="text-sm text-white/50 mb-6 max-w-sm">
              {company.description}
            </p>
            
            {/* Newsletter Compact */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white/70 mb-3">Newsletter</p>
              <NewsletterSignup variant="minimal" />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {company.socialLinks.map((social) => {
                const IconComponent = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    aria-label={social.name}
                    data-testid={`social-${social.name.toLowerCase()}`}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              {isDE ? t.footer.leistungen.de : t.footer.leistungen.en}
            </h3>
            <ul className="space-y-3">
              {footerNav.services.map((item) => (
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
              {isDE ? t.footer.unternehmen.de : t.footer.unternehmen.en}
            </h3>
            <ul className="space-y-3">
              {footerNav.company.map((item) => (
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
                {isDE ? t.nav.projektStarten.de : t.nav.projektStarten.en}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              {isDE ? t.footer.rechtliches.de : t.footer.rechtliches.en}
            </h3>
            <ul className="space-y-3">
              {footerNav.legal.map((item) => (
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
              <p className="text-xs text-white/40">{isDE ? 'Standort' : 'Location'} {company.address.city}</p>
              <p className="text-xs text-white/40">{isDE ? 'Projekte europaweit' : 'Projects Europe-wide'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {currentYear} {company.legalName || company.name}. {isDE ? t.footer.copyright.de : t.footer.copyright.en}
            </p>
            <div className="flex items-center gap-6">
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-xs text-white/40 hover:text-white/60 transition-colors">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="text-xs text-white/40 hover:text-white/60 transition-colors">
                {company.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
