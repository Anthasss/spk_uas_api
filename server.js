const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const criteriaRoutes = require("./routes/criteriaRoutes");
const alternativeRoutes = require("./routes/alternativeRoutes");
const subCriteriaRoutes = require("./routes/subCriteriaRoutes");
const alternativeRatingRoutes = require("./routes/alternativeRatingRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(
  cors({
    // origin: process.env.FRONTEND_URL || "http://localhost:5173",
    origin: "*", // For development purposes, allow all origins
    // credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.use("/api/criteria", criteriaRoutes);
app.use("/api/alternatives", alternativeRoutes);
app.use("/api/sub-criteria", subCriteriaRoutes);
app.use("/api/alternative-ratings", alternativeRatingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
