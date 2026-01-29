const connectDB = require("../backend/config/db");
const Registration = require("../backend/models/Registration");

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    await connectDB();

    const { name, email, eventId, college, eventName } = req.body || {};

    if (!name || !email || !eventId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await Registration.create({
      name,
      email,
      eventId,
      college,
      eventName
    });

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Registration API error:", err);
    return res.status(500).json({ error: err.message });
  }
};
