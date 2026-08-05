const express = require("express");

const router = express.Router();

const {
    generateContent,
    getHistory
} = require("../controllers/contentController");

const authMiddleware = require("../middleware/authMiddleware");


router.post(
    "/generate",
    authMiddleware,
    generateContent
);


router.get(
    "/history",
    authMiddleware,
    getHistory
);


module.exports = router;