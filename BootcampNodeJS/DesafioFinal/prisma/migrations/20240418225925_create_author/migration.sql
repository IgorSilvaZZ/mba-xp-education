-- CreateTable
CREATE TABLE "Author" (
    "authorId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("authorId")
);
