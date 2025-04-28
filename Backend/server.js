import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import connectCloudinary from './db/Connectcoudinary.js';
import Songrouter from './routes/songRoutes.js';
import playlistRouter from './routes/playlistRoutes.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app .use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectDB();
connectCloudinary();

app.use('/api/song' , Songrouter)
app.use('/api/playlist' , playlistRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});