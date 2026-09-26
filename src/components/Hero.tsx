import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Droplets,
  Activity,
  Waves
} from 'lucide-react';
import heroSkincareBannerVideo from '../assets/videos/hero_skincare_banner.mp4';
import heroSkincarePoster from '../assets/videos/hero_skincare_poster.jpg';

interface HeroProps {
  onShopClick: () => void;
  onStoryClick: () => void;
}

export function Hero({ onShopClick, onStoryClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Guarantee seamless video autoplay across strict mobile/desktop browser policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const current = video.currentTime;
    const duration = video.duration || 13.6;
    setProgress((current / duration) * 100);

    // Sync interactive ritual steps to video timestamp (4 scenes, ~3.4s each)
    if (current < 3.4) {
      setActiveStep(0);
    } else if (current < 6.8) {
      setActiveStep(1);
    } else if (current < 10.2) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const jumpToStep = (second: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = second;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#181E16] text-[#FBF9F5] border-b border-[#232722]/30">
      
      {/* 1. Full-Bleed Skincare Video Banner Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
        <video
          ref={videoRef}
          src={heroSkincareBannerVideo}
          poster={heroSkincarePoster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000"
        >
          <source src={heroSkincareBannerVideo} type="video/mp4" />
          <source src="/videos/hero_skincare_banner.mp4" type="video/mp4" />
          <source src="/videos/hero_skincare.mp4" type="video/mp4" />
        </video>

        {/* Ambient Botanical Tone Overlay for Luxury Contrast & Typographic Sharpness */}
        <div className="absolute inset-0 bg-[#151B13]/60 sm:bg-[#151B13]/55 backdrop-brightness-[0.92]" />

        {/* Radial Vignette to focus center eye-flow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(16,21,14,0.85)_100%)]" />

        {/* Top and Bottom soft fade ramps */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#141A12]/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#141A12] via-[#141A12]/80 to-transparent" />
      </div>

      {/* Top Floating Skincare Live Badge & Quick Controls */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#A5B899] animate-ping" />
          <span className="tracking-wide">Skincare Ritual in Motion</span>
          <span className="opacity-40">|</span>
          <span className="text-[#C8D9BD] hidden sm:inline">
            {activeStep === 0 && 'Phase 1: Pure Cleanse'}
            {activeStep === 1 && 'Phase 2: Centella Droplet'}
            {activeStep === 2 && 'Phase 3: Hydrocolloid Seal'}
            {activeStep === 3 && 'Phase 4: Calm Healed Barrier'}
          </span>
        </motion.div>

        {/* Banner Media Controls */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-white"
        >
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 hover:text-[#C8D9BD] cursor-pointer transition-colors p-1"
            title={isPlaying ? 'Pause banner video' : 'Play banner video'}
            aria-label={isPlaying ? 'Pause banner video' : 'Play banner video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span className="hidden md:inline text-[11px]">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <span className="w-px h-3 bg-white/20" />

          <button
            onClick={toggleMute}
            className="p-1 hover:text-[#C8D9BD] cursor-pointer transition-colors"
            title={isMuted ? 'Unmute video sound' : 'Mute video sound'}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <span className="w-px h-3 bg-white/20" />

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 p-1 hover:text-[#C8D9BD] cursor-pointer transition-colors"
            title="Watch full skincare film"
            aria-label="Expand skincare video modal"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Expand</span>
          </button>
        </motion.div>
      </div>

      {/* 2. Primary Hero Banner Editorial Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center my-auto py-12 sm:py-16">
        
        {/* Kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-[#C8D9BD] tracking-wider uppercase mb-6 shadow-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A7E] animate-pulse" />
          <span>Barrier-First Hydrocolloid Care</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>100% Fragrance-Free</span>
        </motion.div>

        {/* Lowercase Headline as specified */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FBF9F5] font-normal leading-[1.07] tracking-tight mb-6 max-w-4xl text-balance drop-shadow-sm"
        >
          a patch for every zone, and a calmer way to heal
        </motion.h1>

        {/* Subheadline about fragrance-free patches */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#FBF9F5]/90 leading-relaxed max-w-2xl mb-10 font-normal drop-shadow-xs"
        >
          Medical-grade hydrocolloid infused with calming centella and niacinamide.
          100% fragrance-free, vegan, and anatomically shaped to heal breakouts overnight
          without drying or compromising your skin barrier.
        </motion.p>

        {/* Two CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-12"
        >
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#8A9A7E] hover:bg-[#77876B] text-white font-medium text-sm tracking-wide rounded-md transition-all active:scale-95 shadow-xl hover:shadow-2xl cursor-pointer group"
          >
            <span>Shop the collection</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onStoryClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/15 hover:bg-white/25 text-[#FBF9F5] font-medium text-sm tracking-wide rounded-md border border-white/25 hover:border-white/40 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            Our story
          </button>
        </motion.div>

        {/* Trust Line Below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full pt-8 border-t border-white/15 max-w-3xl"
        >
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs sm:text-sm text-[#FBF9F5]/85">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#A5B899]" />
              <span>Dermatologist tested</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#A5B899]" />
              <span>100% Fragrance-free</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#A5B899]" />
              <span>Zero harsh acids</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#A5B899]" />
              <span>120,000+ patches healed</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 3. Bottom Skincare Ritual Interactive Progress Bar */}
      <div className="relative z-20 w-full bg-gradient-to-t from-black/80 to-black/20 backdrop-blur-md border-t border-white/10 pt-3 pb-4">
        
        {/* Continuous Video Timeline Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#A5B899] h-full transition-all duration-150 ease-linear rounded-full shadow-[0_0_8px_rgba(165,184,153,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 4 Interactive Skincare Steps matching video segments */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            
            <button
              onClick={() => jumpToStep(0)}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                activeStep === 0
                  ? 'bg-white/20 text-white border-l-2 border-[#A5B899] shadow-inner'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#A5B899] font-medium mb-1">
                <span className="flex items-center gap-1">
                  <Waves className="w-3.5 h-3.5" />
                  01. Cleanse
                </span>
                {activeStep === 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#A5B899] animate-ping" />}
              </div>
              <div className="text-xs text-white/90 truncate font-normal">Pure morning water prep</div>
            </button>

            <button
              onClick={() => jumpToStep(3.6)}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                activeStep === 1
                  ? 'bg-white/20 text-white border-l-2 border-[#A5B899] shadow-inner'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#A5B899] font-medium mb-1">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5" />
                  02. Infuse
                </span>
                {activeStep === 1 && <span className="w-1.5 h-1.5 rounded-full bg-[#A5B899] animate-ping" />}
              </div>
              <div className="text-xs text-white/90 truncate font-normal">Centella & barrier droplet</div>
            </button>

            <button
              onClick={() => jumpToStep(7.0)}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                activeStep === 2
                  ? 'bg-white/20 text-white border-l-2 border-[#A5B899] shadow-inner'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#A5B899] font-medium mb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  03. Target
                </span>
                {activeStep === 2 && <span className="w-1.5 h-1.5 rounded-full bg-[#A5B899] animate-ping" />}
              </div>
              <div className="text-xs text-white/90 truncate font-normal">Ultra-thin hydrocolloid patch</div>
            </button>

            <button
              onClick={() => jumpToStep(10.5)}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                activeStep === 3
                  ? 'bg-white/20 text-white border-l-2 border-[#A5B899] shadow-inner'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#A5B899] font-medium mb-1">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  04. Heal
                </span>
                {activeStep === 3 && <span className="w-1.5 h-1.5 rounded-full bg-[#A5B899] animate-ping" />}
              </div>
              <div className="text-xs text-white/90 truncate font-normal">Calm, radiant barrier glow</div>
            </button>

          </div>
        </div>
      </div>

      {/* Skincare Film Cinema Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#161B14] rounded-2xl overflow-hidden shadow-2xl border border-white/20 text-white"
            >
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#1D241B]">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white">The Caluna Skincare Ritual Film</h3>
                  <p className="text-xs text-[#C8D9BD] mt-0.5">Barrier-first hydrocolloid absorption & botanical calming care</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer transition-colors"
                  aria-label="Close cinema modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-16/9 w-full bg-black">
                <video
                  ref={modalVideoRef}
                  src={heroSkincareBannerVideo}
                  poster={heroSkincarePoster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-5 bg-[#1A2017] flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-white/80">
                  <span>✓ 100% Medical Hydrocolloid</span>
                  <span>✓ Centella Asiatica & Niacinamide</span>
                  <span>✓ Zero Fragrance</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={restartVideo}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      onShopClick();
                    }}
                    className="px-5 py-2 bg-[#8A9A7E] hover:bg-[#77876B] text-white rounded font-medium text-xs transition-colors cursor-pointer"
                  >
                    Shop the Collection
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
