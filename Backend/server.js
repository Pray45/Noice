import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import connectCloudinary from './db/Connectcoudinary.js';
import Songrouter from './routes/songRoutes.js';
import albumRouter from './routes/album.js';
import userRouter from './routes/userRouter.js';

const app = express();
dotenv.config();

const allowedOrigins = ['https://noice-cv.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectDB();
connectCloudinary();

app.use('/api/song' , Songrouter)
app.use('/api/album' , albumRouter)
app.use('/api/user' , userRouter)

app.get('/', (req, res) => {
  res.send('Hello welcome to my API !!!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
