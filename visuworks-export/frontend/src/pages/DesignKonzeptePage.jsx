import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Lightbulb, FileCode, Users } from 'lucide-react';
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
  { icon: Lightbulb, title: 'Designkonzepte', desc: 'Visuelle Ideen und Konzepte für Ihre Projekte' },
  { icon: Palette, title: 'Visuelle Leitlinien', desc: 'Styleguides und Designrichtlinien für Konsistenz' },
  { icon: FileCode, title: 'Produktionsvorbereitung', desc: 'Druckdaten, Plotdaten und technische Dokumentation' },
  { icon: Users, title: 'Ganzheitliche Markenbegleitung', desc: 'Langfristige Designpartnerschaft für Ihre Marke' },
];

const process = [
  { title: 'Briefing', desc: 'Anforderungen und Ziele definieren' },
  { title: 'Entwurf', desc: 'Konzepte und erste Visualisierungen' },
  { title: 'Abstimmung', desc: 'Feedback und Feintuning' },
  { title: 'Reinzeichnung', desc: 'Produktionsreife Daten erstellen' },
];

const projects = [
  { id: 1, category: 'Konzept', title: 'CI-Entwicklung Startup', tags: ['Logo', 'Styleguide'] },
  { id: 2, category: 'Visualisierung', title: '3D-Rendering Messestand', tags: ['3D', 'Animation'] },
  { id: 3, category: 'Leitlinie', title: 'Flottendesign-Richtlinie', tags: ['Manual', 'Templates'] },
];

const processSteps = [
  { num: '01', title: 'Analyse & Zieldefinition' },
  { num: '02', title: 'Design & Konzeption' },
  { num: '03', title: 'Produktion' },
  { num: '04', title: 'Umsetzung & Montage' },
  { num: '05', title: 'Qualitätssicherung' },
];

const faqs = [
  { q: 'Übernehmen Sie auch die Umsetzung?', a: 'Ja, das ist unsere Stärke: Wir denken von Anfang an produktionsorientiert und können nahtlos in die Umsetzung übergehen.' },
  { q: 'Arbeiten Sie auch für Agenturen?', a: 'Selbstverständlich. Wir sind verlässlicher White-Label-Partner für Agenturen, die Produktionskompetenz benötigen.' },
  { q: 'Welche Formate liefern Sie?', a: 'Alle gängigen Formate: Print-PDFs, Plotdaten, Vektorgrafiken, 3D-Renderings – immer abgestimmt auf den Verwendungszweck.' },
  { q: 'Wie läuft die Abstimmung ab?', a: 'Transparent und effizient: Klare Meilensteine, regelmäßige Präsentationen und strukturiertes Feedback.' },
];

export default function DesignKonzeptePage() {
  const { getValue } = useEditor();
  const e = getValue || ((_, fb) => fb);

  return (
    <div data-testid="design-konzepte-page" className="overflow-hidden">
      <SEOHead page="design" />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center" aria-label="Hero">
        <div className="absolute inset-0 overflow-hidden">
          <EditableImage
            contentKey="images.service.design.hero"
            fallbackSrc={getServiceImage('design-konzepte')?.src}
            alt={getServiceImage('design-konzepte')?.alt || "Design & Konzeption"}
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2ED] via-transparent to-black/20" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-40">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div variants={fadeInUp}>
              <p className="text-[11px] font-medium text-white/60 uppercase tracking-[0.15em] mb-6">Design & Konzeption</p>
              <h1 data-testid="design-hero-title" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.04em] leading-[0.95] text-white">
                {e('service.design.heroTitle', 'Leitlinien, die sich umsetzen lassen')}
              </h1>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-8 text-base md:text-lg text-white/70 max-w-lg leading-relaxed font-light">
              {e('service.design.heroDesc', 'Design mit Produktionsfokus – wir entwickeln Konzepte, die nicht nur gut aussehen, sondern sich auch realisieren lassen.')}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10">
              <Link to="/kontakt">
                <Button data-testid="design-cta" size="lg">Projekt anfragen<ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-[0.15em] mb-5">Leistungen</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Leistungen im Überblick</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-px bg-black/[0.06]">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="p-8 md:p-10 bg-[#F5F2ED] h-full hover:bg-black/[0.02] transition-colors duration-500">
                  <div className="w-10 h-10 flex items-center justify-center border border-black/[0.08] mb-6">
                    <service.icon className="w-5 h-5 text-[#6B6B6B]" />
                  </div>
                  <h3 className="text-lg font-medium tracking-[-0.01em] mb-2">{e(`service.design.services.${index}.title`, service.title)}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{e(`service.design.services.${index}.desc`, service.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-28 md:py-40 border-t border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-[0.15em] mb-5">Designprozess</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Von der Idee zur Umsetzung</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.06]">
            {process.map((step, index) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="p-8 bg-[#F5F2ED] h-full hover:bg-black/[0.02] transition-colors duration-500">
                  <span className="text-4xl font-extralight text-black/[0.06] tracking-[-0.04em]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-base font-medium mt-5 mb-2">{step.title}</h3>
                  <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <p className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-[0.15em] mb-5">Referenzen</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Typische Projekte</h2>
            </div>
            <Link to="/projekte"><Button variant="secondary">Alle Projekte <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <Link to="/projekte">
                  <div className="group relative aspect-[4/3] overflow-hidden bg-[#E8E4DD] border border-black/[0.06] hover:border-black/[0.12] transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="text-[11px] font-medium text-[#6B6B6B] uppercase tracking-[0.1em] mb-2">{project.category}</span>
                      <h3 className="text-lg font-light tracking-[-0.01em] mb-3">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (<span key={tag} className="px-2.5 py-1 text-[11px] text-[#6B6B6B] border border-black/[0.08]">{tag}</span>))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-28 md:py-40 border-t border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-[0.15em] mb-5">Ablauf</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Unser Prozess</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {processSteps.map((step, index) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.5 }}
                className="flex items-center gap-3 px-5 py-2.5 border border-black/[0.08] hover:border-black/[0.12] transition-all duration-300">
                <span className="text-[13px] font-medium text-[#9A9A9A]">{step.num}</span>
                <span className="text-[13px] font-light text-[#6B6B6B]">{step.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-[0.15em] mb-5">FAQ</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Häufige Fragen</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-px bg-black/[0.06]">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="p-8 md:p-10 bg-[#F5F2ED] h-full">
                  <h3 className="font-medium text-[#1A1A1A] mb-3 tracking-[-0.01em]">{e(`service.design.faqs.${index}.q`, faq.q)}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{e(`service.design.faqs.${index}.a`, faq.a)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 border-t border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden border border-black/[0.06] p-12 md:p-20 lg:p-28">
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] leading-[1.1] mb-8">{e('service.design.ctaTitle', 'Ihr Designprojekt')}</h2>
              <p className="text-base text-[#6B6B6B] mb-12 leading-relaxed font-light max-w-lg">
                {e('service.design.ctaDesc', 'Konzept, Visualisierung oder komplette Umsetzung – lassen Sie uns über Ihre Anforderungen sprechen.')}
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
