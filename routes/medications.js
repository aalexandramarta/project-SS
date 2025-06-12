const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const medications = req.body.medications;

    if (!Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ error: 'No medications provided' });
    }

    for (const med of medications) {
      const { user_id, name, dosage, instruction, reminderTimes, frequency } = med;

      if (
        !user_id ||
        !name ||
        !dosage ||
        !frequency ||
        !reminderTimes ||
        !Array.isArray(reminderTimes) ||
        reminderTimes.length === 0
      ) {
        return res.status(400).json({ error: 'Missing or invalid fields in one medication' });
      }

      const reminders = reminderTimes.map((timeStr) => {
        const [hour, minute] = timeStr.split(':').map(Number);
        if (isNaN(hour) || isNaN(minute)) {
          throw new Error(`Invalid time format: ${timeStr}`);
        }

        const remindAt = new Date(`1970-01-01T${timeStr.padStart(5, '0')}:00Z`);
        const now = new Date();
        const nextReminder = new Date(now);
        nextReminder.setHours(hour, minute, 0, 0);
        if (nextReminder < now) {
          nextReminder.setDate(nextReminder.getDate() + 1);
        }

        return {
          remind_at: remindAt,
          frequency,
          next_reminder: nextReminder,
        };
      });

      await prisma.medication.create({
        data: {
          user: { connect: { id: Number(user_id) } },
          name,
          dosage_mg: dosage,
          instuction: instruction,
          reminder: {
            create: reminders,
          },
        },
        include: {
          reminder: true,
        },
      });
    }

    res.status(201).json({ message: 'Medications saved successfully' });
  } catch (error) {
    console.error('❌ Error in POST /medications:', error);
    res.status(500).json({ error: 'Server error saving medications' });
  }
});


// GET /medications/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const medications = await prisma.medication.findMany({
      where: {
        user_id: Number(userId),
      },
      include: {
        reminder: true,
      },
      orderBy: {
        id: 'desc',
      }
    });

    res.status(200).json(medications);
  } catch (error) {
    console.error('❌ Error in GET /medications/:userId:', error);
    res.status(500).json({ error: 'Failed to fetch medications.' });
  }
});

module.exports = router;