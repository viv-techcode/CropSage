const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema(
{
    cropName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        default: "kg"
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    season: {
        type: String,
        enum: ["Kharif", "Rabi", "Zaid"]
    },
    status: {
        type: String,
        enum: ["Planned", "Growing", "Harvested"],
        default: "Planned"
    },
    notes: String
},
{
    timestamps: true
});

module.exports = mongoose.model("crop", CropSchema);