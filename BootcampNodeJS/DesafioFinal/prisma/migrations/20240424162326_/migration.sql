-- CreateTable
CREATE TABLE "Sale" (
    "saleId" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fkClientId" INTEGER NOT NULL,
    "fkBookId" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("saleId")
);

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_fkClientId_fkey" FOREIGN KEY ("fkClientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_fkBookId_fkey" FOREIGN KEY ("fkBookId") REFERENCES "Book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;
