// Configuration file with dynamic values that read from environment at runtime
const config = {
  // Server configuration
  get port() {
    return process.env.PORT || 5000;
  },

  // MongoDB configuration
  mongodb: {
    get uri() {
      return process.env.MONGODB_URI || 'mongodb+srv://Christopher:Z38UZkon7oC3Ckv9@cluster0.4bebqgh.mongodb.net/Event-registration';
    },
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },

  // Environment
  get env() {
    return process.env.NODE_ENV || 'development';
  },

  // CORS configuration
  cors: {
    get origin() {
      const isDevelopment = process.env.NODE_ENV === 'development';

      // Production URLs (always included)
      const productionOrigins = [
        'https://lg87playarena.netlify.app',
        process.env.FRONTEND_URL,
      ];

      // Development URLs (only included in development mode)
      const developmentOrigins = isDevelopment ? [
        'http://localhost:5173',
        'http://localhost:3000',
      ] : [];

      return [...productionOrigins, ...developmentOrigins].filter(Boolean);
    },
    credentials: true
  }
};

export default config;
