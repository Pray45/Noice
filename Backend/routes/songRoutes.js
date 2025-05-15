import express from 'express';
import { addSong, listSong, removeSong, updateAlbum, updateArtistAlbum } from '../controllers/songController.js';
import upload from '../middlewares/multer.middleware.js';

const Songrouter = express.Router()

Songrouter.post('/add', upload.fields([{name:'img' , maxCount:1} , {name:'audio', maxCount:1}]) ,addSong)
Songrouter.get('/list',listSong)
Songrouter.post('/remove',removeSong)
Songrouter.put('/update',updateAlbum)
Songrouter.put('/updateartist',updateArtistAlbum)


export default Songrouter