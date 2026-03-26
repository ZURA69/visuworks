import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { SEOHead } from '../components/SEOHead';
import { useEditable } from '../contexts/EditorContext';

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
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Hero Section CMS
  const heroLabel = useEditable('kontakt.hero.label', 'Kontakt');
  const heroTitle = useEditable('kontakt.hero.title', 'Projekt anfragen');
  const heroDesc = useEditable('kontakt.hero.desc', 'Kurze Infos reichen – wir melden uns mit Rückfragen oder einem konkreten Vorschlag.');

  // Form Labels CMS
  const formNameLabel = useEditable('kontakt.form.nameLabel', 'Name *');
  const formEmailLabel = useEditable('kontakt.form.emailLabel', 'E-Mail *');
  const formPhoneLabel = useEditable('kontakt.form.phoneLabel', 'Telefon');
  const formServiceLabel = useEditable('kontakt.form.serviceLabel', 'Welche Leistung?');
  const formMessageLabel = useEditable('kontakt.form.messageLabel', 'Ihre Nachricht *');
  const formSubmitLabel = useEditable('kontakt.form.submitLabel', 'Anfrage senden');

  // Sidebar CMS
  const sectionTitle = useEditable('kontakt.sidebar.title', 'Direkt erreichen');
  const contactEmail = useEditable('kontakt.sidebar.email', 'info@visuworks.de');
  const contactPhone = useEditable('kontakt.sidebar.phone', '+49 211 123 456 78');
  const contactLocation = useEditable('kontakt.sidebar.location', 'Düsseldorf');
  const footerText = useEditable('kontakt.sidebar.footer', 'Projekte europaweit · Standort Düsseldorf');
  const ctaText = useEditable('kontakt.sidebar.cta', 'Projekt anfragen');
  const ctaUrl = useEditable('kontakt.sidebar.ctaUrl', '/kontakt#form');

  const phoneClean = (contactPhone || '').replace(/\s/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = ContactService.validate(formData);
    if (!validation.isValid) { setErrors(validation.errors); return; }
    setIsSubmitting(true);
    try {
      const result = await ContactService.submit(formData);
      if (result.success) { toast.success(result.message); navigate('/danke'); }
      else { toast.error(result.message); }
    } catch (error) { toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'); }
    finally { setIsSubmitting(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) { setErrors(prev => ({ ...prev, [name]: '' })); }
  };

  return (
    <div data-testid="kontakt-page" className="overflow-hidden">
      <SEOHead page="kontakt" />

      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-20"
          >
            <p className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-[0.15em] mb-6">{heroLabel}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.04em] leading-[0.95] mb-6 text-[#1A1A1A]">
              {heroTitle}
            </h1>
            <p className="text-base md:text-lg text-[#6B6B6B] font-light">
              {heroDesc}
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form" noValidate>
                <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                  <input type="text" name="website" value={formData.website} onChange={handleChange} autoComplete="off" tabIndex={-1} />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-medium text-[#6B6B6B] mb-2.5">{formNameLabel}</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ihr Name" data-testid="input-name" aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={errors.name ? 'border-red-500/50' : ''} />
                    {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[13px] font-medium text-[#6B6B6B] mb-2.5">{formEmailLabel}</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ihre@email.de" data-testid="input-email" aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={errors.email ? 'border-red-500/50' : ''} />
                    {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[13px] font-medium text-[#6B6B6B] mb-2.5">{formPhoneLabel}</label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+49 ..." data-testid="input-phone" />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-[13px] font-medium text-[#6B6B6B] mb-2.5">{formServiceLabel}</label>
                    <select id="service" name="service" value={formData.service} onChange={handleChange} data-testid="input-service"
                      className="flex h-12 w-full bg-black/[0.02] border border-black/[0.08] px-4 py-2 text-[#1A1A1A] text-sm focus:border-black/20 focus:ring-1 focus:ring-black/20 focus:outline-none transition-all duration-300">
                      <option value="" className="bg-[#F5F2ED]">Bitte wählen...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#F5F2ED]">{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[13px] font-medium text-[#6B6B6B] mb-2.5">{formMessageLabel}</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage..." rows={5} data-testid="input-message" aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} className={errors.message ? 'border-red-500/50' : ''} />
                  {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1" role="alert">{errors.message}</p>}
                </div>

                <Button type="submit" disabled={isSubmitting} data-testid="submit-button" className="w-full sm:w-auto">
                  {isSubmitting ? 'Wird gesendet...' : formSubmitLabel}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="border border-black/[0.07] p-8 space-y-8">
                <div>
                  <h2 className="text-base font-medium mb-6 tracking-[-0.01em] text-[#1A1A1A]">{sectionTitle}</h2>
                  <address className="not-italic space-y-5">
                    <a href={`mailto:${contactEmail}`} className="flex items-center gap-4 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-300 group">
                      <div className="w-10 h-10 flex items-center justify-center border border-black/[0.08] group-hover:border-black/15 transition-colors duration-300">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="text-sm">{contactEmail}</span>
                    </a>
                    <a href={`tel:${phoneClean}`} className="flex items-center gap-4 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-300 group">
                      <div className="w-10 h-10 flex items-center justify-center border border-black/[0.08] group-hover:border-black/15 transition-colors duration-300">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="text-sm">{contactPhone}</span>
                    </a>
                    <div className="flex items-center gap-4 text-[#6B6B6B]">
                      <div className="w-10 h-10 flex items-center justify-center border border-black/[0.08]">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="text-sm">{contactLocation}</span>
                    </div>
                  </address>
                </div>

                <div>
                  <Link 
                    to={ctaUrl || '/kontakt'}
                    className="group flex items-center justify-center gap-2 w-full py-3 px-5 border border-black/[0.1] text-[13px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] hover:border-black/20 hover:bg-black/[0.02] transition-all duration-300"
                    data-testid="sidebar-cta-button"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </div>

                <div className="pt-6 border-t border-black/[0.07]">
                  <p className="text-[13px] text-[#9A9A9A]">{footerText}</p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}
