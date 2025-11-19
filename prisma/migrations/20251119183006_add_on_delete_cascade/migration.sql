-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_clienteId_fkey";

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
