/*
  Warnings:

  - You are about to drop the column `item` on the `ListItem` table. All the data in the column will be lost.
  - Added the required column `itemName` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "item",
ADD COLUMN     "itemName" TEXT NOT NULL;
