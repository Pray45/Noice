import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: 
    { 
        type: String,
        required: true,
        unique: true
    },

    email: 
    { 
        type: String,
        required: true,
        unique: true 
    },

    password: 
    { 
        type: String,
        required: true 
    },

    likedSongs: 
    [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song' 
    }],
    
},
    { timestamps:true }
)

const User = mongoose.model("User", userSchema);

export default User