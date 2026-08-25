const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const user = await prisma.user.create({

            data: {
                name,
                email,
                password: hashedPassword
            }

        });


        res.status(201).json({

            message: "User created successfully",

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }

        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await prisma.user.findUnique({

            where: {
                email
            }

        });


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid password"
            });

        }


        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.json({

            message: "Login successful",

            token

        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


const getCurrentUser = async (req, res) => {

    try {

        const user = await prisma.user.findUnique({

            where: {
                id: req.user.id
            },

            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }

        });


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        res.json(user);


    } catch (error) {

        console.log(
            "GET ACCOUNT ERROR:",
            error
        );


        res.status(500).json({
            message: error.message
        });

    }

};


const updateAccount = async (req, res) => {

    try {

        const {
            name,
            password
        } = req.body;


        const updateData = {};


        if (name && name.trim()) {

            updateData.name =
                name.trim();

        }


        if (password && password.trim()) {

            updateData.password =
                await bcrypt.hash(
                    password,
                    10
                );

        }


        const updatedUser =
            await prisma.user.update({

                where: {
                    id: req.user.id
                },

                data: updateData,

                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                }

            });


        res.json({

            message:
                "Account updated successfully",

            user: updatedUser

        });


    } catch (error) {

        console.log(
            "ACCOUNT UPDATE ERROR:",
            error
        );


        res.status(500).json({
            message: error.message
        });

    }

};


const deleteAccount = async (req, res) => {

    try {

        const userId =
            req.user.id;


        const existingUser =
            await prisma.user.findUnique({

                where: {
                    id: userId
                }

            });


        if (!existingUser) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        const userContents =
            await prisma.content.findMany({

                where: {
                    userId
                },

                select: {
                    id: true
                }

            });


        const contentIds =
            userContents.map(
                item => item.id
            );


        await prisma.$transaction([

            prisma.sEOAnalysis.deleteMany({

                where: {
                    contentId: {
                        in: contentIds
                    }
                }

            }),

            prisma.toneAnalysis.deleteMany({

                where: {
                    contentId: {
                        in: contentIds
                    }
                }

            }),

            prisma.content.deleteMany({

                where: {
                    userId
                }

            }),

            prisma.businessProfile.deleteMany({

                where: {
                    userId
                }

            }),

            prisma.user.delete({

                where: {
                    id: userId
                }

            })

        ]);


        res.json({

            message:
                "Account deleted successfully"

        });


    } catch (error) {

        console.log(
            "DELETE ACCOUNT ERROR:",
            error
        );


        res.status(500).json({

            message:
                error?.message ||
                "Unable to delete account."

        });

    }

};


module.exports = {

    register,

    login,

    getCurrentUser,

    updateAccount,

    deleteAccount

};