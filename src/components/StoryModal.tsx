import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShopClick: () => void;
}

export function StoryModal({ isOpen, onClose, onShopClick }: StoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#232722]/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Top Image Banner */}
            <div className="relative h-60 w-full overflow-hidden bg-[#242A22]">
              <img
                src="/src/assets/images/caluna_community_1790384510321.jpg"
                alt="The Caluna community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FBF9F5] via-transparent to-black/30" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-[#232722] rounded-full transition-colors"
                aria-label="Close story"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Story Content */}
            <div className="p-6 sm:p-10 -mt-6 relative z-10">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8A9A7E] mb-2 block">
                The Caluna Philosophy
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#232722] font-normal mb-4">
                healing without the sting.
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#232722]/80 leading-relaxed font-normal">
                <p>
                  Caluna was born out of frustration with conventional breakout care. For decades,
                  skincare marketing taught us to burn, strip, and punish our blemishes with 10%
                  drying benzoyl peroxide, stinging alcohol, and added synthetic perfumes that made
                  sensitive skin flare into painful dermatitis.
                </p>
                <p>
                  When hydrocolloid patches first became popular, they were only sold as rigid, round
                  dots. But real blemishes do not obey flat circular geometries. They form in clusters
                  across curved jaws, along oily nose bridges, and across sweat-prone foreheads.
                </p>
                <p>
                  We worked with clinical wound-care engineers to tailor custom anatomical contours
                  infused with soothing centella asiatica and barrier-repairing niacinamide. And most
                  importantly: <strong>100% fragrance-free</strong>, zero essential oils, and zero
                  parabens.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 my-6 border-t border-b border-[#232722]/10 text-xs text-[#232722]/75">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#8A9A7E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#232722]">100% Fragrance-Free</strong>
                    <span>No masking scents or limonene irritants.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#8A9A7E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#232722]">Anatomical Cuts</strong>
                    <span>Engineered for facial curves & jawline.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-[#8A9A7E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#232722]">Barrier-First</strong>
                    <span>Absorbs exudate while preserving skin moisture.</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-[#232722]/70 hover:text-[#232722]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onShopClick();
                  }}
                  className="px-6 py-2.5 bg-[#8A9A7E] hover:bg-[#77876B] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  Explore the 5 Zones
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
