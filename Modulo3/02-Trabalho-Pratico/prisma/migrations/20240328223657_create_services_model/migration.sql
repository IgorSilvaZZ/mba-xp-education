-- CreateTable
CREATE TABLE "Servico" (
    "servicoId" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "fkAnimal" INTEGER NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("servicoId")
);

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_fkAnimal_fkey" FOREIGN KEY ("fkAnimal") REFERENCES "Animais"("animalId") ON DELETE RESTRICT ON UPDATE CASCADE;
