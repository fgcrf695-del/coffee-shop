import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        createdAt: true
      }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update profile
router.patch('/me', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { firstName, lastName, phone, address } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone && { phone }),
        ...(address && { address })
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true
      }
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
});

export default router;
