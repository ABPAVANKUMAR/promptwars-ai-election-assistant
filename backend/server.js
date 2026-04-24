const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import API routes
const apiRoutes = require("./api");

// Use routes
app.use("/api", apiRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("AI Election Assistant Backend is running ");
});

// Server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
