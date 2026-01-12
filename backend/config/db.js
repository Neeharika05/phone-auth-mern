import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
//    const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    
    if (!mongoUri) {
      console.warn("⚠️  MONGO_URI not set in .env, skipping MongoDB connection");
      return;
    }

    const DB_NAME = "neeh";
    // const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    const connectionInstance = await mongoose.connect(`${mongoUri}/${DB_NAME}`);
    // const connectionInstance = await mongoose.connect(`${mongoUri}`);
    

    console.log(`✅ MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // Don't exit - Firebase Firestore will be used instead
  }
};

export default connectDB;
