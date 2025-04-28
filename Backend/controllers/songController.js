import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import Songmodel from "../models/song.model.js"


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Adding song  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const addSong = async (req, res) => {
    res.send("Hello im add song")
    try {    

        const { name , artist , album} = req.body
        const audio = req.files.audio[0]
        const img = req.files.img[0]
        const audioUpload = await cloudinary.uploader.upload(audio.path , {resource_type: "video"})
        const imgUpload = await cloudinary.uploader.upload(img.path , {resource_type: "image"})
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration)%60}`

        const uploaded = {
            name,
            artist, 
            album, 
            img: audioUpload.secure_url,
            audio: imgUpload.secure_url,
            duration
        }
        console.log(uploaded);

        const song = Songmodel(uploaded)
        await song.save()
        fs.unlinkSync(audio.path);
        fs.unlinkSync(img.path);
        
    } catch (error) {
        console.log(error);
    }

}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Listing  song  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const listSong = async (req, res) => {
    try {
        const songlist = await Songmodel.find({})
        res.json({songlist})
    } catch (error) {
        console.log(error);
    }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Removing song  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const removeSong = async(req,res) => {
    try {
        await Songmodel.findByIdAndDelete(req.body.id)
        res.json({responce: "song Successfully removed" })
    } catch (error) {
        res.json({responce: "failed to remove song" })
    }
}

export { addSong, listSong , removeSong};