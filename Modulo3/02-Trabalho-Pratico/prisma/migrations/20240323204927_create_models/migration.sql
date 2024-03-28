-- CreateTable
CREATE TABLE "Proprietario" (
    "proprietarioId" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Proprietario_pkey" PRIMARY KEY ("proprietarioId")
);

-- CreateTable
CREATE TABLE "Animais" (
    "animalId" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fkProprietario" INTEGER NOT NULL,

    CONSTRAINT "Animais_pkey" PRIMARY KEY ("animalId")
);

-- AddForeignKey
ALTER TABLE "Animais" ADD CONSTRAINT "Animais_fkProprietario_fkey" FOREIGN KEY ("fkProprietario") REFERENCES "Proprietario"("proprietarioId") ON DELETE RESTRICT ON UPDATE CASCADE;
