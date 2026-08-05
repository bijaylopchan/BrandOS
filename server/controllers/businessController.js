const prisma = require("../config/prisma");


const createBusinessProfile = async (req, res) => {

    try {

        const {
            businessName,
            industry,
            audience,
            tone
        } = req.body;


        const profile = await prisma.businessProfile.create({

            data: {

                businessName,
                industry,
                audience,
                tone,

                userId: req.user.id

            }

        });


        res.status(201).json(profile);


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};


const getBusinessProfile = async (req, res) => {

    try {

        const profile = await prisma.businessProfile.findFirst({

            where: {

                userId: req.user.id

            }

        });


        res.json(profile);


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};



module.exports = {

    createBusinessProfile,
    getBusinessProfile

};