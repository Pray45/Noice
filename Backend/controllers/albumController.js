import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import Album from "../models/album.js"

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
        console.log(Albumdata);
        const album = Album(Albumdata)
        await album.save()
        fs.unlinkSync(img.path);
        res.json({ success:"true" , Album: "Album added"})

    } catch (error) {
        res.json({success:"false" , error})
    }
}

const listAlbum = async(req,res) => {

    try {
        const album = await Album.find({})
        res.json({album})
    } catch (error) {
        res.json({Success: "didnt listed"})
    }

}

const removeAlbum = async(req,res) => {
    try {
        await Album.findByIdAndDelete(req.body.id)
        res.json({responce: "Album Successfully removed" })
    } catch (error) {
        res.json({responce: "failed to remove Album" })
    }
}

export {addAlbum , listAlbum , removeAlbum}