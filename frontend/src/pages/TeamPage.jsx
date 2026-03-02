import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Mail, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

const team = [
  {
    name: 'Max Mustermann',
    role: 'Geschäftsführer',
    bio: '15+ Jahre Erfahrung in der visuellen Markenführung. Verantwortlich für Strategie und Kundenbeziehungen.',
    linkedin: 'https://linkedin.com/',
    email: 'max@visuworks.de',
  },
  {
    name: 'Anna Schmidt',
    role: 'Leiterin Design',
    bio: 'Kreativdirektorin mit Fokus auf Markenentwicklung und konzeptionelle Gestaltung.',
    linkedin: 'https://linkedin.com/',
    email: 'anna@visuworks.de',
  },
  {
    name: 'Thomas Weber',
    role: 'Leiter Produktion',
    bio: 'Experte für Großformatdruck und Folierungstechnik. Qualitätssicherung und Prozessoptimierung.',
    linkedin: 'https://linkedin.com/',
    email: 'thomas@visuworks.de',
  },
  {
    name: 'Sarah Müller',
    role: 'Projektmanagement',
    bio: 'Koordination komplexer Projekte mit Fokus auf termingerechte Umsetzung und Kundenzufriedenheit.',
    linkedin: 'https://linkedin.com/',
    email: 'sarah@visuworks.de',
  },
];

const values = [
  {
    title: 'Präzision',
    description: 'Jedes Detail zählt. Wir arbeiten mit höchster Sorgfalt und Genauigkeit.',
  },
  {
    title: 'Partnerschaft',
    description: 'Langfristige Beziehungen statt einmaliger Aufträge. Wir wachsen mit unseren Kunden.',
  },
  {
    title: 'Innovation',
    description: 'Neue Materialien, Techniken und Ideen. Wir bleiben am Puls der Zeit.',
  },
  {
    title: 'Verlässlichkeit',
    description: 'Was wir zusagen, halten wir. Termintreue und Qualität sind für uns selbstverständlich.',
  },
];

export default function TeamPage() {
  return (
    <div data-testid="team-page" className="overflow-hidden">
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
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">Über uns</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Das Team hinter VISUWORKS
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              Experten aus Design, Produktion und Projektmanagement – vereint in der Leidenschaft 
              für visuelle Exzellenz.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-[24px] bg-[#0A0C14] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                  {/* Avatar Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white/20" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-indigo-300/80 mb-3">{member.role}</p>
                    <p className="text-sm text-white/50 mb-4">{member.bio}</p>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                        aria-label={`${member.name} auf LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                        aria-label={`E-Mail an ${member.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Werte</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Wofür wir stehen</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-[20px] bg-white/[0.02] border border-white/10"
              >
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-white/50">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Unternehmen</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                15 Jahre Erfahrung im Premium-Segment
              </h2>
              <div className="space-y-4 text-white/70">
                <p>
                  VISUWORKS wurde 2010 in Düsseldorf gegründet mit dem Ziel, visuelle 
                  Markenlösungen auf höchstem Niveau zu realisieren. Was als kleine 
                  Werkstatt begann, ist heute ein Full-Service-Partner für Unternehmen 
                  in ganz Europa.
                </p>
                <p>
                  Unser Standort in Düsseldorf ist das Zentrum unserer Aktivitäten, 
                  aber unsere Projekte führen uns durch ganz Europa – von der kleinen 
                  Fahrzeugfolierung bis zum internationalen Flotten-Rollout.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] rounded-[28px] overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                <div className="h-full flex items-center justify-center">
                  <p className="text-white/30 text-sm">Unternehmensstandort Düsseldorf</p>
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Zusammenarbeit starten?
              </h2>
              <p className="text-lg text-white/60 mb-10">
                Lernen Sie uns kennen – wir freuen uns auf Ihr Projekt.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/kontakt">
                  <Button size="lg">
                    Kontakt aufnehmen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/projekte">
                  <Button variant="secondary" size="lg">
                    Projekte ansehen
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
