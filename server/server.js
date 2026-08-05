require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const businessRoutes = require("./routes/businessRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/business", businessRoutes);

app.get("/", (req, res) => {
  res.send("BrandOS Backend Running 🚀");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});