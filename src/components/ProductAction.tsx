"use client";

import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import type { CartProduct } from "@/components/CartProvider";

export function ProductAction({ product }: { product: CartProduct }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const summary = useMemo(() => `${product.name} · $${product.price.toFixed(2)}`, [product]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-full border border-[#e7d6c3] bg-[#f9f4ef] p-2 w-fit">
        <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2d1a12] font-bold">
          −
        </button>
        <span className="min-w-[2ch] text-center font-bold text-[#2d1a12]">{quantity}</span>
        <button onClick={() => setQuantity((value) => value + 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2d1a12] font-bold">
          +
        </button>
      </div>

      <button
        onClick={() => addToCart(product, quantity)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2d1a12] px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-[#1d130f]"
      >
        <ShoppingBag className="h-4 w-4" />
        Add {quantity} to cart
      </button>

      <div className="text-sm text-[#5f483d]">{summary}</div>
    </div>
  );
}
