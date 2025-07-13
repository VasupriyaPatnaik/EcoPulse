// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import ecoRoutes from './routes/ecoRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/eco', ecoRoutes);

app.get('/', (req, res) => {
  res.send('EcoPulse API running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
