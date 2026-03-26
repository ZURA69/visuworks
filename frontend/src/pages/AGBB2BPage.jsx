import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { useEditable } from '../contexts/EditorContext';

const tocItems = [
  { id: 'geltungsbereich', label: '§1 Geltungsbereich' },
  { id: 'vertragsschluss', label: '§2 Vertragsschluss' },
  { id: 'leistungen', label: '§3 Leistungsumfang' },
  { id: 'nutzungsrechte', label: '§4 Nutzungsrechte' },
  { id: 'folien', label: '§5 Folien- und Montageleistungen' },
  { id: 'mitwirkung', label: '§6 Mitwirkungspflichten' },
  { id: 'abnahme', label: '§7 Abnahme und Untersuchungspflicht' },
  { id: 'preise', label: '§8 Preise und Zahlung' },
  { id: 'eigentumsvorbehalt', label: '§9 Eigentumsvorbehalt' },
  { id: 'gewaehrleistung', label: '§10 Gewährleistung' },
  { id: 'haftung', label: '§11 Haftung' },
  { id: 'hoehere-gewalt', label: '§12 Höhere Gewalt' },
  { id: 'vertraulichkeit', label: '§13 Vertraulichkeit' },
  { id: 'datenschutz', label: '§14 Datenschutz' },
  { id: 'schlussbestimmungen', label: '§15 Schlussbestimmungen' },
];

