import type { EstadoPartida, ItemRanking } from '../types';

async function requisitar<T>(url: string, opcoes?: RequestInit): Promise<T> {
  let resposta: Response;
  try {
    resposta = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes
    });
  } catch {
    throw new Error('Servidor fora do ar. Confira se o back-end está aberto.');
  }
  const dados: unknown = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    if (typeof dados === 'object' && dados !== null && 'erro' in dados &&
        typeof dados.erro === 'string') throw new Error(dados.erro);
    throw new Error('Não foi possível completar a operação.');
  }
  return dados as T;
}

export const api = {
  novaPartida: (jogador: string) => requisitar<EstadoPartida>('/api/partidas', {
    method: 'POST', body: JSON.stringify({ jogador })
  }),
  buscarPartida: (id: number) => requisitar<EstadoPartida>(`/api/partidas/${id}`),
  palpitar: (id: number, letra: string) => requisitar<EstadoPartida>(`/api/partidas/${id}/palpites`, {
    method: 'POST', body: JSON.stringify({ letra })
  }),
  ranking: () => requisitar<ItemRanking[]>('/api/ranking')
};
