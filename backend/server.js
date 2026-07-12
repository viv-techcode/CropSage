require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://crop-sage-2h8lonxno-vivetaem.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});