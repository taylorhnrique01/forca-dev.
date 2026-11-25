import type { FastifyInstance } from 'fastify';
import * as controller from '../controllers/partidas.controller';

export async function rotasPartidas(app: FastifyInstance) {
  app.post('/partidas', controller.criar);
  app.get('/partidas/:id', controller.buscar);
  app.post('/partidas/:id/palpites', controller.palpitar);
  app.get('/ranking', controller.ranking);
}
