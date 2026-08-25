const OpenAI = require("openai");
const prisma = require("../config/prisma");


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


/* =========================================================
   GENERATE CONTENT
========================================================= */

const generateContent = async (req, res) => {

    try {

        const {
            businessName,
            industry,
            audience,
            contentType,
            tone,
            topic
        } = req.body;


        if (!businessName || !contentType || !tone) {

            return res.status(400).json({
                message:
                    "Business name, content type and tone are required."
            });

        }


        if (!topic && !req.file) {

            return res.status(400).json({
                message:
                    "Please enter a topic or upload an image."
            });

        }


        const prompt = `
You are the content generation engine for BrandOS.

Create polished marketing content using the brand information,
the user's specific request, and the uploaded image when one is provided.

BRAND INFORMATION

Business Name:
${businessName}

Industry:
${industry || "Not specified"}

Target Audience:
${audience || "General audience"}

Brand Tone:
${tone}

CONTENT REQUEST

Content Type:
${contentType}

Topic / Instructions:
${topic || "Use the uploaded image as the main subject of the content."}

Instructions:

- Understand what the user wants to promote or communicate.
- If an image is provided, carefully inspect it and use relevant visible details.
- Do not invent product facts that cannot reasonably be determined from the image or instructions.
- Combine the image context with the saved BrandOS business profile.
- Match the requested brand tone naturally.
- Write for the specified target audience.
- Create content specifically suited to the selected content type.
- For a Social Media Caption, keep it concise and social-media appropriate.
- For a Blog Post, create useful structured long-form content.
- For an Email Campaign, include appropriate email-style structure such as subject, preview text, body and CTA when useful.
- Make the final result polished and ready to publish.
- Avoid generic filler.
- Use clean Markdown formatting when useful.
- Do not explain your reasoning.
- Do not mention OpenAI or that you are an AI.
- Return only the final marketing content.
        `.trim();


        const messageContent = [

            {
                type: "input_text",
                text: prompt
            }

        ];


        /*
            If an image was uploaded through Multer,
            convert it to a base64 data URL so OpenAI can inspect it.
        */

        if (req.file) {

            const imageBase64 =
                req.file.buffer.toString("base64");


            const imageDataUrl =
                `data:${req.file.mimetype};base64,${imageBase64}`;


            messageContent.push({

                type: "input_image",

                image_url: imageDataUrl,

                detail: "auto"

            });

        }


        const response = await client.responses.create({

            /*
                GPT-5 supports image + text input through
                the Responses API.
            */

            model: "gpt-5",

            input: [

                {
                    role: "user",
                    content: messageContent
                }

            ]

        });


        const generatedText =
            response.output_text?.trim();


        if (!generatedText) {

            return res.status(500).json({
                message:
                    "OpenAI returned an empty response."
            });

        }


        const savedContent =
            await prisma.content.create({

                data: {

                    type: contentType,

                    title:
                        `${businessName} ${contentType}`,

                    body:
                        generatedText,

                    userId:
                        req.user.id

                }

            });


        res.json({

            content:
                savedContent.body

        });


    } catch (error) {

        console.log(
            "========== OPENAI CONTENT ERROR =========="
        );

        console.log(error);

        console.log(
            "=========================================="
        );


        if (error.status === 401) {

            return res.status(500).json({
                message:
                    "OpenAI API authentication failed."
            });

        }


        if (error.status === 429) {

            return res.status(429).json({
                message:
                    "OpenAI usage limit reached. Please try again later."
            });

        }


        res.status(500).json({

            message:
                error?.message ||
                "Unable to generate content."

        });

    }

};


/* =========================================================
   HISTORY
========================================================= */

