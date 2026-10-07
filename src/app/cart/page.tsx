"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="rounded-[2rem] border border-[#ebdcc8] bg-white p-10 shadow-soft">
          <ShoppingBag className="mx-auto h-12 w-12 text-[#734d2f]" />
          <h1 className="mt-5 text-3xl font-black text-[#2d1a12]">Your cart is empty</h1>
          <p className="mt-3 text-[#5f483d]">Choose a roast and add a few flavorful beans to your basket.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-[#2d1a12] px-6 py-3 font-semibold text-white">
            Explore the menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6a4f]">Your basket</p>
          <h1 className="mt-2 text-3xl font-black text-[#2d1a12] sm:text-4xl">Cart overview</h1>
        </div>
        <button onClick={clearCart} className="flex items-center gap-2 text-sm font-semibold text-[#734d2f]">
          <Trash2 className="h-4 w-4" />
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-4 rounded-[2rem] border border-[#eadbc5] bg-white p-4 shadow-soft sm:p-5">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-[#f3e7db]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.2em] text-[#8d6a4f]">{product.category}</div>
                <h2 className="mt-1 text-xl font-bold text-[#2d1a12]">{product.name}</h2>
                <div className="mt-2 text-sm text-[#5d473d]">{product.origin}</div>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[#e7d6c3] bg-[#f9f4ef] px-2 py-1.5">
                <button onClick={() => updateQuantity(product.id, quantity - 1)} className="flex h-8 w-8 items-center justify-center text-[#2d1a12]">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2ch] text-center font-bold text-[#2d1a12]">{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)} className="flex h-8 w-8 items-center justify-center text-[#2d1a12]">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="min-w-[80px] text-right">
                <div className="text-base font-black text-[#2d1a12]">${(product.price * quantity).toFixed(2)}</div>
                <button onClick={() => removeItem(product.id)} className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#7a5842]">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#ebdcc8] bg-white p-6 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6a4f]">Summary</div>
          <div className="mt-6 space-y-4 text-[#4e3b31]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#2d1a12]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold text-[#2d1a12]">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="font-bold text-[#2d1a12]">Included</span>
            </div>
          </div>

          <div className="mt-6 border-t border-[#ebdcc8] pt-5">
            <div className="flex items-center justify-between text-lg font-black text-[#2d1a12]">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="mt-6 block rounded-full bg-[#2d1a12] px-5 py-3 text-center font-semibold text-white shadow-soft hover:bg-[#1f160f]">
              Proceed to checkout
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
