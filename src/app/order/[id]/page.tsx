import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Coffee, ShieldCheck } from "lucide-react";
import { getProductBySlug } from "@/lib/coffee";
import { ProductAction } from "@/components/ProductAction";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4">
        <div className="rounded-[2rem] border border-[#ebdcc8] bg-white p-10 text-center shadow-soft">
          <h1 className="text-3xl font-black text-[#2d1a12]">Coffee not found</h1>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-[#2d1a12] px-6 py-3 text-white">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#734d2f]">
        <ArrowLeft className="h-4 w-4" />
        Back to all coffees
      </Link>

      <div className="grid gap-8 rounded-[2rem] border border-[#ebdcc8] bg-white p-5 shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#f1e7da]">
          <Image src={product.image} alt={product.name} width={900} height={900} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6a4f]">{product.category}</div>
          <h1 className="mt-3 text-4xl font-black text-[#2d1a12]">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-[#5f473c]">
            <span className="rounded-full bg-[#f3e8dc] px-2.5 py-1 font-semibold text-[#533e31]">{product.roast}</span>
            <span>{product.origin}</span>
          </div>

          <div className="mt-6 text-4xl font-black text-[#2d1a12]">${product.price.toFixed(2)}</div>

          <p className="mt-5 text-lg text-[#5d473d]">{product.description}</p>

          <div className="mt-6 space-y-3 rounded-2xl border border-[#ebdcc8] bg-[#f9f4ef] p-4 text-[#4e3b31]">
            <div className="flex items-center gap-2 font-semibold"><Coffee className="h-4 w-4" /> Notes: {product.notes}</div>
            <div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4" /> Freshly roasted and packed in-house</div>
          </div>

          <div className="mt-8">
            <ProductAction product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.image,
              roast: product.roast,
              category: product.category,
              origin: product.origin,
            }} />
          </div>
        </div>
      </div>
    </main>
  );
}
