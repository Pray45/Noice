import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const create = await User.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({ success: true, user: create });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error in registration" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, err: "Wrong email" });

        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (isPassCorrect) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
            res.cookie("token", token);
            return res.status(200).json({ success: true, message: "Login successful", token, userName: user.username, userId: user._id });
        } else {
            return res.status(400).json({ success: false, err: "Wrong password" });
        }
    } catch (error) {
        res.status(400).json({ success: false, err: "Login failed" });
    }
};

const likeSong = async (req, res) => {
    const { userId, songId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const alreadyLiked = user.likedSongs.includes(songId);

        if (alreadyLiked) {
            
            await User.findByIdAndUpdate(userId, {
                $pull: { likedSongs: songId }
            });
        } else {
            
            user.likedSongs.push(songId);
        }

        
        await user.save();

        
        return res.status(200).json({ 
            success: true, 
            message: "Song liked/unliked successfully", 
            arr: user.likedSongs 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { createUser, loginUser, likeSong };