import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';
import Stripe from 'stripe';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Create order
router.post('/', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { items, shippingAddress } = req.body;

    const order = await prisma.order.create({
      data: {
        userId,
        shippingAddress,
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { orderItems: true }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' });
  }
});

// Get user orders
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order details
router.get('/:id', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const order = await prisma.order.findFirst({
      where: { id: req.params.id, userId },
      include: { orderItems: { include: { product: true } } }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Create payment intent
router.post('/:id/payment', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const order = await prisma.order.findFirst({
      where: { id: req.params.id, userId },
      include: { orderItems: true }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const amount = order.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { orderId: order.id }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create payment intent' });
  }
});

export default router;
