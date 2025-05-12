import Playlist from '../models/Playlist.js';

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ createdBy: req.user._id });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ _id: req.params.id, createdBy: req.user._id }).populate('songs');
    if (!playlist) return res.status(404).json({ error: 'not found' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { name, coverImage, songs } = req.body;
    const newPlaylist = new Playlist({ name, coverImage, songs, createdBy: req.user._id });
    const saved = await newPlaylist.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'create error' });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const updated = await Playlist.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'not found or unauthorized' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'update error' });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const deleted = await Playlist.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!deleted) return res.status(404).json({ error: 'not found or unauthorized' });
    res.json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ error: 'delete error' });
  }
};


export {getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist}