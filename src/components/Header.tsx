import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenStory: () => void;
}

export function Header({ cartCount, onOpenCart, onOpenStory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#232722]/8 transition-colors">
      {/* Top micro-announcement banner */}
      <div className="bg-[#8A9A7E] text-[#FBF9F5] text-xs font-medium py-1.5 px-4 text-center tracking-wide">
        <span>first box $6.99 with code <strong className="underline decoration-white/60 underline-offset-2">FIRSTBOX</strong></span>
        <span className="mx-2 opacity-60">·</span>
        <span className="hidden sm:inline">free us shipping on orders over $25</span>
        <span className="sm:hidden">free us shipping $25+</span>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-6 links) - Zone 3 (1-2 actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element brand wordmark */}
        <a 
          href="#" 
          className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-normal text-[#232722] hover:opacity-85 transition-opacity"
        >
          CALUNA
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#232722]/80">
          <button 
            onClick={() => scrollTo('products')} 
            className="hover:text-[#232722] transition-colors cursor-pointer"
          >
            products
          </button>
          <button 
            onClick={() => scrollTo('offer')} 
            className="hover:text-[#232722] transition-colors cursor-pointer"
          >
            offer
          </button>
          <button 
            onClick={() => scrollTo('comparison')} 
            className="hover:text-[#232722] transition-colors cursor-pointer"
          >
            comparison
          </button>
          <button 
            onClick={() => scrollTo('reviews')} 
            className="hover:text-[#232722] transition-colors cursor-pointer"
          >
            reviews
          </button>
          <button 
            onClick={onOpenStory} 
            className="hover:text-[#232722] transition-colors cursor-pointer text-[#8A9A7E] hover:underline underline-offset-4"
          >
            our story
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label="Open cart"
            className="relative p-2.5 rounded-full hover:bg-[#8A9A7E]/10 active:scale-95 transition-all text-[#232722]"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8A9A7E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => scrollTo('products')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#8A9A7E] rounded-md hover:bg-[#77876B] active:scale-95 transition-all shadow-sm"
          >
            shop collection
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#232722] hover:bg-[#8A9A7E]/10 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#232722]/10 bg-[#FBF9F5] px-6 py-5 flex flex-col gap-4 text-sm font-medium animate-in slide-in-from-top-2 duration-200">
          <button 
            onClick={() => scrollTo('products')} 
            className="text-left py-2 hover:text-[#8A9A7E] transition-colors"
          >
            products
          </button>
          <button 
            onClick={() => scrollTo('offer')} 
            className="text-left py-2 hover:text-[#8A9A7E] transition-colors"
          >
            starter offer ($6.99)
          </button>
          <button 
            onClick={() => scrollTo('comparison')} 
            className="text-left py-2 hover:text-[#8A9A7E] transition-colors"
          >
            the honest comparison
          </button>
          <button 
            onClick={() => scrollTo('reviews')} 
            className="text-left py-2 hover:text-[#8A9A7E] transition-colors"
          >
            customer reviews
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenStory(); }} 
            className="text-left py-2 text-[#8A9A7E] font-semibold"
          >
            our story
          </button>
          <div className="pt-2 border-t border-[#232722]/10">
            <button
              onClick={() => scrollTo('products')}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#8A9A7E] rounded-md"
            >
              shop the collection
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
