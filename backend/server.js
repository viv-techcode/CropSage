require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://crop-sage-pi.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});