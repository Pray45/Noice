import {v2 as cloudinary} from "cloudinary"
import Playlist from "../models/playlist.model.js"

const addPlaylist = async(req,res) => {
    try {
        const {name , color} = req.body
        const img = req.file
        const imgUpload = await cloudinary.uploader.upload(img.path , {resource_type: "image"})
        const Playlistdata = {
            name,
            color,
            img : imgUpload.secure_url
        }

        console.log(Playlistdata);
        const album = Playlist(Playlistdata)
        await album.save()

        res.json({ success:"true" , playlist: "playlist added"})

    } catch (error) {
        res.json({success:"false" , error})
    }
}

const listPlaylist = async(req,res) => {

    try {
        const album = await Playlist.find({})
        res.json({album})
    } catch (error) {
        res.json({Success: "didnt listed"})
    }

}

const removePlaylist = async(req,res) => {

    try {
        await Playlist.findByIdAndDelete(req.body.id)
        res.json({success: "removed successfully"})
    } catch (error) {
        res.json({Success: "didnt listed"})
    }

}

export {addPlaylist , listPlaylist , removePlaylist}