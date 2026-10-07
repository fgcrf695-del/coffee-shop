"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";

const paymentOptions = [
  "Credit Card",
  "Bank Transfer",
  "Cash on Delivery",
  "Crypto Wallet",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [ form, setForm ] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "Credit Card",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!items.length) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })),
          customer: form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      clearCart();
      router.push(`/order/${data.orderId}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Checkout failed.");
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-12">
        <div className="rounded-[2rem] border border-[#ebdcc8] bg-white p-10 text-center shadow-soft">
          <h1 className="text-3xl font-black text-[#2d1a12]">Your cart is empty</h1>
          <p className="mt-3 text-[#5f483d]">Add coffee to continue with your order.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6a4f]">Checkout</p>
        <h1 className="mt-2 text-3xl font-black text-[#2d1a12] sm:text-4xl">Complete your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-[#ebdcc8] bg-white p-6 shadow-soft">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-[#4e3b31]">
              Full name
              <input
                value={form.customerName}
                onChange={(event) => setForm({ ...form, customerName: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-[#e7d6c3] bg-[#f9f4ef] px-4 py-3 outline-none transition focus:border-[#a36d4a]"
                required
              />
            </label>
            <label className="block text-sm font-medium text-[#4e3b31]">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-[#e7d6c3] bg-[#f9f4ef] px-4 py-3 outline-none transition focus:border-[#a36d4a]"
                required
              />
            </label>
            <label className="block text-sm font-medium text-[#4e3b31]">
              Phone
              <input
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-[#e7d6c3] bg-[#f9f4ef] px-4 py-3 outline-none transition focus:border-[#a36d4a]"
                required
              />
            </label>
            <label className="block text-sm font-medium text-[#4e3b31]">
              ZIP code
              <input
                value={form.zipCode}
                onChange={(event) => setForm({ ...form, zipCode: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-[#e7d6c3] bg-[#f9f4ef] px-4 py-3 outline-none transition focus:border-[#a36d4a]"
                required
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-[#4e3b31]">
            Street address
            <input
              value={form.address}
              onChange={(event) => setForm({ ...form, address: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-[#e7d6c3] bg-[#f9f4ef] px-4 py-3 outline-none transition focus:border-[#a36d4a]"
              required
            />
          </label>

          <label className="block text-sm font-medium text-[#4e3b31]">
            City
            <input
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-[#e7d6c3] bg-[#f9f4ef] px-4 py-3 outline-none transition focus:border-[#a36d4a]"
              required
            />
          </label>

          <div>
            <div className="mb-3 text-sm font-medium text-[#4e3b31]">Payment method</div>
            <div className="grid gap-3 sm:grid-cols-2">
              {paymentOptions.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setForm({ ...form, paymentMethod: method })}
                  className={`rounded-2xl border px-4 py-3 text-left font-medium transition ${
                    form.paymentMethod === method
                      ? "border-[#a36d4a] bg-[#f4e7dc] text-[#2d1a12]"
                      : "border-[#e7d6c3] bg-[#f9f4ef] text-[#4e3b31]"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#2d1a12] px-5 py-3 font-semibold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Processing order..." : `Place order · $${subtotal.toFixed(2)}`}
          </button>
        </form>

        <aside className="h-fit rounded-[2rem] border border-[#ebdcc8] bg-white p-6 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6a4f]">Order summary</div>
          <div className="mt-5 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3 border-b border-[#f3e8df] pb-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#2d1a12]">{product.name}</div>
                  <div className="text-sm text-[#5e473e]">Qty: {quantity}</div>
                </div>
                <div className="font-bold text-[#2d1a12]">${(product.price * quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-[#ebdcc8] pt-5">
            <div className="flex items-center justify-between text-lg font-black text-[#2d1a12]">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
