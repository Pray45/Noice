import express from 'express';
import { OpenAires } from '../controllers/openaiController.js';

const openAiRouter = express.Router();

openAiRouter.post('/getlyrics', OpenAires);

export default openAiRouter;