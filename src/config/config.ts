export const corsOptions = {
  origin: 'https://yourdomain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
  optionsSuccessStatus: 200 
};