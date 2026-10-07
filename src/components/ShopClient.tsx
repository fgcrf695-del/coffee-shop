"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import type { CartProduct } from "@/components/CartProvider";

export function ProductCard({ product }: { product: CartProduct }) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#ebdcc8] bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(67,49,33,0.12)]">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <Image src={product.image} alt={product.name} width={800} height={600} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
        </Link>
        <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6d4e39] backdrop-blur-sm">
          {product.roast}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6a4f]">{product.category}</div>
            <h3 className="mt-2 text-2xl font-black text-[#2d1a12]">{product.name}</h3>
          </div>
          <div className="text-right">
            <div className="text-xl font-black text-[#2d1a12]">${product.price.toFixed(2)}</div>
            <div className="flex items-center gap-1 text-[#f59e0b]">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="text-xs font-semibold text-[#7a5842]">4.9</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#5d473d]">{product.origin}</p>

        <div className="flex gap-2">
          <button onClick={() => addToCart(product, 1)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2d1a12] px-4 py-2.5 font-semibold text-white transition hover:bg-[#1d130f]">
            <ShoppingBag className="h-4 w-4" />
            Add
          </button>
          <Link href={`/products/${product.slug}`} className="inline-flex items-center justify-center rounded-full border border-[#d3b69a] bg-[#f9f4ef] px-4 py-2.5 font-semibold text-[#2d1a12]">
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
