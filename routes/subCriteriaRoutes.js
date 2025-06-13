const express = require("express");
const {
  createSubCriteria,
  getAllSubCriteria,
  getSubCriteriaById,
  getSubCriteriaByCriteriaId,
  updateSubCriteria,
  deleteSubCriteria,
} = require("../controllers/subCriteriaController");

const router = express.Router();

// POST /api/sub-criteria - Create new sub criteria
router.post("/", createSubCriteria);

// GET /api/sub-criteria - Get all sub criteria
router.get("/", getAllSubCriteria);

// GET /api/sub-criteria/:id - Get sub criteria by ID
router.get("/:id", getSubCriteriaById);

// GET /api/sub-criteria/criteria/:criteriaId - Get sub criteria by criteria ID
router.get("/criteria/:criteriaId", getSubCriteriaByCriteriaId);

// PUT /api/sub-criteria/:id - Update sub criteria
router.put("/:id", updateSubCriteria);

// DELETE /api/sub-criteria/:id - Delete sub criteria
router.delete("/:id", deleteSubCriteria);

module.exports = router;