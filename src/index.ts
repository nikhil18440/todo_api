import express, { Request, Response } from 'express';
import userRoutes from './routes/user.routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', userRoutes);

const mongoUrl = process.env.MONGO_URL as string;

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});