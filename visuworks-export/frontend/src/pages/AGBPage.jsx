import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { useEditable } from '../contexts/EditorContext';

const tocItems = [
  { id: 'geltungsbereich', label: '§1 Geltungsbereich' },
  { id: 'vertragsart', label: '§2 Vertragsart' },
  { id: 'leistungsbereiche', label: '§3 Leistungsbereiche' },
  { id: 'grafikdesign', label: '§4 Grafikdesign & Nutzungsrechte' },
  { id: 'folien', label: '§5 Folien- und Montageleistungen' },
  { id: 'mitwirkung', label: '§6 Mitwirkungspflichten' },
  { id: 'abnahme', label: '§7 Abnahme' },
  { id: 'preise', label: '§8 Preise und Zahlung' },
  { id: 'eigentumsvorbehalt', label: '§9 Eigentumsvorbehalt' },
  { id: 'gewaehrleistung', label: '§10 Gewährleistung' },
  { id: 'haftung', label: '§11 Haftung' },
  { id: 'hoehere-gewalt', label: '§12 Höhere Gewalt' },
  { id: 'datenschutz', label: '§13 Datenschutz' },
  { id: 'rechtswahl', label: '§14 Rechtswahl' },
];

export default function AGBPage() {
  // CMS Bindungen
  const label = useEditable('agb.label', 'Rechtliches');
  const title = useEditable('agb.title', 'Allgemeine Geschäftsbedingungen (B2C)');
  const subtitle = useEditable('agb.subtitle', 'Gültig für Verbraucher im Sinne des §13 BGB.');
  const tocLabel = useEditable('agb.tocLabel', 'Inhaltsverzeichnis');
  const stand = useEditable('agb.stand', 'Stand: März 2026');
  const weitereTexte = useEditable('agb.weitereTexte', 'Weitere Rechtstexte:');

  return (
    <div data-testid="agb-page" className="overflow-hidden">
      <SEOHead
        page="agb"
        customTitle="AGB (B2C) | VISUWORKS GmbH"
        customDescription="Allgemeine Geschäftsbedingungen der VISUWORKS GmbH für Verbraucher (B2C) gemäß §13 BGB."
      />

      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-black/[0.02] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[800px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-[#9A9A9A] uppercase tracking-wider mb-4">{label}</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-base text-[#6B6B6B] mb-12">
              {subtitle}
              {' '}Für Unternehmer gelten unsere <Link to="/agb-b2b" className="text-[#1A1A1A] hover:text-[#9A9A9A] transition-colors underline underline-offset-2">AGB für Unternehmer (B2B)</Link>.
            </p>

            {/* Anchor Navigation */}
            <nav className="mb-16 p-6 rounded-2xl bg-black/[0.02] border border-black/[0.07]" aria-label="Inhaltsverzeichnis">
              <p className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wider mb-4">{tocLabel}</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal Content */}
            <div className="space-y-12 text-[15px] leading-relaxed">

              {/* §1 */}
              <section id="geltungsbereich">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§1 Geltungsbereich</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") der VISUWORKS GmbH, Düsseldorf (nachfolgend „Auftragnehmer"), gelten für sämtliche Verträge mit Verbrauchern im Sinne des §13 BGB (nachfolgend „Auftraggeber") über Lieferungen und Leistungen im Bereich visueller Marken- und Oberflächenlösungen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§13 BGB).
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Abweichende, entgegenstehende oder ergänzende Bedingungen des Auftraggebers werden nur dann Vertragsbestandteil, wenn der Auftragnehmer ihrer Geltung ausdrücklich schriftlich zustimmt.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Diese AGB gelten in der zum Zeitpunkt des Vertragsschlusses gültigen Fassung.
                </p>
              </section>

              {/* §2 */}
              <section id="vertragsart">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§2 Vertragsart</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Die Verträge zwischen dem Auftragnehmer und dem Auftraggeber können je nach Gegenstand Werkverträge (§§631 ff. BGB) oder Kaufverträge (§§433 ff. BGB) sein.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Soweit der Auftragnehmer eine individuell herzustellende Leistung schuldet (z.B. Designentwurf, maßgefertigte Folierung, Montage), handelt es sich um einen Werkvertrag. Soweit der Auftragnehmer standardisierte Produkte liefert (z.B. Folienmaterial, Druckerzeugnisse), liegt ein Kaufvertrag vor.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Ein Vertrag kommt erst durch die schriftliche oder elektronische Auftragsbestätigung des Auftragnehmers oder durch den Beginn der Leistungserbringung zustande.
                </p>
              </section>

              {/* §3 */}
              <section id="leistungsbereiche">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§3 Leistungsbereiche</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Der Auftragnehmer erbringt Leistungen in folgenden Bereichen:
                </p>
                <ul className="list-disc list-inside text-[#1A1A1A]/70 space-y-1 mb-3 pl-2">
                  <li>Grafikdesign und visuelle Konzeption</li>
                  <li>Fahrzeugfolierung (Teil- und Vollfolierung, Designfolierung)</li>
                  <li>Paint Protection Film (PPF) / Lackschutzfolien</li>
                  <li>Architektur- und Raumgestaltung (Glas-, Wand- und Oberflächenfolierungen)</li>
                  <li>Großformatdruck und Werbetechnik</li>
                  <li>Messe- und Eventgrafik</li>
                  <li>Projektmanagement und Koordination</li>
                </ul>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Der konkrete Leistungsumfang ergibt sich aus der individuellen Auftragsbestätigung. Mündliche Nebenabreden bedürfen der schriftlichen Bestätigung.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (3) Sofern nicht anders vereinbart, schuldet der Auftragnehmer die Leistung nach dem anerkannten Stand der Technik und unter Berücksichtigung branchenüblicher Toleranzen.
                </p>
              </section>

              {/* §4 */}
              <section id="grafikdesign">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§4 Grafikdesign und Nutzungsrechte</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) An allen im Rahmen des Auftrags erstellten Entwürfen, Designs, Reinzeichnungen und sonstigen gestalterischen Arbeiten (nachfolgend „Werke") behält der Auftragnehmer das Urheberrecht gemäß §§7, 11 UrhG.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Mit vollständiger Bezahlung des vereinbarten Honorars erhält der Auftraggeber das einfache, nicht übertragbare Nutzungsrecht an den Werken für den im Vertrag definierten Verwendungszweck. Eine Übertragung an Dritte oder eine über den vereinbarten Zweck hinausgehende Nutzung bedarf der vorherigen schriftlichen Zustimmung des Auftragnehmers.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Nicht realisierte Entwürfe dürfen vom Auftraggeber nicht verwendet, vervielfältigt oder an Dritte weitergegeben werden. Sie verbleiben im Eigentum des Auftragnehmers.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (4) Der Auftragnehmer ist berechtigt, die im Rahmen des Vertrags erstellten Arbeiten als Referenz zu nutzen, sofern dem nicht berechtigte Geheimhaltungsinteressen des Auftraggebers entgegenstehen.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (5) Die Einräumung ausschließlicher (exklusiver) Nutzungsrechte bedarf einer gesonderten schriftlichen Vereinbarung und wird gesondert vergütet.
                </p>
              </section>

              {/* §5 */}
              <section id="folien">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§5 Folien- und Montageleistungen</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Bei Fahrzeugfolierungen, PPF-Anwendungen und Architekturfolierungen handelt es sich um handwerkliche Leistungen, die produktionstechnischen Toleranzen unterliegen. Geringfügige Abweichungen in Farbgebung, Struktur und Positionierung sind branchenüblich und stellen keinen Mangel dar, sofern sie das Gesamtergebnis nicht wesentlich beeinträchtigen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Der Auftraggeber ist verpflichtet, den Auftragnehmer vor Leistungsbeginn über alle ihm bekannten Vorschäden, Vorbehandlungen (z.B. Nachlackierungen, Unfallschäden, vorherige Folierungen) und Besonderheiten des Objekts (z.B. Fahrzeug, Glasfläche, Fassade) zu informieren. Für Schäden, die auf vom Auftraggeber verschwiegene Vorschäden zurückzuführen sind, haftet der Auftragnehmer nicht.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) <strong>Klarstellung zu PPF (Paint Protection Film):</strong> PPF-Folien sind transparente Schutzfolien, die dazu dienen, den vorhandenen Lack vor äußeren Einwirkungen zu schützen. PPF kann vorhandene Lackschäden weder reparieren noch unsichtbar machen. Der Auftragnehmer übernimmt keine Garantie für den Zustand des darunterliegenden Lacks.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (4) Die Haltbarkeit von Folierungen hängt von Faktoren ab, die außerhalb des Einflussbereichs des Auftragnehmers liegen (z.B. Witterung, UV-Strahlung, mechanische Beanspruchung, Pflege). Die vom Folienhersteller angegebenen Haltbarkeitszeiträume sind Richtwerte und keine zugesicherten Eigenschaften.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (5) Sofern der Auftragnehmer eine Demontage und anschließende Remontage von Fahrzeugteilen (z.B. Stoßfänger, Spiegel, Leisten) durchführt, erfolgt dies mit der gebotenen Sorgfalt. Für altersbedingte Brüche oder Materialermüdung an Kunststoffclips und Befestigungselementen übernimmt der Auftragnehmer keine Haftung.
                </p>
              </section>

              {/* §6 */}
              <section id="mitwirkung">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§6 Mitwirkungspflichten des Kunden</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Der Auftraggeber stellt dem Auftragnehmer alle für die Leistungserbringung erforderlichen Informationen, Materialien und Zugänge rechtzeitig und vollständig zur Verfügung.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Der Auftraggeber stellt sicher, dass ihm die Rechte an allen übergebenen Materialien (Logos, Bilder, Texte, Markenzeichen) zustehen oder dass er zur Nutzung berechtigt ist. Der Auftraggeber stellt den Auftragnehmer von Ansprüchen Dritter frei, die auf einer Verletzung dieser Pflicht beruhen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Bei Fahrzeugfolierungen hat der Auftraggeber das Fahrzeug in gereinigtem und trockenem Zustand zu übergeben. Liegt eine erhebliche Verschmutzung vor, kann der Auftragnehmer eine Vorreinigung durchführen und gesondert berechnen.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Verzögert sich die Leistung durch eine Verletzung der Mitwirkungspflichten, verlängern sich vereinbarte Fristen entsprechend. Zusätzlich anfallende Kosten trägt der Auftraggeber.
                </p>
              </section>

              {/* §7 */}
              <section id="abnahme">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§7 Abnahme</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Soweit werkvertragliche Leistungen geschuldet werden, ist der Auftraggeber zur Abnahme verpflichtet, sobald die Leistung im Wesentlichen vertragsgemäß erbracht wurde (§640 BGB).
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme. Sie sind im Abnahmeprotokoll zu vermerken.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (3) Erklärt der Auftraggeber die Abnahme nicht innerhalb von 10 Werktagen nach Fertigstellungsmitteilung und macht er in dieser Zeit keine konkreten Mängel schriftlich geltend, gilt die Leistung als abgenommen.
                </p>
              </section>

              {/* §8 */}
              <section id="preise">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§8 Preise und Zahlungsbedingungen</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Alle Preise verstehen sich in Euro inklusive der gesetzlichen Umsatzsteuer, sofern nicht anders angegeben.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Bei Aufträgen mit einem Gesamtvolumen über 5.000 EUR brutto kann der Auftragnehmer eine Anzahlung in Höhe von 50% des Auftragswertes verlangen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (4) Kommt der Auftraggeber in Zahlungsverzug, ist der Auftragnehmer berechtigt, Verzugszinsen in Höhe von 5 Prozentpunkten über dem jeweiligen Basiszinssatz der Europäischen Zentralbank zu berechnen (§288 Abs. 1 BGB). Die Geltendmachung eines weitergehenden Verzugsschadens bleibt vorbehalten.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (5) Die Aufrechnung mit Gegenansprüchen ist nur zulässig, wenn diese unbestritten oder rechtskräftig festgestellt sind.
                </p>
              </section>

              {/* §9 */}
              <section id="eigentumsvorbehalt">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§9 Eigentumsvorbehalt</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Gelieferte Waren und Materialien bleiben bis zur vollständigen Bezahlung aller Forderungen aus dem Vertragsverhältnis Eigentum des Auftragnehmers (§449 BGB).
                </p>
                <p className="text-[#1A1A1A]/70">
                  (2) Vor der Eigentumsübertragung ist der Auftraggeber nicht berechtigt, die Vorbehaltsware an Dritte zu veräußern, zu verpfänden oder sonst darüber zu verfügen.
                </p>
              </section>

              {/* §10 */}
              <section id="gewaehrleistung">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§10 Gewährleistung</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Es gelten die gesetzlichen Gewährleistungsrechte. Für Werkleistungen beträgt die Verjährungsfrist zwei Jahre ab Abnahme (§634a Abs. 1 Nr. 1 BGB). Für Kaufverträge beträgt die Verjährungsfrist zwei Jahre ab Lieferung (§438 Abs. 1 Nr. 3 BGB).
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Eine Verkürzung der gesetzlichen Gewährleistungsfristen für Verbraucher findet nicht statt.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Offensichtliche Mängel sind dem Auftragnehmer unverzüglich, spätestens innerhalb von 14 Tagen nach Abnahme bzw. Lieferung, schriftlich anzuzeigen. Die rechtzeitige Absendung der Mängelanzeige genügt zur Fristwahrung.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (4) Bei berechtigter Mängelrüge steht dem Auftragnehmer zunächst das Recht zur Nacherfüllung (Nachbesserung oder Neuherstellung) zu. Schlägt die Nacherfüllung nach angemessener Frist fehl, kann der Auftraggeber Minderung oder Rücktritt verlangen.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (5) Die Gewährleistung entfällt bei unsachgemäßer Behandlung, eigenmächtiger Veränderung oder Einwirkung durch Dritte sowie bei normalem Verschleiß.
                </p>
              </section>

              {/* §11 */}
              <section id="haftung">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§11 Haftung</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung beruhen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Der Auftragnehmer haftet unbeschränkt für Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Bei einfacher Fahrlässigkeit haftet der Auftragnehmer nur für die Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Wesentliche Vertragspflichten sind solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (4) Die vorstehenden Haftungsbeschränkungen gelten nicht für Ansprüche nach dem Produkthaftungsgesetz sowie bei arglistigem Verschweigen von Mängeln.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (5) Die gesetzlichen Rechte des Verbrauchers bleiben in jedem Fall unberührt.
                </p>
              </section>

              {/* §12 */}
              <section id="hoehere-gewalt">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§12 Höhere Gewalt</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Bei höherer Gewalt (z.B. Naturkatastrophen, Pandemien, Krieg, Streik, behördliche Anordnungen, Lieferengpässe bei Vormaterialien) verlängern sich die vereinbarten Fristen um die Dauer der Behinderung zuzüglich einer angemessenen Anlaufzeit.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (2) Dauert die Behinderung länger als drei Monate, sind beide Parteien berechtigt, vom Vertrag zurückzutreten. Bereits erbrachte Teilleistungen sind in diesem Fall zu vergüten.
                </p>
              </section>

              {/* §13 */}
              <section id="datenschutz">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§13 Datenschutz-Hinweis</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Der Auftragnehmer verarbeitet personenbezogene Daten des Auftraggebers im Rahmen der Vertragsabwicklung gemäß der Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz (BDSG).
                </p>
                <p className="text-[#1A1A1A]/70">
                  (2) Nähere Informationen zur Datenverarbeitung entnehmen Sie bitte unserer <Link to="/datenschutz" className="text-[#1A1A1A] hover:text-[#9A9A9A] transition-colors underline underline-offset-2">Datenschutzerklärung</Link>.
                </p>
              </section>

              {/* §14 */}
              <section id="rechtswahl">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§14 Rechtswahl und Schlussbestimmungen</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Hat der Auftraggeber seinen gewöhnlichen Aufenthalt in einem Mitgliedstaat der Europäischen Union, so bleiben die zwingenden Verbraucherschutzbestimmungen des Staates, in dem der Auftraggeber seinen gewöhnlichen Aufenthalt hat, gemäß Art. 6 Abs. 2 der Verordnung (EG) Nr. 593/2008 (Rom I) unberührt, sofern sie dem Verbraucher einen weitergehenden Schutz gewähren.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, so bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] hover:text-[#9A9A9A] transition-colors underline underline-offset-2">https://ec.europa.eu/consumers/odr</a>. Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
                </p>
              </section>

            </div>

            {/* Footer Links & Date */}
            <div className="mt-16 pt-8 border-t border-black/[0.07]">
              <p className="text-xs text-[#9A9A9A] mb-6">{stand}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-[#9A9A9A]">{weitereTexte}</span>
                <Link to="/agb-b2b" className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">AGB für Unternehmer</Link>
                <Link to="/datenschutz" className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Datenschutzerklärung</Link>
                <Link to="/impressum" className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Impressum</Link>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