const getHistory = async (req, res) => {

    try {

        const history =
            await prisma.content.findMany({

                where: {

                    userId:
                        req.user.id

                },

                orderBy: {

                    createdAt:
                        "desc"

                }

            });


        res.json(history);


    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

};


/* =========================================================
   UPDATE CONTENT
========================================================= */

const updateContent = async (req, res) => {

    try {

        const contentId =
            Number(req.params.id);

        const { body } = req.body;


        const existingContent =
            await prisma.content.findFirst({

                where: {

                    id:
                        contentId,

                    userId:
                        req.user.id

                }

            });


        if (!existingContent) {

            return res.status(404).json({

                message:
                    "Content not found"

            });

        }


        const updatedContent =
            await prisma.content.update({

                where: {

                    id:
                        contentId

                },

                data: {

                    body

                }

            });


        res.json(
            updatedContent
        );


    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

};


/* =========================================================
   DELETE CONTENT
========================================================= */

const deleteContent = async (req, res) => {

    try {

        const contentId =
            Number(req.params.id);


        const existingContent =
            await prisma.content.findFirst({

                where: {

                    id:
                        contentId,

                    userId:
                        req.user.id

                }

            });


        if (!existingContent) {

            return res.status(404).json({

                message:
                    "Content not found"

            });

        }


        await prisma.$transaction([

            prisma.sEOAnalysis.deleteMany({

                where: {

                    contentId

                }

            }),

            prisma.toneAnalysis.deleteMany({

                where: {

                    contentId

                }

            }),

            prisma.content.delete({

                where: {

                    id:
                        contentId

                }

            })

        ]);


        res.json({

            message:
                "Content deleted successfully"

        });


    } catch (error) {

        console.log(
            "========== DELETE CONTENT ERROR =========="
        );

        console.log(error);

        console.log(
            "=========================================="
        );


        res.status(500).json({

            message:
                error.message

        });

    }

};


/* =========================================================
   CONTENT STATISTICS
========================================================= */

const getContentStats = async (req, res) => {

    try {

        const contents =
            await prisma.content.findMany({

                where: {

                    userId:
                        req.user.id

                },

                include: {

                    seoAnalysis:
                        true,

                    toneAnalysis:
                        true

                }

            });


        const total =
            contents.length;


        const blogPosts =
            contents.filter(

                item =>
                    item.type ===
                    "Blog Post"

            ).length;


        const socialPosts =
            contents.filter(

                item =>
                    item.type ===
                    "Social Media Caption"

            ).length;


        const emails =
            contents.filter(

                item =>
                    item.type ===
                    "Email Campaign"

            ).length;


        const seoScores =
            contents

                .filter(
                    item =>
                        item.seoAnalysis
                )

                .map(
                    item =>
                        item.seoAnalysis.score
                );


        const averageSEO =
            seoScores.length

                ? Math.round(

                    seoScores.reduce(
                        (a, b) =>
                            a + b,
                        0
                    ) /
                    seoScores.length

                )

                : 0;


        const toneConfidence =
            contents

                .filter(
                    item =>
                        item.toneAnalysis
                )

                .map(
                    item =>
                        item.toneAnalysis.confidence
                );


        const averageToneConfidence =
            toneConfidence.length

                ? Math.round(

                    toneConfidence.reduce(
                        (a, b) =>
                            a + b,
                        0
                    ) /
                    toneConfidence.length

                )

                : 0;


        res.json({

            total,

            blogPosts,

            socialPosts,

            emails,

            averageSEO,

            averageToneConfidence

        });


    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

};


/* =========================================================
   REAL SEO ANALYSIS
========================================================= */

const analyzeSEO = async (req, res) => {

    try {

        const contentId =
            Number(req.params.id);


        const content =
            await prisma.content.findFirst({

                where: {

                    id:
                        contentId,

                    userId:
                        req.user.id

                }

            });


        if (!content) {

            return res.status(404).json({

                message:
                    "Content not found"

            });

        }


        const response =
            await client.responses.create({

                model:
                    "gpt-5.6-luna",

                input: `
You are the SEO analysis engine for BrandOS.

Analyze the following marketing content for SEO quality.

Return ONLY valid JSON in this exact format:

{
  "score": 0,
  "keywords": "keyword one, keyword two, keyword three",
  "suggestions": "Clear practical SEO recommendations"
}

Rules:
- "score" must be an integer from 0 to 100.
- Evaluate keyword relevance, readability, structure, search intent, clarity and discoverability.
- "keywords" must contain the most relevant keywords or key phrases found in or recommended for the content.
- Return keywords as one comma-separated string.
- "suggestions" must give specific practical ways to improve the content.
- Keep suggestions concise but useful.
- Do not include markdown.
- Do not include explanations outside the JSON object.
- Return only valid JSON.

Content:

${content.body}
                `.trim()

            });


        const rawResult =
            response.output_text?.trim();


        if (!rawResult) {

            return res.status(500).json({

                message:
                    "OpenAI returned an empty SEO analysis."

            });

        }


        let seoResult;


        try {

            seoResult =
                JSON.parse(
                    rawResult
                );

        } catch (parseError) {

            console.log(
                "SEO JSON PARSE ERROR:",
                rawResult
            );


            return res.status(500).json({

                message:
                    "Unable to read SEO analysis response."

            });

        }


        const score =
            Math.max(

                0,

                Math.min(

                    100,

                    Math.round(
                        Number(
                            seoResult.score
                        ) || 0
                    )

                )

            );


        const keywords =
            String(
                seoResult.keywords ||
                "No keywords identified"
            );


        const suggestions =
            String(
                seoResult.suggestions ||
                "No suggestions available"
            );


        const savedSEO =
            await prisma.sEOAnalysis.upsert({

                where: {

                    contentId:
                        content.id

                },

                update: {

                    score,

                    keywords,

                    suggestions

                },

                create: {

                    score,

                    keywords,

                    suggestions,

                    contentId:
                        content.id

                }

            });


        res.json(
            savedSEO
        );


    } catch (error) {

        console.log(
            "========== SEO ANALYSIS ERROR =========="
        );

        console.log(error);

        console.log(
            "========================================"
        );


        if (error.status === 429) {

            return res.status(429).json({

                message:
                    "OpenAI usage limit reached. Please try again later."

            });

        }


        res.status(500).json({

            message:
                error?.message ||
                "Unable to analyze SEO."

        });

    }

};


/* =========================================================
   REAL TONE ANALYSIS
========================================================= */

const analyzeTone = async (req, res) => {

    try {

        const contentId =
            Number(req.params.id);


        const content =
            await prisma.content.findFirst({

                where: {

                    id:
                        contentId,

                    userId:
                        req.user.id

                }

            });


        if (!content) {

            return res.status(404).json({

                message:
                    "Content not found"

            });

        }


        const response =
            await client.responses.create({

                model:
                    "gpt-5.6-luna",

                input: `
You are the tone analysis engine for BrandOS.

Analyze the dominant tone of the following marketing content.

Return ONLY valid JSON in this exact format:

{
  "tone": "Detected tone",
  "confidence": 0
}

Rules:
- "tone" should be a short descriptive label.
- Examples include Funny, Professional, Friendly, Casual, Persuasive, Excited, Serious, Informative, Inspirational, Conversational, Playful or similar.
- Choose the tone that best represents the actual writing.
- "confidence" must be an integer from 0 to 100.
- Do not include markdown.
- Do not include explanations.
- Return only valid JSON.

Content:

${content.body}
                `.trim()

            });


        const rawResult =
            response.output_text?.trim();


        if (!rawResult) {

            return res.status(500).json({

                message:
                    "OpenAI returned an empty tone analysis."

            });

        }


        let toneResult;


        try {

            toneResult =
                JSON.parse(
                    rawResult
                );

        } catch (parseError) {

            console.log(
                "TONE JSON PARSE ERROR:",
                rawResult
            );


            return res.status(500).json({

                message:
                    "Unable to read tone analysis response."

            });

        }


        const tone =
            String(
                toneResult.tone ||
                "Unknown"
            );


        const confidence =
            Math.max(

                0,

                Math.min(

                    100,

                    Math.round(
                        Number(
                            toneResult.confidence
                        ) || 0
                    )

                )

            );


        const savedTone =
            await prisma.toneAnalysis.upsert({

                where: {

                    contentId:
                        content.id

                },

                update: {

                    tone,

                    confidence

                },

                create: {

                    tone,

                    confidence,

                    contentId:
                        content.id

                }

            });


        res.json(
            savedTone
        );


    } catch (error) {

        console.log(
            "========== TONE ANALYSIS ERROR =========="
        );

        console.log(error);

        console.log(
            "========================================="
        );


        if (error.status === 429) {

            return res.status(429).json({

                message:
                    "OpenAI usage limit reached. Please try again later."

            });

        }


        res.status(500).json({

            message:
                error?.message ||
                "Unable to analyze tone."

        });

    }

};


/* =========================================================
   EXPORTS
========================================================= */

module.exports = {

    generateContent,

    getHistory,

    updateContent,

    deleteContent,

    getContentStats,

    analyzeSEO,

    analyzeTone

};