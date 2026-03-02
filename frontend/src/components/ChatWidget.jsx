import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail, Send } from 'lucide-react';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '4921112345678'; // Replace with actual number
  const whatsappMessage = encodeURIComponent('Hallo, ich interessiere mich für Ihre Dienstleistungen.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 flex items-center justify-center transition-colors duration-200"
        data-testid="chat-widget-button"
        aria-label={isOpen ? 'Chat schließen' : 'Chat öffnen'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        )}
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[320px] sm:w-[360px]"
            data-testid="chat-widget-popup"
          >
            <div className="bg-[#0A0C14] border border-white/10 rounded-[24px] shadow-2xl shadow-black/50 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">VISUWORKS</h3>
                    <p className="text-sm text-white/80">Wir sind für Sie da!</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-white/70 text-sm mb-6">
                  Haben Sie Fragen zu Ihrem Projekt? Wir helfen Ihnen gerne weiter.
                </p>

                {/* Contact Options */}
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/30 transition-all duration-200 group"
                    data-testid="whatsapp-link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-400">WhatsApp</p>
                      <p className="text-xs text-white/50">Direkt schreiben</p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+4921112345678"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    data-testid="phone-link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Anrufen</p>
                      <p className="text-xs text-white/50">+49 211 123 456 78</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@visuworks.de"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    data-testid="email-link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">E-Mail</p>
                      <p className="text-xs text-white/50">info@visuworks.de</p>
                    </div>
                  </a>
                </div>

                <p className="text-xs text-white/30 text-center mt-5">
                  Mo-Fr: 9:00 - 18:00 Uhr
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
