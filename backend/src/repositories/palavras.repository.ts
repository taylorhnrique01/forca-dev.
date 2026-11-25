import { prisma } from '../database/prisma';

export async function sortearPalavra() {
  const total = await prisma.palavra.count();
  if (total === 0) return null;
  const posicao = Math.floor(Math.random() * total);
  return prisma.palavra.findFirst({ orderBy: { id: 'asc' }, skip: posicao });
}
