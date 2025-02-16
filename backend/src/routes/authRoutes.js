const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      userType,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
      
    const token = jwt.sign({ userId: user.id,email: user.email, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("Authtoken", token);

    res.json({ 
      message: "Login successful", 
      token, 
      userType: user.userType // ✅ Send userType in response 
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("Authtoken");
  res.json({ message: "Logout successful" });
});




module.exports = router;
