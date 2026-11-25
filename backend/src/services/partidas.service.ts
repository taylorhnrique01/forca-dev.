import type { Partida, Palavra } from '@prisma/client';
import { ErroApp } from '../errors';
import { aplicarPalpite, gerarMascara, VIDAS_INICIAIS } from '../game/regras';
import type { EstadoPartida, ItemRanking, StatusPartida } from '../types';
import * as palavrasRepo from '../repositories/palavras.repository';
import * as partidasRepo from '../repositories/partidas.repository';

type PartidaComPalavra = Partida & { palavra: Palavra };

function estado(partida: PartidaComPalavra): EstadoPartida {
  const tentadas = partida.letrasTentadas.split('').filter(Boolean);
  const status = partida.status as StatusPartida;
  return {
    id: partida.id,
    jogador: partida.jogador,
    categoria: partida.palavra.categoria,
    mascara: gerarMascara(partida.palavra.texto, tentadas),
    letrasTentadas: tentadas,
    vidasRestantes: VIDAS_INICIAIS - partida.erros,
    status,
    pontos: partida.pontos,
    palavra: status === 'em_andamento' ? null : partida.palavra.texto
  };
}

export async function criarPartida(jogador: string): Promise<EstadoPartida> {
  const palavra = await palavrasRepo.sortearPalavra();
  if (!palavra) throw new ErroApp('Banco sem palavras. Rode npm run seed.', 500);
  return estado(await partidasRepo.criarPartida(jogador, palavra.id));
}

export async function buscarPartida(id: number): Promise<EstadoPartida> {
  const partida = await partidasRepo.buscarPartida(id);
  if (!partida) throw new ErroApp('Partida não encontrada', 404);
  return estado(partida);
}

export async function enviarPalpite(id: number, letra: string): Promise<EstadoPartida> {
  const atual = await partidasRepo.buscarPartida(id);
  if (!atual) throw new ErroApp('Partida não encontrada', 404);
  const jogo = aplicarPalpite({
    palavra: atual.palavra.texto,
    letrasTentadas: atual.letrasTentadas.split('').filter(Boolean),
    vidasRestantes: VIDAS_INICIAIS - atual.erros,
    status: atual.status as StatusPartida,
    pontos: atual.pontos
  }, letra);

  const atualizada = await partidasRepo.salvarPalpite(
    id,
    jogo.letrasTentadas.join(''),
    VIDAS_INICIAIS - jogo.vidasRestantes,
    jogo.status,
    jogo.pontos,
    jogo.status === 'em_andamento' ? null : new Date()
  );
  return estado(atualizada);
}

export async function obterRanking(): Promise<ItemRanking[]> {
  const partidas = await partidasRepo.buscarRanking();
  return partidas.map((p) => ({
    jogador: p.jogador,
    pontos: p.pontos,
    palavra: p.palavra.texto,
    finalizadaEm: (p.finalizadaEm ?? p.criadaEm).toISOString()
  }));
}
