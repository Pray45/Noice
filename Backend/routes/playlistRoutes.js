import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { removeSongFromPlaylist,createPlaylist, getUserPlaylists, getPlaylistById, updatePlaylist, deletePlaylist, addSongToPlaylist } from '../controllers/playlistController.js';

const PlaylistRouter = express.Router();

PlaylistRouter.post('/add',authMiddleware , createPlaylist); 
PlaylistRouter.get('/list', authMiddleware, getUserPlaylists); 
PlaylistRouter.get('/list/:id', authMiddleware, getPlaylistById);
PlaylistRouter.put('/add-song/:id', authMiddleware, addSongToPlaylist); 
PlaylistRouter.put('/update/:id', authMiddleware, updatePlaylist);
PlaylistRouter.delete('/remove/:id', authMiddleware, deletePlaylist); 
PlaylistRouter.delete('/remove/:playlistId/:songId', authMiddleware, removeSongFromPlaylist);


export default PlaylistRouter
