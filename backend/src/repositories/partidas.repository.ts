import { prisma } from '../database/prisma';

export function criarPartida(jogador: string, palavraId: number) {
  return prisma.partida.create({
    data: { jogador, palavraId }, include: { palavra: true }
  });
}

export function buscarPartida(id: number) {
  return prisma.partida.findUnique({ where: { id }, include: { palavra: true } });
}

export function salvarPalpite(id: number, letrasTentadas: string, erros: number, status: string, pontos: number, finalizadaEm: Date | null) {
  return prisma.partida.update({
    where: { id },
    data: { letrasTentadas, erros, status, pontos, finalizadaEm },
    include: { palavra: true }
  });
}

export function buscarRanking() {
  return prisma.partida.findMany({
    where: { status: 'vitoria' },
    orderBy: [{ pontos: 'desc' }, { finalizadaEm: 'asc' }],
    take: 10,
    include: { palavra: true }
  });
}
