import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import Artist from "../models/artist.js"


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    creating Artist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const addArtist = async(req,res) => {
    try {
        const {name , desc} = req.body;
        const img = req.file;
        if (!img) {
            return res.status(400).json({ success: false, message: "Artist image is required" });
        }
        const imgUpload = await cloudinary.uploader.upload(img.path , {resource_type: "image"});
        
        const Artistdata = {
            name,
            desc,
            img : imgUpload.secure_url
        };

        const artist = new Artist(Artistdata);
        await artist.save();
        if (fs.existsSync(img.path)) fs.unlinkSync(img.path);
        res.status(200).json({ success: true, artist, message: "Artist uploaded successfully.." });
    } catch (error) {
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({ success: false, error: error.message || error, message: "Failed to upload an Artist" });
    }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    list Artist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const listArtist = async(req,res) => {
    try {
        const artist = await Artist.find({});
        res.status(200).json({ success: true, artist , message: "artist listed successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message || error, message: "Failed to list Artist" });
    }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    remove Artist    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const removeArtist = async(req,res) => {
    try {
        const id = req.body.id || req.query.id || req.params.id;
        await Artist.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Artist removed successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message || error, message: "Failed to remove Artist" });
    }
};

export {addArtist , listArtist , removeArtist}