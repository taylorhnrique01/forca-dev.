import { describe, it, expect } from 'vitest';
import { aplicarPalpite, calcularPontos, gerarMascara, VIDAS_INICIAIS } from '../src/game/regras';
import type { JogoEmMemoria } from '../src/game/regras';

function partida(palavra = 'PROMISE'): JogoEmMemoria {
  return { palavra, letrasTentadas: [], vidasRestantes: VIDAS_INICIAIS,
    status: 'em_andamento', pontos: 0 };
}

describe('regras do jogo', () => {
  it('inicia a máscara só com traços', () => {
    expect(gerarMascara('PROMISE', [])).toBe('_______');
  });
  it('mostra apenas as letras que foram descobertas', () => {
    expect(gerarMascara('PROMISE', ['P', 'E'])).toBe('P_____E');
  });
  it('acerto não tira vidas e converte a letra para maiúscula', () => {
    const resultado = aplicarPalpite(partida(), 'p');
    expect(resultado.vidasRestantes).toBe(6);
    expect(resultado.letrasTentadas).toEqual(['P']);
  });
  it('erro desconta uma vida sem modificar a partida original', () => {
    const original = partida();
    const resultado = aplicarPalpite(original, 'Z');
    expect(resultado.vidasRestantes).toBe(5);
    expect(original.letrasTentadas).toEqual([]);
  });
  it('letra repetida causa conflito 409', () => {
    const atual = aplicarPalpite(partida(), 'P');
    expect(() => aplicarPalpite(atual, 'P')).toThrow('Letra já tentada');
  });
  it('com zero vidas a partida termina em derrota', () => {
    const atual = { ...partida(), vidasRestantes: 1 };
    const resultado = aplicarPalpite(atual, 'Z');
    expect(resultado.status).toBe('derrota');
    expect(resultado.pontos).toBe(0);
  });
  it('revelar tudo dá vitória com pontuação certa', () => {
    const atual = { ...partida('ABA'), letrasTentadas: ['A'] };
    const resultado = aplicarPalpite(atual, 'B');
    expect(resultado.status).toBe('vitoria');
    expect(resultado.pontos).toBe(70);
    expect(calcularPontos('PROMISE', 4)).toBe(75);
  });
  it('partida terminada não aceita novos palpites', () => {
    expect(() => aplicarPalpite({ ...partida(), status: 'vitoria' }, 'A'))
      .toThrow('Esta partida já terminou');
  });
  it('palpite com duas letras é inválido', () => {
    expect(() => aplicarPalpite(partida(), 'AB')).toThrow('Envie uma única letra');
  });
});
