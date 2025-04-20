import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
dotenv.config(); // Load environment variables from .env file
async function connectToDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB");
    }
    catch(error){
        console.error("❌ Error connecting to MongoDB:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
}


export default connectToDB; // Call the function