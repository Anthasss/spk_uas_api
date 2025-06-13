const prisma = require("../models/prisma");

// Create a new sub criteria
const createSubCriteria = async (req, res) => {
  try {
    const { criteriaId, realValue, ratingValue } = req.body;

    // Validate required fields
    if (!criteriaId || !realValue || ratingValue === undefined) {
      return res.status(400).json({
        error: "CriteriaId, realValue, and ratingValue are required fields",
      });
    }

    // Check if criteria exists
    const criteriaExists = await prisma.criteria.findUnique({
      where: { id: parseInt(criteriaId) },
    });

    if (!criteriaExists) {
      return res.status(404).json({
        error: "Criteria not found",
      });
    }

    const subCriteria = await prisma.subCriteria.create({
      data: {
        criteriaId: parseInt(criteriaId),
        realValue,
        ratingValue: parseInt(ratingValue),
      },
      include: {
        criteria: true,
      },
    });

    res.status(201).json(subCriteria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all sub criteria
const getAllSubCriteria = async (req, res) => {
  try {
    const subCriteria = await prisma.subCriteria.findMany({
      include: {
        criteria: true,
      },
    });

    res.status(200).json(subCriteria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sub criteria by ID
const getSubCriteriaById = async (req, res) => {
  try {
    const { id } = req.params;

    const subCriteria = await prisma.subCriteria.findUnique({
      where: { id: parseInt(id) },
      include: {
        criteria: true,
      },
    });

    if (!subCriteria) {
      return res.status(404).json({ error: "Sub criteria not found" });
    }

    res.status(200).json(subCriteria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sub criteria by criteria ID
const getSubCriteriaByCriteriaId = async (req, res) => {
  try {
    const { criteriaId } = req.params;

    const subCriteria = await prisma.subCriteria.findMany({
      where: { criteriaId: parseInt(criteriaId) },
      include: {
        criteria: true,
      },
    });

    res.status(200).json(subCriteria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update sub criteria
const updateSubCriteria = async (req, res) => {
  try {
    const { id } = req.params;
    const { criteriaId, realValue, ratingValue } = req.body;

    const updateData = {};
    if (criteriaId !== undefined) {
      // Check if criteria exists
      const criteriaExists = await prisma.criteria.findUnique({
        where: { id: parseInt(criteriaId) },
      });

      if (!criteriaExists) {
        return res.status(404).json({
          error: "Criteria not found",
        });
      }
      updateData.criteriaId = parseInt(criteriaId);
    }
    if (realValue !== undefined) updateData.realValue = realValue;
    if (ratingValue !== undefined) updateData.ratingValue = parseInt(ratingValue);

    const subCriteria = await prisma.subCriteria.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        criteria: true,
      },
    });

    res.status(200).json(subCriteria);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Sub criteria not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete sub criteria
const deleteSubCriteria = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.subCriteria.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Sub criteria not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubCriteria,
  getAllSubCriteria,
  getSubCriteriaById,
  getSubCriteriaByCriteriaId,
  updateSubCriteria,
  deleteSubCriteria,
};