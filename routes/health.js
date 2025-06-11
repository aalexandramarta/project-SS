const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { user_id, date, steps, distance_km_, calories } = req.body;

  try {
    const healthEntry = await prisma.health.create({
      data: {
        user_id: user_id ?? undefined,
        date: date ? new Date(date) : undefined, // optional date
        steps: steps ?? undefined,
        distance_km_: distance_km_ ?? undefined, // mapped field
        calories: calories ?? undefined,
      },
    });

    res.status(201).json(healthEntry);
  } catch (error) {
    console.error('Error creating health entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:user_id', async (req, res) => {
  const userId = parseInt(req.params.user_id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user_id' });
  }

  try {
    const records = await prisma.health.findMany({
      where: { user_id: userId },
      orderBy: { date: 'desc' },
    });

    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router; // ✅ CORRECT