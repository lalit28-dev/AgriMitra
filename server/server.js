
require("dotenv").config();

const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const marketData = require("./data/marketData");

const app = express();
const PORT = process.env.PORT || 5000;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_SECRET = process.env.AUTH_SECRET;

function createToken(username) {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60,
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

function verifyToken(token) {
  try {
    if (!AUTH_SECRET || !token) return null;

    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [payload, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(payload)
      .digest();

    const receivedSignature = Buffer.from(
      signature,
      "base64url"
    );

    if (
      receivedSignature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(
        receivedSignature,
        expectedSignature
      )
    ) {
      return null;
    }

    const user = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      !user.username ||
      user.role !== "admin" ||
      !Number.isFinite(user.exp) ||
      user.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Please log in first.",
    });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({
      message: "Invalid or expired session. Please log in again.",
    });
  }

  req.user = user;
  next();
}


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


app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !AUTH_SECRET) {
    return res.status(500).json({
      message: "Admin authentication is not configured on the server.",
    });
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== ADMIN_USERNAME ||
    password !== ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Invalid username or password.",
    });
  }

  const token = createToken(username);

  res.json({
    message: "Login successful.",
    token,
    user: {
      username,
      role: "admin",
    },
  });
});

app.get("/api/auth/me", requireAdmin, (req, res) => {
  res.json({
    user: {
      username: req.user.username,
      role: "admin",
    },
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

