-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_myListId_fkey";

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_myListId_fkey" FOREIGN KEY ("myListId") REFERENCES "MyList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