export default function AGBB2BPage() {
  // CMS Bindungen
  const label = useEditable('agbb2b.label', 'Rechtliches');
  const title = useEditable('agbb2b.title', 'Allgemeine Geschäftsbedingungen für Unternehmer (B2B)');
  const subtitle = useEditable('agbb2b.subtitle', 'Diese AGB gelten ausschließlich gegenüber Unternehmern im Sinne des §14 BGB.');
  const tocLabel = useEditable('agbb2b.tocLabel', 'Inhaltsverzeichnis');
  const stand = useEditable('agbb2b.stand', 'Stand: März 2026');
  const weitereTexte = useEditable('agbb2b.weitereTexte', 'Weitere Rechtstexte:');

  return (
    <div data-testid="agb-b2b-page" className="overflow-hidden">
      <SEOHead
        page="agb"
        customTitle="AGB für Unternehmer (B2B) | VISUWORKS GmbH"
        customDescription="Allgemeine Geschäftsbedingungen der VISUWORKS GmbH für Unternehmer (B2B) gemäß §14 BGB."
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
              {' '}Für Verbraucher gelten unsere <Link to="/agb" className="text-[#1A1A1A] hover:text-[#9A9A9A] transition-colors underline underline-offset-2">AGB (B2C)</Link>.
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
                  (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten ausschließlich gegenüber Unternehmern im Sinne des §14 BGB, juristischen Personen des öffentlichen Rechts oder öffentlich-rechtlichen Sondervermögen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Unternehmer im Sinne dieser AGB ist jede natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt (§14 BGB).
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Entgegenstehende oder von diesen AGB abweichende Bedingungen des Auftraggebers erkennt der Auftragnehmer nicht an, es sei denn, er hat ihrer Geltung ausdrücklich schriftlich zugestimmt. Die AGB des Auftragnehmers gelten auch dann, wenn der Auftragnehmer in Kenntnis entgegenstehender Bedingungen des Auftraggebers die Leistung vorbehaltlos erbringt.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Diese AGB gelten auch für alle zukünftigen Geschäftsbeziehungen zwischen den Parteien, selbst wenn sie nicht nochmals ausdrücklich vereinbart werden.
                </p>
              </section>

              {/* §2 */}
              <section id="vertragsschluss">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§2 Vertragsschluss</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Angebote des Auftragnehmers sind freibleibend und unverbindlich. Kostenvoranschläge und Kalkulationen sind, sofern nicht ausdrücklich anders angegeben, unverbindliche Schätzungen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Bestellungen des Auftraggebers stellen verbindliche Angebote dar. Der Auftragnehmer ist berechtigt, diese innerhalb von 14 Tagen durch Auftragsbestätigung oder Leistungsbeginn anzunehmen.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (3) Änderungen und Ergänzungen der getroffenen Vereinbarungen einschließlich dieser AGB bedürfen der Schriftform. Dies gilt auch für die Aufhebung der Schriftformklausel selbst.
                </p>
              </section>

              {/* §3 */}
              <section id="leistungen">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§3 Leistungsumfang</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Der Umfang der Leistung ergibt sich aus der Auftragsbestätigung des Auftragnehmers. Nachträgliche Änderungswünsche des Auftraggebers bedürfen einer gesonderten Vereinbarung und können zu einer Anpassung der Vergütung und der Liefertermine führen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Der Auftragnehmer ist berechtigt, Teilleistungen zu erbringen und gesondert abzurechnen, sofern dies dem Auftraggeber zumutbar ist.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (3) Der Auftragnehmer ist berechtigt, sich zur Erfüllung seiner vertraglichen Pflichten der Hilfe Dritter (Subunternehmer) zu bedienen.
                </p>
              </section>

              {/* §4 */}
              <section id="nutzungsrechte">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§4 Nutzungsrechte</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) An allen im Rahmen des Auftrags erstellten Werken (Entwürfe, Designs, Konzepte, Reinzeichnungen, Druckdaten) behält der Auftragnehmer das Urheberrecht.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Mit vollständiger Bezahlung räumt der Auftragnehmer dem Auftraggeber ein einfaches Nutzungsrecht für den vertraglich vereinbarten Zweck ein. Die Einräumung exklusiver Nutzungsrechte oder die Nutzung für andere als die vereinbarten Zwecke bedarf einer gesonderten schriftlichen Vereinbarung und zusätzlichen Vergütung.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Nicht umgesetzte Entwürfe und Konzepte verbleiben im Eigentum des Auftragnehmers und dürfen vom Auftraggeber nicht verwendet werden.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Der Auftragnehmer behält sich das Recht vor, die erbrachten Leistungen zu Referenzzwecken zu verwenden, sofern keine ausdrückliche Vertraulichkeitsvereinbarung dem entgegensteht.
                </p>
              </section>

              {/* §5 */}
              <section id="folien">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§5 Folien- und Montageleistungen</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Bei Folierungs- und Montageleistungen (Fahrzeugfolierung, PPF, Architekturfolierung, Großformat) gelten branchenübliche Toleranzen für Farbgebung, Positionierung und Struktur. Geringfügige Abweichungen sind kein Mangel.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) <strong>PPF-Klarstellung:</strong> Paint Protection Film schützt den vorhandenen Lack und kann vorbestehende Lackschäden nicht korrigieren oder unsichtbar machen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Herstellerangaben zur Haltbarkeit von Folien sind Richtwerte und keine zugesicherten Eigenschaften. Die tatsächliche Haltbarkeit hängt von externen Faktoren ab (Witterung, UV, Pflege, mechanische Beanspruchung).
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Der Auftraggeber trägt die Darlegungs- und Beweislast dafür, dass Schäden an Untergründen oder Fahrzeugteilen nicht auf Vorschäden, Materialermüdung oder unsachgemäße Vorbehandlung zurückzuführen sind.
                </p>
              </section>

              {/* §6 */}
              <section id="mitwirkung">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§6 Mitwirkungspflichten</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Der Auftraggeber stellt alle erforderlichen Informationen, Materialien, Daten und Zugänge rechtzeitig und vollständig zur Verfügung.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Der Auftraggeber gewährleistet, dass er über die Rechte an allen übergebenen Materialien verfügt, und stellt den Auftragnehmer von Ansprüchen Dritter aus Rechtsverletzungen frei.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Der Auftraggeber ist verpflichtet, den Auftragnehmer über alle relevanten Vorschäden, Vorbehandlungen und Besonderheiten des Leistungsobjekts schriftlich zu informieren.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Verzögerungen durch Verletzung der Mitwirkungspflichten gehen zulasten des Auftraggebers. Vereinbarte Fristen verlängern sich entsprechend.
                </p>
              </section>

              {/* §7 */}
              <section id="abnahme">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§7 Abnahme und Untersuchungspflicht (§377 HGB)</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Bei werkvertraglichen Leistungen ist der Auftraggeber zur Abnahme verpflichtet, sobald die Leistung im Wesentlichen vertragsgemäß erbracht ist.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Die Leistung gilt als abgenommen, wenn der Auftraggeber die Abnahme nicht innerhalb von 5 Werktagen nach Fertigstellungsmitteilung unter Angabe konkreter Mängel schriftlich verweigert.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) <strong>Der Auftraggeber ist gemäß §377 HGB verpflichtet, die Ware bzw. das Werk unverzüglich nach Ablieferung bzw. Fertigstellung zu untersuchen und erkennbare Mängel unverzüglich schriftlich zu rügen.</strong> Unterlässt der Auftraggeber die rechtzeitige Untersuchung und/oder Rüge, gilt die Ware als genehmigt. Verdeckte Mängel sind unverzüglich nach Entdeckung zu rügen.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Die Rügefrist für erkennbare Mängel beträgt 5 Werktage ab Ablieferung bzw. Abnahme.
                </p>
              </section>

              {/* §8 */}
              <section id="preise">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§8 Preise und Zahlungsbedingungen</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Alle Preise verstehen sich in Euro zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer (netto).
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zahlbar, sofern nicht anders vereinbart.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Bei Aufträgen über 10.000 EUR netto kann eine Anzahlung von bis zu 50% verlangt werden. Weitere Abschlagszahlungen nach Projektfortschritt können vereinbart werden.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (4) Kommt der Auftraggeber in Zahlungsverzug, ist der Auftragnehmer berechtigt, Verzugszinsen in Höhe von 9 Prozentpunkten über dem jeweiligen Basiszinssatz der EZB zu berechnen (§288 Abs. 2 BGB). Die Geltendmachung eines höheren Schadens bleibt vorbehalten.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (5) Dem Auftraggeber steht ein Aufrechnungsrecht nur zu, soweit seine Gegenansprüche rechtskräftig festgestellt, unbestritten oder vom Auftragnehmer anerkannt sind. Ein Zurückbehaltungsrecht kann nur geltend gemacht werden, wenn es auf demselben Vertragsverhältnis beruht.
                </p>
              </section>

              {/* §9 */}
              <section id="eigentumsvorbehalt">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§9 Eigentumsvorbehalt</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Gelieferte Waren und Materialien bleiben bis zur vollständigen Bezahlung sämtlicher Forderungen aus der laufenden Geschäftsbeziehung Eigentum des Auftragnehmers (erweiterter Eigentumsvorbehalt).
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Wird die Vorbehaltsware vom Auftraggeber mit anderen Gegenständen verbunden, verarbeitet oder vermischt, so steht dem Auftragnehmer ein Miteigentum am neuen Gegenstand zu im Verhältnis des Rechnungswertes der Vorbehaltsware zum Rechnungswert der übrigen verwendeten Gegenstände.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Der Auftraggeber tritt hiermit alle Forderungen, die ihm aus der Weiterveräußerung der Vorbehaltsware oder des miteigentümlichen Gegenstands entstehen, in Höhe des Miteigentumsanteils an den Auftragnehmer ab. Der Auftragnehmer nimmt die Abtretung an.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Der Auftraggeber ist verpflichtet, den Auftragnehmer unverzüglich über Pfändungen oder sonstige Zugriffe Dritter auf die Vorbehaltsware zu informieren.
                </p>
              </section>

              {/* §10 */}
              <section id="gewaehrleistung">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§10 Gewährleistung</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) <strong>Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme bzw. Lieferung.</strong> Dies gilt nicht, soweit das Gesetz zwingend längere Fristen vorschreibt (§§438 Abs. 1 Nr. 2, 634a Abs. 1 Nr. 2 BGB bei Bauwerken).
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Bei Mängeln steht dem Auftragnehmer zunächst das Recht zur Nacherfüllung zu. Der Auftragnehmer wählt, ob die Nacherfüllung durch Nachbesserung oder Neuherstellung erfolgt. Erst nach Fehlschlagen der Nacherfüllung (mindestens zwei Versuche) kann der Auftraggeber Minderung verlangen oder vom Vertrag zurücktreten.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) Die Gewährleistung entfällt bei unsachgemäßer Behandlung, unsachgemäßer Lagerung, eigenmächtiger Veränderung, Einwirkung Dritter, normalem Verschleiß sowie bei Nichtbeachtung der vom Auftragnehmer erteilten Pflege- und Wartungshinweise.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (4) Der Auftraggeber trägt die Beweislast für das Vorliegen des Mangels zum Zeitpunkt der Abnahme/Lieferung.
                </p>
              </section>

              {/* §11 */}
              <section id="haftung">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§11 Haftung</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) Bei einfacher Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). In diesem Fall ist <strong>die Haftung auf den Netto-Auftragswert des betreffenden Einzelauftrags begrenzt</strong>.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) <strong>Die Haftung für mittelbare Schäden, Folgeschäden, Produktionsausfall, Nutzungsausfall, entgangenen Gewinn und Vermögensschäden ist ausgeschlossen</strong>, soweit sie nicht auf Vorsatz oder grober Fahrlässigkeit beruhen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (4) Die vorstehenden Haftungsbeschränkungen gelten nicht für Ansprüche aus dem Produkthaftungsgesetz sowie bei arglistigem Verschweigen von Mängeln oder der Übernahme einer Garantie.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (5) Der Auftraggeber hat den Auftragnehmer über ungewöhnliche Schadensrisiken und außergewöhnlich hohe Schadensbeträge vor Vertragsschluss schriftlich zu informieren.
                </p>
              </section>

              {/* §12 */}
              <section id="hoehere-gewalt">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§12 Höhere Gewalt</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Bei höherer Gewalt (z.B. Naturkatastrophen, Pandemien, Krieg, behördliche Anordnungen, Streik, Aussperrung, Energieversorgungsstörungen, Lieferengpässe bei Vormaterialien, die nicht vom Auftragnehmer zu vertreten sind) verlängern sich die Fristen um die Dauer der Behinderung zuzüglich einer angemessenen Anlaufzeit.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (2) Dauert die Behinderung länger als drei Monate, ist jede Partei berechtigt, vom Vertrag zurückzutreten. Bereits erbrachte Teilleistungen sind in diesem Fall anteilig zu vergüten. Weitergehende Ansprüche bestehen nicht.
                </p>
              </section>

              {/* §13 */}
              <section id="vertraulichkeit">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§13 Vertraulichkeit</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen Informationen der anderen Partei zeitlich unbegrenzt geheim zu halten und ausschließlich zur Vertragsdurchführung zu verwenden.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (2) Diese Verpflichtung gilt nicht für Informationen, die öffentlich bekannt sind oder ohne Zutun der empfangenden Partei öffentlich bekannt werden, die der empfangenden Partei bereits bekannt waren oder die von einem Dritten ohne Verletzung einer Geheimhaltungspflicht offenbart werden.
                </p>
              </section>

              {/* §14 */}
              <section id="datenschutz">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§14 Datenschutz</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Der Auftragnehmer verarbeitet personenbezogene Daten im Rahmen der Vertragsabwicklung gemäß DSGVO und BDSG.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (2) Nähere Informationen entnehmen Sie unserer <Link to="/datenschutz" className="text-[#1A1A1A] hover:text-[#9A9A9A] transition-colors underline underline-offset-2">Datenschutzerklärung</Link>.
                </p>
              </section>

              {/* §15 */}
              <section id="schlussbestimmungen">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">§15 Schlussbestimmungen</h2>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (1) Es gilt das Recht der Bundesrepublik Deutschland unter <strong>Ausschluss des UN-Kaufrechts (CISG)</strong>.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (2) <strong>Erfüllungsort</strong> für alle Leistungen und Zahlungen ist der Sitz des Auftragnehmers in Düsseldorf.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (3) <strong>Gerichtsstand</strong> für alle Streitigkeiten aus oder im Zusammenhang mit dem Vertragsverhältnis ist, soweit der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist, der Sitz des Auftragnehmers in Düsseldorf. Der Auftragnehmer ist jedoch berechtigt, den Auftraggeber auch an seinem allgemeinen Gerichtsstand zu verklagen.
                </p>
                <p className="text-[#1A1A1A]/70 mb-3">
                  (4) Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, so bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Die Parteien verpflichten sich, die unwirksame Bestimmung durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.
                </p>
                <p className="text-[#1A1A1A]/70">
                  (5) Es bestehen keine mündlichen Nebenabreden. Änderungen und Ergänzungen bedürfen der Schriftform.
                </p>
              </section>

            </div>

            {/* Footer Links & Date */}
            <div className="mt-16 pt-8 border-t border-black/[0.07]">
              <p className="text-xs text-[#9A9A9A] mb-6">{stand}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-[#9A9A9A]">{weitereTexte}</span>
                <Link to="/agb" className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">AGB (B2C)</Link>
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
