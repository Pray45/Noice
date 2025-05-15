import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import Album from "../models/album.js"


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    creating Album    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const addAlbum = async(req,res) => {
    try {
        const {name , desc} = req.body
        const img = req.file
        const imgUpload = await cloudinary.uploader.upload(img.path , {resource_type: "image"})
        const Albumdata = {
            name,
            desc,
            img : imgUpload.secure_url
        }
        const album = Album(Albumdata)
        await album.save()
        fs.unlinkSync(img.path);
        res.status(200).json({ success: true, message: "album uploaded successfully..." });


    } catch (error) {

        res.status(400).json({ success: false, message: "Failed to upload an album" });

    }
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    list Album    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



const listAlbum = async(req,res) => {

    try {

        const album = await Album.find({})
        res.status(200).json({ success: true, album, message: "album listed successfully" });

    } catch (error) {

        res.status(400).json({ success: false, error , message: "Failed to list album" });

    }

}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    remove Album    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const removeAlbum = async(req,res) => {

    try {

        await Album.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, message: "album removed successfully" });

    } catch (error) {

        res.status(400).json({ success: false, message: "Failed to remove album" });

    }
}

export {addAlbum , listAlbum , removeAlbum}