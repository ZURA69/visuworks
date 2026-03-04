import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { SEOHead } from '../components/SEOHead';
import { useEditable } from '../hooks/useEditable';

import { ContactService } from '../services/contactService';
import { toast } from 'sonner';

const serviceOptions = [
  { value: 'mobilitaet', label: 'Mobilität' },
  { value: 'architektur', label: 'Raum & Architektur' },
  { value: 'kommunikation', label: 'Markenkommunikation' },
  { value: 'design', label: 'Design & Konzeption' },
  { value: 'projektmanagement', label: 'Projektmanagement' },
];

export default function KontaktPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '', // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Editable content
  const sectionTitle = useEditable('kontakt.sidebar.title', 'Direkt erreichen');
  const contactEmail = useEditable('kontakt.sidebar.email', 'info@visuworks.de');
  const contactPhone = useEditable('kontakt.sidebar.phone', '+49 211 123 456 78');
  const contactLocation = useEditable('kontakt.sidebar.location', 'Düsseldorf');
  const footerText = useEditable('kontakt.sidebar.footer', 'Projekte europaweit · Standort Düsseldorf');
  const ctaText = useEditable('kontakt.sidebar.cta', 'Projekt anfragen');
  const ctaUrl = useEditable('kontakt.sidebar.ctaUrl', '/kontakt#form');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = ContactService.validate(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await ContactService.submit(formData);
      
      if (result.success) {
        toast.success(result.message);
        navigate('/danke');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div data-testid="kontakt-page" className="overflow-hidden">
      <SEOHead page="kontakt" />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">Kontakt</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Projekt anfragen
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              Kurze Infos reichen – wir melden uns mit Rückfragen oder einem konkreten Vorschlag.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form" noValidate>
                {/* Honeypot - hidden from users */}
                <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name *</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr Name"
                      data-testid="input-name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={errors.name ? 'border-red-500/50' : ''}
                    />
                    {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">E-Mail *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de"
                      data-testid="input-email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={errors.email ? 'border-red-500/50' : ''}
                    />
                    {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Telefon</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 ..."
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-white/70 mb-2">Welche Leistung?</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      data-testid="input-service"
                      className="flex h-12 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white text-base focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-all duration-200"
                    >
                      <option value="" className="bg-[#0A0C14]">Bitte wählen...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#0A0C14]">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Ihre Nachricht *</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage..."
                    rows={5}
                    data-testid="input-message"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={errors.message ? 'border-red-500/50' : ''}
                  />
                  {errors.message && <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  data-testid="submit-button"
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="rounded-[22px] bg-[#0A0C14] border border-white/10 p-8 space-y-8">
                <div>
                  <h2 className="text-lg font-bold mb-6">Direkt erreichen</h2>
                  <address className="not-italic space-y-4">
                    <a href="mailto:info@visuworks.de" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span>info@visuworks.de</span>
                    </a>
                    <a href="tel:+4921112345678" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <Phone className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span>+49 211 123 456 78</span>
                    </a>
                    <div className="flex items-center gap-4 text-white/70">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span>Düsseldorf</span>
                    </div>
                  </address>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-white/50">
                    Projekte europaweit · Standort Düsseldorf
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}
