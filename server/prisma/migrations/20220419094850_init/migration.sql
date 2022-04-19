-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profile_id" SERIAL NOT NULL,
    "profile_bio" VARCHAR(200),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "interest_id" SERIAL NOT NULL,
    "interest_name" VARCHAR NOT NULL,
    "interest_description" VARCHAR(200),

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("interest_id")
);

-- CreateTable
CREATE TABLE "ProfileInterests" (
    "profile_id" INTEGER NOT NULL,
    "interest_id" INTEGER NOT NULL,

    CONSTRAINT "ProfileInterests_pkey" PRIMARY KEY ("profile_id","interest_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "Interest"("interest_id") ON DELETE RESTRICT ON UPDATE CASCADE;
