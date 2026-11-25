import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { prisma } from '../src/database/prisma';
import { criarApp } from '../src/app';

const app = criarApp();

beforeAll(async () => {
  await prisma.partida.deleteMany();
  await prisma.palavra.deleteMany();
  await prisma.palavra.create({ data: { texto: 'PROMISE', categoria: 'JavaScript' } });
});

afterAll(async () => {
  await app.close();
  await prisma.$disconnect();
});

describe('rotas da API', () => {
  it('recusa apelido curto com 400', async () => {
    const res = await app.inject({ method: 'POST', url: '/api/partidas',
      payload: { jogador: 'a' } });
    expect(res.statusCode).toBe(400);
    expect(res.json()).toHaveProperty('erro');
  });
  it('cria partida escondendo a palavra e inicia com seis vidas', async () => {
    const res = await app.inject({ method: 'POST', url: '/api/partidas',
      payload: { jogador: 'aluno' } });
    expect(res.statusCode).toBe(201);
    expect(res.json().palavra).toBeNull();
    expect(res.json().vidasRestantes).toBe(6);
  });
  it('recusa letras inválidas com 400', async () => {
    const nova = await app.inject({ method: 'POST', url: '/api/partidas', payload: { jogador: 'maria' } });
    const id: number = nova.json().id;
    const res = await app.inject({ method: 'POST', url: `/api/partidas/${id}/palpites`, payload: { letra: 'AB' } });
    expect(res.statusCode).toBe(400);
  });
  it('uma letra repetida devolve 409 sem consumir outra vida', async () => {
    const nova = await app.inject({ method: 'POST', url: '/api/partidas', payload: { jogador: 'pedro' } });
    const id: number = nova.json().id;
    const url = `/api/partidas/${id}/palpites`;
    await app.inject({ method: 'POST', url, payload: { letra: 'Z' } });
    const repetida = await app.inject({ method: 'POST', url, payload: { letra: 'Z' } });
    expect(repetida.statusCode).toBe(409);
    const atual = await app.inject({ method: 'GET', url: `/api/partidas/${id}` });
    expect(atual.json().vidasRestantes).toBe(5);
  });
  it('retorna 404 para uma partida inexistente', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/partidas/9999999' });
    expect(res.statusCode).toBe(404);
  });
  it('consulta ranking como lista', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/ranking' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.json())).toBe(true);
  });
});
