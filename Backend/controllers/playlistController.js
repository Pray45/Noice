import Playlist from "../models/playlist.js";
import Songmodel from '../models/song.model.js'
import {v2 as cloudinary} from "cloudinary"
import fs from 'fs';



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    create playlist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const createPlaylist = async (req, res) => {

  try {

    const { name } = req.body;
    const songs = req.body.songs? typeof req.body.songs === 'string'? JSON.parse(req.body.songs): req.body.songs: [];
    const img = req.file;
    const imgUpload = await cloudinary.uploader.upload(img.path, {resource_type: 'image',});

    const playlist = new Playlist({
      name,
      songs,
      img: imgUpload.secure_url,
      user: req.user._id,
    });

    await playlist.save();
    fs.unlinkSync(img.path);

    res.status(200).json({success: true, playlist, message: "playlist created successfully"});

  } catch (error) {

    res.status(400).json({ success: false, error , message: "Failed to create a playlist" });

  }
};



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    list playlist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const getUserPlaylists = async (req, res) => {

  try {

    const playlists = await Playlist.find({ user: req.user._id }).populate('songs');
    res.status(200).json({ success: true, playlists, message: "playlists listed successfully" });

  } catch (error) {

    res.status(400).json({success: false, error, message: 'Failed to list playlists' });

  }
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    open playlist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const openPlaylist = async (req, res) => {

  try {

    const playlist = await Playlist.findById(req.params.id).populate('songs');
    
    if (!playlist || playlist.user.toString() !== req.user._id.toString())  return res.status(403).json({ error: 'Access denied' });
    res.status(200).json({ success: true, playlist, message: "playlist opened successfully" });

  } catch (error) {

    res.status(400).json({success: false, error, message: 'Failed to open playlists' });

  }
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    delete playlist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const deletePlaylist = async (req, res) => {

  try {
   
    const playlist = await Playlist.findById(req.body.id);
    
    if (!playlist || playlist.user.toString() !== req.user._id.toString())  return res.status(403).json({ error: 'Access denied' })
    
    await Playlist.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: 'Playlist deleted successfully' });
    
  } catch (error) {

    res.status(400).json({success: false, error, message: 'Failed to delete playlists' });
    
  }
};


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    addsong playlist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const addSongToPlaylist = async (req, res) => {

  try {
    
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.body.id);
    
    if (!playlist || playlist.user.toString() !== req.user._id.toString()) return res.status(400).json({ error: 'Access denied' })
    

    if (playlist.songs.includes(songId)) return res.status(400).json({ error: 'Song is already in the playlist' });
    
    playlist.songs.push(songId);
    await playlist.save();
    res.status(200).json({success: true, playlist, message:"song added successfully in playlist"});

  } catch (error) {

    res.status(400).json({success: false, error, message: 'Failed to add song in playlists' });

  }
};



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    remove song from playlist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const removeSongFromPlaylist = async (req, res) => {
  
  try {

    const { playlistId, songId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist || playlist.user.toString() !== req.user._id.toString()) return res.status(400).json({ error: 'Access denied' })
    
    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await playlist.save();
    res.status(200).json({ success: true , message: 'Song removed from playlist', playlist });

  } catch (error) {

    res.status(400).json({ success: false, error,  message: 'Failed to remove song from playlist' });

  }
};



export { createPlaylist, getUserPlaylists, openPlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist }