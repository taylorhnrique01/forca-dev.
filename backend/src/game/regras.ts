import { ErroApp } from '../errors';
import type { StatusPartida } from '../types';

export const VIDAS_INICIAIS = 6;

export interface JogoEmMemoria {
  palavra: string;
  letrasTentadas: string[];
  vidasRestantes: number;
  status: StatusPartida;
  pontos: number;
}

/** RN07: mostra somente as letras que o jogador já descobriu. */
export function gerarMascara(palavra: string, tentadas: string[]): string {
  let mascara = '';
  for (const letra of palavra) {
    mascara += tentadas.includes(letra) ? letra : '_';
  }
  return mascara;
}

/** RN06: soma os pontos pelas vidas e pelas letras diferentes da palavra. */
export function calcularPontos(palavra: string, vidas: number): number {
  const diferentes = new Set(palavra).size;
  return vidas * 10 + diferentes * 5;
}

/** RN01 a RN05: verifica uma letra e devolve um novo estado sem alterar o antigo. */
export function aplicarPalpite(jogo: JogoEmMemoria, letra: string): JogoEmMemoria {
  const palpite = letra.toUpperCase();

  if (!/^[A-Z]$/.test(palpite)) {
    throw new ErroApp('Envie uma única letra de A a Z', 400);
  }
  if (jogo.status !== 'em_andamento') {
    throw new ErroApp('Esta partida já terminou', 409);
  }
  if (jogo.letrasTentadas.includes(palpite)) {
    throw new ErroApp('Letra já tentada', 409);
  }

  const tentadas = [...jogo.letrasTentadas, palpite];
  const acertou = jogo.palavra.includes(palpite);
  const vidas = acertou ? jogo.vidasRestantes : jogo.vidasRestantes - 1;
  const palavraCompleta = !gerarMascara(jogo.palavra, tentadas).includes('_');

  let situacao: StatusPartida = 'em_andamento';
  if (palavraCompleta) situacao = 'vitoria';
  else if (vidas === 0) situacao = 'derrota';

  return {
    ...jogo,
    letrasTentadas: tentadas,
    vidasRestantes: vidas,
    status: situacao,
    pontos: situacao === 'vitoria' ? calcularPontos(jogo.palavra, vidas) : 0
  };
}
