import express from "express"
import { createUser, loginUser, likeSong} from "../controllers/UsercrController.js"


const userRouter = express.Router()

userRouter.post("/create", createUser)
userRouter.post("/login", loginUser)
userRouter.post("/like", likeSong)

export default userRouter