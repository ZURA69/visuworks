import React from 'react';
import { motion } from 'framer-motion';

export default function DatenschutzPage() {
  return (
    <div data-testid="datenschutz-page" className="overflow-hidden">
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
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-12">Datenschutzerklärung</h1>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Datenschutz auf einen Blick</h2>
                <h3 className="text-xl font-bold mb-3 mt-6">Allgemeine Hinweise</h3>
                <p className="text-white/70">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6">Datenerfassung auf dieser Website</h3>
                <p className="text-white/70">
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen 
                  Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>

                <p className="text-white/70 mt-4">
                  <strong>Wie erfassen wir Ihre Daten?</strong><br />
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei 
                  kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Hosting</h2>
                <p className="text-white/70">
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>
                <h3 className="text-xl font-bold mb-3 mt-6">Externes Hosting</h3>
                <p className="text-white/70">
                  Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website 
                  erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich 
                  v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, 
                  Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert 
                  werden, handeln.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
                <h3 className="text-xl font-bold mb-3 mt-6">Datenschutz</h3>
                <p className="text-white/70">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6">Hinweis zur verantwortlichen Stelle</h3>
                <p className="text-white/70">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                  VISUWORKS GmbH<br />
                  Musterstraße 123<br />
                  40210 Düsseldorf<br /><br />
                  Telefon: +49 211 123 456 78<br />
                  E-Mail: info@visuworks.de
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Datenerfassung auf dieser Website</h2>
                <h3 className="text-xl font-bold mb-3 mt-6">Kontaktformular</h3>
                <p className="text-white/70">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                  Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
                  der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben 
                  wir nicht ohne Ihre Einwilligung weiter.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6">Server-Log-Dateien</h3>
                <p className="text-white/70">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                  Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside text-white/70 mt-4 space-y-2">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Ihre Rechte</h2>
                <p className="text-white/70">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
                  Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein 
                  Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
                  Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit 
                  für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen 
                  die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
