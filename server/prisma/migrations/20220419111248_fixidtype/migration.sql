/*
  Warnings:

  - The primary key for the `Interest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProfileInterests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileInterests" DROP CONSTRAINT "ProfileInterests_interest_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileInterests" DROP CONSTRAINT "ProfileInterests_profile_id_fkey";

-- AlterTable
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Interest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Interest_id_seq";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "ProfileInterests" DROP CONSTRAINT "ProfileInterests_pkey",
ALTER COLUMN "profile_id" SET DATA TYPE TEXT,
ALTER COLUMN "interest_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProfileInterests_pkey" PRIMARY KEY ("profile_id", "interest_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
