const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
{
    name: String,
    season: String,
    soil: String,
    yield: Number
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Crop", cropSchema);