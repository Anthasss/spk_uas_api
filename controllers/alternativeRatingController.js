const prisma = require("../models/prisma");

// Create a new alternative rating
const createAlternativeRating = async (req, res) => {
  try {
    const { criteriaId, subCriteriaId, alternativeId } = req.body;

    // Validate required fields
    if (!criteriaId || !subCriteriaId || !alternativeId) {
      return res.status(400).json({
        error: "CriteriaId, subCriteriaId, and alternativeId are required fields",
      });
    }

    // Validate that the subCriteria belongs to the criteria
    const subCriteria = await prisma.subCriteria.findUnique({
      where: { id: parseInt(subCriteriaId) },
    });

    if (!subCriteria || subCriteria.criteriaId !== parseInt(criteriaId)) {
      return res.status(400).json({
        error: "SubCriteria does not belong to the specified criteria",
      });
    }

    const alternativeRating = await prisma.alternativeRating.create({
      data: {
        criteriaId: parseInt(criteriaId),
        subCriteriaId: parseInt(subCriteriaId),
        alternativeId: parseInt(alternativeId),
      },
      include: {
        criteria: true,
        subCriteria: true,
        alternative: true,
      },
    });

    res.status(201).json(alternativeRating);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Alternative rating for this combination already exists",
      });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get all alternative ratings
const getAllAlternativeRatings = async (req, res) => {
  try {
    const alternativeRatings = await prisma.alternativeRating.findMany({
      include: {
        criteria: true,
        subCriteria: true, // This includes realValue and ratingValue
        alternative: true,
      },
    });

    res.status(200).json(alternativeRatings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get alternative rating by ID
const getAlternativeRatingById = async (req, res) => {
  try {
    const { id } = req.params;

    const alternativeRating = await prisma.alternativeRating.findUnique({
      where: { id: parseInt(id) },
      include: {
        criteria: true,
        subCriteria: true, // This includes realValue and ratingValue
        alternative: true,
      },
    });

    if (!alternativeRating) {
      return res.status(404).json({ error: "Alternative rating not found" });
    }

    res.status(200).json(alternativeRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get alternative ratings by alternative ID
const getAlternativeRatingsByAlternativeId = async (req, res) => {
  try {
    const { alternativeId } = req.params;

    const alternativeRatings = await prisma.alternativeRating.findMany({
      where: { alternativeId: parseInt(alternativeId) },
      include: {
        criteria: true,
        subCriteria: true, // This includes realValue and ratingValue
        alternative: true,
      },
    });

    res.status(200).json(alternativeRatings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update alternative rating
const updateAlternativeRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { criteriaId, subCriteriaId, alternativeId } = req.body;

    const updateData = {};
    
    if (criteriaId !== undefined) updateData.criteriaId = parseInt(criteriaId);
    if (subCriteriaId !== undefined) updateData.subCriteriaId = parseInt(subCriteriaId);
    if (alternativeId !== undefined) updateData.alternativeId = parseInt(alternativeId);

    // Validate that subCriteria belongs to criteria if both are being updated
    if (updateData.criteriaId && updateData.subCriteriaId) {
      const subCriteria = await prisma.subCriteria.findUnique({
        where: { id: updateData.subCriteriaId },
      });

      if (!subCriteria || subCriteria.criteriaId !== updateData.criteriaId) {
        return res.status(400).json({
          error: "SubCriteria does not belong to the specified criteria",
        });
      }
    }

    const alternativeRating = await prisma.alternativeRating.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        criteria: true,
        subCriteria: true, // This includes realValue and ratingValue
        alternative: true,
      },
    });

    res.status(200).json(alternativeRating);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Alternative rating not found" });
    }
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Alternative rating for this combination already exists",
      });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete alternative rating
const deleteAlternativeRating = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.alternativeRating.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Alternative rating not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAlternativeRating,
  getAllAlternativeRatings,
  getAlternativeRatingById,
  getAlternativeRatingsByAlternativeId,
  updateAlternativeRating,
  deleteAlternativeRating,
};