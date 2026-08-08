import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key_noice';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    create user    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Username, email and password are required" });
    }

    const hash = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) return res.status(400).json({ success: false, message: "Email or Username already exists" });

    const newUser = await User.create({
      username,
      email,
      password: hash
    });

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); 
    res.status(200).json({ success: true, newUser, token, userName: newUser.username, userId: newUser._id, message: "user created successfully"});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: "failed in creating user" });
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    login user    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Wrong email" });

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) return res.status(400).json({ success: false, message: "Wrong password" });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
      
    res.cookie("token", token, { httpOnly: true, maxAge: 604800000}); 
    return res.status(200).json({ success: true, message: "Login successful", token, userName: user.username, userId: user._id });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message, message: "failed in login user" });
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    like song    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const likeSong = async (req, res) => {
  try {
    const { userId, songId } = req.body;
    if (!userId || !songId) {
      return res.status(400).json({ success: false, message: "userId and songId are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const alreadyLiked = user.likedSongs.some(id => id.toString() === songId.toString());

    if (alreadyLiked) {
      user.likedSongs = user.likedSongs.filter(id => id.toString() !== songId.toString());
    } else {
      user.likedSongs.push(songId);
    }

    await user.save();
    return res.status(200).json({ success: true, message: "Song liked/unliked successfully", likedSongs: user.likedSongs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: "Internal server error" });
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    list liked songs    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const getLikedSongs = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) return res.status(400).json({ success: false, message: "User not found" });
    
    return res.status(200).json({ success: true, likedSongs: user.likedSongs || [] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message, message: "Internal server error" });
  }
};

export { createUser, loginUser, likeSong, getLikedSongs };
