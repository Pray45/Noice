import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import Playlistdata from "../models/playlist.js"

const addPlaylist = async(req , res) => {
    try {
        const {name , desc} = req.body
        const img = req.file
        const imgUpload = await cloudinary.uploader.upload(img.path , {resource_type: "image"})
        const Playlistdata = {
            name,
            desc,
            img : imgUpload.secure_url
        }
        console.log(Playlistdata);
        const playlist = Playlist(Playlistdata)
        await playlist.save()
        fs.unlinkSync(img.path)
        res.status(200).json({ success: true, message: "playlist uploaded successfully" })


    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to upload playlist" })
    }
}

const listPlaylist = async(req,res) => {

    try {
        const playlist = await Playlist.find({})
        res.json({playlist})
        res.status(200).json({ success: true, message: "album uploaded successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to list album" });

    }

}

const removePlaylist = async(req,res) => {
    try {
        await Playlist.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, message: "album removed successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to remove album" });
    }
}

export { addPlaylist, listPlaylist, removePlaylist }