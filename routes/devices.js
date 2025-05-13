const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// GET -> List all devices
router.get('/', async (req, res) => {
  try {
    const devices = await prisma.device.findMany({
      include: {
        emergency: true,
        user_device_owner_idTouser: true,
        user_device_caretaker_idTouser: true
      }
    });
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET -> Get a single device by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const device = await prisma.device.findUnique({
      where: { id: Number(id) },
      include: {
        emergency: true,
        user_device_owner_idTouser: true,
        user_device_caretaker_idTouser: true
      }
    });

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST -> Create a new device
router.post('/', async (req, res) => {
  const {
    owner_id,
    caretaker_id,
    qr_code,
    longitude,
    latitude,
    is_paired,
    is_connected
  } = req.body;

  try {
    const newDevice = await prisma.device.create({
      data: {
        owner_id,
        caretaker_id,
        qr_code,
        longitude,
        latitude,
        is_paired,
        is_connected
      }
    });
    res.status(201).json(newDevice);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data or missing fields' });
  }
});

// POST -> Trigger an emergency for a device
router.post('/:id/emergency', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the device exists
    const device = await prisma.device.findUnique({
      where: { id: Number(id) }
    });

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    // Create emergency entry
    const emergency = await prisma.emergency.create({
      data: {
        device_id: device.id,
        handled: false,
        occured_at: new Date()
      }
    });

    res.status(201).json({ message: 'Emergency triggered', emergency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to trigger emergency' });
  }
});

// PUT -> Update a device
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const existing = await prisma.device.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ error: 'Device not found' });
    }

    const data = {
      owner_id: req.body.owner_id ?? existing.owner_id,
      caretaker_id: req.body.caretaker_id ?? existing.caretaker_id,
      qr_code: req.body.qr_code ?? existing.qr_code,
      longitude: req.body.longitude ?? existing.longitude,
      latitude: req.body.latitude ?? existing.latitude,
      is_paired: req.body.is_paired ?? existing.is_paired,
      is_connected: req.body.is_connected ?? existing.is_connected
    };

    const updatedDevice = await prisma.device.update({
      where: { id },
      data
    });

    res.json(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data or update failed', details: error.message });
  }
});


// DELETE -> Delete a device by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Delete related emergencies first
    await prisma.emergency.deleteMany({ where: { device_id: Number(id) } });

    // Then delete the device
    await prisma.device.delete({ where: { id: Number(id) } });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Device not found or cannot delete' });
  }
});

module.exports = router;
