import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  appliedPromo,
  onApplyPromo,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo === 'FIRSTBOX' ? Math.min(5.00, subtotal) : 0;
  const shippingThreshold = 25.0;
  const isFreeShipping = subtotal - discount >= shippingThreshold;
  const amountToFreeShipping = Math.max(0, shippingThreshold - (subtotal - discount));
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 3.99;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoMsg({ text: 'Promo code FIRSTBOX applied! -$5.00', error: false });
      setPromoInput('');
    } else {
      setPromoMsg({ text: 'Invalid promo code. Use FIRSTBOX for your starter box.', error: true });
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FBF9F5] border-l border-[#232722]/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#232722]/10 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#232722] font-normal">
                    Your Caluna Bag
                  </h2>
                  <p className="text-xs text-[#232722]/60 mt-0.5">
                    {items.length === 0
                      ? 'Empty bag'
                      : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#232722]/60 hover:text-[#232722] hover:bg-[#232722]/5 rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              {items.length > 0 && !orderComplete && (
                <div className="px-6 py-3 bg-[#F0F4ED] border-b border-[#8A9A7E]/20 text-xs">
                  {isFreeShipping ? (
                    <div className="flex items-center gap-1.5 text-[#647358] font-medium">
                      <Check className="w-4 h-4 text-[#8A9A7E]" />
                      <span>You've unlocked free standard US shipping!</span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[#232722]/80">
                        Add <strong className="font-semibold">${amountToFreeShipping.toFixed(2)}</strong> more for free US shipping
                      </p>
                      <div className="mt-1.5 h-1.5 w-full bg-white/70 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#8A9A7E] rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, ((subtotal - discount) / shippingThreshold) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Items List or Empty or Order Complete */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {orderComplete ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-full bg-[#8A9A7E]/20 text-[#8A9A7E] flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#232722] mb-2">
                      order confirmed
                    </h3>
                    <p className="text-sm text-[#232722]/75 max-w-xs mx-auto mb-6">
                      Thank you! Your patch box is being carefully packed with recyclable materials and will ship in 24 hours.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-[#232722]/10 text-xs text-left mb-6 space-y-1">
                      <p className="text-[#232722]/60">Order #: <strong className="text-[#232722]">CAL-84920</strong></p>
                      <p className="text-[#232722]/60">Total Paid: <strong className="text-[#232722]">${total.toFixed(2)}</strong></p>
                      <p className="text-[#232722]/60">Shipping: <span className="text-[#8A9A7E]">Standard Calm Care</span></p>
                    </div>
                    <button
                      onClick={() => {
                        setOrderComplete(false);
                        onClose();
                      }}
                      className="text-xs uppercase tracking-wider font-semibold text-[#8A9A7E] hover:underline"
                    >
                      Return to home
                    </button>
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-[#232722]/60 text-sm mb-4">Your bag is currently empty.</p>
                    <button
                      onClick={onClose}
                      className="text-xs uppercase tracking-wider font-semibold text-[#8A9A7E] hover:underline"
                    >
                      Explore the collection
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-white rounded-lg border border-[#232722]/8"
                    >
                      <div className="w-18 h-18 rounded bg-[#F5F2EB] overflow-hidden shrink-0">
                        <img
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-serif text-base font-normal text-[#232722]">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-[#232722]/60">
                              {item.product.patchesCount} patches · {item.product.zone}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-[#232722] tabular-nums">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#232722]/15 rounded bg-[#FBF9F5]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 hover:bg-[#232722]/5 text-[#232722]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold tabular-nums text-[#232722]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 hover:bg-[#232722]/5 text-[#232722]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#232722]/40 hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && !orderComplete && (
                <div className="p-6 border-t border-[#232722]/10 bg-white">
                  {/* Promo Input */}
                  <form onSubmit={handlePromoSubmit} className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          if (promoMsg) setPromoMsg(null);
                        }}
                        placeholder="Promo code (e.g. FIRSTBOX)"
                        className="flex-1 uppercase px-3 py-2 text-xs border border-[#232722]/15 rounded bg-[#FBF9F5] focus:outline-none focus:ring-1 focus:ring-[#8A9A7E]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-[#8A9A7E] hover:bg-[#77876B] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMsg && (
                      <p
                        className={`text-[11px] mt-1.5 ${
                          promoMsg.error ? 'text-red-600' : 'text-emerald-700 font-medium'
                        }`}
                      >
                        {promoMsg.text}
                      </p>
                    )}
                    {appliedPromo && !promoMsg && (
                      <p className="text-[11px] mt-1.5 text-emerald-700 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Code {appliedPromo} applied (-$5.00)
                      </p>
                    )}
                  </form>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-[#232722]/70 mb-4 pb-4 border-b border-[#232722]/10">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="tabular-nums font-medium text-[#232722]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>First Box Discount</span>
                        <span className="tabular-nums">-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="tabular-nums text-[#232722]">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-[#232722] pt-2">
                      <span>Total</span>
                      <span className="tabular-nums">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 px-4 bg-[#8A9A7E] hover:bg-[#77876B] text-white text-xs font-semibold uppercase tracking-wider rounded-md active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer"
                  >
                    {isCheckingOut ? (
                      <span>Processing secure order...</span>
                    ) : (
                      <>
                        <span>Checkout · ${total.toFixed(2)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#232722]/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8A9A7E]" />
                    <span>30-Day Calm Skin Guarantee · Secure Checkout</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
