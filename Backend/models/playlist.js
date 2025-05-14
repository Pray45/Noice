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
  coverImage: {
    type: String,
    default: 'https://www.google.com/imgres?q=purple%20playlist%20&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fshutterstock%2Fvideos%2F3639521427%2Fthumb%2F11.jpg%3Fip%3Dx480&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fvideo%2Fsearch%2Fplaylist-icon&docid=KKBcFfI_DIOLCM&tbnid=rjhEsCYIuOZ1ZM&vet=12ahUKEwjG3YicoqCNAxVgUGcHHRSHKHgQM3oECF4QAA..i&w=480&h=270&hcb=2&ved=2ahUKEwjG3YicoqCNAxVgUGcHHRSHKHgQM3oECF4QAA',
  },
}, {
  timestamps: true,
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
