/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Endereco` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Endereco_numero_key" ON "Endereco"("numero");
