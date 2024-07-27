import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import OrderHistoryRouter from './modules/order_history/routes/order_hist-routes.js';
import { createConnection } from './shared/db/connection.js';

dotenv.config();
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Order history routes
app.use('/order-history', OrderHistoryRouter);

// Database connection
createConnection()
  .then(() => {
    // Start server
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('Application can\'t run as DB connection failed:', err);
    process.exit(1); // Exit the process with a failure code
  });
