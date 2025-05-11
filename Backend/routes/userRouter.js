import express from "express"
import { createUser, logoutUser, loginUser, likeSong} from "../controllers/UsercrController.js"


const userRouter = express.Router()

userRouter.post("/create", createUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)
userRouter.post("/like", likeSong)

export default userRouter