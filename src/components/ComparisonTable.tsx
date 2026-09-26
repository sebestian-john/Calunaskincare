import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';
import { COMPARISON_ROWS } from '../data/products';

export function ComparisonTable() {
  return (
    <section id="comparison" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#232722]/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8A9A7E] mb-2.5">
            Transparent Formulation
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#232722] font-normal leading-tight mb-4">
            the honest comparison
          </h2>
          <p className="text-sm sm:text-base text-[#232722]/70">
            Most acne patches dry out the skin with hidden fragrances or peel off during sleep.
            Here is how Caluna stacks up against typical options.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 pb-4">
          <div className="min-w-[640px] px-4 sm:px-0">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-1/3 p-4 sm:p-5 text-left text-xs uppercase tracking-wider font-semibold text-[#232722]/60 border-b border-[#232722]/10">
                    Criteria & Actives
                  </th>

                  {/* Caluna Highlighted Header */}
                  <th className="w-1/4 p-4 sm:p-5 text-left bg-[#F0F4ED] rounded-t-xl border-t-2 border-x-2 border-[#8A9A7E]/50">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xl sm:text-2xl font-semibold text-[#232722] tracking-wider">
                        CALUNA
                      </span>
                      <span className="bg-[#8A9A7E] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Our Patches
                      </span>
                    </div>
                  </th>

                  <th className="w-1/4 p-4 sm:p-5 text-left text-xs uppercase tracking-wider font-semibold text-[#232722]/60 border-b border-[#232722]/10">
                    Competitor D2C Brands
                  </th>

                  <th className="w-1/6 p-4 sm:p-5 text-left text-xs uppercase tracking-wider font-semibold text-[#232722]/60 border-b border-[#232722]/10">
                    Drugstore Stickers
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#232722]/8 text-sm">
                {COMPARISON_ROWS.map((row, index) => {
                  const isLast = index === COMPARISON_ROWS.length - 1;
                  return (
                    <tr key={row.feature} className="hover:bg-white/40 transition-colors">
                      {/* Feature Name */}
                      <td className="p-4 sm:p-5 font-medium text-[#232722]">
                        {row.feature}
                      </td>

                      {/* Caluna Highlighted Column */}
                      <td
                        className={`p-4 sm:p-5 bg-[#F0F4ED] border-x-2 border-[#8A9A7E]/50 font-medium text-[#232722] ${
                          isLast ? 'rounded-b-xl border-b-2 border-[#8A9A7E]/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#8A9A7E] shrink-0 mt-0.5" />
                          <span>{row.caluna}</span>
                        </div>
                      </td>

                      {/* Competitor Brands */}
                      <td className="p-4 sm:p-5 text-[#232722]/70">
                        <div className="flex items-start gap-2">
                          <span className="text-[#232722]/40 text-xs mt-0.5">·</span>
                          <span>{row.competitors}</span>
                        </div>
                      </td>

                      {/* Drugstore */}
                      <td className="p-4 sm:p-5 text-[#232722]/60">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{row.drugstore}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center text-xs text-[#232722]/60 max-w-xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#8A9A7E]" />
          <span>Formulated without artificial dyes, limonene, linalool, or drying alcohol.</span>
        </div>
      </div>
    </section>
  );
}
