import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Songmodel',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  img: {
    type: String,
    required: true, 
  },
}, {
  timestamps: true,
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
