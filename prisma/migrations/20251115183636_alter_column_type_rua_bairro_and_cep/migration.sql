/*
  Warnings:

  - A unique constraint covering the columns `[cep]` on the table `Endereco` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rua]` on the table `Endereco` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bairro]` on the table `Endereco` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Endereco_cep_key" ON "Endereco"("cep");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_rua_key" ON "Endereco"("rua");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_bairro_key" ON "Endereco"("bairro");
