import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "ethiopian-yirgacheffe",
    name: "Ethiopian Yirgacheffe",
    category: "Single Origin",
    roast: "Light",
    origin: "Ethiopia",
    notes: "Floral · Citrus · Berry",
    description:
      "A bright and elegant coffee with floral aroma, sparkling citrus notes, and a delicate berry finish.",
    price: 18.5,
    image:
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80",
    inventory: 20,
    isFeatured: true,
  },
  {
    slug: "house-blend",
    name: "Velvet House Blend",
    category: "Signature",
    roast: "Medium",
    origin: "Colombia · Brazil",
    notes: "Caramel · Cocoa · Hazelnut",
    description:
      "Balanced and velvet-smooth, crafted for your daily ritual with a rich caramel body and warm cocoa finish.",
    price: 16.9,
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
    inventory: 28,
    isFeatured: true,
  },
  {
    slug: "dark-roast-espresso",
    name: "Midnight Espresso",
    category: "Espresso",
    roast: "Dark",
    origin: "Brazil · Sumatra",
    notes: "Chocolate · Smoke · Walnut",
    description:
      "A bold espresso profile with a creamy body and smoky sweetness, ideal for lattes and cappuccinos.",
    price: 19.4,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    inventory: 16,
    isFeatured: true,
  },
  {
    slug: "guatemala-antigua",
    name: "Guatemala Antigua",
    category: "Single Origin",
    roast: "Medium",
    origin: "Guatemala",
    notes: "Red Apple · Toffee · Cocoa",
    description:
      "Crisp and layered with fruit sweetness and a buttery chocolate finish, perfect for slow mornings.",
    price: 17.8,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    inventory: 18,
    isFeatured: false,
  },
  {
    slug: "cold-brew-boost",
    name: "Cold Brew Boost",
    category: "Cold Brew",
    roast: "Dark",
    origin: "Brazil",
    notes: "Molasses · Vanilla · Cocoa",
    description:
      "Smooth and naturally sweet with a velvety finish and a longer, rich aftertaste ideal for iced coffee lovers.",
    price: 15.4,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    inventory: 24,
    isFeatured: false,
  },
  {
    slug: "honey-processed-kenya",
    name: "Honey Process Kenya",
    category: "Seasonal",
    roast: "Light",
    origin: "Kenya",
    notes: "Grapefruit · Honey · Peach",
    description:
      "A luminous cup with honey sweetness, citrus sparkle, and a juicy peach finish that stays vibrant and elegant.",
    price: 20.1,
    image:
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80",
    inventory: 12,
    isFeatured: true,
  },
  {
    slug: "mocca-espresso-mix",
    name: "Mocca Espresso Mix",
    category: "Blend",
    roast: "Medium",
    origin: "Brazil · Colombia",
    notes: "Brown Sugar · Almond · Orange",
    description:
      "Silky crema, balanced sweetness, and a bright orange lift that creates a luxurious café-style espresso.",
    price: 18.1,
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    inventory: 22,
    isFeatured: false,
  },
  {
    slug: "morning-french-roast",
    name: "Morning French Roast",
    category: "Classic",
    roast: "Dark",
    origin: "Peru · Honduras",
    notes: "Cocoa · Biscuit · Toasted Almond",
    description:
      "Rich and deeply satisfying, constructed for those who want a full-bodied aromatic cup from the first sip.",
    price: 17.2,
    image:
      "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=900&q=80",
    inventory: 21,
    isFeatured: false,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("Seeded coffee catalog successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed error:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
