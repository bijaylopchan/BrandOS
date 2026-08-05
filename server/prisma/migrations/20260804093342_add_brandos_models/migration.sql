-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "audience" TEXT,
    "tone" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SEOAnalysis" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "keywords" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "SEOAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToneAnalysis" (
    "id" SERIAL NOT NULL,
    "tone" TEXT NOT NULL,
    "confidence" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "ToneAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SEOAnalysis_contentId_key" ON "SEOAnalysis"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "ToneAnalysis_contentId_key" ON "ToneAnalysis"("contentId");

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SEOAnalysis" ADD CONSTRAINT "SEOAnalysis_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToneAnalysis" ADD CONSTRAINT "ToneAnalysis_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
