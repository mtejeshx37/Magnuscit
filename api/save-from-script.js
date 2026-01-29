import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(process.env.MONGO_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  college: String,
  eventId: String,
  eventName: String,
  createdAt: { type: Date, default: Date.now }
});

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);

export default async function handler(req, res) {
  // ✅ Allow HEAD (Vercel health check)
  if (req.method === "HEAD") {
    return res.status(200).end();
  }

  // ❌ Block anything except POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    // 🔥 THIS was crashing earlier if body was undefined
    const body = req.body || {};

    const { name, email, eventId, eventName, college } = body;

    if (!name || !email || !eventId) {
      return res.status(400).json({
        message: "Missing required fields",
        received: body
      });
    }

    await Registration.create({
      name,
      email,
      college,
      eventId,
      eventName
    });

    return res.status(201).json({ message: "Saved to MongoDB" });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
