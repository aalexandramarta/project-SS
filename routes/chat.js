const express = require('express');
const router = express.Router();

router.post('/chat', (req, res) => {
  const { message } = req.body;
  const input = message.toLowerCase().trim();

  let reply = "🤖 I'm not sure how to answer that. Try asking about your cane, medication, reminders, or emergencies.";

  // ===== DAUGHTER/CARETAKER CONNECTING =====
  if (
    (input.includes('daughter') || input.includes('caretaker') || input.includes('family')) &&
    (input.includes('connect') || input.includes('add') || input.includes('pair') || input.includes('link'))
  ) {
    reply = `👩‍👧‍👦 Your caretaker can connect like this:
1. Open the app on their phone
2. Tap **"Connect to Cane"**
3. Scan the same QR code from your Smart Cane
They’ll now have access to your steps and alerts.`;
  }

  // ===== CONNECT CANE =====
  else if (
    (input.includes('connect') || input.includes('pair') || input.includes('link') || input.includes('qr')) &&
    (input.includes('cane') || input.includes('walker') || input.includes('device') || input.includes('smart'))
  ) {
    reply = `🦯 To connect your SmartKey cane:
1. Open the app and tap **"Connect Cane"**
2. Scan the **QR code** on your cane
3. Done! Your cane is now linked to your account

👩‍⚕️ A caretaker can scan the same code later to connect too.`;
  }

  // ===== MEDICATION / REMINDERS =====
  else if (
    input.includes('medication') || input.includes('medicine') ||
    input.includes('remind') || input.includes('pill') || input.includes('notification')
  ) {
    reply = `💊 You can enter your medications in the app and get reminders.
You’ll get notified when it’s time to take your pills — no need to remember everything!`;
  }

  // ===== STEPS / ACTIVITY =====
  else if (
    input.includes('steps') || input.includes('walk') || input.includes('distance') || input.includes('activity')
  ) {
    reply = `🚶‍♂️ Your cane automatically tracks how many steps you take.
You can view this in the app — and so can your caretaker if they’re connected.`;
  }

  // ===== EMERGENCY FEATURE =====
  else if (
    input.includes('emergency') || input.includes('panic') || input.includes('alert') ||
    (input.includes('help') || input.includes('button'))
  ) {
    reply = `🚨 In an emergency, press the red **Emergency Button** on your cane.
Your caretaker will instantly get an alert with your live location.`;
  }

  // ===== MAP / NEARBY =====
  else if (
    input.includes('map') || input.includes('location') || input.includes('where') ||
    input.includes('gps') || input.includes('nearby') || input.includes('find')
  ) {
    reply = `🗺️ The app helps you:
• Find your SmartKey cane's location
• Locate nearby **pharmacies**, **hospitals**, and **supermarkets**
Just open the **Maps** tab in the app.`;
  }

  // ===== GENERAL GREETINGS / HELP =====
  else if (
    input.includes('hello') || input.includes('hi') || input.includes('good') ||
    input.includes('what') || input.includes('do') || input.includes('app') ||
    input.includes('feature') || input.includes('ai')
  ) {
    reply = `🧠 Hello! This app helps you:
• Connect your SmartKey cane
• Track your walking steps
• Get medication reminders
• Use maps for navigation
• Notify your caretaker in emergencies

Ask me about any of these! 😊`;
  }

  res.json({ reply });
});

module.exports = router;
