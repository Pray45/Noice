import mongoose from "mongoose"

const ArtistSchema = new mongoose.Schema({

    name:
    {
        type: String,
        required: true
    },
    desc:
    {
        type: String,
        required: true
    },
    img:
    {
        type: String,
        required: true
    },

} , {timestamps:true})

const Artist = mongoose.model("Artist" , ArtistSchema)

export default Artist