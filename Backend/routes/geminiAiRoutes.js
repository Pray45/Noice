import express from 'express';
import { GeminiLyrics } from '../controllers/geminiAiController.js';

const geminiAiRouter = express.Router();

geminiAiRouter.post('/getlyrics', GeminiLyrics);

export default geminiAiRouter;