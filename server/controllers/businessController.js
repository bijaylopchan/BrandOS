const prisma = require("../config/prisma");


const createBusinessProfile = async (req, res) => {

    try {

        const {
            businessName,
            industry,
            audience,
            tone
        } = req.body;



        const existingProfile = await prisma.businessProfile.findFirst({

            where: {

                userId: req.user.id

            }

        });




        let profile;




        if(existingProfile) {


            profile = await prisma.businessProfile.update({

                where: {

                    id: existingProfile.id

                },


                data: {

                    businessName,
                    industry,
                    audience,
                    tone

                }

            });



        } else {



            profile = await prisma.businessProfile.create({

                data: {

                    businessName,
                    industry,
                    audience,
                    tone,

                    userId: req.user.id

                }

            });


        }




        res.json(profile);



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

const updateBusinessProfile = async (req, res) => {

    try {

        const {
            businessName,
            industry,
            audience,
            tone
        } = req.body;



        const updatedProfile = await prisma.businessProfile.update({

            where: {

                id: Number(req.params.id)

            },


            data: {

                businessName,
                industry,
                audience,
                tone

            }

        });



        res.json(updatedProfile);



    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};



module.exports = {

    createBusinessProfile,
    getBusinessProfile,
    updateBusinessProfile

};