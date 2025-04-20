
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import connectToDB from './db/index.js';  // Assuming the path is correct
import {router} from './routes/user.routes.js'
import { app } from './app.js';
connectToDB()
  .then(() => {
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);  // Stop the server if DB connection fails
  });

