import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface OfferSectionProps {
  onClaimOffer: (selectedProduct: Product) => void;
}

export function OfferSection({ onClaimOffer }: OfferSectionProps) {
  const [copied, setCopied] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FIRSTBOX');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    onClaimOffer(selectedProduct);
  };

  return (
    <section id="offer" className="py-20 sm:py-28 bg-[#F5F2EB] relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#8A9A7E]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-[#C86D51]/10 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* The prominent container: Rich Sage Canvas with high contrast & luxury finish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#2A3328] text-[#FBF9F5] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#8A9A7E]/30 overflow-hidden"
        >
          {/* Subtle noise / organic texture background tint */}
          <div className="absolute inset-0 bg-radial from-[#8A9A7E]/15 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Big Headline, Pricing & Copy */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Limited Introductory Tag */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A5B899] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#CFA043]" />
                <span>Special introductory welcome offer</span>
              </div>

              {/* Lowercase Headline as requested */}
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl text-[#FBF9F5] font-normal leading-[1.1] mb-6 [text-wrap:balance]">
                first box $6.99
              </h2>

              {/* Price display with $11.99 struck through */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-bold text-[#FBF9F5] tracking-tight tabular-nums">
                    $6.99
                  </span>
                  <span className="text-xl sm:text-2xl text-[#FBF9F5]/45 line-through font-normal tabular-nums">
                    $11.99
                  </span>
                </div>
                <span className="bg-[#8A9A7E]/30 border border-[#8A9A7E]/50 text-[#FBF9F5] text-xs font-semibold px-2.5 py-1 rounded">
                  Save 42%
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#FBF9F5]/80 leading-relaxed mb-7 max-w-lg">
                Experience the difference of zero fragrance, non-stripping centella, and anatomical
                contours on your skin. Try any single zone box with no subscription strings attached.
              </p>

              {/* Promo code badge with copy button */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-xs uppercase tracking-wider text-[#FBF9F5]/60">
                  Use promo code:
                </span>
                <div
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-2.5 bg-[#FBF9F5] text-[#232722] px-3.5 py-1.5 rounded-md cursor-pointer hover:bg-white active:scale-95 transition-all shadow-sm"
                  title="Click to copy code"
                >
                  <span className="font-mono font-bold tracking-wider text-sm">
                    FIRSTBOX
                  </span>
                  <div className="h-4 w-px bg-[#232722]/20" />
                  <span className="text-[11px] font-semibold text-[#8A9A7E] flex items-center gap-1">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy badge</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Starter Zone Selector */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-wider text-[#FBF9F5]/70 mb-2.5">
                  Select your starter zone:
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCTS.map((p) => {
                    const isSelected = p.id === selectedProductId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProductId(p.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#8A9A7E] text-white shadow-sm ring-1 ring-white/30'
                            : 'bg-white/10 text-[#FBF9F5]/80 hover:bg-white/20'
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bold CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleClaim}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FBF9F5] text-[#232722] hover:bg-white active:scale-95 font-semibold text-sm uppercase tracking-wider rounded-md transition-all shadow-md group cursor-pointer"
                >
                  <span>Claim Your $6.99 Box</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Guarantee trust markers */}
              <div className="flex items-center gap-6 mt-6 text-xs text-[#FBF9F5]/70">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#8A9A7E]" />
                  <span>30-Day Calm Skin Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>·</span>
                  <span>One-time purchase, no auto-billing</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual of Selected Product Box & Details */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-4/3 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#20271E]">
                <img
                  src={selectedProduct.primaryImage}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-serif text-lg">{selectedProduct.name}</p>
                    <p className="text-xs text-white/75">{selectedProduct.patchesCount} patches · {selectedProduct.zoneLabel}</p>
                  </div>
                  <span
                    className="w-3 h-3 rounded-full ring-2 ring-white/50"
                    style={{ backgroundColor: selectedProduct.colorHex }}
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-[#FBF9F5]/60">
                  Includes {selectedProduct.patchesCount} ultra-thin medical-grade hydrocolloid patches.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
