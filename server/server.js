require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const businessRoutes = require("./routes/businessRoutes");


const app = express();


const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://brand-os-sigma-ten.vercel.app"
];


app.use(
    cors({
        origin: (origin, callback) => {

            if (!origin) {
                return callback(null, true);
            }


            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }


            return callback(
                new Error("Not allowed by CORS")
            );

        },

        credentials: true

    })
);


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

    console.log(
        `Server running on port ${PORT}`
    );

});