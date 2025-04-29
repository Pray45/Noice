import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import Songmodel from "../models/song.model.js"


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Adding song  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const addSong = async (req, res) => {
    res.send("Hello im add song")
    try {    

        const { name , artist , album, playlist, liked} = req.body
        const audio = req.files.audio[0]
        const img = req.files.img[0]
        const audioUpload = await cloudinary.uploader.upload(audio.path , {resource_type: "video"})
        const imgUpload = await cloudinary.uploader.upload(img.path , {resource_type: "image"})
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration)%60}`

        const uploaded = {
            name,
            artist, 
            album,
            playlist,
            liked,
            img: audioUpload.secure_url,
            audio: imgUpload.secure_url,
            duration
        }
        console.log(uploaded);

        const song = Songmodel(uploaded)
        await song.save()
        fs.unlinkSync(audio.path);
        fs.unlinkSync(img.path);

        res.status(200).json({ success: true, message: "Song uploaded successfully" });
        
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to upload song" });
        console.log(error);
    }

}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Listing  song  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const listSong = async (req, res) => {
    try {
        const songlist = await Songmodel.find({})
        res.json({songlist})
        res.status(200).json({ success: true, message: "Song listed successfully" });
    } catch (error) {
        res.json({error: "error"})
        console.log(error);
    }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Removing song  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const removeSong = async(req,res) => {
    try {
        await Songmodel.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, message: "Song deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to remove song" });
    }
}

export { addSong, listSong , removeSong};