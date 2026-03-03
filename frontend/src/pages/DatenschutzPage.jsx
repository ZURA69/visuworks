import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';

const tocItems = [
  { id: 'verantwortlicher', label: '1. Verantwortlicher' },
  { id: 'hosting', label: '2. Hosting & Server-Logfiles' },
  { id: 'kontaktformular', label: '3. Kontaktformular' },
  { id: 'vertragsabwicklung', label: '4. Vertragsabwicklung' },
  { id: 'rechtsgrundlagen', label: '5. Rechtsgrundlagen (Art. 6 DSGVO)' },
  { id: 'cookies', label: '6. Cookie-Nutzung' },
  { id: 'analytics', label: '7. Google Analytics 4' },
  { id: 'google-ads', label: '8. Google Ads & Conversion Tracking' },
  { id: 'speicherdauer', label: '9. Speicherdauer' },
  { id: 'betroffenenrechte', label: '10. Betroffenenrechte' },
  { id: 'beschwerderecht', label: '11. Beschwerderecht' },
  { id: 'datensicherheit', label: '12. Datensicherheit' },
  { id: 'drittland', label: '13. Drittlandübermittlung' },
];

export default function DatenschutzPage() {
  return (
    <div data-testid="datenschutz-page" className="overflow-hidden">
      <SEOHead
        page="datenschutz"
        customTitle="Datenschutzerklärung | VISUWORKS GmbH"
        customDescription="Datenschutzerklärung der VISUWORKS GmbH gemäß DSGVO und TTDSG."
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
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-12">
              Datenschutzerklärung
            </h1>

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

              {/* 1 */}
              <section id="verantwortlicher">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">1. Verantwortlicher</h2>
                <p className="text-white/70 mb-3">
                  Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                </p>
                <div className="text-white/70 mb-3 pl-4 border-l-2 border-white/10">
                  <p>Visuworks visual work labs GmbH</p>
                  <p>Verbindungsstraße 19c</p>
                  <p>40723 Hilden</p>
                  <p>Deutschland</p>
                  <p className="mt-2">Geschäftsführer: Daniel Zura</p>
                  <p>Handelsregister: AG Düsseldorf, HRB 96931</p>
                  <p className="mt-2">Telefon: +49 (0)151 72615378</p>
                  <p>E-Mail: datenschutz@visuworks.de</p>
                </div>
                <p className="text-white/70">
                  Sollte ein externer Datenschutzbeauftragter bestellt sein, finden Sie dessen Kontaktdaten im <Link to="/impressum" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">Impressum</Link>.
                </p>
              </section>

              {/* 2 */}
              <section id="hosting">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">2. Hosting und Server-Logfiles</h2>
                <h3 className="text-base font-semibold text-white/80 mb-3">2.1 Hosting</h3>
                <p className="text-white/70 mb-3">
                  Diese Website wird bei einem externen Dienstleister gehostet (Hosting-Provider). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosting-Providers gespeichert. Hierbei handelt es sich insbesondere um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden.
                </p>
                <p className="text-white/70 mb-3">
                  Der Einsatz des Hosting-Providers erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine Einwilligung abgefragt wurde, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
                </p>
                <h3 className="text-base font-semibold text-white/80 mb-3 mt-6">2.2 Server-Logfiles</h3>
                <p className="text-white/70 mb-3">
                  Der Hosting-Provider erhebt und speichert automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser automatisch übermittelt:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1 mb-3 pl-2">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL (zuvor besuchte Seite)</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>IP-Adresse</li>
                  <li>Uhrzeit der Serveranfrage</li>
                </ul>
                <p className="text-white/70">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung seiner Website. Die Server-Logfiles werden nach spätestens 7 Tagen gelöscht.
                </p>
              </section>

              {/* 3 */}
              <section id="kontaktformular">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">3. Kontaktformular</h2>
                <p className="text-white/70 mb-3">
                  Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular (Name, E-Mail-Adresse, Telefonnummer, gewünschte Leistung, Nachricht) zur Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p className="text-white/70 mb-3">
                  <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt zum Zweck der vorvertraglichen Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) oder aufgrund unseres berechtigten Interesses an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p className="text-white/70 mb-3">
                  <strong>Speicherdauer:</strong> Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung widerrufen oder der Zweck der Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Aufbewahrungspflichten bleiben unberührt.
                </p>
                <p className="text-white/70">
                  <strong>Spam-Schutz:</strong> Das Kontaktformular enthält ein technisches Feld zur Erkennung automatisierter Anfragen (Honeypot). Dieses Feld ist für reguläre Nutzer nicht sichtbar und wird nicht personenbezogen ausgewertet.
                </p>
              </section>

              {/* 4 */}
              <section id="vertragsabwicklung">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">4. Vertragsabwicklung</h2>
                <p className="text-white/70 mb-3">
                  Wir verarbeiten personenbezogene Daten, die wir im Rahmen der Vertragsanbahnung und -abwicklung von unseren Kunden und Geschäftspartnern erhalten. Dies umfasst insbesondere: Name, Adresse, E-Mail, Telefon, Bankverbindung, Steuer-ID, Auftragsdetails.
                </p>
                <p className="text-white/70 mb-3">
                  <strong>Rechtsgrundlage:</strong> Die Verarbeitung ist zur Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich (Art. 6 Abs. 1 lit. b DSGVO). Darüber hinaus verarbeiten wir Daten aufgrund gesetzlicher Pflichten (Art. 6 Abs. 1 lit. c DSGVO), z.B. steuer- und handelsrechtlicher Aufbewahrungspflichten.
                </p>
                <p className="text-white/70">
                  <strong>Speicherdauer:</strong> Die Daten werden nach Ablauf der gesetzlichen Aufbewahrungsfristen (6 Jahre gemäß §257 HGB bzw. 10 Jahre gemäß §147 AO) gelöscht, sofern sie nicht mehr für die Vertragsdurchführung erforderlich sind.
                </p>
              </section>

              {/* 5 */}
              <section id="rechtsgrundlagen">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">5. Rechtsgrundlagen nach Art. 6 DSGVO</h2>
                <p className="text-white/70 mb-3">
                  Die Verarbeitung personenbezogener Daten auf dieser Website erfolgt auf Basis folgender Rechtsgrundlagen:
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Art. 6 Abs. 1 lit. a DSGVO — Einwilligung</p>
                    <p className="text-white/60 text-sm">Verarbeitung erfolgt mit ausdrücklicher Einwilligung (z.B. Cookie-Consent für Analytics und Ads). Die Einwilligung kann jederzeit widerrufen werden.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung</p>
                    <p className="text-white/60 text-sm">Verarbeitung ist zur Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich (z.B. Kontaktanfrage, Auftragsabwicklung).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Art. 6 Abs. 1 lit. c DSGVO — Rechtliche Verpflichtung</p>
                    <p className="text-white/60 text-sm">Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich (z.B. steuerliche Aufbewahrungspflichten).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Art. 6 Abs. 1 lit. f DSGVO — Berechtigtes Interesse</p>
                    <p className="text-white/60 text-sm">Verarbeitung ist zur Wahrung berechtigter Interessen erforderlich (z.B. Server-Logfiles, Spam-Schutz, IT-Sicherheit).</p>
                  </div>
                </div>
              </section>

              {/* 6 */}
              <section id="cookies">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">6. Cookie-Nutzung</h2>
                <p className="text-white/70 mb-3">
                  Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und die eine Analyse der Nutzung der Website ermöglichen.
                </p>
                <h3 className="text-base font-semibold text-white/80 mb-3 mt-6">6.1 Technisch notwendige Cookies</h3>
                <p className="text-white/70 mb-3">
                  Einige Cookies sind technisch notwendig, damit die Website ordnungsgemäß funktioniert. Sie werden ohne Einwilligung gesetzt (§25 Abs. 2 TTDSG). Hierzu gehören Cookies für den Cookie-Consent-Status sowie Sitzungscookies.
                </p>
                <h3 className="text-base font-semibold text-white/80 mb-3 mt-6">6.2 Analyse- und Marketing-Cookies</h3>
                <p className="text-white/70 mb-3">
                  <strong>Analyse- und Marketing-Cookies werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt (Opt-in gemäß §25 Abs. 1 TTDSG i.V.m. Art. 6 Abs. 1 lit. a DSGVO).</strong> Diese Cookies ermöglichen die Analyse des Nutzerverhaltens (z.B. Google Analytics 4) und die Ausspielung personalisierter Werbung (z.B. Google Ads).
                </p>
                <p className="text-white/70 mb-3">
                  Die Einwilligung erfolgt über unser Cookie-Consent-Banner. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die Cookie-Einstellungen erneut aufrufen oder die Cookies in Ihrem Browser löschen.
                </p>
                <p className="text-white/70">
                  <strong>Ohne Ihre Einwilligung werden keine Analyse- oder Marketing-Cookies gesetzt und keine Daten an Drittanbieter wie Google übertragen.</strong>
                </p>
              </section>

              {/* 7 */}
              <section id="analytics">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">7. Google Analytics 4</h2>
                <p className="text-white/70 mb-3">
                  Diese Website nutzt Google Analytics 4, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (nachfolgend „Google"). Google Analytics 4 verwendet Cookies und ähnliche Technologien, die eine Analyse der Benutzung der Website ermöglichen.
                </p>
                <p className="text-white/70 mb-3">
                  <strong>Google Analytics wird nur aktiviert, wenn Sie zuvor über das Cookie-Consent-Banner Ihre ausdrückliche Einwilligung erteilt haben (Opt-in).</strong> Ohne Einwilligung findet keine Datenübertragung an Google statt.
                </p>
                <h3 className="text-base font-semibold text-white/80 mb-3 mt-6">7.1 IP-Anonymisierung</h3>
                <p className="text-white/70 mb-3">
                  Wir setzen Google Analytics 4 mit aktivierter IP-Anonymisierung ein. Die IP-Adresse wird von Google innerhalb der EU/des EWR vor der Übermittlung an Server in den USA gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.
                </p>
                <h3 className="text-base font-semibold text-white/80 mb-3 mt-6">7.2 Zweck und Rechtsgrundlage</h3>
                <p className="text-white/70 mb-3">
                  Die Nutzung von Google Analytics 4 dient der Analyse des Nutzerverhaltens auf unserer Website, um unser Online-Angebot zu verbessern. <strong>Rechtsgrundlage</strong> ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, §25 Abs. 1 TTDSG).
                </p>
                <h3 className="text-base font-semibold text-white/80 mb-3 mt-6">7.3 Speicherdauer</h3>
                <p className="text-white/70">
                  Die von Google Analytics gesetzten Cookies werden nach maximal 14 Monaten automatisch gelöscht. Die Löschung von Daten, deren Aufbewahrungsfrist erreicht ist, erfolgt automatisch einmal im Monat. Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">Google Datenschutzerklärung</a>.
                </p>
              </section>

              {/* 8 */}
              <section id="google-ads">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">8. Google Ads und Conversion Tracking</h2>
                <p className="text-white/70 mb-3">
                  Diese Website nutzt Google Ads, ein Online-Werbeprogramm von Google, sowie Google Conversion Tracking, um die Wirksamkeit unserer Werbeanzeigen zu messen.
                </p>
                <p className="text-white/70 mb-3">
                  <strong>Google Ads und Conversion Tracking werden nur aktiviert, wenn Sie zuvor Ihre ausdrückliche Einwilligung über das Cookie-Consent-Banner erteilt haben (Opt-in).</strong>
                </p>
                <p className="text-white/70 mb-3">
                  Wenn Sie über eine Google-Werbeanzeige auf unsere Website gelangen, wird von Google Ads ein Cookie auf Ihrem Endgerät gespeichert. Dieses Cookie verliert in der Regel nach 30 Tagen seine Gültigkeit. Es dient nicht der persönlichen Identifizierung, sondern ermöglicht es, zu erkennen, ob der Nutzer bestimmte Aktionen auf der Website ausgeführt hat (z.B. Kontaktformular abgesendet).
                </p>
                <p className="text-white/70 mb-3">
                  <strong>Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, §25 Abs. 1 TTDSG). Die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p className="text-white/70">
                  Weitere Informationen zum Datenschutz bei Google finden Sie unter: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">https://policies.google.com/privacy</a>.
                </p>
              </section>

              {/* 9 */}
              <section id="speicherdauer">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">9. Speicherdauer</h2>
                <p className="text-white/70 mb-3">
                  Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Verarbeitungszweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-white/70 border-collapse mt-3">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 pr-4 font-semibold text-white/80">Datenkategorie</th>
                        <th className="text-left py-3 font-semibold text-white/80">Speicherdauer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr><td className="py-3 pr-4">Server-Logfiles</td><td className="py-3">7 Tage</td></tr>
                      <tr><td className="py-3 pr-4">Kontaktanfragen</td><td className="py-3">Bis Zweckerfüllung + 3 Jahre</td></tr>
                      <tr><td className="py-3 pr-4">Vertragsdaten</td><td className="py-3">10 Jahre (§147 AO)</td></tr>
                      <tr><td className="py-3 pr-4">Rechnungen/Buchhaltung</td><td className="py-3">10 Jahre (§147 AO)</td></tr>
                      <tr><td className="py-3 pr-4">Handelsbriefe</td><td className="py-3">6 Jahre (§257 HGB)</td></tr>
                      <tr><td className="py-3 pr-4">Analytics-Cookies</td><td className="py-3">Max. 14 Monate</td></tr>
                      <tr><td className="py-3 pr-4">Conversion-Cookies</td><td className="py-3">30 Tage</td></tr>
                      <tr><td className="py-3 pr-4">Cookie-Consent-Status</td><td className="py-3">12 Monate</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 10 */}
              <section id="betroffenenrechte">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">10. Betroffenenrechte</h2>
                <p className="text-white/70 mb-3">
                  Sie haben als betroffene Person nach der DSGVO folgende Rechte:
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Auskunftsrecht (Art. 15 DSGVO)</p>
                    <p className="text-white/60 text-sm">Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob Sie betreffende personenbezogene Daten verarbeitet werden, und Auskunft über diese Daten zu erhalten.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Recht auf Berichtigung (Art. 16 DSGVO)</p>
                    <p className="text-white/60 text-sm">Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung unvollständiger personenbezogener Daten zu verlangen.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Recht auf Löschung (Art. 17 DSGVO)</p>
                    <p className="text-white/60 text-sm">Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, sofern die Voraussetzungen des Art. 17 DSGVO erfüllt sind.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Recht auf Einschränkung (Art. 18 DSGVO)</p>
                    <p className="text-white/60 text-sm">Sie haben das Recht, unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</p>
                    <p className="text-white/60 text-sm">Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Widerspruchsrecht (Art. 21 DSGVO)</p>
                    <p className="text-white/60 text-sm">Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen, sofern die Verarbeitung auf Art. 6 Abs. 1 lit. e oder f DSGVO beruht.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-white/80 font-medium mb-1">Widerrufsrecht (Art. 7 Abs. 3 DSGVO)</p>
                    <p className="text-white/60 text-sm">Soweit die Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.</p>
                  </div>
                </div>
                <p className="text-white/70 mt-4">
                  Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:datenschutz@visuworks.de" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">datenschutz@visuworks.de</a>
                </p>
              </section>

              {/* 11 */}
              <section id="beschwerderecht">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">11. Beschwerderecht bei einer Aufsichtsbehörde</h2>
                <p className="text-white/70 mb-3">
                  Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt (Art. 77 DSGVO).
                </p>
                <p className="text-white/70">
                  Die für uns zuständige Aufsichtsbehörde ist:<br />
                  Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />
                  Kavalleriestraße 2–4, 40213 Düsseldorf<br />
                  Telefon: +49 (0) 211 / 38424-0<br />
                  E-Mail: poststelle@ldi.nrw.de<br />
                  Website: <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">www.ldi.nrw.de</a>
                </p>
              </section>

              {/* 12 */}
              <section id="datensicherheit">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">12. Datensicherheit</h2>
                <p className="text-white/70 mb-3">
                  Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend dem Stand der Technik fortlaufend überprüft und verbessert.
                </p>
                <p className="text-white/70 mb-3">
                  Die Datenübertragung zwischen Ihrem Browser und unserem Server erfolgt über eine TLS-verschlüsselte Verbindung (HTTPS), erkennbar am Schloss-Symbol in der Adressleiste Ihres Browsers.
                </p>
                <p className="text-white/70">
                  Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                </p>
              </section>

              {/* 13 */}
              <section id="drittland">
                <h2 className="text-xl font-bold mb-4 scroll-mt-24">13. Drittlandübermittlung</h2>
                <p className="text-white/70 mb-3">
                  Soweit wir Dienste nutzen, deren Anbieter ihren Sitz in einem Drittland (insbesondere den USA) haben, kann es zu einer Übermittlung personenbezogener Daten in dieses Drittland kommen.
                </p>
                <h3 className="text-base font-semibold text-white/80 mb-3 mt-6">13.1 Angemessenheitsbeschluss / EU-U.S. Data Privacy Framework</h3>
                <p className="text-white/70 mb-3">
                  Für bestimmte US-Unternehmen, die unter dem EU-U.S. Data Privacy Framework zertifiziert sind, hat die Europäische Kommission ein angemessenes Datenschutzniveau festgestellt. Soweit ein solcher Angemessenheitsbeschluss vorliegt, stützen wir die Datenübermittlung hierauf (Art. 45 DSGVO).
                </p>
                <h3 className="text-base font-semibold text-white/80 mb-3 mt-6">13.2 Standardvertragsklauseln (SCC)</h3>
                <p className="text-white/70 mb-3">
                  Für Drittlandübermittlungen, die nicht durch einen Angemessenheitsbeschluss abgedeckt sind, stützen wir die Datenübermittlung auf die Standardvertragsklauseln (Standard Contractual Clauses, SCC) der Europäischen Kommission gemäß Art. 46 Abs. 2 lit. c DSGVO in der jeweils aktuellen Fassung.
                </p>
                <p className="text-white/70">
                  Im Einzelfall können weitere Schutzmaßnahmen (z.B. Verschlüsselung, Pseudonymisierung) ergriffen werden, um ein angemessenes Datenschutzniveau sicherzustellen.
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
                <Link to="/impressum" className="text-white/60 hover:text-white transition-colors">Impressum</Link>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
