/*
  Warnings:

  - You are about to drop the `alternatives` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_alternativeId_fkey";

-- DropTable
DROP TABLE "alternatives";

-- CreateTable
CREATE TABLE "alternative" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "alternative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weighted_pref" (
    "id" SERIAL NOT NULL,
    "weightedScore" DOUBLE PRECISION NOT NULL,
    "alternativeId" INTEGER NOT NULL,

    CONSTRAINT "weighted_pref_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weighted_pref_alternativeId_key" ON "weighted_pref"("alternativeId");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "alternative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weighted_pref" ADD CONSTRAINT "weighted_pref_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "alternative"("id") ON DELETE CASCADE ON UPDATE CASCADE;
