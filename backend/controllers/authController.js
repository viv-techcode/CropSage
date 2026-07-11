const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedMobile = mobile.trim();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const existingMobileUser = await User.findOne({ mobile: normalizedMobile });

    if (existingMobileUser) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email: normalizedEmail,
      mobile: normalizedMobile,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const profileFields = [
  "gender", "dob", "language", "farmName", "village", "district", "state",
  "country", "gps", "region", "climate", "soil", "weatherUnits",
  "temperatureUnit", "rainfallAlerts", "diseaseAlerts", "notifications",
];

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -googleId");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.profile) user.profile = {};

    if (typeof req.body.name === "string" && req.body.name.trim()) user.name = req.body.name.trim();
    if (typeof req.body.mobile === "string") user.mobile = req.body.mobile.trim();

    profileFields.forEach((field) => {
      if (req.body.profile && Object.prototype.hasOwnProperty.call(req.body.profile, field)) {
        user.profile[field] = req.body.profile[field];
      }
    });

    const requiredFarmFields = ["farmName", "village", "district", "state", "soil"];
    const missingField = requiredFarmFields.find((field) => !user.profile[field]?.trim());
    if (missingField) {
      return res.status(400).json({ message: "Complete the required farm details before saving your profile" });
    }

    await user.save();
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.googleId;
    return res.json({ message: "Profile updated", user: safeUser });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: "Mobile number already exists" });
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
