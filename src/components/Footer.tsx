import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface FooterProps {
  onSelectProduct: (productId: string) => void;
  onOpenStory: () => void;
}

export function Footer({ onSelectProduct, onOpenStory }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#242A22] text-[#FBF9F5] pt-16 sm:pt-20 pb-12 border-t border-[#8A9A7E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-white/10">
          {/* Brand & Tagline Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#"
                className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-normal text-[#FBF9F5] inline-block mb-3"
              >
                CALUNA
              </a>
              <p className="font-serif text-lg text-[#FBF9F5]/70 italic mb-6">
                a calmer way to heal.
              </p>
              <p className="text-xs sm:text-sm text-[#FBF9F5]/65 leading-relaxed max-w-sm">
                Fragrance-free, medical-grade hydrocolloid patches anatomically shaped for every facial
                zone. Healing acne without stripping the barrier.
              </p>
            </div>

            {/* Email Signup in Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <label htmlFor="footer-newsletter" className="block text-xs uppercase tracking-wider text-[#A5B899] font-medium mb-2.5">
                Join our quiet email circle
              </label>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#A5B899] py-2">
                  <Check className="w-4 h-4 text-[#8A9A7E]" />
                  <span>You're subscribed! Welcome to Caluna.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    id="footer-newsletter"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-white/10 border border-white/15 rounded-md px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#8A9A7E] focus:border-[#8A9A7E]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#8A9A7E] hover:bg-[#77876B] text-white text-xs font-semibold uppercase tracking-wider rounded-md active:scale-95 transition-all shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-wider text-[#A5B899] font-semibold mb-4">
              Shop by Zone
            </p>
            <ul className="space-y-2.5 text-sm text-[#FBF9F5]/75">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <button
                    onClick={() => {
                      scrollTo('products');
                      onSelectProduct(prod.id);
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {prod.name} <span className="text-xs text-[#FBF9F5]/40 font-normal">({prod.zone})</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => scrollTo('offer')}
                  className="text-xs font-semibold text-[#8A9A7E] hover:underline"
                >
                  Starter Box ($6.99)
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-wider text-[#A5B899] font-semibold mb-4">
              Company & Standards
            </p>
            <ul className="space-y-2.5 text-sm text-[#FBF9F5]/75">
              <li>
                <button
                  onClick={onOpenStory}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Story & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('comparison')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  The Honest Comparison
                </button>
              </li>
              <li>
                <span className="text-[#FBF9F5]/50">100% Fragrance-Free Guarantee</span>
              </li>
              <li>
                <span className="text-[#FBF9F5]/50">Medical-Grade Hydrocolloid Standards</span>
              </li>
              <li>
                <span className="text-[#FBF9F5]/50">FSC-Certified Recyclable Packaging</span>
              </li>
              <li>
                <span className="text-[#FBF9F5]/50">Cruelty-Free & PETA Approved</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FBF9F5]/50">
          <p>© {new Date().getFullYear()} Caluna Skincare Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
