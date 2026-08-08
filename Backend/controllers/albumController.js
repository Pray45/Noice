import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import Album from "../models/album.js"


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    creating Album    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const addAlbum = async(req,res) => {
    try {
        const {name , desc} = req.body;
        const img = req.file;
        if (!img) {
            return res.status(400).json({ success: false, message: "Album image is required" });
        }
        const imgUpload = await cloudinary.uploader.upload(img.path , {resource_type: "image"});
        const Albumdata = {
            name,
            desc,
            img : imgUpload.secure_url
        };
        const album = new Album(Albumdata);
        await album.save();
        if (fs.existsSync(img.path)) fs.unlinkSync(img.path);
        res.status(200).json({ success: true, album, message: "album uploaded successfully..." });
    } catch (error) {
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({ success: false, error: error.message || error, message: "Failed to upload an album" });
    }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    list Album    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const listAlbum = async(req,res) => {
    try {
        const album = await Album.find({});
        res.status(200).json({ success: true, album, message: "album listed successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message || error, message: "Failed to list album" });
    }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    remove Album    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const removeAlbum = async(req,res) => {
    try {
        const id = req.body.id || req.query.id || req.params.id;
        await Album.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "album removed successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message || error, message: "Failed to remove album" });
    }
};

export {addAlbum , listAlbum , removeAlbum}