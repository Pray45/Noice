import mongoose from "mongoose"

const PlaylistSchema = new mongoose.Schema({

    name:{type: String , required: true},
    color:{type: String , required: true},
    img:{type: String , required: true},

} , {timestamps:true})

const Playlist = mongoose.model("Playlist" , PlaylistSchema)

export default Playlist