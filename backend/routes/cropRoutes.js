const express = require("express");

const router = express.Router();

const {
    getCrops,
    getCropById,
    getCropsByLocation,
    getCropsBySeason,
    addCrop,
    updateCrop,
    deleteCrop
} = require("../controllers/cropController");

router.get("/", getCrops);

router.get("/search/location", getCropsByLocation);

router.get("/season/:season", getCropsBySeason);

router.get("/:id", getCropById);

router.post("/", addCrop);

router.put("/:id", updateCrop);

router.delete("/:id", deleteCrop);



module.exports = router;