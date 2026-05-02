export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { customerName, vehicle, issue, priority, location, scheduledAt } = req.body ?? {};
  if (!customerName || !vehicle || !issue || !priority || !location || !scheduledAt) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
  }

  return res.status(201).json({
    booking: {
      id: crypto.randomUUID(),
      customerName,
      vehicle,
      issue,
      priority,
      location,
      scheduledAt
    },
    reminders: [
      { channel: 'sms', scheduledFor: scheduledAt },
      { channel: 'email', scheduledFor: scheduledAt }
    ]
  });
}
