import express from "express";
import { createUser, loginUser, likeSong, getLikedSongs } from "../controllers/UsercrController.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/like", likeSong);  
userRouter.get('/liked-songs/:userId', getLikedSongs);

export default userRouter;