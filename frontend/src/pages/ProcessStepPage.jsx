import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Search, Lightbulb, Factory, Wrench, ShieldCheck, CheckCircle2, Clock, Users, FileText, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEOHead } from '../components/SEOHead';

const processData = {
  analyse: {
    num: '01',
    title: 'Analyse & Zieldefinition',
    subtitle: 'Das Fundament jedes erfolgreichen Projekts',
    icon: Search,
    description: 'Bevor wir gestalten, hören wir zu. In der Analysephase erfassen wir sämtliche Anforderungen, Rahmenbedingungen und Ziele Ihres Projekts – von der Markenidentität über technische Gegebenheiten bis hin zu regulatorischen Vorgaben.',
    steps: [
      { title: 'Bedarfserhebung', desc: 'Strukturierte Erfassung Ihrer Anforderungen, Wünsche und Erwartungen in einem persönlichen Briefing-Gespräch.' },
      { title: 'Bestandsaufnahme', desc: 'Vor-Ort-Besichtigung und Dokumentation der Gegebenheiten – ob Fahrzeugflotte, Gebäudefassade oder Messestand.' },
      { title: 'Markenanalyse', desc: 'Prüfung bestehender CI-Vorgaben, Farbsysteme und Markenrichtlinien als Grundlage für die Gestaltung.' },
      { title: 'Zieldefinition', desc: 'Gemeinsame Festlegung messbarer Projektziele: Zeitrahmen, Budget, Qualitätsstandards und Meilensteine.' },
    ],
    deliverables: ['Projektbriefing-Dokument', 'Anforderungskatalog', 'Aufmaß-Dokumentation', 'Meilensteinplan'],
    duration: '1–2 Wochen',
    next: 'design',
    prev: null,
  },
  design: {
    num: '02',
    title: 'Design & Konzeption',
    subtitle: 'Von der Idee zur visuellen Lösung',
    icon: Lightbulb,
    description: 'Auf Basis der Analyseergebnisse entwickeln wir Designkonzepte, die Ihre Marke wirkungsvoll inszenieren. Wir denken dabei immer vom Endergebnis her – jede Gestaltung ist auf die spätere Produktion und Anwendung optimiert.',
    steps: [
      { title: 'Konzeptentwicklung', desc: 'Erarbeitung von 2–3 Designrichtungen als Entwürfe, die verschiedene gestalterische Ansätze aufzeigen.' },
      { title: '3D-Visualisierung', desc: 'Fotorealistische Darstellung der Entwürfe auf dem realen Objekt – ob Fahrzeug, Raum oder Messestand.' },
      { title: 'Materialberatung', desc: 'Auswahl geeigneter Folien, Medien und Oberflächen unter Berücksichtigung von Haltbarkeit, Optik und Budget.' },
      { title: 'Abstimmungsrunden', desc: 'Iterative Feedbackschleifen mit Ihrem Team bis zur finalen Freigabe des Designkonzepts.' },
    ],
    deliverables: ['Designkonzepte (2–3 Varianten)', '3D-Mockups / Visualisierungen', 'Materialempfehlung', 'Detaillierter Kostenvoranschlag'],
    duration: '2–4 Wochen',
    next: 'produktion',
    prev: 'analyse',
  },
  produktion: {
    num: '03',
    title: 'Produktion',
    subtitle: 'Präzision in der Fertigung',
    icon: Factory,
    description: 'In unserer Produktionsstätte fertigen wir alle Elemente mit modernster Technik. Ob Digitaldruck, Schneideplotter oder Spezialfolien – wir setzen auf bewährte Markenprodukte und kontrollierte Prozesse für ein makelloses Ergebnis.',
    steps: [
      { title: 'Druckvorstufe', desc: 'Professionelle Aufbereitung aller Druckdaten: Farbmanagement (ICC-Profile), Auflösungsprüfung und Preflight-Check.' },
      { title: 'Digitaldruck', desc: 'Produktion auf Großformat-Drucksystemen mit UV-beständigen Tinten für langlebige, farbechte Ergebnisse.' },
      { title: 'Schnitt & Konfektion', desc: 'Präziser CNC-Schnitt und Konturschnitt aller Folien und Medien mit Toleranzen unter 0,5 mm.' },
      { title: 'Qualitätsprüfung', desc: 'Kontrolle jedes produzierten Elements auf Farbgenauigkeit, Passform und Materialqualität vor Auslieferung.' },
    ],
    deliverables: ['Druckfreigabe-Proof', 'Fertige Druckmedien', 'Geschnittene Folien', 'Produktionsprotokoll'],
    duration: '1–3 Wochen',
    next: 'umsetzung',
    prev: 'design',
  },
  umsetzung: {
    num: '04',
    title: 'Umsetzung & Montage',
    subtitle: 'Professionelle Installation vor Ort',
    icon: Wrench,
    description: 'Unsere erfahrenen Montageteams bringen die Produktion an ihren Bestimmungsort. Ob Fahrzeugfolierung in der Werkstatt, Raumgestaltung im Büro oder Messeaufbau auf dem Gelände – wir arbeiten termingerecht, sauber und mit höchster Sorgfalt.',
    steps: [
      { title: 'Logistik & Planung', desc: 'Koordination aller Abläufe: Materialtransport, Zugangsgenehmigungen, Zeitfenster und Teamplanung.' },
      { title: 'Oberflächenvorbereitung', desc: 'Professionelle Reinigung und Entfettung aller Untergründe für optimale Folienhaftung.' },
      { title: 'Applikation', desc: 'Fachgerechte Montage durch zertifizierte Folierer mit jahrelanger Erfahrung – blasenfrei und passgenau.' },
      { title: 'Endkontrolle vor Ort', desc: 'Abschließende Sichtprüfung und Detailnachbesserung direkt am Objekt für ein perfektes Finish.' },
    ],
    deliverables: ['Montagedokumentation', 'Vorher-/Nachher-Fotos', 'Pflegehinweise', 'Garantiezertifikat'],
    duration: '1–5 Tage',
    next: 'qualitaetssicherung',
    prev: 'produktion',
  },
  qualitaetssicherung: {
    num: '05',
    title: 'Qualitätssicherung',
    subtitle: 'Kontrolle, Abnahme und langfristige Betreuung',
    icon: ShieldCheck,
    description: 'Unser Qualitätsanspruch endet nicht mit der Montage. Wir führen eine systematische Abnahme durch, dokumentieren das Ergebnis und stehen Ihnen auch nach Projektabschluss als Ansprechpartner für Wartung und Pflege zur Verfügung.',
    steps: [
      { title: 'Systematische Abnahme', desc: 'Prüfung aller Elemente anhand einer standardisierten Checkliste – Passgenauigkeit, Farbkonsistenz, Haltbarkeit.' },
      { title: 'Dokumentation', desc: 'Vollständige Projektdokumentation inkl. Vorher-/Nachher-Aufnahmen, verwendeten Materialien und Garantiebedingungen.' },
      { title: 'Kunden-Abnahme', desc: 'Gemeinsamer Rundgang und Freigabe mit Ihnen vor Ort. Ihr Feedback ist uns wichtig.' },
      { title: 'Nachbetreuung', desc: 'Regelmäßige Wartungsangebote, Pflegetipps und schnelle Reaktion bei Reparaturbedarf – auch Jahre nach Projektende.' },
    ],
    deliverables: ['Abnahmeprotokoll', 'Projektdokumentation', 'Garantie-Unterlagen', 'Wartungsvertrag (optional)'],
    duration: '1–2 Tage',
    next: null,
    prev: 'umsetzung',
  },
};

