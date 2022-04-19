/*
  Warnings:

  - The primary key for the `Interest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `interest_id` on the `Interest` table. All the data in the column will be lost.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profile_id` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfileInterests" DROP CONSTRAINT "ProfileInterests_interest_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileInterests" DROP CONSTRAINT "ProfileInterests_profile_id_fkey";

-- AlterTable
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_pkey",
DROP COLUMN "interest_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Interest_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "profile_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
