import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotating on mobile
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#232722]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8A9A7E] mb-2.5">
            Real skin, zero filters
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#232722] font-normal leading-tight mb-4">
            small patch, big difference
          </h2>
          <p className="text-sm sm:text-base text-[#232722]/70">
            Formulated specifically for reactive, easily sensitized, and breakout-prone skin.
          </p>
        </div>

        {/* Desktop View: 3-column elegant grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-lg border border-[#232722]/8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4 text-[#CFA043]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                  ))}
                </div>

                {/* Highlight */}
                <h3 className="font-serif text-lg text-[#232722] font-medium mb-3">
                  "{t.highlight}"
                </h3>

                {/* Quote */}
                <p className="text-sm text-[#232722]/75 leading-relaxed mb-6 font-normal">
                  {t.quote}
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-[#232722]/8 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#232722] flex items-center gap-1.5">
                    <span>{t.name}</span>
                    {t.verified && (
                      <span title="Verified Buyer" className="inline-flex">
                        <CheckCircle className="w-3.5 h-3.5 text-[#8A9A7E]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[#232722]/50">{t.location}</span>
                </div>
                <span className="text-[#8A9A7E] font-medium bg-[#F0F4ED] px-2 py-0.5 rounded text-[11px]">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Auto-rotating Carousel with Touch / Controls */}
        <div
          className="md:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden bg-white p-7 rounded-xl border border-[#232722]/10 shadow-sm min-h-[300px] flex flex-col justify-between">
            {/* Active Card */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#CFA043]">
                  {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                  ))}
                </div>
                <span className="text-[#8A9A7E] font-medium bg-[#F0F4ED] px-2.5 py-0.5 rounded text-xs">
                  {TESTIMONIALS[activeIndex].product}
                </span>
              </div>

              <h3 className="font-serif text-xl text-[#232722] font-medium mb-3">
                "{TESTIMONIALS[activeIndex].highlight}"
              </h3>

              <p className="text-sm text-[#232722]/80 leading-relaxed">
                {TESTIMONIALS[activeIndex].quote}
              </p>
            </div>

            <div className="pt-4 border-t border-[#232722]/8 flex items-center justify-between text-xs mt-6">
              <div>
                <div className="font-semibold text-[#232722] flex items-center gap-1.5">
                  <span>{TESTIMONIALS[activeIndex].name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#8A9A7E]" />
                </div>
                <span className="text-[#232722]/50">{TESTIMONIALS[activeIndex].location}</span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
                  }
                  className="p-1.5 rounded-full border border-[#232722]/15 hover:bg-[#FBF9F5] active:scale-95 text-[#232722]"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                  className="p-1.5 rounded-full border border-[#232722]/15 hover:bg-[#FBF9F5] active:scale-95 text-[#232722]"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? 'w-6 bg-[#8A9A7E]' : 'w-2 bg-[#232722]/20'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
