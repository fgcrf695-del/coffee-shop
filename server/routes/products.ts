import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, roast, search, page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { published: true };

    if (category) where.category = category;
    if (roast) where.roast = roast;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        include: { reviews: true }
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { reviews: { include: { user: true } } }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Add review (authenticated)
router.post('/:id/reviews', authenticate, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = (req as any).user.id;

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        productId: req.params.id,
        userId
      },
      include: { user: true }
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review' });
  }
});

export default router;
