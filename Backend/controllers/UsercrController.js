import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email or Username already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      password: hash
    });


    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET , { expiresIn: "1h" });


    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); 
    res.status(201).json({ success: true, user: newUser, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ success: false, message: "Wrong email" });

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (isPassCorrect) {
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET , { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); 
      return res.status(200).json({ success: true, message: "Login successful", token, userName: user.username, userId: user._id });
    } else {
      return res.status(400).json({ success: false, message: "Wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const likeSong = async (req, res) => {
  const { userId, songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const alreadyLiked = user.likedSongs.includes(songId);

    if (alreadyLiked) {

      user.likedSongs = user.likedSongs.filter(id => id.toString() !== songId);
    } else {

      user.likedSongs.push(songId);
    }

    await user.save();

    return res.status(200).json({ success: true, message: "Song liked/unliked successfully", likedSongs: user.likedSongs });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getLikedSongs = async (req, res) => {
  
    const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, likedSongs: user.likedSongs });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { createUser, loginUser, likeSong, getLikedSongs };
