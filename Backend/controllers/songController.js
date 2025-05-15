import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import Songmodel from "../models/song.model.js"


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    adding song    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const addSong = async (req, res) => {

    try {    

        const { name, artist, artistalbum, album, playlist, liked} = req.body
        const audio = req.files.audio[0]
        const img = req.files.img[0]
        const audioUpload = await cloudinary.uploader.upload(audio.path , {resource_type: "video"})
        const imgUpload = await cloudinary.uploader.upload(img.path , {resource_type: "image"})
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration)%60}`

        const uploaded = {
            name,
            artist, 
            album,
            artistalbum,
            playlist,
            liked,
            img:  imgUpload.secure_url,
            audio: audioUpload.secure_url,
            duration
        }

        const song = Songmodel(uploaded)
        await song.save()
        fs.unlinkSync(audio.path)
        fs.unlinkSync(img.path)

        res.status(200).json({ success: true, song, message: "Song uploaded successfully" })
        
    } catch (error) {

        res.status(400).json({ success: false, error, message: "Failed to upload song" })

    }

}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    list songs    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const listSong = async (req, res) => {

    try {

        const songlist = await Songmodel.find({})
        res.status(200).json({ success: true, songlist, message: "Song listed successfully" })

    } catch (error) {

        res.status(400).json({success: false, error, message: "faild to list songs"})

    }
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    remove song    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



const removeSong = async(req,res) => {

    try {

        await Songmodel.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, message: "Song deleted successfully" })

    } catch (error) {

        res.status(400).json({ success: false, error, message: "Failed to remove song" })

    }
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    update song Album    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const updateAlbum = async (req, res) => {

  try {

    const { songId, newAlbum } = req.body;
    const updatedSong = await Songmodel.findByIdAndUpdate(songId,{ album: newAlbum },{ new: true });

    res.status(200).json({success: true,updatedSong,message: "Song album updated successfully"});

  } catch (error) {

    res.status(400).json({success: false, error, message: "Failed to update song album"});

  }

};



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    update song ArtistAlbum    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const updateArtistAlbum = async (req, res) => {

  try {

    const { songId, newArtistAlbum } = req.body;
    const updatedSong = await Songmodel.findByIdAndUpdate(songId,{ artistalbum: newArtistAlbum },{ new: true });

    res.status(200).json({success: true,updatedSong,message: "Song album updated successfully"});

  } catch (error) {

    res.status(400).json({success: false, error, message: "Failed to update song artistalbum"});

  }

};



export { addSong, listSong, removeSong, updateAlbum, updateArtistAlbum}