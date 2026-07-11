const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: String,

    email:{
        type:String,
        unique:true,
        required:true
    },

    mobile:{
        type:String,
        unique:true,
        sparse:true,
    },

    password:String,

    googleId:String,

    profile: {
        gender: { type: String, default: "" },
        dob: { type: String, default: "" },
        language: { type: String, default: "" },
        farmName: { type: String, default: "" },
        village: { type: String, default: "" },
        district: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" },
        gps: { type: String, default: "" },
        region: { type: String, default: "" },
        climate: { type: String, default: "" },
        soil: { type: String, default: "" },
        weatherUnits: { type: String, default: "Metric" },
        temperatureUnit: { type: String, default: "Celsius" },
        rainfallAlerts: { type: Boolean, default: true },
        diseaseAlerts: { type: Boolean, default: false },
        notifications: { type: Boolean, default: true }
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",userSchema);
