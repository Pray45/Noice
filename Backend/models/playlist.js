import mongoose from "mongoose"

const playlistSchema = new mongoose.Schema({

    name:{type: String , required: true},
    songs:{type: Array , required: true},
    img:{type: String , required: true},

} , {timestamps:true})

const Playlistdata = mongoose.model("playlist" , playlistSchema)

export default Playlistdata