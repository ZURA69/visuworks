import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Layers, Eye, Paintbrush, Box } from 'lucide-react';
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
  { icon: Building2, title: 'Raumgestaltung', desc: 'Ganzheitliche Konzepte für Ihre Markenräume' },
  { icon: Layers, title: 'Architekturfolierung', desc: 'Oberflächenveredelung für Fassaden und Innenräume' },
  { icon: Eye, title: 'Glas- & Sichtschutzfolien', desc: 'Funktionale und ästhetische Glaslösungen' },
  { icon: Paintbrush, title: 'Interior Branding', desc: 'Markenidentität in Ihren Räumen verankern' },
  { icon: Box, title: 'Oberflächenveredelung', desc: 'Premium-Finish für Möbel und Einbauten' },
  { icon: Building2, title: 'Raumkonzepte', desc: 'Von der Idee zur fertigen Raumgestaltung' },
];

const targetGroups = [
  { title: 'Unternehmen', desc: 'Corporate Offices, Empfangsbereiche, Meetingräume' },
  { title: 'Praxen & Kliniken', desc: 'Wartebereiche, Behandlungsräume, Leitsysteme' },
  { title: 'Innenarchitekten', desc: 'Umsetzungspartner für Ihre Entwürfe' },
  { title: 'Ladenbau', desc: 'Retail-Flächen, Showrooms, POS-Gestaltung' },
];

const projects = [
  { id: 1, category: 'Office', title: 'Headquarters Tech-Konzern', tags: ['Glasfolierung', 'Leitsystem'] },
  { id: 2, category: 'Retail', title: 'Flagship Store Modemarke', tags: ['Interior', 'Oberfläche'] },
  { id: 3, category: 'Praxis', title: 'Dental-Zentrum München', tags: ['Sichtschutz', 'Ambiente'] },
];

const processSteps = [
  { num: '01', title: 'Analyse & Zieldefinition' },
  { num: '02', title: 'Design & Konzeption' },
  { num: '03', title: 'Produktion' },
  { num: '04', title: 'Umsetzung & Montage' },
  { num: '05', title: 'Qualitätssicherung' },
];

const faqs = [
  { q: 'Welche Oberflächen können foliert werden?', a: 'Nahezu alle glatten Oberflächen: Glas, Metall, Holz, Kunststoff. Wir beraten Sie zu den Möglichkeiten Ihrer spezifischen Anwendung.' },
  { q: 'Wie lange dauert ein Raumprojekt?', a: 'Je nach Umfang 2-8 Wochen von der Konzeption bis zur Fertigstellung. Für zeitkritische Projekte bieten wir Express-Optionen.' },
  { q: 'Arbeiten Sie mit Innenarchitekten zusammen?', a: 'Ja, wir sind etablierter Produktionspartner für Architektur- und Designbüros und setzen deren Entwürfe präzise um.' },
  { q: 'Gibt es Mustermaterialien?', a: 'Selbstverständlich. Wir senden Ihnen gerne ein Musterpaket mit den für Ihr Projekt relevanten Materialien zu.' },
];

export default function ArchitekturRaumPage() {
  const { getValue } = useEditor();
  const e = getValue || ((_, fb) => fb);

  return (
    <div data-testid="architektur-raum-page" className="overflow-hidden">
      <SEOHead page="architektur" />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center" aria-label="Hero">
        <div className="absolute inset-0 overflow-hidden">
          <EditableImage
            contentKey="images.service.architektur.hero"
            fallbackSrc={getServiceImage('architektur-raum')?.src}
            alt={getServiceImage('architektur-raum')?.alt || "Raum & Architektur"}
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#050507]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/30" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-40">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div variants={fadeInUp}>
              <p className="text-[11px] font-medium text-white/35 uppercase tracking-[0.15em] mb-6">Raum & Architektur</p>
              <h1 data-testid="architektur-hero-title" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.04em] leading-[0.95]">
                {e('service.architektur.heroTitle', 'Markenräume und Oberflächen')}
              </h1>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-8 text-base md:text-lg text-white/45 max-w-lg leading-relaxed font-light">
              {e('service.architektur.heroDesc', 'Wir transformieren Räume in Markenerlebnisse – durch Architekturfolierung, Glasgestaltung und Interior Branding.')}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10">
              <Link to="/kontakt">
                <Button data-testid="architektur-cta" size="lg">
                  Projekt anfragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Leistungen</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Leistungen im Überblick</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.6 }}>
                <div className="p-8 md:p-10 bg-[#050507] h-full hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/[0.1] mb-6">
                    <service.icon className="w-5 h-5 text-white/50" />
                  </div>
                  <h3 className="text-lg font-medium tracking-[-0.01em] mb-2">{e(`service.architektur.services.${index}.title`, service.title)}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{e(`service.architektur.services.${index}.desc`, service.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-28 md:py-40 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Zielgruppen</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Für wen wir arbeiten</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
            {targetGroups.map((group, index) => (
              <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="p-8 bg-[#050507] h-full hover:bg-white/[0.02] transition-colors duration-500">
                  <h3 className="font-medium mb-2 tracking-[-0.01em]">{group.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{group.desc}</p>
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
              <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Referenzen</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Typische Projekte</h2>
            </div>
            <Link to="/projekte"><Button variant="secondary">Alle Projekte <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <Link to="/projekte">
                  <div className="group relative aspect-[4/3] overflow-hidden bg-[#0A0C14] border border-white/[0.06] hover:border-white/15 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="text-[11px] font-medium text-white/35 uppercase tracking-[0.1em] mb-2">{project.category}</span>
                      <h3 className="text-lg font-light tracking-[-0.01em] mb-3">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (<span key={tag} className="px-2.5 py-1 text-[11px] text-white/35 border border-white/[0.08]">{tag}</span>))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 md:py-40 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Ablauf</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Unser Prozess</h2>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {processSteps.map((step, index) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.5 }}
                className="flex items-center gap-3 px-5 py-2.5 border border-white/[0.08] hover:border-white/15 transition-all duration-300">
                <span className="text-[13px] font-medium text-white/25">{step.num}</span>
                <span className="text-[13px] font-light text-white/55">{step.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">FAQ</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Häufige Fragen</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="p-8 md:p-10 bg-[#050507] h-full">
                  <h3 className="font-medium text-white/80 mb-3 tracking-[-0.01em]">{e(`service.architektur.faqs.${index}.q`, faq.q)}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{e(`service.architektur.faqs.${index}.a`, faq.a)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden border border-white/[0.06] p-12 md:p-20 lg:p-28">
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] leading-[1.1] mb-8">{e('service.architektur.ctaTitle', 'Ihr Raumprojekt')}</h2>
              <p className="text-base text-white/40 mb-12 leading-relaxed font-light max-w-lg">
                {e('service.architektur.ctaDesc', 'Lassen Sie uns über Ihre Raumgestaltung sprechen – von der ersten Idee bis zur Umsetzung.')}
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
