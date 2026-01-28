const mongoose = require('mongoose');

/**
 * Cached MongoDB connection for serverless
 * Reuses connection across invocations
 */
let cachedConnection = null;

const connectDB = async () => {
  // Return cached connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('❌ MONGO_URI not found in environment variables');
  }

  try {
    // Disconnect if in bad state
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    await mongoose.connect(mongoUri, opts);
    
    cachedConnection = mongoose.connection;
    console.log('✅ MongoDB connected successfully');
    
    return cachedConnection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    cachedConnection = null;
    throw error;
  }
};

module.exports = connectDB;
