const express = require("express");

const router = express.Router();

const {
    generateContent,
    getHistory,
    updateContent,
    deleteContent,
    getContentStats,
    analyzeSEO,
    analyzeTone
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

router.delete(
    "/:id",
    authMiddleware,
    deleteContent
);

router.get(
    "/stats",
    authMiddleware,
    getContentStats
);

router.post(
    "/:id/seo",
    authMiddleware,
    analyzeSEO
);

router.post(
    "/:id/tone",
    authMiddleware,
    analyzeTone
);



module.exports = router;