import { criarApp } from './app';

const porta = Number(process.env.PORT ?? 3333);
const app = criarApp();

app.listen({ port: porta, host: '127.0.0.1' })
  .then(() => console.log(`Servidor funcionando em http://localhost:${porta}`))
  .catch((erro: unknown) => { console.error(erro); process.exit(1); });
