const express = require("express");

const router = express.Router();


const {
    createBusinessProfile,
    getBusinessProfile,
    updateBusinessProfile
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

router.put(
    "/:id",
    authMiddleware,
    updateBusinessProfile
);


module.exports = router;