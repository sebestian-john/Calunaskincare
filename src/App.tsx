import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { OfferSection } from './components/OfferSection';
import { Testimonials } from './components/Testimonials';
import { ComparisonTable } from './components/ComparisonTable';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { EmailPopup } from './components/EmailPopup';
import { StoryModal } from './components/StoryModal';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Email popup appears after a short delay (5.5s) if not dismissed in session
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('caluna_email_dismissed');
    const isSubscribed = sessionStorage.getItem('caluna_email_subscribed');
    if (isDismissed || isSubscribed) return;

    const timer = setTimeout(() => {
      setIsEmailPopupOpen(true);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to your bag`);
  };

  const handleClaimOffer = (selectedProduct: Product) => {
    // Add selected product to cart, apply FIRSTBOX promo code, and open cart drawer
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === selectedProduct.id);
      if (existing) {
        return prev;
      }
      return [...prev, { product: selectedProduct, quantity: 1 }];
    });
    setAppliedPromo('FIRSTBOX');
    setIsCartOpen(true);
    showToast(`$6.99 offer activated for ${selectedProduct.name}!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleApplyPromo = (code: string): boolean => {
    if (code === 'FIRSTBOX') {
      setAppliedPromo('FIRSTBOX');
      return true;
    }
    return false;
  };

  const handleCloseEmailPopup = () => {
    setIsEmailPopupOpen(false);
    try {
      sessionStorage.setItem('caluna_email_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#232722] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#232722] text-[#FBF9F5] px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs font-medium animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#8A9A7E]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-[#8A9A7E] hover:text-white"
          >
            View bag
          </button>
        </div>
      )}

      {/* 1. Top Navigation Bar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStory={() => setIsStoryModalOpen(true)}
      />

      {/* 2. Hero Section with Video Background */}
      <main className="flex-1">
        <Hero
          onShopClick={() => scrollTo('products')}
          onStoryClick={() => setIsStoryModalOpen(true)}
        />

        {/* 3. Product Grid with Staggered Fade/Slide and Image Crossfade on Hover */}
        <ProductGrid onAddToCart={handleAddToCart} />

        {/* 4. Offer Section — Most visually prominent section on the page */}
        <OfferSection onClaimOffer={handleClaimOffer} />

        {/* 5. Testimonials — Small patch, big difference (Auto-rotating on mobile) */}
        <Testimonials />

        {/* 6. Comparison Table — The honest comparison */}
        <ComparisonTable />
      </main>

      {/* 7. Footer */}
      <Footer
        onSelectProduct={(productId) => {
          const product = PRODUCTS.find((p) => p.id === productId);
          if (product) handleAddToCart(product);
        }}
        onOpenStory={() => setIsStoryModalOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
      />

      {/* Delayed Email VIP Popup */}
      <EmailPopup
        isOpen={isEmailPopupOpen}
        onClose={handleCloseEmailPopup}
      />

      {/* Brand Story Modal */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onShopClick={() => scrollTo('products')}
      />
    </div>
  );
}
