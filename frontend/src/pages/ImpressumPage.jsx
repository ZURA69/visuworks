import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';

const tocItems = [
  { id: 'anbieter', label: 'Anbieter' },
  { id: 'vertreten-durch', label: 'Vertreten durch' },
  { id: 'kontakt', label: 'Kontakt' },
  { id: 'registereintrag', label: 'Registereintrag' },
  { id: 'umsatzsteuer', label: 'Umsatzsteuer-ID' },
  { id: 'verantwortlich', label: 'Verantwortlich für den Inhalt' },
  { id: 'streitbeilegung', label: 'EU-Streitbeilegung' },
  { id: 'geltungsbereich', label: 'Geltungsbereich' },
  { id: 'social-media', label: 'Social-Media-Präsenzen' },
  { id: 'bildnachweise', label: 'Bildnachweise' },
];

export default function ImpressumPage() {
  return (
    <div data-testid="impressum-page" className="overflow-hidden">
      <SEOHead
        page="impressum"
        customTitle="Impressum | Visuworks visual work labs GmbH"
        customDescription="Impressum der Visuworks visual work labs GmbH gemäß § 5 TMG und § 18 Abs. 2 MStV."
      />

      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[800px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Rechtliches</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Impressum</h1>
            <p className="text-base text-white/50 mb-12">gemäß § 5 TMG und § 18 Abs. 2 MStV</p>

            {/* Anchor Navigation */}
            <nav className="mb-16 p-6 rounded-2xl bg-white/[0.02] border border-white/10" aria-label="Inhaltsverzeichnis">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Inhaltsverzeichnis</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal Content */}
            <div className="space-y-12 text-[15px] leading-relaxed">

              {/* Anbieter */}
              <section id="anbieter">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Anbieter</h2>
                <p className="text-white/70">
                  Visuworks visual work labs GmbH<br />
                  Verbindungsstraße 19c<br />
                  40723 Hilden<br />
                  Nordrhein-Westfalen<br />
                  Deutschland
                </p>
              </section>

              {/* Vertreten durch */}
              <section id="vertreten-durch">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Vertreten durch</h2>
                <p className="text-white/70">
                  Daniel Zura<br />
                  Gesellschafter / Geschäftsführer
                </p>
              </section>

              {/* Kontakt */}
              <section id="kontakt">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Kontakt</h2>
                <p className="text-white/70">
                  Telefon: <a href="tel:+4915172615378" className="text-white/80 hover:text-white transition-colors">+49 (0)151 72615378</a><br />
                  E-Mail: <a href="mailto:info@visuworks.de" className="text-white/80 hover:text-white transition-colors">info@visuworks.de</a>
                </p>
                <p className="text-white/70 mt-3">
                  Website: <a href="https://www.visuworks.de" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">www.visuworks.de</a>
                </p>
              </section>

              {/* Registereintrag */}
              <section id="registereintrag">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Registereintrag</h2>
                <p className="text-white/70">
                  Eingetragen im Handelsregister.<br />
                  Registergericht: Amtsgericht Düsseldorf<br />
                  Registernummer: HRB 96931
                </p>
              </section>

              {/* Umsatzsteuer-ID */}
              <section id="umsatzsteuer">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Umsatzsteuer-Identifikationsnummer</h2>
                <p className="text-white/70">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
                  DE353393855
                </p>
              </section>

              {/* Verantwortlich */}
              <section id="verantwortlich">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p className="text-white/70">
                  Daniel Zura<br />
                  Verbindungsstraße 19c<br />
                  40723 Hilden
                </p>
              </section>

              {/* EU-Streitbeilegung */}
              <section id="streitbeilegung">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">EU-Streitbeilegung</h2>
                <p className="text-white/70 mb-3">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-white/70">
                  Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              {/* Geltungsbereich */}
              <section id="geltungsbereich">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Geltungsbereich</h2>
                <p className="text-white/70 mb-3">
                  Dieses Impressum gilt für alle Angebote unter der Domain:
                </p>
                <p className="text-white/70 mb-3 pl-4 border-l-2 border-white/10">
                  <a href="https://www.visuworks.de" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">www.visuworks.de</a>
                </p>
                <p className="text-white/70">
                  einschließlich aller Subdomains (Unterseiten).
                </p>
              </section>

              {/* Social-Media-Präsenzen */}
              <section id="social-media">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Social-Media-Präsenzen</h2>
                <p className="text-white/70 mb-3">
                  Dieses Impressum gilt ebenfalls für folgende Social-Media-Auftritte:
                </p>
                <div className="space-y-3 text-white/70">
                  <p>
                    <span className="text-white/50">Instagram:</span><br />
                    <a href="https://www.instagram.com/visualworklabs/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">
                      https://www.instagram.com/visualworklabs/
                    </a>
                  </p>
                  <p>
                    <span className="text-white/50">TikTok:</span><br />
                    <a href="https://www.tiktok.com/@visuworks" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">
                      https://www.tiktok.com/@visuworks
                    </a>
                  </p>
                </div>
              </section>

              {/* Bildnachweise */}
              <section id="bildnachweise">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">Bildnachweise</h2>
                <p className="text-white/70">
                  Sämtliche auf dieser Website verwendeten Bilder stammen, sofern nicht anders gekennzeichnet, von Daniel Zura.
                </p>
              </section>

            </div>

            {/* Footer Links & Date */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-xs text-white/30 mb-6">Stand: März 2026</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-white/40">Weitere Rechtstexte:</span>
                <Link to="/agb" className="text-white/60 hover:text-white transition-colors">AGB (B2C)</Link>
                <Link to="/agb-b2b" className="text-white/60 hover:text-white transition-colors">AGB für Unternehmer</Link>
                <Link to="/datenschutz" className="text-white/60 hover:text-white transition-colors">Datenschutzerklärung</Link>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
