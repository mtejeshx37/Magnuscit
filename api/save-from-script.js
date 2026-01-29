import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false
  }).then(m => m);

  cached.conn = await cached.promise;
  return cached.conn;
}

const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

const DataModel =
  mongoose.models.ScriptData ||
  mongoose.model("ScriptData", DataSchema);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    await connectDB();
    await DataModel.create(req.body);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Serverless error:", err);
    res.status(500).json({ error: err.message });
  }
}
