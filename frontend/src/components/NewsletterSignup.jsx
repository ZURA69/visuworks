import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
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
    <section className="py-28 md:py-36" data-testid="newsletter-signup">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border border-white/[0.06] p-10 md:p-16 lg:p-20"
        >
          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[-0.03em] mb-5">
                Bleiben Sie informiert
              </h2>
              <p className="text-sm text-white/40 max-w-md leading-relaxed font-light">
                Erhalten Sie Updates zu neuen Projekten, Trends und exklusive Einblicke 
                in unsere Arbeit. Kein Spam.
              </p>
            </div>

            {/* Form */}
            <div>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-8 border border-white/[0.08]"
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-white/15">
                    <Check className="w-5 h-5 text-white/60" />
                  </div>
                  <h3 className="text-lg font-light mb-2">Vielen Dank</h3>
                  <p className="text-sm text-white/40">Sie wurden erfolgreich angemeldet.</p>
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
                      className={`h-12 text-sm ${status === 'error' ? 'border-red-500/30' : ''}`}
                      disabled={status === 'loading'}
                      data-testid="newsletter-email-input-full"
                    />
                    {status === 'error' && (
                      <p className="text-[13px] text-red-400/80 mt-2">{errorMessage}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full"
                    data-testid="newsletter-submit-button-full"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Wird angemeldet...
                      </>
                    ) : (
                      <>
                        Newsletter abonnieren
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-[11px] text-white/25 text-center">
                    Mit der Anmeldung stimmen Sie unserer{' '}
                    <a href="/datenschutz" className="underline hover:text-white/40 transition-colors">
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
