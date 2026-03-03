import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Layers, Eye, Paintbrush, Box, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEOHead } from '../components/SEOHead';
import { Card, CardContent } from '../components/ui/card';
import { useEditor } from '../contexts/EditorContext';
import { EditableImage } from '../components/EditableImage';
import { getServiceImage } from '../content/images';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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
      <section className="relative min-h-[65vh] md:min-h-[70vh] flex items-center" aria-label="Hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="initial" animate="animate" className="space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">Raum & Architektur</p>
                <h1 data-testid="architektur-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                  {e('service.architektur.heroTitle', 'Markenräume und Oberflächen')}
                </h1>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                {e('service.architektur.heroDesc', 'Wir transformieren Räume in Markenerlebnisse – durch Architekturfolierung, Glasgestaltung und Interior Branding.')}
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link to="/kontakt">
                  <Button data-testid="architektur-cta" size="lg">
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
              <div className="aspect-[4/3] rounded-[28px] overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 relative">
                <EditableImage
                  contentKey="images.service.architektur.hero"
                  fallbackSrc={getServiceImage('architektur-raum')}
                  alt="Raum & Architektur"
                  className="absolute inset-0 w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070910]/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Leistungen</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Leistungen im Überblick</h2>
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
                    <h3 className="text-lg font-bold">{e(`service.architektur.services.${index}.title`, service.title)}</h3>
                    <p className="text-sm text-white/60">{e(`service.architektur.services.${index}.desc`, service.desc)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Zielgruppen</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Für wen wir arbeiten</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10"
              >
                <h3 className="font-bold mb-2">{group.title}</h3>
                <p className="text-sm text-white/50">{group.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Referenzen</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Typische Projekte</h2>
            </div>
            <Link to="/projekte">
              <Button variant="secondary">Alle Projekte <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to="/projekte">
                  <div className="group relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#0A0C14] border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="text-xs font-medium text-indigo-300/80 uppercase tracking-wider mb-2">{project.category}</span>
                      <h3 className="text-lg font-bold mb-3">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 text-xs text-white/50 bg-white/5 rounded-full">{tag}</span>
                        ))}
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
      <section className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Ablauf</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Unser Prozess</h2>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10"
              >
                <span className="text-sm font-bold text-indigo-300/80">{step.num}</span>
                <span className="text-sm font-medium text-white/70">{step.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Häufige Fragen</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-indigo-300/80 flex-shrink-0 mt-0.5" />
                      <h3 className="font-bold">{e(`service.architektur.faqs.${index}.q`, faq.q)}</h3>
                    </div>
                    <p className="text-sm text-white/60 pl-8">{e(`service.architektur.faqs.${index}.a`, faq.a)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{e('service.architektur.ctaTitle', 'Ihr Raumprojekt')}</h2>
              <p className="text-lg text-white/60 mb-10">
                {e('service.architektur.ctaDesc', 'Lassen Sie uns über Ihre Raumgestaltung sprechen – von der ersten Idee bis zur Umsetzung.')}
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
