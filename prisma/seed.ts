import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcryptjs.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@beanboom.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });

  // Create products
  const products = [
    {
      name: 'Ethiopian Yirgacheffe',
      description: 'Bright and floral with fruity undertones. Light-roasted for maximum complexity.',
      price: 18.99,
      category: 'Single Origin',
      roast: 'Light',
      origin: 'Ethiopia',
      image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80',
      published: true
    },
    {
      name: 'Brazilian Santos',
      description: 'Smooth, chocolatey with nutty finish. Perfect for espresso and milk drinks.',
      price: 16.99,
      category: 'Single Origin',
      roast: 'Medium',
      origin: 'Brazil',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
      published: true
    },
    {
      name: 'Colombian Geisha',
      description: 'Premium single origin with complex flavor profile. Award-winning coffee.',
      price: 24.99,
      category: 'Premium',
      roast: 'Medium',
      origin: 'Colombia',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      published: true
    },
    {
      name: 'Kenyan AA',
      description: 'Vibrant acidity with berry and citrus notes. Highly sought after.',
      price: 19.99,
      category: 'Single Origin',
      roast: 'Light',
      origin: 'Kenya',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
      published: true
    },
    {
      name: 'Dark Roast Espresso Blend',
      description: 'Bold and full-bodied with deep caramel and cocoa notes.',
      price: 15.99,
      category: 'Blend',
      roast: 'Dark',
      origin: 'Multi-Origin',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
      published: true
    },
    {
      name: 'Indonesian Sumatra',
      description: 'Earthy with herbal notes and low acidity. Unique processing method.',
      price: 17.99,
      category: 'Single Origin',
      roast: 'Dark',
      origin: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&q=80',
      published: true
    },
    {
      name: 'Costa Rican Tarrazú',
      description: 'Balanced with chocolate and spice undertones. High altitude grown.',
      price: 18.99,
      category: 'Single Origin',
      roast: 'Medium',
      origin: 'Costa Rica',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688bcb4f5?auto=format&fit=crop&w=800&q=80',
      published: true
    },
    {
      name: 'Guatemalan Huehuetenango',
      description: 'Smoky with hints of apple and citrus. Mountain grown excellence.',
      price: 19.99,
      category: 'Single Origin',
      roast: 'Light',
      origin: 'Guatemala',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b8e5?auto=format&fit=crop&w=800&q=80',
      published: true
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