const allSteps = ['analyse', 'design', 'produktion', 'umsetzung', 'qualitaetssicherung'];

export default function ProcessStepPage() {
  const { slug } = useParams();
  const data = processData[slug];

  if (!data) return <Navigate to="/" replace />;

  const currentIndex = allSteps.indexOf(slug);
  const Icon = data.icon;

  return (
    <div data-testid={`process-${slug}-page`} className="overflow-hidden">
      <SEOHead
        page="home"
        customTitle={`${data.title} | Unser Prozess | VISUWORKS`}
        customDescription={data.description.slice(0, 155)}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/40 mb-8"
          >
            <Link to="/" className="hover:text-white/60 transition-colors">Start</Link>
            <span>/</span>
            <span className="text-white/70">Unser Prozess</span>
            <span>/</span>
            <span className="text-white/70">Schritt {data.num}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Step indicator */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-7xl font-extrabold text-white/10">{data.num}</span>
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-indigo-400" />
                </div>
              </div>

              <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">
                Schritt {data.num} von 05
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
                {data.title}
              </h1>
              <p className="text-lg text-white/50 mb-6">{data.subtitle}</p>
              <p className="text-base text-white/70 leading-relaxed">{data.description}</p>

              {/* Duration */}
              <div className="flex items-center gap-3 mt-8 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <Clock className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm font-medium">Typische Dauer</p>
                  <p className="text-sm text-white/50">{data.duration}</p>
                </div>
              </div>
            </motion.div>

            {/* Steps detail */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {data.steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-indigo-400">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 md:py-24 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Ergebnisse</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Was Sie in diesem Schritt erhalten</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.deliverables.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-5 rounded-[16px] bg-white/[0.03] border border-white/10"
              >
                <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Step Navigation */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {allSteps.map((step, i) => (
              <Link key={step} to={`/prozess/${step}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </Link>
            ))}
          </div>

          {/* Prev/Next Navigation */}
          <div className="flex items-center justify-between">
            {data.prev ? (
              <Link to={`/prozess/${data.prev}`}>
                <Button variant="secondary" size="lg" data-testid="process-prev">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  {processData[data.prev].title}
                </Button>
              </Link>
            ) : <div />}
            
            {data.next ? (
              <Link to={`/prozess/${data.next}`}>
                <Button size="lg" data-testid="process-next">
                  {processData[data.next].title}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/kontakt">
                <Button size="lg" data-testid="process-cta">
                  Projekt starten
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-12 md:p-20"
          >
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Bereit für Ihr Projekt?
              </h2>
              <p className="text-lg text-white/60 mb-10">
                Lassen Sie uns gemeinsam den ersten Schritt machen – unverbindlich und persönlich.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/kontakt">
                  <Button size="lg">
                    Projekt besprechen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/projekte">
                  <Button variant="secondary" size="lg">
                    Referenzen ansehen
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
