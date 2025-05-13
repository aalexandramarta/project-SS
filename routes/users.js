const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// GET -> List all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET -> Get a user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple login
router.post('/:id/login', async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        health: true,
        medication: {
          include: { reminder: true }
        },
        device_device_owner_idTouser: true,
        device_device_caretaker_idTouser: true,
        user_subscription: {
          include: { subscription: true }
        }
      }
    });

    if (!user || user.email !== email || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Remove password before sending back
    const { password: _, ...userWithoutPassword } = user;

    res.json({ message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});


// POST -> Create a new user
router.post('/', async (req, res) => {
  const { email, password, birth_date, weight_kg, height_cm, has_diabetes, has_dementia } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        birth_date,
        weight_kg,
        height_cm,
        has_diabetes,
        has_dementia
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data or missing fields' });
  }
});

// PUT -> Update an existing user
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Merge existing values with request body
    const data = {
      email: req.body.email ?? existing.email,
      password: req.body.password ?? existing.password,
      birth_date: req.body.birth_date ?? existing.birth_date,
      weight_kg: req.body.weight_kg ?? existing.weight_kg,
      height_cm: req.body.height_cm ?? existing.height_cm,
      has_diabetes: req.body.has_diabetes ?? existing.has_diabetes,
      has_dementia: req.body.has_dementia ?? existing.has_dementia
    };
    const updatedUser = await prisma.user.update({ where: { id }, data });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data or update failed', details: error.message });
  }
});

// DELETE -> Delete a user
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    // Remove user-subscriptions
    await prisma.user_subscription.deleteMany({ where: { user_id: id } });

    // Delete reminders of user's medications
    const meds = await prisma.medication.findMany({ where: { user_id: id } });
    for (const med of meds) {
      await prisma.reminder.deleteMany({ where: { medication_id: med.id } });
    }

    // Remove medications
    await prisma.medication.deleteMany({ where: { user_id: id } });

    // Remove health records
    await prisma.health.deleteMany({ where: { user_id: id } });

    // Unlink devices: clear owner and caretaker references
    await prisma.device.updateMany({ where: { owner_id: id }, data: { owner_id: null } });
    await prisma.device.updateMany({ where: { caretaker_id: id }, data: { caretaker_id: null } });
    
    // Finally delete user
    await prisma.user.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'User not found or cannot delete' });
  }
});

module.exports = router;