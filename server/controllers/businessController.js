
const prisma = require("../config/prisma");

// =========================================================
// HELPERS
// =========================================================

const getAuthenticatedUserId = (req) => {
    const userId = Number(req.user?.id);

    if (!Number.isInteger(userId) || userId <= 0) {
        return null;
    }

    return userId;
};

const getProfileData = (body) => {
    const allowedFields = [
        "businessName",
        "industry",
        "audience",
        "tone"
    ];

    const data = {};

    for (const field of allowedFields) {
        if (body[field] !== undefined) {
            data[field] = body[field];
        }
    }

    return data;
};

const validateProfileData = (data, requireFields = false) => {
    if (
        requireFields &&
        (data.businessName === undefined ||
         data.industry === undefined)
    ) {
        return "Business name and industry are required";
    }

    for (const [field, value] of Object.entries(data)) {
        if (field === "audience" || field === "tone") {
            if (value !== null && typeof value !== "string") {
                return `${field} must be a string or null`;
            }
        } else if (typeof value !== "string") {
            return `${field} must be a string`;
        }

        if (
            (field === "businessName" || field === "industry") &&
            value.trim().length === 0
        ) {
            return `${field} cannot be empty`;
        }
    }

    return null;
};

const handleError = (res, error, operation) => {
    console.error(`Business profile ${operation} error:`, error);

    return res.status(500).json({
        message: `Failed to ${operation} business profile`
    });
};


// =========================================================
// CREATE OR UPDATE OWN BUSINESS PROFILE
// =========================================================

const createBusinessProfile = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (
            !req.body ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
                message: "A valid JSON request body is required"
            });
        }

        const data = getProfileData(req.body);

        const existingProfile = await prisma.businessProfile.findFirst({
            where: {
                userId
            }
        });

        const validationError = validateProfileData(
            data,
            !existingProfile
        );

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                message: "No profile fields provided"
            });
        }

        let profile;

        if (existingProfile) {
            profile = await prisma.businessProfile.update({
                where: {
                    id: existingProfile.id,
                    userId
                },
                data
            });
        } else {
            profile = await prisma.businessProfile.create({
                data: {
                    ...data,
                    userId
                }
            });
        }

        return res.status(200).json(profile);

    } catch (error) {
        return handleError(res, error, "save");
    }
};


// =========================================================
// GET LOGGED-IN USER'S BUSINESS PROFILE
// =========================================================

const getBusinessProfile = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const profile = await prisma.businessProfile.findFirst({
            where: {
                userId
            }
        });

        return res.status(200).json(profile);

    } catch (error) {
        return handleError(res, error, "retrieve");
    }
};


// =========================================================
// UPDATE BUSINESS PROFILE BY ID
// =========================================================

const updateBusinessProfile = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);
        const profileId = Number(req.params.id);

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!Number.isInteger(profileId) || profileId <= 0) {
            return res.status(400).json({
                message: "Invalid business profile ID"
            });
        }

        if (
            !req.body ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
                message: "A valid JSON request body is required"
            });
        }

        const data = getProfileData(req.body);

        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                message: "No profile fields provided"
            });
        }

        const validationError = validateProfileData(data);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        // Check whether the profile exists
        const existingProfile = await prisma.businessProfile.findUnique({
            where: {
                id: profileId
            }
        });

        if (!existingProfile) {
            return res.status(404).json({
                message: "Business profile not found"
            });
        }

        // SECURITY: Prevent cross-account profile updates
        if (existingProfile.userId !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this business profile"
            });
        }

        // Enforce ownership again in the database operation
        const result = await prisma.businessProfile.updateMany({
            where: {
                id: profileId,
                userId
            },
            data
        });

        if (result.count !== 1) {
            return res.status(404).json({
                message: "Business profile not found or access denied"
            });
        }

        const updatedProfile = await prisma.businessProfile.findFirst({
            where: {
                id: profileId,
                userId
            }
        });

        return res.status(200).json(updatedProfile);

    } catch (error) {
        return handleError(res, error, "update");
    }
};


// =========================================================
// EXPORT CONTROLLERS
// =========================================================

module.exports = {
    createBusinessProfile,
    getBusinessProfile,
    updateBusinessProfile
};
