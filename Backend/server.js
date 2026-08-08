import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

import connectDB from './db/connectDB.js';
import connectCloudinary from './db/Connectcoudinary.js';
import Songrouter from './routes/songRoutes.js';
import albumRouter from './routes/albumRoutes.js';
import userRouter from './routes/userRouter.js';
import ArtistRouter from './routes/artistRoutes.js';
import PlaylistRouter from './routes/playlistRoutes.js';
import geminiAiRouter from './routes/geminiAiRoutes.js';

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl) or any origin in dev
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();
connectCloudinary();

app.use('/api/song', Songrouter);
app.use('/api/album', albumRouter);
app.use('/api/artist', ArtistRouter);
app.use('/api/playlist', PlaylistRouter);
app.use('/api/user', userRouter);
app.use('/api', geminiAiRouter);

app.get('/', (req, res) => {
  res.send('Hello welcome to my API !!!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});