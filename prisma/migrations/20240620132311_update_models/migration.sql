/*
  Warnings:

  - You are about to drop the column `pdfFiles` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "pdfFiles",
DROP COLUMN "videoUrl";
