const express = require("express");

const router = express.Router();

const {
getCrops,
getCrop,
createCrop,
updateCrop,
deleteCrop,
searchCrop
} = require("../controllers/cropController");

router.get("/", getCrops);

router.get("/search", searchCrop);

router.get("/:id", getCrop);

router.post("/", createCrop);

router.put("/:id", updateCrop);

router.delete("/:id", deleteCrop);

module.exports = router;