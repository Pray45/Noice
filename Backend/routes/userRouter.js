import express from "express"
import { createUser, logoutUser, loginUser, likeSong, listLike } from "../controllers/UsercrController.js"


const userRouter = express.Router()

userRouter.post("/create", createUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)
userRouter.post("/like", likeSong)
userRouter.post("/listlike", listLike)

export default userRouter