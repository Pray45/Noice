import express from "express"
import { addArtist, listArtist, removeArtist } from "../controllers/artistController.js"
import upload from "../middlewares/multer.middleware.js"


const ArtistRouter = express.Router()

ArtistRouter.post("/add", upload.single('img') , addArtist )
ArtistRouter.get("/list", listArtist)
ArtistRouter.post("/remove", removeArtist)

export default ArtistRouter