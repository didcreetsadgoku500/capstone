/*
  Warnings:

  - Changed the type of `userId` on the `Permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Registrations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "userId";
ALTER TABLE "Permission" ADD COLUMN     "userId" INT4 NOT NULL;

-- AlterTable
ALTER TABLE "Registrations" DROP COLUMN "userId";
ALTER TABLE "Registrations" ADD COLUMN     "userId" INT4 NOT NULL;
