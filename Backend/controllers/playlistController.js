import Playlist from "../models/playlist.js";
import Songmodel from '../models/song.model.js'
const createPlaylist = async (req, res) => {
  
  const { name, songs, coverImage } = req.body;

  try {
    const playlist = new Playlist({
      name,
      songs,
      coverImage,
      user: req.user._id,
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create playlist' });
  }
};

const getUserPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ user: req.user._id }).populate('songs');
  console.log(playlists)
  res.json(playlists);
  try {
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist || playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
};

const updatePlaylist = async (req, res) => {
  const { name, songs, coverImage } = req.body;

  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist || playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (name) playlist.name = name;
    if (songs) playlist.songs = songs;
    if (coverImage !== undefined) playlist.coverImage = coverImage;

    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update playlist' });
  }
};

const deletePlaylist = async (req, res) => {

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist || playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }
    console.log(playlist);
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted successfully' });
};

const addSongToPlaylist = async (req, res) => {
  const { songId } = req.body;

  if (!songId) {
    return res.status(400).json({ error: 'Song ID is required' });
  }

  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist || playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ error: 'Song is already in the playlist' });
    }

    playlist.songs.push(songId);
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist || playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await playlist.save();

    res.json({ message: 'Song removed from playlist', playlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove song from playlist' });
  }
};

export { createPlaylist, getUserPlaylists, getPlaylistById, updatePlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist }
