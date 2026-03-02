import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const NewsletterSignup = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    setStatus('loading');

    // Simulate API call - Replace with actual newsletter service
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, always succeed
    setStatus('success');
    setEmail('');
    
    // Reset after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  if (variant === 'minimal') {
    return (
      <div data-testid="newsletter-signup-minimal">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-400"
          >
            <Check className="w-5 h-5" />
            <span className="text-sm">Erfolgreich angemeldet!</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Ihre E-Mail"
              className="flex-1 h-10 text-sm"
              disabled={status === 'loading'}
              data-testid="newsletter-email-input"
            />
            <Button
              type="submit"
              size="sm"
              disabled={status === 'loading'}
              className="h-10 px-4"
              data-testid="newsletter-submit-button"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-xs text-red-400 mt-2">{errorMessage}</p>
        )}
      </div>
    );
  }

  return (
    <section className="py-20 md:py-24" data-testid="newsletter-signup">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 p-10 md:p-16"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Mail className="w-7 h-7 text-indigo-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Bleiben Sie informiert
              </h2>
              <p className="text-lg text-white/60 max-w-md">
                Erhalten Sie Updates zu neuen Projekten, Trends und exklusive Einblicke 
                in unsere Arbeit. Kein Spam – versprochen.
              </p>
            </div>

            {/* Form */}
            <div>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-8 rounded-2xl bg-white/5 border border-green-500/20"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Vielen Dank!</h3>
                  <p className="text-white/60">Sie wurden erfolgreich angemeldet.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Ihre E-Mail-Adresse"
                      className={`h-14 text-base ${status === 'error' ? 'border-red-500/50' : ''}`}
                      disabled={status === 'loading'}
                      data-testid="newsletter-email-input-full"
                    />
                    {status === 'error' && (
                      <p className="text-sm text-red-400 mt-2">{errorMessage}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                    className="w-full"
                    data-testid="newsletter-submit-button-full"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Wird angemeldet...
                      </>
                    ) : (
                      <>
                        Newsletter abonnieren
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-white/40 text-center">
                    Mit der Anmeldung stimmen Sie unserer{' '}
                    <a href="/datenschutz" className="underline hover:text-white/60">
                      Datenschutzerklärung
                    </a>{' '}
                    zu.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
