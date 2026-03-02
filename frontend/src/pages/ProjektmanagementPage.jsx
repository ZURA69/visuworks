import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, Users, Boxes, Wrench, CheckCircle, Shield, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const services = [
  { icon: ClipboardList, title: 'Planung', desc: 'Strukturierte Projektplanung und Zeitmanagement' },
  { icon: Users, title: 'Koordination', desc: 'Steuerung aller Beteiligten und Gewerke' },
  { icon: Boxes, title: 'Materialberatung', desc: 'Auswahl optimaler Materialien für Ihr Projekt' },
  { icon: Wrench, title: 'Produktion', desc: 'Steuerung und Überwachung der Fertigung' },
  { icon: CheckCircle, title: 'Montage', desc: 'Professionelle Installation vor Ort' },
  { icon: Shield, title: 'Qualitätssicherung', desc: 'Kontrolle und Abnahme aller Leistungen' },
];

const timeline = [
  { phase: 'Briefing', duration: '1-2 Tage', tasks: ['Anforderungen aufnehmen', 'Ziele definieren', 'Rahmenbedingungen klären'] },
  { phase: 'Konzeption', duration: '1-2 Wochen', tasks: ['Design entwickeln', 'Materialien auswählen', 'Kostenplanung'] },
  { phase: 'Produktion', duration: '2-4 Wochen', tasks: ['Fertigung', 'Qualitätskontrolle', 'Logistik planen'] },
  { phase: 'Umsetzung', duration: '1-2 Wochen', tasks: ['Montage vor Ort', 'Feinabstimmung', 'Abnahme'] },
];

const qualityPoints = [
  'Dokumentierte Qualitätsprüfung bei jedem Meilenstein',
  'Strukturierte Abnahmeprotokolle',
  'Nachbetreuung und Gewährleistung',
  'Transparente Kommunikation über alle Projektphasen',
];

export default function ProjektmanagementPage() {
  return (
    <div data-testid="projektmanagement-page" className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="initial" animate="animate" className="space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">Projektmanagement</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                  Struktur für große Umsetzungen
                </h1>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                Planung, Koordination und Qualitätssicherung für Flotten, Räume und Events – strukturiert und zuverlässig.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link to="/kontakt">
                  <Button data-testid="projektmanagement-cta" size="lg">
                    Projekt anfragen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[28px] overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClipboardList className="w-24 h-24 text-white/20" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Bausteine</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Leistungsbausteine</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full p-6">
                  <CardContent className="p-0 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white/70" />
                    </div>
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <p className="text-sm text-white/60">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Ablauf</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ablauf bei größeren Projekten</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-indigo-300/80">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">{phase.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-4">{phase.phase}</h3>
                  <ul className="space-y-2">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm text-white/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Qualität</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Qualität & Abnahme</h2>
              <p className="text-lg text-white/60 mb-8">
                Strukturierte Qualitätssicherung ist der Kern unseres Projektmanagements. Jeder Meilenstein wird dokumentiert und abgenommen.
              </p>
              <ul className="space-y-4">
                {qualityPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-indigo-300/80 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-[28px] overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
                <div className="h-full flex items-center justify-center">
                  <Shield className="w-32 h-32 text-white/10" />
                </div>
              </div>
            </motion.div>
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Großprojekt geplant?</h2>
              <p className="text-lg text-white/60 mb-10">
                Flotten-Rollout, Messeauftritt oder komplexe Raumgestaltung – wir übernehmen die Koordination.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/kontakt"><Button size="lg">Projekt besprechen</Button></Link>
                <Link to="/kontakt"><Button variant="secondary" size="lg">Angebot anfordern</Button></Link>
                <Link to="/kontakt"><Button variant="secondary" size="lg">Beratung vereinbaren</Button></Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
