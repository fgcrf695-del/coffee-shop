import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Create product (admin only)
router.post('/products', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const { name, description, price, category, roast, origin, image } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        category,
        roast,
        origin,
        image,
        published: true
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// Update product (admin only)
router.patch('/products/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body
    });

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// Delete product (admin only)
router.delete('/products/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
});

// Get dashboard stats (admin only)
router.get('/dashboard/stats', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const [totalOrders, totalRevenue, totalUsers, totalProducts] = await Promise.all([
      prisma.order.count(),
      prisma.orderItem.aggregate({
        _sum: { price: true }
      }),
      prisma.user.count(),
      prisma.product.count()
    ]);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue._sum.price || 0,
      totalUsers,
      totalProducts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
