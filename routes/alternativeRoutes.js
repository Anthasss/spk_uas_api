const express = require("express");
const {
  createAlternative,
  getAllAlternatives,
  getAlternativeById,
  updateAlternative,
  deleteAlternative,
} = require("../controllers/alternativeController");

const router = express.Router();

// POST /api/alternatives - Create new alternative
router.post("/", createAlternative);

// GET /api/alternatives - Get all alternatives
router.get("/", getAllAlternatives);

// GET /api/alternatives/:id - Get alternative by ID
router.get("/:id", getAlternativeById);

// PUT /api/alternatives/:id - Update alternative
router.put("/:id", updateAlternative);

// DELETE /api/alternatives/:id - Delete alternative
router.delete("/:id", deleteAlternative);

module.exports = router;