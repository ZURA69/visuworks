import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const serviceOptions = [
  { value: 'mobilitaet', label: 'Mobilität' },
  { value: 'architektur', label: 'Raum & Architektur' },
  { value: 'kommunikation', label: 'Markenkommunikation' },
  { value: 'design', label: 'Design & Konzeption' },
  { value: 'projektmanagement', label: 'Projektmanagement' },
];

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich';
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail ein';
    }
    if (!formData.message.trim()) newErrors.message = 'Nachricht ist erforderlich';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Anfrage erfolgreich gesendet!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div data-testid="kontakt-page" className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Vielen Dank!</h1>
          <p className="text-white/60 mb-8">
            Ihre Anfrage ist bei uns eingegangen. Wir melden uns zeitnah bei Ihnen – in der Regel innerhalb von 24 Stunden.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="secondary">
            Neue Anfrage
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div data-testid="kontakt-page" className="overflow-hidden">
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
            <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">Kontakt</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Projekt anfragen
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              Kurze Infos reichen – wir melden uns mit Rückfragen oder einem konkreten Vorschlag.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr Name"
                      data-testid="input-name"
                      className={errors.name ? 'border-red-500/50' : ''}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">E-Mail *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de"
                      data-testid="input-email"
                      className={errors.email ? 'border-red-500/50' : ''}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Telefon</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 ..."
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Welche Leistung?</label>
                    <select
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
                  <label className="block text-sm font-medium text-white/70 mb-2">Ihre Nachricht *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage..."
                    rows={5}
                    data-testid="input-message"
                    className={errors.message ? 'border-red-500/50' : ''}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="rounded-[22px] bg-[#0A0C14] border border-white/10 p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-6">Direkt erreichen</h3>
                  <div className="space-y-4">
                    <a href="mailto:info@visuworks.de" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span>info@visuworks.de</span>
                    </a>
                    <a href="tel:+4921112345678" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span>+49 211 123 456 78</span>
                    </a>
                    <div className="flex items-center gap-4 text-white/70">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span>Düsseldorf</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-white/50">
                    Projekte europaweit · Standort Düsseldorf
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
