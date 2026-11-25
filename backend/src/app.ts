
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { ZodError } from 'zod';
import { rotasPartidas } from './routes/partidas.routes';
import { ErroApp } from './errors';

export function criarApp() {
  const app = Fastify({ logger: false });

  app.register(cors);
  app.register(rotasPartidas, { prefix: '/api' });

  app.setErrorHandler((erro, _req, reply) => {
    if (erro instanceof ZodError) {
      return reply.status(400).send({
        erro: 'Dados inválidos'
      });
    }

    if (erro instanceof ErroApp) {
      return reply.status(erro.status).send({
        erro: erro.message
      });
    }

    if (
      erro instanceof Error &&
      'statusCode' in erro &&
      typeof erro.statusCode === 'number' &&
      erro.statusCode < 500
    ) {
      return reply.status(erro.statusCode).send({
        erro: erro.message
      });
    }

    console.error(erro);

    return reply.status(500).send({
      erro: 'Erro interno'
    });
  });

  app.setNotFoundHandler((_req, reply) => {
    return reply.status(404).send({
      erro: 'Rota não encontrada'
    });
  });

  return app;
}
