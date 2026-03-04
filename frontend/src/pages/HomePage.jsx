import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Building2, Megaphone, Palette, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFeaturedProjects } from '../content/projects';
import { ClientLogos } from '../components/ClientLogos';
import { Statistics } from '../components/Statistics';
import { Testimonials } from '../components/Testimonials';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { SEOHead } from '../components/SEOHead';
import { hero, ctaSection, processSteps, targetAudiences, valueProposition } from '../content/site';
import images, { getProjectImage } from '../content/images';
import { useEditable } from '../contexts/EditorContext';
import { EditableImage } from '../components/EditableImage';

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

const serviceIcons = { Car, Building2, Megaphone, Palette };

const services = [
  {
    icon: 'Car',
    title: 'Mobilität',
    description: 'Fahrzeugveredelung & Schutz',
    features: ['PPF & Schutzfolien', 'Flottenbranding', 'Teil-/Vollfolierung', 'Designentwicklung'],
    href: '/mobilitaet',
    bgImage: '/images/porsche-gt3-cup-race.webp',
  },
  {
    icon: 'Building2',
    title: 'Raum & Architektur',
    description: 'Markenräume und Oberflächen',
    features: ['Raumgestaltung', 'Architekturfolierung', 'Glas- & Sichtschutzfolien', 'Interior Branding'],
    href: '/architektur-raum',
    bgImage: '/images/IMG_5646.webp',
  },
  {
    icon: 'Megaphone',
    title: 'Markenkommunikation',
    description: 'Großformat, Systeme, Event',
    features: ['Großformatmedien', 'Werbesysteme', 'Event- & Messegrafik', 'POS-Systeme'],
    href: '/markenkommunikation',
    bgImage: '/images/IMG_7190.webp',
  },
  {
    icon: 'Palette',
    title: 'Design & Konzeption',
    description: 'Leitlinien, die sich umsetzen lassen',
    features: ['Designkonzepte', 'Visuelle Leitlinien', 'Produktionsvorbereitung', 'Markenbegleitung'],
    href: '/design-konzepte',
    bgImage: '/images/IMG_7057.webp',
  }
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 6);
  
  // Editable content (falls back to content files when editor is not active)
  const heroHeadline = useEditable('hero.headline', hero.headline);
  const heroSubline = useEditable('hero.subline', hero.subline);
  const heroCta1 = useEditable('hero.ctaPrimary.label', hero.ctaPrimary.label);
  const heroCta2 = useEditable('hero.ctaSecondary.label', hero.ctaSecondary.label);
  const heroImg = useEditable('images.hero.src', images.hero.src);
  const ctaHeadline = useEditable('cta.headline', ctaSection.headline);
  const ctaSubline = useEditable('cta.subline', ctaSection.subline);
  
  return (
    <div data-testid="home-page" className="overflow-hidden">
      <SEOHead page="home" />
      {/* Hero Section */}
      <section data-testid="hero-section" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center" aria-label="Hero">
        {/* Background Image */}
        <EditableImage
          contentKey="images.hero.src"
          fallbackSrc={images.hero.src}
          alt={images.hero.alt}
          className="absolute inset-0 w-full h-full"
          priority
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-[#070910]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070910] via-[#070910]/40 to-[#070910]/60" />

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl space-y-8"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              {heroHeadline}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
            >
              {heroSubline}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link to={hero.ctaPrimary.href}>
                <Button data-testid="hero-cta-primary" size="lg">
                  {heroCta1}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={hero.ctaSecondary.href}>
                <Button data-testid="hero-cta-secondary" variant="secondary" size="lg">
                  {heroCta2}
                </Button>
              </Link>
            </motion.div>
            {/* Tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-4">
              {hero.tags.map((tag) => (
                <Link
                  key={tag.label}
                  to={tag.href}
                  className="px-4 py-1.5 text-xs font-medium text-white/70 bg-white/10 border border-white/15 rounded-full hover:text-white hover:bg-white/15 hover:border-white/25 transition-all duration-200 backdrop-blur-sm"
                >
                  {tag.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
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
                  <Card 
                    data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="relative h-full overflow-hidden"
                    style={{
                      backgroundImage: `url(${service.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {/* Dark Overlay - stronger on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#070910]/80 via-[#070910]/70 to-[#070910]/60 md:from-[#070910]/70 md:via-[#070910]/55 md:to-[#070910]/45 z-[1]" />
                    
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />
                    
                    <CardContent className="relative p-8 space-y-6 z-[2]">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        {React.createElement(serviceIcons[service.icon], { className: 'w-7 h-7 text-white' })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-white/70">{service.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm text-white/60">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400/80" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
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
                    {/* Project Image */}
                    {(() => {
                      const img = getProjectImage(project.slug);
                      return img ? (
                        <EditableImage
                          contentKey={`images.projects.${project.slug}.thumbnail`}
                          fallbackSrc={img.src}
                          alt={img.alt || project.title}
                          className="absolute inset-0 w-full h-full"
                          imgClassName="transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null;
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070910] via-[#070910]/60 to-transparent group-hover:via-[#070910]/50 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 relative z-10">
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
                <Link to={`/prozess/${step.slug}`}>
                  <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10 h-full hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                    <span className="text-4xl font-bold text-white/10">{step.num}</span>
                    <h3 className="text-lg font-bold mt-4 mb-2 group-hover:text-white transition-colors">{step.title}</h3>
                    <p className="text-sm text-white/50">{step.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-indigo-400/70 group-hover:text-indigo-400 transition-colors">
                      Mehr erfahren
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
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
                {ctaHeadline}
              </h2>
              <p className="text-lg text-white/60 mb-10">
                {ctaSubline}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {ctaSection.buttons.map((btn, i) => (
                  <Link key={i} to={btn.href}>
                    <Button data-testid={`cta-btn-${i}`} size="lg" variant={btn.variant}>
                      {btn.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
