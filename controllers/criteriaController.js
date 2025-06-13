const prisma = require("../models/prisma");

// Create a new criteria
const createCriteria = async (req, res) => {
  try {
    const { name } = req.body;

    const criteria = await prisma.criteria.create({
      data: { name },
    });

    res.status(201).json(criteria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all criteria
const getAllCriteria = async (req, res) => {
  try {
    const criteria = await prisma.criteria.findMany({
      include: {
        ratings: {
          include: {
            alternative: true,
          },
        },
      },
    });

    res.status(200).json(criteria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get criteria by ID
const getCriteriaById = async (req, res) => {
  try {
    const { id } = req.params;

    const criteria = await prisma.criteria.findUnique({
      where: { id: parseInt(id) },
      include: {
        ratings: {
          include: {
            alternative: true,
          },
        },
      },
    });

    if (!criteria) {
      return res.status(404).json({ error: "Criteria not found" });
    }

    res.status(200).json(criteria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update criteria
const updateCriteria = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const criteria = await prisma.criteria.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.status(200).json(criteria);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Criteria not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete criteria
const deleteCriteria = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.criteria.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Criteria not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCriteria,
  getAllCriteria,
  getCriteriaById,
  updateCriteria,
  deleteCriteria,
};
