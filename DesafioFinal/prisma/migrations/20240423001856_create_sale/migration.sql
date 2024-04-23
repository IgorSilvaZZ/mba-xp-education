-- CreateTable
CREATE TABLE "Sale" (
    "saleId" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fkAuthorId" INTEGER NOT NULL,
    "fkBookId" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("saleId")
);

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_fkAuthorId_fkey" FOREIGN KEY ("fkAuthorId") REFERENCES "Author"("authorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_fkBookId_fkey" FOREIGN KEY ("fkBookId") REFERENCES "Book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;
