import express from "express"
import { createUser, logoutUser, loginUser } from "../controllers/UsercrController.js"


const userRouter = express.Router()

userRouter.post("/create", createUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)

export default userRouter