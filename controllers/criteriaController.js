const prisma = require("../models/prisma");

// Create a new criteria
const createCriteria = async (req, res) => {
  try {
    const { name, weight, type } = req.body;

    // Validate required fields
    if (!name || weight === undefined) {
      return res.status(400).json({
        error: "Name and weight are required fields",
      });
    }

    // Validate type if provided
    if (type && !["COST", "BENEFIT"].includes(type)) {
      return res.status(400).json({
        error: "Type must be either 'COST' or 'BENEFIT'",
      });
    }

    const criteria = await prisma.criteria.create({
      data: {
        name,
        weight: parseFloat(weight),
        ...(type && { type }), // Include type if provided, otherwise use default
      },
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
        subCriteria: true,
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
        subCriteria: true,
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
    const { name, weight, type } = req.body;

    // Validate type if provided
    if (type && !["COST", "BENEFIT"].includes(type)) {
      return res.status(400).json({
        error: "Type must be either 'COST' or 'BENEFIT'",
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (weight !== undefined) updateData.weight = parseFloat(weight);
    if (type !== undefined) updateData.type = type;

    const criteria = await prisma.criteria.update({
      where: { id: parseInt(id) },
      data: updateData,
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
