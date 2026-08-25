const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");


const {

    register,

    login,

    getCurrentUser,

    updateAccount,

    deleteAccount

} = require("../controllers/authController");


router.post(

    "/register",

    register

);


router.post(

    "/login",

    login

);


router.get(

    "/me",

    authMiddleware,

    getCurrentUser

);


router.put(

    "/account",

    authMiddleware,

    updateAccount

);


router.delete(

    "/account",

    authMiddleware,

    deleteAccount

);


module.exports = router;