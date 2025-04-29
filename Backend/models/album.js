import mongoose from "mongoose"

const AlbumSchema = new mongoose.Schema({

    name:{type: String , required: true},
    desc:{type: String , required: true},
    img:{type: String , required: true},

} , {timestamps:true})

const Album = mongoose.model("Album" , AlbumSchema)

export default Album