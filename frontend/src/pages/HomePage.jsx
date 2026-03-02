import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Building2, Megaphone, Palette, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFeaturedProjects } from '../data/projects';
import { ClientLogos } from '../components/ClientLogos';
import { Statistics } from '../components/Statistics';
import { Testimonials } from '../components/Testimonials';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { SEOHead } from '../components/SEOHead';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const services = [
  {
    icon: Car,
    title: 'Mobilität',
    description: 'Fahrzeugveredelung & Schutz',
    features: ['PPF & Schutzfolien', 'Flottenbranding', 'Teil-/Vollfolierung', 'Designentwicklung'],
    href: '/mobilitaet'
  },
  {
    icon: Building2,
    title: 'Raum & Architektur',
    description: 'Markenräume und Oberflächen',
    features: ['Raumgestaltung', 'Architekturfolierung', 'Glas- & Sichtschutzfolien', 'Interior Branding'],
    href: '/architektur-raum'
  },
  {
    icon: Megaphone,
    title: 'Markenkommunikation',
    description: 'Großformat, Systeme, Event',
    features: ['Großformatmedien', 'Werbesysteme', 'Event- & Messegrafik', 'POS-Systeme'],
    href: '/markenkommunikation'
  },
  {
    icon: Palette,
    title: 'Design & Konzeption',
    description: 'Leitlinien, die sich umsetzen lassen',
    features: ['Designkonzepte', 'Visuelle Leitlinien', 'Produktionsvorbereitung', 'Markenbegleitung'],
    href: '/design-konzepte'
  }
];

const processSteps = [
  { num: '01', title: 'Analyse & Zieldefinition', desc: 'Anforderungen verstehen' },
  { num: '02', title: 'Design & Konzeption', desc: 'Visuelle Lösungen entwickeln' },
  { num: '03', title: 'Produktion', desc: 'Präzise Fertigung' },
  { num: '04', title: 'Umsetzung & Montage', desc: 'Professionelle Installation' },
  { num: '05', title: 'Qualitätssicherung', desc: 'Kontrolle & Abnahme' },
];

const targetAudiences = [
  { title: 'Privatkunden', focus: 'Mobilität', items: ['Fahrzeugfolierung', 'Lackschutz', 'Individual-Design'] },
  { title: 'Unternehmen', focus: 'Raum · Flotte · Event', items: ['Flottenbranding', 'Raumgestaltung', 'Messepräsenz'] },
  { title: 'Agenturen & Partner', focus: 'Design + Umsetzung', items: ['Produktionspartner', 'Designentwicklung', 'Projektabwicklung'] },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 6);
  
  return (
    <div data-testid="home-page" className="overflow-hidden">
      <SEOHead page="home" />
      {/* Hero Section */}
      <section data-testid="hero-section" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center" aria-label="Hero">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
              >
                Präsenz in ihrer stärksten Form.
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
              >
                Visuelle Marken- und Oberflächenlösungen für Mobilität, Architektur und Kommunikation – europaweit umgesetzt.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link to="/kontakt">
                  <Button data-testid="hero-cta-primary" size="lg">
                    Projekt starten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/projekte">
                  <Button data-testid="hero-cta-secondary" variant="secondary" size="lg">
                    Referenzen ansehen
                  </Button>
                </Link>
              </motion.div>
              {/* Tags */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-4">
                {[
                  { label: 'B2B', href: '/projektmanagement' },
                  { label: 'Flotten', href: '/mobilitaet' },
                  { label: 'Messe/Event', href: '/markenkommunikation' },
                  { label: 'Architektur', href: '/architektur-raum' },
                  { label: 'Design', href: '/design-konzepte' },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={tag.href}
                    className="px-4 py-1.5 text-xs font-medium text-white/60 bg-white/5 border border-white/10 rounded-full hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    {tag.label}
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[28px] overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Palette className="w-10 h-10 text-white/40" />
                    </div>
                    <p className="text-white/40 text-sm">Premium Showcase</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <ClientLogos />
        </div>
      </section>

      {/* Services Section */}
      <section data-testid="services-section" className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Leistungen</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Klar strukturiert</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={service.href}>
                  <Card data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="h-full p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="relative p-0 space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <service.icon className="w-7 h-7 text-white/70" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-white/60">{service.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm text-white/50">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400/70" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        Mehr erfahren
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section data-testid="projects-preview-section" className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Portfolio</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ausgewählte Projekte</h2>
            </div>
            <Link to="/projekte">
              <Button variant="secondary">
                Alle Projekte
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link to={`/projekte/${project.slug}`}>
                  <div data-testid={`project-tile-${project.id}`} className="group relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#0A0C14] border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="text-xs font-medium text-indigo-300/80 uppercase tracking-wider mb-2">{project.category}</span>
                      <h3 className="text-lg font-bold mb-3">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2.5 py-1 text-xs text-white/50 bg-white/5 rounded-full">
                            {tag}
                          </span>
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

      {/* Process Section */}
      <section data-testid="process-section" className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Ablauf</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Unser Prozess</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10 h-full">
                  <span className="text-4xl font-bold text-white/10">{step.num}</span>
                  <h3 className="text-lg font-bold mt-4 mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences Section */}
      <section data-testid="audiences-section" className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Zielgruppen</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Für wen wir arbeiten</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {targetAudiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-8">
                  <CardContent className="p-0 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{audience.title}</h3>
                      <p className="text-sm text-indigo-300/80">{audience.focus}</p>
                    </div>
                    <ul className="space-y-2">
                      {audience.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* Testimonials Section */}
      <Testimonials className="bg-white/[0.02]" />

      {/* Newsletter Section */}
      <NewsletterSignup />

      {/* CTA Section */}
      <section data-testid="cta-section" className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-12 md:p-20"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Projekt besprechen?
              </h2>
              <p className="text-lg text-white/60 mb-10">
                Lassen Sie uns über Ihr Projekt sprechen – unverbindlich und persönlich.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/kontakt">
                  <Button data-testid="cta-discuss" size="lg">
                    Projekt besprechen
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button data-testid="cta-quote" variant="secondary" size="lg">
                    Angebot anfordern
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button data-testid="cta-consult" variant="secondary" size="lg">
                    Beratung vereinbaren
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
