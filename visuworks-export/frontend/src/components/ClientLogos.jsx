import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const categories = [
  { de: 'Automotive & Motorsport', en: 'Automotive & Motorsport' },
  { de: 'Industrie & Produktion', en: 'Industry & Production' },
  { de: 'Logistik & Flotten', en: 'Logistics & Fleet' },
  { de: 'Retail & Markenflächen', en: 'Retail & Brand Spaces' },
  { de: 'Architektur & Innenausbau', en: 'Architecture & Interior' },
  { de: 'Event & Messebau', en: 'Events & Trade Fairs' },
];

const content = {
  title: {
    de: 'Erfahrung in anspruchsvollen Projekten',
    en: 'Experience in Demanding Projects',
  },
  subtitle: {
    de: 'Seit Jahren begleiten wir Unternehmen und Marken bei der Umsetzung visueller Oberflächen- und Kommunikationslösungen – strukturiert, präzise und terminsicher.',
    en: 'For years, we have been supporting companies and brands in implementing visual surface and communication solutions – structured, precise and on schedule.',
  },
  supporting: {
    de: 'Projekte mit hoher Komplexität, engen Zeitfenstern und europaweiter Umsetzung.',
    en: 'Projects with high complexity, tight timelines and Europe-wide implementation.',
  },
};

export const ClientLogos = ({ className = '' }) => {
  const { language } = useLanguage();
  const isDE = language === 'de';

  return (
    <div className={className} data-testid="client-logos">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-light tracking-[-0.02em] mb-4 text-[#1A1A1A]">
          {isDE ? content.title.de : content.title.en}
        </h2>
        <p className="text-sm text-[#6B6B6B] max-w-xl mx-auto leading-relaxed font-light">
          {isDE ? content.subtitle.de : content.subtitle.en}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-3 mb-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.de}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            <div className="px-5 py-2 border border-black/[0.08] hover:border-black/[0.15] hover:bg-black/[0.02] transition-all duration-300">
              <span className="text-[13px] font-light text-[#6B6B6B]">
                {isDE ? category.de : category.en}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center text-[13px] text-[#9A9A9A]"
      >
        {isDE ? content.supporting.de : content.supporting.en}
      </motion.p>
    </div>
  );
};

export default ClientLogos;
