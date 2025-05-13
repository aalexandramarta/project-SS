const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// POST -> Add a user subscription
router.post('/', async (req, res) => {
  const { user_id, subscription_id } = req.body;

  try {
    const newUserSubscription = await prisma.user_subscription.create({
      data: {
        user_id,
        subscription_id
      }
    });

    res.status(201).json(newUserSubscription);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to subscribe user' });
  }
});

module.exports = router;
