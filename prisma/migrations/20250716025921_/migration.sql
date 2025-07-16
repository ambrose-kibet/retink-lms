/*
  Warnings:

  - A unique constraint covering the columns `[userId,lessonId,enrollmentId]` on the table `LessonProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enrollmentId` to the `LessonProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LessonProgress_userId_lessonId_key";

-- AlterTable
ALTER TABLE "LessonProgress" ADD COLUMN     "enrollmentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_userId_lessonId_enrollmentId_key" ON "LessonProgress"("userId", "lessonId", "enrollmentId");

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
