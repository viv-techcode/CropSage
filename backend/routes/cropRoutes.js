const express = require("express");

const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");

const {
    getCrops,
    getCropById,
    getCropsByLocation,
    getCropsBySeason,
    addCrop,
    updateCrop,
    deleteCrop
} = require("../controllers/cropController");

// Protected routes
router.get("/", requireAuth, getCrops);

router.get("/search/location", requireAuth, getCropsByLocation);

router.get("/season/:season", requireAuth, getCropsBySeason);

router.get("/:id", requireAuth, getCropById);

router.post("/", requireAuth, addCrop);

router.put("/:id", requireAuth, updateCrop);

router.delete("/:id", requireAuth, deleteCrop);

module.exports = router;