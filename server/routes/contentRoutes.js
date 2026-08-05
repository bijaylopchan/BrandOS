const express = require("express");

const router = express.Router();

const {
    generateContent,
    getHistory,
    updateContent
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
router.put(
    "/:id",
    authMiddleware,
    updateContent
);

module.exports = router;