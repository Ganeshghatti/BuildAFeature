const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./core/config');
const { connectDB } = require('./db/session');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const { generalLimiter } = require('./middlewares/rateLimiter');

// Import routers
const authRouter = require('./api/v1/routers/authRouter');

/**
 * Create and configure Express application
 * @returns {express.Application} Configured Express app
 */
const createApp = () => {
  const app = express();

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: config.cors.origin,
      credentials: config.cors.credentials,
    })
  );

  // Cookie parser middleware (must be before body parsers)
  app.use(cookieParser());

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Apply general rate limiter to all API routes
  app.use('/api', generalLimiter);

  // Health check endpoint (no rate limit)
  app.get('/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use('/api/auth', authRouter);

  // 404 handler (must be after all routes)
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};

/**
 * Initialize application
 * @returns {Promise<express.Application>} Configured Express app
 */
const initializeApp = async () => {
  // Connect to database
  await connectDB();

  // Create and configure Express app
  const app = createApp();

  return app;
};

module.exports = {
  createApp,
  initializeApp,
};
