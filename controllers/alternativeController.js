const prisma = require("../models/prisma");

// Create a new alternative
const createAlternative = async (req, res) => {
  try {
    const { name } = req.body;

    const alternative = await prisma.alternative.create({
      data: { name },
    });

    res.status(201).json(alternative);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all alternatives
const getAllAlternatives = async (req, res) => {
  try {
    const alternatives = await prisma.alternative.findMany();

    res.status(200).json(alternatives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get alternative by ID
const getAlternativeById = async (req, res) => {
  try {
    const { id } = req.params;

    const alternative = await prisma.alternative.findUnique({
      where: { id: parseInt(id) },
    });

    if (!alternative) {
      return res.status(404).json({ error: "Alternative not found" });
    }

    res.status(200).json(alternative);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update alternative
const updateAlternative = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const alternative = await prisma.alternative.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.status(200).json(alternative);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Alternative not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete alternative
const deleteAlternative = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.alternative.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Alternative not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAlternative,
  getAllAlternatives,
  getAlternativeById,
  updateAlternative,
  deleteAlternative,
};
