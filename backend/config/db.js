import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // This connects to the MONGO_URI in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
    // Stops the script if the connection fails
  }
};

export default connectDB;