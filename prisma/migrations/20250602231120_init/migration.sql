-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('EARRING', 'EYE_ACCESSORY', 'FACE_ACCESSORY', 'PENDANT', 'BELT', 'MEDAL', 'RING', 'SHOULDERPAD', 'POCKET', 'HAT', 'TOP', 'BOTTOM', 'OVERALL', 'SHOES', 'GLOVES', 'CAPE', 'SHIELD', 'TAMING_MOB', 'ONE_HANDED_SWORD', 'TWO_HANDED_SWORD', 'ONE_HANDED_AXE', 'TWO_HANDED_AXE', 'ONE_HANDED_BLUNT_WEAPON', 'TWO_HANDED_BLUNT_WEAPON', 'BOW', 'CROSSBOW', 'CLAW', 'DAGGER', 'SPEAR', 'POLEARM', 'WAND', 'STAFF', 'KNUCKLE', 'GUN', 'USABLE_NOT_EQUIPMENT', 'OTHER_NOT_EQUIPMENT');

-- CreateEnum
CREATE TYPE "Class" AS ENUM ('BEGINNER', 'BOWMAN', 'MAGICIAN', 'PIRATE', 'THIEF', 'WARRIOR');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'COMPLETE', 'REMOVED_USER', 'REMOVED_COMMUNITY', 'REMOVED_ADMIN', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('MESO', 'SNOWFLAKE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "discordId" TEXT NOT NULL,
    "discordUsername" TEXT NOT NULL,
    "displayDiscord" BOOLEAN NOT NULL DEFAULT false,
    "artaleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemMaster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ItemCategory" NOT NULL,
    "levelRequirement" INTEGER NOT NULL DEFAULT 0,
    "classRequirement" "Class"[] DEFAULT ARRAY['BEGINNER']::"Class"[],
    "strRequirement" INTEGER NOT NULL DEFAULT 0,
    "dexRequirement" INTEGER NOT NULL DEFAULT 0,
    "intRequirement" INTEGER NOT NULL DEFAULT 0,
    "lukRequirement" INTEGER NOT NULL DEFAULT 0,
    "fameRequirement" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "itemMasterId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'ACTIVE',
    "currency" "CurrencyType" NOT NULL DEFAULT 'MESO',
    "price" BIGINT NOT NULL,
    "str" INTEGER NOT NULL DEFAULT 0,
    "dex" INTEGER NOT NULL DEFAULT 0,
    "int" INTEGER NOT NULL DEFAULT 0,
    "luk" INTEGER NOT NULL DEFAULT 0,
    "hp" INTEGER NOT NULL DEFAULT 0,
    "mp" INTEGER NOT NULL DEFAULT 0,
    "watk" INTEGER NOT NULL DEFAULT 0,
    "matk" INTEGER NOT NULL DEFAULT 0,
    "wdef" INTEGER NOT NULL DEFAULT 0,
    "mdef" INTEGER NOT NULL DEFAULT 0,
    "acc" INTEGER NOT NULL DEFAULT 0,
    "avoid" INTEGER NOT NULL DEFAULT 0,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "jump" INTEGER NOT NULL DEFAULT 0,
    "availableScrollSlots" INTEGER NOT NULL DEFAULT 0,
    "levelRequirement" INTEGER NOT NULL DEFAULT 0,
    "classRequirement" "Class"[] DEFAULT ARRAY['BEGINNER']::"Class"[],
    "strRequirement" INTEGER NOT NULL DEFAULT 0,
    "dexRequirement" INTEGER NOT NULL DEFAULT 0,
    "intRequirement" INTEGER NOT NULL DEFAULT 0,
    "lukRequirement" INTEGER NOT NULL DEFAULT 0,
    "fameRequirement" INTEGER NOT NULL DEFAULT 0,
    "extraData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemMaster_name_key" ON "ItemMaster"("name");

-- CreateIndex
CREATE INDEX "ItemMaster_name_idx" ON "ItemMaster"("name");

-- CreateIndex
CREATE INDEX "Listing_creatorId_idx" ON "Listing"("creatorId");

-- CreateIndex
CREATE INDEX "Listing_status_idx" ON "Listing"("status");

-- CreateIndex
CREATE INDEX "Listing_price_idx" ON "Listing"("price");

-- CreateIndex
CREATE INDEX "Listing_itemName_idx" ON "Listing"("itemName");

-- CreateIndex
CREATE INDEX "Listing_levelRequirement_idx" ON "Listing"("levelRequirement");

-- CreateIndex
CREATE INDEX "Listing_classRequirement_idx" ON "Listing" USING GIN ("classRequirement");

-- CreateIndex
CREATE INDEX "Listing_strRequirement_idx" ON "Listing"("strRequirement");

-- CreateIndex
CREATE INDEX "Listing_dexRequirement_idx" ON "Listing"("dexRequirement");

-- CreateIndex
CREATE INDEX "Listing_intRequirement_idx" ON "Listing"("intRequirement");

-- CreateIndex
CREATE INDEX "Listing_lukRequirement_idx" ON "Listing"("lukRequirement");

-- CreateIndex
CREATE INDEX "Listing_fameRequirement_idx" ON "Listing"("fameRequirement");

-- CreateIndex
CREATE INDEX "Listing_str_idx" ON "Listing"("str");

-- CreateIndex
CREATE INDEX "Listing_dex_idx" ON "Listing"("dex");

-- CreateIndex
CREATE INDEX "Listing_int_idx" ON "Listing"("int");

-- CreateIndex
CREATE INDEX "Listing_luk_idx" ON "Listing"("luk");

-- CreateIndex
CREATE INDEX "Listing_watk_idx" ON "Listing"("watk");

-- CreateIndex
CREATE INDEX "Listing_matk_idx" ON "Listing"("matk");

-- CreateIndex
CREATE INDEX "Listing_wdef_idx" ON "Listing"("wdef");

-- CreateIndex
CREATE INDEX "Listing_mdef_idx" ON "Listing"("mdef");

-- CreateIndex
CREATE INDEX "Listing_acc_idx" ON "Listing"("acc");

-- CreateIndex
CREATE INDEX "Listing_avoid_idx" ON "Listing"("avoid");

-- CreateIndex
CREATE INDEX "Listing_speed_idx" ON "Listing"("speed");

-- CreateIndex
CREATE INDEX "Listing_jump_idx" ON "Listing"("jump");

-- CreateIndex
CREATE INDEX "Listing_availableScrollSlots_idx" ON "Listing"("availableScrollSlots");

-- CreateIndex
CREATE INDEX "Listing_createdAt_idx" ON "Listing"("createdAt");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_itemMasterId_fkey" FOREIGN KEY ("itemMasterId") REFERENCES "ItemMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
