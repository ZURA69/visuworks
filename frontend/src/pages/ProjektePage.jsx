import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const allProjects = [
  { id: 1, category: 'mobilität', title: 'Flottenbranding DAX-Konzern', desc: '50+ Fahrzeuge im einheitlichen Design', tags: ['Flotte', 'Folierung', 'B2B'] },
  { id: 2, category: 'mobilität', title: 'PPF Porsche 911 GT3', desc: 'Vollschutz mit Premium-Lackschutzfolie', tags: ['Schutz', 'Premium'] },
  { id: 3, category: 'mobilität', title: 'Designfolierung Mercedes-AMG', desc: 'Individuelle Vollfolierung mit Matt-Finish', tags: ['Design', 'Matt'] },
  { id: 4, category: 'mobilität', title: 'Flottenbranding Logistik', desc: 'Europaweiter Rollout für Spedition', tags: ['100+ Fahrzeuge', 'EU'] },
  { id: 5, category: 'architektur', title: 'Headquarters Tech-Konzern', desc: 'Glasfolierung und Leitsystem', tags: ['Office', 'Glas'] },
  { id: 6, category: 'architektur', title: 'Flagship Store Modemarke', desc: 'Interior Branding und Oberflächenveredelung', tags: ['Retail', 'Interior'] },
  { id: 7, category: 'architektur', title: 'Dental-Zentrum München', desc: 'Sichtschutzfolien und Ambiente-Gestaltung', tags: ['Praxis', 'Sichtschutz'] },
  { id: 8, category: 'architektur', title: 'Showroom Premium-Autohaus', desc: 'Komplette Markenraum-Gestaltung', tags: ['Showroom', 'Premium'] },
  { id: 9, category: 'kommunikation', title: 'Messestand IAA Frankfurt', desc: '800m² Standfläche, komplette Ausstattung', tags: ['Messe', '800m²'] },
  { id: 10, category: 'kommunikation', title: 'Produktlaunch Automobil', desc: 'Event-Grafik und Inszenierung', tags: ['Event', 'Launch'] },
  { id: 11, category: 'kommunikation', title: 'Fassadenwerbung Innenstadtlage', desc: '300m² beleuchtete Außenwerbung', tags: ['Outdoor', 'XXL'] },
  { id: 12, category: 'kommunikation', title: 'POS-Systeme Retail-Kette', desc: 'Bundesweiter Rollout Verkaufsständer', tags: ['POS', 'Rollout'] },
  { id: 13, category: 'design', title: 'CI-Entwicklung Startup', desc: 'Logo, Styleguide und Anwendungen', tags: ['CI', 'Branding'] },
  { id: 14, category: 'design', title: '3D-Rendering Messestand', desc: 'Fotorealistische Visualisierung', tags: ['3D', 'Rendering'] },
  { id: 15, category: 'design', title: 'Flottendesign-Richtlinie', desc: 'Design Manual für 200+ Fahrzeuge', tags: ['Manual', 'Flotte'] },
  { id: 16, category: 'event', title: 'Konferenz 2000 Teilnehmer', desc: 'Komplette Event-Grafik', tags: ['Konferenz', 'Großevent'] },
  { id: 17, category: 'event', title: 'Produktpräsentation Luxusmarke', desc: 'VIP-Event mit Premium-Ausstattung', tags: ['VIP', 'Premium'] },
  { id: 18, category: 'event', title: 'Firmenjubiläum Mittelstand', desc: 'Festakt und Ausstellung', tags: ['Jubiläum', 'B2B'] },
];

const categories = [
  { value: 'alle', label: 'Alle' },
  { value: 'mobilität', label: 'Mobilität' },
  { value: 'architektur', label: 'Architektur' },
  { value: 'kommunikation', label: 'Kommunikation' },
  { value: 'event', label: 'Event' },
  { value: 'design', label: 'Design' },
];

export default function ProjektePage() {
  const [activeCategory, setActiveCategory] = useState('alle');

  const filteredProjects = activeCategory === 'alle' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div data-testid="projekte-page" className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Projekte & Referenzen
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              Kuratiert. Präzise. Umgesetzt.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full max-w-2xl">
              <TabsList className="w-full flex-wrap h-auto gap-2 p-2">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.value} 
                    value={cat.value}
                    data-testid={`filter-${cat.value}`}
                    className="flex-1 min-w-[80px]"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                layout
              >
                <div 
                  data-testid={`project-card-${project.id}`}
                  className="group relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#0A0C14] border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-xs font-medium text-indigo-300/80 uppercase tracking-wider mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-white/50 mb-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-xs text-white/50 bg-white/5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ihr Projekt als nächstes?</h2>
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
                <Link to="/kontakt">
                  <Button variant="secondary" size="lg">
                    Angebot anfordern
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
