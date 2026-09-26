import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#232722]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8A9A7E] mb-3">
            Targeted facial geometry
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#232722] font-normal leading-tight mb-4 [text-wrap:balance]">
            one patch for every zone
          </h2>
          <p className="text-base text-[#232722]/75 max-w-xl font-normal">
            Breakouts don’t just happen in neat little circles. Our custom anatomical patches
            contour to facial curves so you can target entire breakout zones seamlessly.
          </p>
        </div>

        {/* 5 Cards Grid: 1 col on mobile, 2 cols on tablet, 3 / 2 responsive layout on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {PRODUCTS.map((product, index) => {
            const isAdded = addedId === product.id;

            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col bg-white rounded-lg border border-[#232722]/8 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.985] cursor-pointer"
              >
                {/* Product Imagery Area with Crossfade on Hover */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F5F2EB]">
                  {/* Primary Box Image */}
                  <img
                    src={product.primaryImage}
                    alt={`${product.name} packaging`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-105"
                  />

                  {/* Secondary Image: Lifestyle / On-Skin Crossfade */}
                  <img
                    src={product.secondaryImage}
                    alt={`${product.name} on skin`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                  />

                  {/* Zone Accent Pill-less Indicator */}
                  <div className="absolute top-3 left-3 bg-[#FBF9F5]/90 backdrop-blur-sm border border-[#232722]/10 px-2.5 py-1 rounded text-[11px] font-medium text-[#232722]/85 tracking-wide">
                    {product.zone}
                  </div>

                  {/* Pack Count Label */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-[#232722]/70 tabular-nums">
                    {product.patchesCount} patches
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Zone Label metadata with dot separator */}
                    <div className="flex items-center gap-1.5 text-xs text-[#232722]/60 mb-1.5">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: product.colorHex }}
                        aria-hidden="true"
                      />
                      <span className="capitalize">{product.zoneLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>Fragrance-free</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-[#232722] font-normal mb-2 group-hover:text-[#8A9A7E] transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#232722]/75 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Key Actives text tag */}
                    <div className="flex flex-wrap gap-1.5 mb-5 text-[11px] text-[#232722]/70 font-medium">
                      {product.actives.map((active) => (
                        <span key={active} className="bg-[#F5F2EB] px-2 py-0.5 rounded">
                          {active}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Price & Colored Shop Button */}
                  <div className="pt-4 border-t border-[#232722]/8 flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-[#232722] tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#232722]/40 line-through tabular-nums">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Colored Shop Button matching the product's signature palette */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdd(product);
                      }}
                      style={{ backgroundColor: product.colorHex }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white rounded-md transition-all duration-200 hover:brightness-95 active:scale-95 shadow-xs cursor-pointer"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Shop {product.name.replace(' Patch', '')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
