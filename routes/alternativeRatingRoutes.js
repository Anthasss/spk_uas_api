const express = require("express");
const {
  createAlternativeRating,
  getAllAlternativeRatings,
  getAlternativeRatingById,
  getAlternativeRatingsByAlternativeId,
  updateAlternativeRating,
  deleteAlternativeRating,
} = require("../controllers/alternativeRatingController");

const router = express.Router();

// POST /api/alternative-ratings - Create new alternative rating
router.post("/", createAlternativeRating);

// GET /api/alternative-ratings - Get all alternative ratings
router.get("/", getAllAlternativeRatings);

// GET /api/alternative-ratings/:id - Get alternative rating by ID
router.get("/:id", getAlternativeRatingById);

// GET /api/alternative-ratings/alternative/:alternativeId - Get alternative ratings by alternative ID
router.get("/alternative/:alternativeId", getAlternativeRatingsByAlternativeId);

// PUT /api/alternative-ratings/:id - Update alternative rating
router.put("/:id", updateAlternativeRating);

// DELETE /api/alternative-ratings/:id - Delete alternative rating
router.delete("/:id", deleteAlternativeRating);

module.exports = router;