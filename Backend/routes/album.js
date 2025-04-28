import express from "express"
import { addAlbum, listAlbum, removeAlbum } from "../controllers/albumController.js"
import upload from "../middlewares/multer.middleware.js"


const AlbumRouter = express.Router()

AlbumRouter.post("/add", upload.single('img') , addAlbum )
AlbumRouter.get("/list", listAlbum)
AlbumRouter.post("/remove", removeAlbum)

export default AlbumRouter