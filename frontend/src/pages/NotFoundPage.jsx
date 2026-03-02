import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEOHead } from '../components/SEOHead';

export default function NotFoundPage() {
  return (
    <div data-testid="not-found-page" className="min-h-[80vh] flex items-center justify-center px-6">
      <SEOHead page="home" customTitle="404 - Seite nicht gefunden | VISUWORKS" customDescription="Die gesuchte Seite wurde nicht gefunden." />
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-lg"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span className="text-[150px] md:text-[200px] font-extrabold leading-none bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent select-none">
            404
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <Search className="w-10 h-10 text-white/40" />
        </motion.div>

        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Seite nicht gefunden
        </h1>
        <p className="text-lg text-white/60 mb-10 max-w-md mx-auto">
          Die gesuchte Seite existiert leider nicht oder wurde verschoben. 
          Kehren Sie zur Startseite zurück oder kontaktieren Sie uns.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button size="lg" data-testid="404-home-button">
              <Home className="mr-2 h-5 w-5" />
              Zur Startseite
            </Button>
          </Link>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => window.history.back()}
            data-testid="404-back-button"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Zurück
          </Button>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-white/40 mb-4">Beliebte Seiten:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { to: '/projekte', label: 'Projekte' },
              { to: '/mobilitaet', label: 'Mobilität' },
              { to: '/kontakt', label: 'Kontakt' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
