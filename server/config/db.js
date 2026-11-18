const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️ WARNING: process.env.MONGO_URI is not set. Falling back to local MongoDB.');
    } else {
      console.log('✓ Found MONGO_URI in environment variables.');
    }
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventhub_db';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
