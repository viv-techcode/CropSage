const Crop = require("../models/crop");

// GET ALL CROPS
exports.getCrops = async (req, res) => {
    try {
        const crops = await Crop.find();
        res.json(crops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADD CROP
exports.addCrop = async (req, res) => {
    try {
        const newCrop = await Crop.create(req.body);
        res.status(201).json(newCrop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE CROP
exports.updateCrop = async (req, res) => {
    try {
        const updatedCrop = await Crop.findByIdAndUpdate(
  req.params.id,
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
        const deletedCrop = await Crop.findByIdAndDelete(req.params.id);

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
        const crop = await Crop.findById(req.params.id);

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
            season: req.params.season
        });

        res.json(crops);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.getCropsByLocation = async (req, res) => {
    try {
        const { location } = req.query;

        const crops = await Crop.find({ location });

        res.json(crops);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};