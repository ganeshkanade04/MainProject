// Import required modules
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path:'./.env'
})
import connectToDB from './db/index.js';
const app = express();

connectToDB()
.then(()=>{
  console.log("✅ Connected to MongoDB");
  // Start the server after successful DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });


})
.catch((error)=>{
  console.error("❌ Error connecting to MongoDB:", error.message);
  process.exit(1); // Stop the server if DB connection fails
});
















