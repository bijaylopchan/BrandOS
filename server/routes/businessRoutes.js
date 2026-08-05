const express = require("express");

const router = express.Router();


const {
    createBusinessProfile,
    getBusinessProfile
} = require("../controllers/businessController");


const authMiddleware = require("../middleware/authMiddleware");


router.post(
    "/",
    authMiddleware,
    createBusinessProfile
);
router.get(
    "/",
    authMiddleware,
    getBusinessProfile
);


module.exports = router;