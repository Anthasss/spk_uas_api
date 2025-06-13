const express = require("express");
const {
  createCriteria,
  getAllCriteria,
  getCriteriaById,
  updateCriteria,
  deleteCriteria,
} = require("../controllers/criteriaController");

const router = express.Router();

// POST /api/criteria - Create new criteria
router.post("/", createCriteria);

// GET /api/criteria - Get all criteria
router.get("/", getAllCriteria);

// GET /api/criteria/:id - Get criteria by ID
router.get("/:id", getCriteriaById);

// PUT /api/criteria/:id - Update criteria
router.put("/:id", updateCriteria);

// DELETE /api/criteria/:id - Delete criteria
router.delete("/:id", deleteCriteria);

module.exports = router;
