import React from 'react';
import { motion } from 'framer-motion';


export default function ImpressumPage() {
  return (
    <div data-testid="impressum-page" className="overflow-hidden">
      
      
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
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-12">Impressum</h1>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
                <p className="text-white/70">
                  VISUWORKS GmbH<br />
                  Musterstraße 123<br />
                  40210 Düsseldorf<br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
                <p className="text-white/70">
                  Telefon: +49 211 123 456 78<br />
                  E-Mail: info@visuworks.de
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Vertreten durch</h2>
                <p className="text-white/70">
                  Geschäftsführer: Max Mustermann
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Registereintrag</h2>
                <p className="text-white/70">
                  Eintragung im Handelsregister.<br />
                  Registergericht: Amtsgericht Düsseldorf<br />
                  Registernummer: HRB 12345
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Umsatzsteuer-ID</h2>
                <p className="text-white/70">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  DE 123456789
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p className="text-white/70">
                  Max Mustermann<br />
                  Musterstraße 123<br />
                  40210 Düsseldorf
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Streitschlichtung</h2>
                <p className="text-white/70">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
                <p className="text-white/70 mt-4">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Haftung für Inhalte</h2>
                <p className="text-white/70">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                  Tätigkeit hinweisen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Haftung für Links</h2>
                <p className="text-white/70">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                  Seiten verantwortlich.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Urheberrecht</h2>
                <p className="text-white/70">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                  der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                  Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
