import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({

    name:
    { 
        type: String,
        required : true
    },
    artist:
    { 
        type: String,
        required : true
    },
    album:
    { 
        type: String,
        required : true
    },
    img:
    { 
        type: String,
        required : true
    },
    audio:
    { 
        type: String,
        required : true
    },
    duration:
    { 
        type: String,
        required : true
    },

} , {timestamps : true})

const Songmodel = mongoose.model("Song" , SongSchema)

export default Songmodel