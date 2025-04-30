import express from "express"
import upload from "../middlewares/multer.middleware.js"
import { addPlaylist, listPlaylist, removePlaylist } from '../controllers/playlistController.js' 

const PlaylistRouter = express.Router()

PlaylistRouter.post("/add", upload.single('img') , addPlaylist )
PlaylistRouter.get("/list", listPlaylist)
PlaylistRouter.post("/remove", removePlaylist)

export default PlaylistRouter