-- CreateTable
CREATE TABLE "Book" (
    "bookId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "fkAuthorId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_fkAuthorId_fkey" FOREIGN KEY ("fkAuthorId") REFERENCES "Author"("authorId") ON DELETE RESTRICT ON UPDATE CASCADE;
