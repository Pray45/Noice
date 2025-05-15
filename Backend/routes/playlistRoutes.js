import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { removeSongFromPlaylist,createPlaylist, getUserPlaylists, openPlaylist, deletePlaylist, addSongToPlaylist } from '../controllers/playlistController.js';
import upload from '../middlewares/multer.middleware.js';

const PlaylistRouter = express.Router();

PlaylistRouter.post('/add',authMiddleware , upload.single('img'), createPlaylist); 
PlaylistRouter.get('/list', authMiddleware, getUserPlaylists); 
PlaylistRouter.get('/list/:id', authMiddleware, openPlaylist);
PlaylistRouter.put('/add-song/:id', authMiddleware, addSongToPlaylist); 
PlaylistRouter.delete('/remove/:id', authMiddleware, deletePlaylist); 
PlaylistRouter.delete('/remove/:playlistId/:songId', authMiddleware, removeSongFromPlaylist);


export default PlaylistRouter
