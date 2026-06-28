require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const cropRoutes = require("./routes/cropRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/crops", cropRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});