import { PrismaClient } from '@prisma/client';

// Uma conexão Prisma para todos os arquivos do servidor.
export const prisma = new PrismaClient();
