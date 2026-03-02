import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Car, Palette, Users, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEOHead } from '../components/SEOHead';
import { Card, CardContent } from '../components/ui/card';
import { servicePages } from '../content/services';
import { processSteps } from '../content/site';


const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const pageContent = servicePages.mobilitaet;
const services = pageContent.services;
const projects = pageContent.projects;
const faqs = pageContent.faqs;

const serviceIcons = [Shield, Users, Car, Palette];

export default function MobilitaetPage() {
  return (
    <div data-testid="mobilitaet-page" className="overflow-hidden">
      <SEOHead page="mobilitaet" />
      
      
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
                <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">Mobilität</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                  Fahrzeugveredelung & Schutz
                </h1>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                Von der Lackschutzfolie bis zum kompletten Flottenbranding – wir realisieren Ihre Fahrzeugprojekte mit Präzision und Premium-Qualität.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link to="/kontakt">
                  <Button data-testid="mobilitaet-cta" size="lg">
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
                  <Car className="w-24 h-24 text-white/20" />
                </div>
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

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-8">
                  <CardContent className="p-0 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-white/70" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-white/60">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 md:py-32 bg-white/[0.02]">
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
      <section className="py-24 md:py-32">
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
      <section className="py-24 md:py-32 bg-white/[0.02]">
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
                      <h3 className="font-bold">{faq.q}</h3>
                    </div>
                    <p className="text-sm text-white/60 pl-8">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-12 md:p-20"
          >
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ihr Fahrzeugprojekt</h2>
              <p className="text-lg text-white/60 mb-10">
                Ob Einzelfahrzeug oder Flotte – wir beraten Sie gerne zu den Möglichkeiten.
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
