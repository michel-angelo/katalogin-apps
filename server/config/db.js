const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 45000
    });
    console.log(`MongoDB Terkoneksi: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDB;
