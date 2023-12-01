-- AlterTable
ALTER TABLE "task" ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
