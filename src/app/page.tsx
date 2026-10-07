import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coffee, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { getFeaturedProducts } from "@/lib/coffee";
import { ShopClient } from "@/components/ShopClient";

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#2a201a]">
      <header className="sticky top-0 z-40 border-b border-[#e8d8ca] bg-[#f7f3ee]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d1a12] text-[#f8efe7]">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-black tracking-[0.24em] text-[#2a201a]">BEAN</div>
              <div className="-mt-1 text-[10px] uppercase tracking-[0.4em] text-[#7b5d47]">Bloom</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5e4539] md:flex">
            <Link href="#shop">Shop</Link>
            <Link href="#story">Our story</Link>
            <Link href="#reviews">Reviews</Link>
            <Link href="/cart">Cart</Link>
          </nav>

          <Link
            href="/checkout"
            className="rounded-full bg-[#2d1a12] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#1d130f]"
          >
            Order now
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5dfc6] via-[#f7f3ee] to-[#f2e8dc]" />
        <div className="absolute right-[-100px] top-[-80px] h-[380px] w-[380px] rounded-full bg-[#e1b77b]/30 blur-3xl" />
        <div className="absolute left-[-80px] bottom-0 h-[300px] w-[300px] rounded-full bg-[#9d6a46]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#e4d2ba] bg-white/60 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#6d4e39]">
              <Sparkles className="h-3.5 w-3.5" />
              Freshly roasted daily
            </div>

            <h1 className="max-w-xl text-4xl font-black leading-none tracking-tight text-[#2a201a] sm:text-5xl lg:text-7xl">
              Coffee that feels like a ritual.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-[#5f473c]">
              Discover small-batch beans, ethically sourced roasts, and barista-curated blends designed for richer mornings and calmer evenings.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#shop"
                className="inline-flex items-center gap-2 rounded-full bg-[#2d1a12] px-6 py-3 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#1d130f]"
              >
                Shop beans <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/cart" className="rounded-full border border-[#d3b69a] bg-white/60 px-6 py-3 font-semibold text-[#2d1a12] transition hover:border-[#a36d4a] hover:text-[#1c120f]">
                View cart
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-[#3b2b23]">
              <div className="rounded-2xl border border-[#ead7c2] bg-white/55 p-4 shadow-soft">
                <div className="text-3xl font-black">12k+</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[#6d4f3d]">cups sold</div>
              </div>
              <div className="rounded-2xl border border-[#ead7c2] bg-white/55 p-4 shadow-soft">
                <div className="text-3xl font-black">4.9</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[#6d4f3d]">avg rating</div>
              </div>
              <div className="rounded-2xl border border-[#ead7c2] bg-white/55 p-4 shadow-soft">
                <div className="text-3xl font-black">24h</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[#6d4f3d]">roast cycle</div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-[500px] w-full max-w-[500px] overflow-hidden rounded-[2rem] border border-[#ead8c0] bg-white/40 shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1200&q=80"
                alt="Coffee beans and cup"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute left-5 top-5 rounded-2xl bg-[#f9f4ef]/80 p-4 shadow-soft backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d1a12] text-[#f5eadc]">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-[#7d5c46]">Most loved</div>
                    <div className="text-lg font-bold text-[#2d1a12]">Velvet House Blend</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-5 right-5 rounded-2xl bg-[#fffaf5]/90 p-4 shadow-soft backdrop-blur-md">
                <div className="text-xs uppercase tracking-[0.18em] text-[#7d5c46]">from</div>
                <div className="text-3xl font-black text-[#2d1a12]">$16.90</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-[#ebdcc8] bg-white p-6 shadow-soft">
            <ShieldCheck className="mb-4 h-10 w-10 text-[#6b432c]" />
            <h3 className="text-xl font-bold text-[#2d1a12]">Premium sourcing</h3>
            <p className="mt-3 text-[#5b453a]">Carefully selected beans from trusted partners and transparent traceability.</p>
          </div>
          <div className="rounded-[2rem] border border-[#ebdcc8] bg-white p-6 shadow-soft">
            <Coffee className="mb-4 h-10 w-10 text-[#6b432c]" />
            <h3 className="text-xl font-bold text-[#2d1a12]">Roasted in-house</h3>
            <p className="mt-3 text-[#5b453a]">Each roast is tuned for balance, sweetness, and aroma — delivered fresh to your door.</p>
          </div>
          <div className="rounded-[2rem] border border-[#ebdcc8] bg-white p-6 shadow-soft">
            <MapPin className="mb-4 h-10 w-10 text-[#6b432c]" />
            <h3 className="text-xl font-bold text-[#2d1a12]">Brew-friendly</h3>
            <p className="mt-3 text-[#5b453a]">Our coffee is built for espresso, French press, pour-over, and cold brew routines alike.</p>
          </div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8d6a4f]">Shop the collection</p>
            <h2 className="mt-2 text-3xl font-black text-[#2d1a12] sm:text-4xl">Curated roasts for every ritual</h2>
          </div>
          <Link href="/checkout" className="hidden rounded-full border border-[#d3b69a] px-5 py-2.5 text-sm font-semibold text-[#2d1a12] md:inline-flex">
            Checkout
          </Link>
        </div>

        <ShopClient products={products} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#2d1a12] p-8 text-[#f9efe8] shadow-soft lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e2c7a6]">How to brew</p>
              <h3 className="mt-3 text-3xl font-black">Find your perfect cup</h3>
              <p className="mt-4 max-w-md text-[#e4d3c7]">
                Choose the roast profile that matches your mood: bright and floral for mornings, round and caramel for balanced afternoons, deep and chocolatey for evening espresso.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-[#5b3d27] bg-[#3c271c] p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-[#e1c29d]">Light</div>
                <div className="mt-4 text-2xl font-black">Citrus</div>
                <div className="mt-2 text-sm text-[#f2e1d0]">Bright, aromatic, and lively.</div>
              </div>
              <div className="rounded-[1.75rem] border border-[#5b3d27] bg-[#3c271c] p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-[#e1c29d]">Medium</div>
                <div className="mt-4 text-2xl font-black">Caramel</div>
                <div className="mt-2 text-sm text-[#f2e1d0]">Balanced, smooth, and versatile.</div>
              </div>
              <div className="rounded-[1.75rem] border border-[#5b3d27] bg-[#3c271c] p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-[#e1c29d]">Dark</div>
                <div className="mt-4 text-2xl font-black">Cocoa</div>
                <div className="mt-2 text-sm text-[#f2e1d0]">Deep body and warming finish.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8d6a4f]">Testimonials</p>
          <h2 className="mt-2 text-3xl font-black text-[#2d1a12] sm:text-4xl">Coffee lovers keep coming back</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Maya R.", quote: "The flavor is vivid, premium, and every bag tastes like it was hand-crafted for my kitchen." },
            { name: "David S.", quote: "Fast delivery, gorgeous packaging, and a brew that feels unmistakably café-level." },
            { name: "Nora L.", quote: "From espresso to pour-over, this has become my everyday home coffee ritual." },
          ].map((review) => (
            <div key={review.name} className="rounded-[2rem] border border-[#ebdcc8] bg-white p-6 shadow-soft">
              <div className="mb-4 flex gap-1 text-[#f59e0b]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-[#4e3b31]">“{review.quote}”</p>
              <div className="mt-5 text-sm font-bold uppercase tracking-[0.15em] text-[#7a5842]">{review.name}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
