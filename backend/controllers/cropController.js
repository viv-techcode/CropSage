const Crop = require("../models/Crop");

exports.getCrops = async (req, res) => {
    const crops = await Crop.find();

    res.status(200).json(crops);
};

exports.getCropById = async (req, res) => {

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
        return res.status(404).json({
            message: "Crop not found"
        });
    }

    res.status(200).json(crop);
};

exports.createCrop = async (req, res) => {

    const crop = await Crop.create(req.body);

    res.status(201).json(crop);
};

exports.updateCrop = async (req, res) => {

    const crop = await Crop.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!crop) {
        return res.status(404).json({
            message: "Crop not found"
        });
    }

    res.status(200).json(crop);
};

exports.deleteCrop = async (req, res) => {

    const crop = await Crop.findByIdAndDelete(req.params.id);

    if (!crop) {
        return res.status(404).json({
            message: "Crop not found"
        });
    }

    res.status(200).json({
        message: "Crop deleted successfully"
    });
};

exports.searchCrops = async (req, res) => {

    const name = req.query.name;

    const crops = await Crop.find({
        name: {
            $regex: name,
            $options: "i"
        }
    });

    res.status(200).json(crops);
};

