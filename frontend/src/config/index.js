// Application configuration
export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  },
  app: {
    name: 'Buildafeature',
    version: '1.0.0',
  },
};
