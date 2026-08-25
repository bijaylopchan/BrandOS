require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const businessRoutes = require("./routes/businessRoutes");


const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/content", contentRoutes);

app.use("/api/business", businessRoutes);


// Test Route
app.get("/", (req, res) => {

    res.send("BrandOS Backend Running 🚀");

});


// Port
const PORT = process.env.PORT || 5001;


// Start Server
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});