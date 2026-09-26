import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, CheckCircle, Sparkles } from 'lucide-react';

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailPopup({ isOpen, onClose }: EmailPopupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubmitted(true);
    try {
      sessionStorage.setItem('caluna_email_subscribed', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Modal Card with smooth fade + scale-in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#FBF9F5] border border-[#232722]/10 rounded-2xl p-7 sm:p-9 shadow-2xl overflow-hidden z-10"
          >
            {/* Top decorative tint */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#8A9A7E]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#232722]/60 hover:text-[#232722] hover:bg-[#232722]/5 rounded-full transition-colors active:scale-90"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-[#8A9A7E]/20 text-[#8A9A7E] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-serif text-2xl text-[#232722] mb-2 font-normal">
                  welcome to the caluna circle
                </h3>
                <p className="text-sm text-[#232722]/75 mb-6">
                  You'll be the first to know about drops, batch restocks, and exclusive calm-skin
                  guides.
                </p>
                <div className="p-3 bg-[#F0F4ED] rounded-lg border border-[#8A9A7E]/30 text-xs text-[#232722]">
                  Your promo code is saved: <strong className="font-mono text-sm">FIRSTBOX</strong>
                </div>
                <button
                  onClick={onClose}
                  className="mt-6 text-xs uppercase tracking-wider font-semibold text-[#8A9A7E] hover:underline"
                >
                  Continue browsing
                </button>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8A9A7E] font-semibold mb-2.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Early Access & VIP Drops</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#232722] font-normal leading-snug mb-3">
                  Be the first to know when we launch
                </h3>

                <p className="text-sm text-[#232722]/75 leading-relaxed mb-6 font-normal">
                  Subscribe to receive drop notifications, sensitive skincare insights, and unlock
                  your $6.99 starter box code.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="popup-email" className="sr-only">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#232722]/40" />
                      <input
                        id="popup-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder="yourname@domain.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#232722]/15 rounded-md text-sm text-[#232722] placeholder-[#232722]/40 focus:outline-none focus:ring-2 focus:ring-[#8A9A7E] focus:border-transparent transition-all"
                      />
                    </div>
                    {error && (
                      <p className="mt-1.5 text-xs text-red-600">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#8A9A7E] hover:bg-[#77876B] text-white font-medium text-xs uppercase tracking-wider rounded-md active:scale-[0.98] transition-all shadow-sm cursor-pointer"
                  >
                    Notify Me & Claim Offer
                  </button>
                </form>

                <p className="mt-4 text-[11px] text-[#232722]/50 text-center">
                  Zero spam. Only quiet updates. Unsubscribe anytime.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
