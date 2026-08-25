const express = require("express");
const multer = require("multer");

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


/* =========================================================
   IMAGE UPLOAD CONFIGURATION
========================================================= */

// Keep uploaded images in memory only.
// We are NOT permanently storing them on the server.
const storage = multer.memoryStorage();


const upload = multer({

    storage,

    limits: {

        // Maximum image size: 5 MB
        fileSize: 5 * 1024 * 1024

    },

    fileFilter: (req, file, callback) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];


        if (allowedTypes.includes(file.mimetype)) {

            callback(null, true);

        } else {

            callback(
                new Error(
                    "Only JPG, PNG and WEBP images are allowed."
                )
            );

        }

    }

});


/* =========================================================
   GENERATE CONTENT
========================================================= */

router.post(

    "/generate",

    authMiddleware,

    upload.single("image"),

    generateContent

);


/* =========================================================
   HISTORY
========================================================= */

router.get(

    "/history",

    authMiddleware,

    getHistory

);


/* =========================================================
   CONTENT STATS
========================================================= */

router.get(

    "/stats",

    authMiddleware,

    getContentStats

);


/* =========================================================
   SEO ANALYSIS
========================================================= */

router.post(

    "/:id/seo",

    authMiddleware,

    analyzeSEO

);


/* =========================================================
   TONE ANALYSIS
========================================================= */

router.post(

    "/:id/tone",

    authMiddleware,

    analyzeTone

);


/* =========================================================
   UPDATE CONTENT
========================================================= */

router.put(

    "/:id",

    authMiddleware,

    updateContent

);


/* =========================================================
   DELETE CONTENT
========================================================= */

router.delete(

    "/:id",

    authMiddleware,

    deleteContent

);


module.exports = router;