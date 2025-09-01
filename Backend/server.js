// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // <-- Import admin routes
import userRoutes from './routes/userRoutes.js';   // <-- Import user routes
import capabilityRoutes from './routes/capabilityRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import questionRoutes from './routes/questionRoutes.js'
import fieldRoutes from './routes/fieldRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // <-- Use admin routes
app.use('/api/users', userRoutes);   // <-- Use user routes
app.use('/api/capabilities', capabilityRoutes);
app.use('/api/ai', aiRoutes); 
app.use('/api/questions', questionRoutes); 
app.use('/api/fields', fieldRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});