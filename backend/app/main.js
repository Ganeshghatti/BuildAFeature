const config = require('./core/config');
const { initializeApp } = require('./bootstrap');

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Initialize application (connect DB, setup routes, etc.)
    const app = await initializeApp();

    // Start server
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📝 Environment: ${config.env}`);
      console.log(`🌐 API available at http://localhost:${config.port}/api`);
    });

    // Graceful shutdown
    const gracefulShutdown = () => {
      console.log('\n⚠️  Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('❌ Forcing shutdown');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
