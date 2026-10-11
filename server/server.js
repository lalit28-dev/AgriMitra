
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const marketData = require("./data/marketData");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    project: "AgriMitra",
    message: "AgriMitra API is running",
    status: "OK",
    dataMode: "DEMO",
  });
});

// Get market prices
app.get("/api/mandi", (req, res) => {
  const { commodity, district, market, state } = req.query;

  let filteredData = marketData;

  if (commodity) {
    filteredData = filteredData.filter(
      (item) =>
        item.commodity.toLowerCase() === commodity.toLowerCase()
    );
  }

  if (district) {
    filteredData = filteredData.filter(
      (item) =>
        item.district.toLowerCase() === district.toLowerCase()
    );
  }

  if (market) {
    filteredData = filteredData.filter(
      (item) =>
        item.market.toLowerCase() === market.toLowerCase()
    );
  }

  if (state) {
    filteredData = filteredData.filter(
      (item) =>
        item.state.toLowerCase() === state.toLowerCase()
    );
  }

  res.json({
    project: "AgriMitra",
    source: "AgriMitra Demo Dataset",
    isDemo: true,
    count: filteredData.length,
    data: filteredData,
    notice:
      "Illustrative sample prices only. These are not verified live market rates.",
  });
});

// Get available commodities
app.get("/api/commodities", (req, res) => {
  const commodities = [
    ...new Set(marketData.map((item) => item.commodity)),
  ];

  res.json({
    isDemo: true,
    count: commodities.length,
    data: commodities,
  });
});

// Get available markets
app.get("/api/markets", (req, res) => {
  const markets = [
    ...new Set(marketData.map((item) => item.market)),
  ];

  res.json({
    isDemo: true,
    count: markets.length,
    data: markets,
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`AgriMitra API running at http://localhost:${PORT}`);
});

