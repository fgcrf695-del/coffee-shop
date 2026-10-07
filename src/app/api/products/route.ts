import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!order) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-12">
        <div className="rounded-[2rem] border border-[#ebdcc8] bg-white p-10 text-center shadow-soft">
          <h1 className="text-3xl font-black text-[#2d1a12]">Order not found</h1>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-[#2d1a12] px-6 py-3 text-white">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-[#ebdcc8] bg-white p-8 shadow-soft">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6a4f]">Order confirmation</p>
          <h1 className="mt-2 text-3xl font-black text-[#2d1a12] sm:text-4xl">Thank you, {order.customerName}!</h1>
          <p className="mt-3 text-[#5f483d]">Your order #{order.id.slice(0, 8)} has been placed successfully.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-[#ebdcc8] bg-[#f9f4ef] p-4">
                <div>
                  <div className="font-bold text-[#2d1a12]">{item.product.name}</div>
                  <div className="text-sm text-[#5f483d]">Quantity: {item.quantity}</div>
                </div>
                <div className="font-bold text-[#2d1a12]">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[1.5rem] border border-[#ebdcc8] bg-[#f9f4ef] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d6a4f]">Payment</div>
            <div className="mt-3 text-lg font-bold text-[#2d1a12]">{order.paymentMethod}</div>
            <div className="mt-6 text-xs uppercase tracking-[0.18em] text-[#8d6a4f]">Status</div>
            <div className="mt-2 rounded-full bg-[#ebf8ef] px-3 py-2 text-sm font-semibold text-[#1f6e45]">{order.status}</div>
            <div className="mt-6 border-t border-[#ebdcc8] pt-4 text-sm text-[#5f483d]">
              <div>Shipping to: {order.city}</div>
              <div className="mt-2">Estimated delivery: 2-4 business days</div>
            </div>
            <div className="mt-6 text-2xl font-black text-[#2d1a12]">Total: ${order.total.toFixed(2)}</div>
          </div>
        </div>

        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#2d1a12] px-6 py-3 font-semibold text-white">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
