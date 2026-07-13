const Crop = require("../models/Crop");

// GET ALL CROPS
exports.getCrops = async (req, res) => {
    try {
        const crops = await Crop.find({
            user: req.user.id
        });
        res.json(crops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADD CROP
exports.addCrop = async (req, res) => {
    try {
        const { cropName, quantity, unit, price, season, status, location, notes } = req.body;

        const crop = await Crop.create({
            cropName,
            quantity,
            unit,
            price,
            season,
            status,
            location,
            notes,
            user: req.user.id
        });

        res.status(201).json(crop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE CROP
exports.updateCrop = async (req, res) => {
    try {
        const updatedCrop = await Crop.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updatedCrop) {
            return res.status(404).json({
                message: "Crop not found",
            });
        }

        res.json(updatedCrop);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

// DELETE CROP
exports.deleteCrop = async (req, res) => {
    try {
        const deletedCrop = await Crop.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!deletedCrop) {
            return res.status(404).json({
                message: "Crop not found",
            });
        }

        res.json({
            message: "Crop deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// GET SINGLE CROP
exports.getCropById = async (req, res) => {
    try {
        const crop = await Crop.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found",
            });
        }

        res.json(crop);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// GET CROPS BY SEASON
exports.getCropsBySeason = async (req, res) => {
    try {
        const crops = await Crop.find({
            season: req.params.season,
            user: req.user.id,
        });

        res.json(crops);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// GET CROPS BY LOCATION
exports.getCropsByLocation = async (req, res) => {
    try {
        const { location } = req.query;

        const crops = await Crop.find({ 
            location,
            user: req.user.id,
        });

        res.json(crops);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
