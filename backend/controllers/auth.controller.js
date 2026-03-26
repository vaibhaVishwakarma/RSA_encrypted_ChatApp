<<<<<<< HEAD
import * as userService from "../services/user.service.js";
=======
import User from "../models/user.model.js";
>>>>>>> 6674c8e (project)
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
<<<<<<< HEAD
    const existingUser = await userService.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Random light-theme cartoon animal avatar using DiceBear fun-emoji
    const baseSeed = (fullName || username || "").trim() || "User";
    const encodedSeed = encodeURIComponent(baseSeed);
    const lightBackgrounds = ["fef9c3", "fee2e2", "dcfce7", "e0f2fe", "ede9fe"];
    const index =
      [...baseSeed].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
      lightBackgrounds.length;
    const bg = lightBackgrounds[index];
    const profilePic = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodedSeed}&backgroundColor=${bg}&radius=50`;
    const newUser = await userService.createUser({
=======
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    // Hash parolă
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
>>>>>>> 6674c8e (project)
      fullName,
      username,
      password: hashedPassword,
      gender,
<<<<<<< HEAD
      profilePic,
    });
    if (newUser) {
      const token = generateTokenAndSetCookie(newUser._id, res);
=======
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      // Generare JWT token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
>>>>>>> 6674c8e (project)
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
<<<<<<< HEAD
        token,
=======
>>>>>>> 6674c8e (project)
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
<<<<<<< HEAD
    const user = await userService.findUserByUsername(username);
=======
    const user = await User.findOne({ username });
>>>>>>> 6674c8e (project)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
<<<<<<< HEAD
    const token = generateTokenAndSetCookie(user._id, res);
=======
    generateTokenAndSetCookie(user._id, res);
>>>>>>> 6674c8e (project)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
<<<<<<< HEAD
      token,
=======
>>>>>>> 6674c8e (project)
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
<<<<<<< HEAD
    res.cookie("jwt", "", { maxAge: 0, sameSite: "lax" });
=======
    res.cookie("jwt", "", { maxAge: 0 });
>>>>>>> 6674c8e (project)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
