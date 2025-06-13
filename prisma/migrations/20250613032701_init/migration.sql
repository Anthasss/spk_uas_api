/*
  Warnings:

  - You are about to drop the `ratings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weighted_pref` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_alternativeId_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_criteriaId_fkey";

-- DropForeignKey
ALTER TABLE "weighted_pref" DROP CONSTRAINT "weighted_pref_alternativeId_fkey";

-- DropTable
DROP TABLE "ratings";

-- DropTable
DROP TABLE "weighted_pref";

-- CreateTable
CREATE TABLE "sub_criteria" (
    "id" SERIAL NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "realValue" TEXT NOT NULL,
    "ratingValue" INTEGER NOT NULL,

    CONSTRAINT "sub_criteria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sub_criteria" ADD CONSTRAINT "sub_criteria_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "criteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
