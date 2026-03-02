import React from 'react';
import { motion } from 'framer-motion';

export default function AGBPage() {
  return (
    <div data-testid="agb-page" className="overflow-hidden">
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
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-12">Allgemeine Geschäftsbedingungen</h1>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">§ 1 Geltungsbereich</h2>
                <p className="text-white/70">
                  (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für alle Verträge 
                  zwischen der VISUWORKS GmbH (nachfolgend "Auftragnehmer") und ihren Kunden (nachfolgend 
                  "Auftraggeber") über Dienstleistungen im Bereich visuelle Marken- und Oberflächenlösungen.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Abweichende Bedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei 
                  denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 2 Vertragsschluss</h2>
                <p className="text-white/70">
                  (1) Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht 
                  ausdrücklich als verbindlich gekennzeichnet sind.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Ein Vertrag kommt erst durch die schriftliche Auftragsbestätigung des Auftragnehmers 
                  oder durch Beginn der Leistungserbringung zustande.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 3 Leistungen</h2>
                <p className="text-white/70">
                  (1) Art und Umfang der Leistungen ergeben sich aus der Auftragsbestätigung bzw. dem 
                  schriftlichen Angebot.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Der Auftragnehmer ist berechtigt, zur Erfüllung seiner Verpflichtungen Dritte 
                  (Subunternehmer) einzusetzen.
                </p>
                <p className="text-white/70 mt-4">
                  (3) Änderungen oder Erweiterungen des ursprünglichen Auftrags bedürfen der schriftlichen 
                  Vereinbarung.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 4 Mitwirkungspflichten des Auftraggebers</h2>
                <p className="text-white/70">
                  (1) Der Auftraggeber stellt dem Auftragnehmer rechtzeitig alle für die Durchführung des 
                  Auftrags erforderlichen Unterlagen, Daten und Informationen zur Verfügung.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Der Auftraggeber sorgt für einen ungehinderten Zugang zu den Räumlichkeiten oder 
                  Fahrzeugen, an denen Leistungen erbracht werden sollen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 5 Vergütung und Zahlungsbedingungen</h2>
                <p className="text-white/70">
                  (1) Die Vergütung ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach 
                  Rechnungsdatum ohne Abzug zur Zahlung fällig.
                </p>
                <p className="text-white/70 mt-4">
                  (3) Bei Projekten mit einem Auftragsvolumen über 5.000 EUR netto kann der Auftragnehmer 
                  eine Anzahlung in Höhe von 50% des Auftragswertes verlangen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 6 Lieferung und Abnahme</h2>
                <p className="text-white/70">
                  (1) Liefertermine sind nur verbindlich, wenn sie ausdrücklich schriftlich als verbindlich 
                  bestätigt wurden.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Der Auftraggeber ist verpflichtet, die Leistung nach Fertigstellung abzunehmen. Die 
                  Abnahme gilt als erfolgt, wenn der Auftraggeber nicht innerhalb von 5 Werktagen nach 
                  Aufforderung zur Abnahme schriftlich Mängel rügt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 7 Gewährleistung</h2>
                <p className="text-white/70">
                  (1) Der Auftragnehmer gewährleistet, dass die Leistungen frei von Mängeln sind und den 
                  vereinbarten Spezifikationen entsprechen.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Die Gewährleistungsfrist beträgt 24 Monate ab Abnahme, sofern nicht anders vereinbart.
                </p>
                <p className="text-white/70 mt-4">
                  (3) Im Falle eines Mangels ist der Auftragnehmer zur Nachbesserung berechtigt. Erst nach 
                  zweimaligem Fehlschlagen der Nachbesserung kann der Auftraggeber Minderung oder Rücktritt 
                  verlangen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 8 Haftung</h2>
                <p className="text-white/70">
                  (1) Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie 
                  bei Verletzung von Leben, Körper und Gesundheit.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher 
                  Vertragspflichten, begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 9 Geistiges Eigentum</h2>
                <p className="text-white/70">
                  (1) Alle vom Auftragnehmer erstellten Entwürfe, Designs und Konzepte bleiben bis zur 
                  vollständigen Bezahlung Eigentum des Auftragnehmers.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Mit vollständiger Bezahlung gehen die Nutzungsrechte an den vereinbarten Leistungen 
                  auf den Auftraggeber über.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">§ 10 Schlussbestimmungen</h2>
                <p className="text-white/70">
                  (1) Es gilt das Recht der Bundesrepublik Deutschland.
                </p>
                <p className="text-white/70 mt-4">
                  (2) Gerichtsstand für alle Streitigkeiten ist Düsseldorf, sofern der Auftraggeber 
                  Kaufmann ist.
                </p>
                <p className="text-white/70 mt-4">
                  (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der 
                  übrigen Bestimmungen unberührt.
                </p>
              </section>

              <p className="text-white/50 text-sm mt-12">Stand: Dezember 2025</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
