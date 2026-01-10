// Load environment variables FIRST, before any other imports
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment-specific .env file
import dotenv from 'dotenv';
import { existsSync } from 'fs';

// Determine which env file to load based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = `.env.${nodeEnv}`;
const envPath = join(__dirname, '..', envFile);
const fallbackPath = join(__dirname, '../.env');

let result;
if (existsSync(envPath)) {
  result = dotenv.config({ path: envPath });
} else if (existsSync(fallbackPath)) {
  result = dotenv.config({ path: fallbackPath });
} else {
  console.error('❌ No .env file found!');
}

if (result?.error) {
  console.error('❌ Error loading .env file:', result.error.message);
}

// NOW import other modules (config.js will see the environment variables)
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/databses.js';
import config from './config/config.js';
import registrationRoutes from './routes/registrationRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalRateLimit } from './middleware/rateLimiter.js';

// Create Express app instance
const app = express();

// Get port from config
const PORT = config.port;

// Add middleware
app.use(cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());

// Apply general rate limiting to all routes
app.use(generalRateLimit);

// Use routes
app.use('/api', registrationRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: config.env,
    port: PORT
  });
});

// Test registration endpoint for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
  app.post('/api/test-registration', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Test endpoint working',
      receivedData: req.body,
      timestamp: new Date().toISOString()
    });
  });
}

// PayU payment confirmation handler function
const handlePayUConfirmation = (req, res) => {
  // Use environment variable with fallback for PayU redirects
  const productionUrl = process.env.FRONTEND_URL || 'https://lg87playarena.netlify.app';

  try {
    const { status, txnid, amount, productinfo, firstname, email, phone } = req.body;

    if (status === 'success') {
      // Payment successful - redirect to frontend with success parameters
      const redirectUrl = `${productionUrl}/register?payment_status=success&txnid=${txnid}&amount=${amount}`;
      return res.redirect(redirectUrl);
    } else {
      // Payment failed - redirect to frontend with failure parameters
      const redirectUrl = `${productionUrl}/register?payment_status=failed&txnid=${txnid}`;
      return res.redirect(redirectUrl);
    }
  } catch (error) {
    console.error('❌ Error processing PayU confirmation:', error);
    const redirectUrl = `${productionUrl}/register?payment_status=error`;
    return res.redirect(redirectUrl);
  }
};

// PayU webhook endpoint for handling payment confirmations
app.post('/api/payu-webhook', express.urlencoded({ extended: true }), handlePayUConfirmation);

// PayU redirect endpoint (alternative URL that PayU might use)
app.post('/api/payu-redirect', express.urlencoded({ extended: true }), handlePayUConfirmation);

// Also handle GET requests (in case PayU sends GET instead of POST)
app.get('/api/payu-webhook', handlePayUConfirmation);
app.get('/api/payu-redirect', handlePayUConfirmation);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Event Hosting Server',
    version: '1.0.0',
    environment: config.env,
    endpoints: {
      health: '/api/health',
      register: '/api/register',
      registrations: '/api/registrations'
    }
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handling middleware (must be last)
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} [${config.env}]`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
