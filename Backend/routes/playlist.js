import express from 'express';

import {getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist} from '../controllers/playlistController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const playlistRouter = express.Router();

playlistRouter.get('/', authMiddleware, getAllPlaylists);
playlistRouter.get('/:id', authMiddleware, getPlaylistById);
playlistRouter.post('/', authMiddleware, createPlaylist);
playlistRouter.put('/:id', authMiddleware, updatePlaylist);
playlistRouter.delete('/:id', authMiddleware, deletePlaylist);

export default playlistRouter;
