import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: 'https://default-image-url.com'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    }
  ]
}, {
  timestamps: true
});

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;
