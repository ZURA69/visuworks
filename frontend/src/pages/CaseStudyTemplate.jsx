import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin, Calendar, Building2, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getProjectImage } from '../content/images';


// Reusable Case Study Template Component
export const CaseStudyTemplate = ({ project }) => {
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">Projekt nicht gefunden</p>
      </div>
    );
  }

  const projectImg = getProjectImage(project.slug);

  return (
    <div data-testid="case-study-page" className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end pb-16">
        <div className="absolute inset-0 overflow-hidden">
          {projectImg ? (
            <>
              <img
                src={projectImg.src}
                alt={projectImg.alt || project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070910] via-[#070910]/70 to-[#070910]/40" />
            </>
          ) : (
            <>
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
            </>
          )}
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 w-full">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/projekte" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Zurück zu Projekte
            </Link>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium text-indigo-300/80 uppercase tracking-wider bg-indigo-500/10 rounded-full mb-6">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              {project.shortDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10">
              <Building2 className="w-5 h-5 text-white/40 mb-3" />
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Kunde</p>
              <p className="font-medium">{project.client}</p>
            </div>
            <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10">
              <Layers className="w-5 h-5 text-white/40 mb-3" />
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Umfang</p>
              <p className="font-medium">{project.scope}</p>
            </div>
            <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10">
              <MapPin className="w-5 h-5 text-white/40 mb-3" />
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Standort</p>
              <p className="font-medium">{project.location}</p>
            </div>
            <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10">
              <Calendar className="w-5 h-5 text-white/40 mb-3" />
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Jahr</p>
              <p className="font-medium">{project.year}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Placeholder */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-[21/9] rounded-[28px] overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
          >
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/30 text-sm">Projekt-Hauptbild</p>
                <p className="text-white/20 text-xs mt-1">{project.title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Herausforderung</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Die Aufgabe</h2>
              <p className="text-lg text-white/70 leading-relaxed">{project.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Lösung</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Unser Ansatz</h2>
              <p className="text-lg text-white/70 leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Umsetzung</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Die Realisierung</h2>
            <p className="text-lg text-white/70 leading-relaxed">{project.implementation}</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Impressionen</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Galerie</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {project.gallery.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-[4/3] rounded-[20px] overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                >
                  <div className="h-full flex items-center justify-center">
                    <p className="text-white/30 text-sm text-center px-4">{item.alt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Result */}
      <section className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Ergebnis</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Das Resultat</h2>
            <p className="text-lg text-white/70 leading-relaxed">{project.result}</p>
          </motion.div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-4 py-2 text-sm text-white/60 bg-white/5 border border-white/10 rounded-full"
              >
                {tag}
              </span>
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ähnliches Projekt geplant?</h2>
              <p className="text-lg text-white/60 mb-10">
                Lassen Sie uns über Ihre Anforderungen sprechen – unverbindlich und persönlich.
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
                    Weitere Projekte
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyTemplate;
