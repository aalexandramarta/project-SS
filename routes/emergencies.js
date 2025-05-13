const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// PUT -> Mark emergency as handled
router.put('/emergencies/:id/handle', async (req, res) => {
  const { id } = req.params;

  try {
    const emergency = await prisma.emergency.findUnique({
      where: { id: Number(id) }
    });

    if (!emergency) {
      return res.status(404).json({ error: 'Emergency not found' });
    }

    const updated = await prisma.emergency.update({
      where: { id: Number(id) },
      data: { handled: true }
    });

    res.json({ message: 'Emergency marked as handled', emergency: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark emergency as handled' });
  }
});

module.exports = router;
