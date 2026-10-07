"use client";

import { useMemo, useState } from "react";
import type { Product } from "@prisma/client";
import { ProductCard } from "@/components/ProductCard";

const roasts = ["All", "Light", "Medium", "Dark"] as const;

export function ShopClient({ products }: { products: Product[] }) {
  const [selectedRoast, setSelectedRoast] = useState<(typeof roasts)[number]>("All");

  const visibleProducts = useMemo(() => {
    if (selectedRoast === "All") {
      return products;
    }
    return products.filter((product) => product.roast === selectedRoast);
  }, [products, selectedRoast]);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        {roasts.map((roast) => (
          <button
            key={roast}
            type="button"
            onClick={() => setSelectedRoast(roast)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              selectedRoast === roast
                ? "border-[#2d1a12] bg-[#2d1a12] text-white"
                : "border-[#d7b699] bg-white text-[#2d1a12] hover:border-[#a36d4a]"
            }`}
          >
            {roast}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.image,
              roast: product.roast,
              category: product.category,
              origin: product.origin,
            }}
          />
        ))}
      </div>
    </>
  );
}
