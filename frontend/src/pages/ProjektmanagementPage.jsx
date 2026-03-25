import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, Users, Boxes, Wrench, CheckCircle, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEOHead } from '../components/SEOHead';
import { useEditor } from '../contexts/EditorContext';
import { EditableImage } from '../components/EditableImage';
import { getServiceImage } from '../content/images';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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
  const { getValue } = useEditor();
  const e = getValue || ((_, fb) => fb);

  return (
    <div data-testid="projektmanagement-page" className="overflow-hidden">
      <SEOHead page="projektmanagement" />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center" aria-label="Hero">
        <div className="absolute inset-0 overflow-hidden">
          <EditableImage
            contentKey="images.service.projektmanagement.hero"
            fallbackSrc={getServiceImage('projektmanagement')?.src}
            alt={getServiceImage('projektmanagement')?.alt || "Projektmanagement"}
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#050507]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/30" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-40">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div variants={fadeInUp}>
              <p className="text-[11px] font-medium text-white/35 uppercase tracking-[0.15em] mb-6">Projektmanagement</p>
              <h1 data-testid="projektmanagement-hero-title" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.04em] leading-[0.95]">
                {e('service.projektmanagement.heroTitle', 'Struktur für große Umsetzungen')}
              </h1>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-8 text-base md:text-lg text-white/45 max-w-lg leading-relaxed font-light">
              {e('service.projektmanagement.heroDesc', 'Planung, Koordination und Qualitätssicherung für Flotten, Räume und Events – strukturiert und zuverlässig.')}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10">
              <Link to="/kontakt">
                <Button data-testid="projektmanagement-cta" size="lg">Projekt anfragen<ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Bausteine</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Leistungsbausteine</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.6 }}>
                <div className="p-8 md:p-10 bg-[#050507] h-full hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/[0.1] mb-6">
                    <service.icon className="w-5 h-5 text-white/50" />
                  </div>
                  <h3 className="text-lg font-medium tracking-[-0.01em] mb-2">{e(`service.projektmanagement.services.${index}.title`, service.title)}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{e(`service.projektmanagement.services.${index}.desc`, service.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 md:py-40 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Ablauf</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Ablauf bei größeren Projekten</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-px bg-white/[0.06]">
            {timeline.map((phase, index) => (
              <motion.div key={phase.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="p-8 bg-[#050507] h-full hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl font-extralight text-white/20">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-[11px] text-white/25 px-2 py-1 border border-white/[0.08]">{phase.duration}</span>
                  </div>
                  <h3 className="text-base font-medium mb-4 tracking-[-0.01em]">{phase.phase}</h3>
                  <ul className="space-y-2.5">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-3 text-[13px] text-white/40">
                        <div className="w-1 h-1 bg-white/25 mt-2 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Qualität</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] mb-8">Qualität & Abnahme</h2>
              <p className="text-base text-white/40 mb-10 leading-relaxed font-light max-w-lg">
                Strukturierte Qualitätssicherung ist der Kern unseres Projektmanagements. Jeder Meilenstein wird dokumentiert und abgenommen.
              </p>
              <ul className="space-y-5">
                {qualityPoints.map((point, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-white/30 mt-2.5 flex-shrink-0" />
                    <span className="text-sm text-white/55 leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="aspect-square overflow-hidden border border-white/[0.06]">
                <div className="h-full flex items-center justify-center bg-[#050507]">
                  <Shield className="w-24 h-24 text-white/[0.05]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden border border-white/[0.06] p-12 md:p-20 lg:p-28">
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] leading-[1.1] mb-8">{e('service.projektmanagement.ctaTitle', 'Großprojekt geplant?')}</h2>
              <p className="text-base text-white/40 mb-12 leading-relaxed font-light max-w-lg">
                {e('service.projektmanagement.ctaDesc', 'Flotten-Rollout, Messeauftritt oder komplexe Raumgestaltung – wir übernehmen die Koordination.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/kontakt"><Button>Projekt besprechen</Button></Link>
                <Link to="/kontakt"><Button variant="secondary">Angebot anfordern</Button></Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
