# Forca Dev — Edição Caderno

Jogo da forca para praticar termos de JavaScript, TypeScript e React. O jogador
escolhe um apelido, recebe uma palavra escondida e tem até seis erros. As vitórias
geram pontos e aparecem no ranking de melhores partidas.

## Como o projeto está dividido

- **backend/**: servidor Fastify, TypeScript, Zod, Prisma e SQLite.
- **frontend/**: a tela do jogo feita em React, TypeScript e CSS.
- **docs/**: planejamento, explicação da API, decisões e diário de bordo.

A tela foi organizada como um caderno: um espaço para começar, uma área para a palavra,
um teclado e o ranking abaixo. O estilo principal está em `frontend/src/style.css`.

## O que instalar antes

- Node.js (com npm), Git e Visual Studio Code.
- Conexão com a internet na primeira instalação, para baixar os pacotes do npm.

No terminal do VS Code, confira `node -v`, `npm -v` e `git --version`.

## Como rodar no Windows

Abra a pasta `forca-dev` no VS Code.

### Terminal 1 — servidor

```powershell
cd backend
npm install
Copy-Item .env.example .env
npx prisma migrate dev
npm run seed
npm run dev
```

A API deve ficar disponível na porta 3333. O banco é criado pelo Prisma e o seed
adiciona mais de 20 palavras.

### Terminal 2 — tela do jogo

Abra **Terminal → New Terminal**, estando na pasta principal `forca-dev`:

```powershell
cd frontend
npm install
npm run dev
```

Abra o endereço indicado pelo Vite (geralmente `http://localhost:5173`).
Mantenha os dois terminais abertos para jogar.

## Testes

No terminal da pasta `backend`:

```powershell
npm test
npm run build
```

No terminal da pasta `frontend`:

```powershell
npm run build
```

Os testes da API usam um banco de testes separado. Os testes das regras não
precisam acessar o banco.

## Regras importantes

1. A partida começa com 6 vidas e cada erro desconta uma.
2. O servidor só aceita uma letra de A a Z.
3. Uma letra repetida ou uma partida encerrada responde com erro 409.
4. Quando as vidas acabam, a partida é uma derrota.
5. A palavra só é enviada ao navegador no final da partida.
6. Pontos = vidas restantes × 10 + letras diferentes da palavra × 5.
7. O ranking mostra as 10 vitórias de maior pontuação.

## Arquivos importantes

- `backend/src/game/regras.ts`: máscara, pontuação e palpite.
- `backend/src/services/partidas.service.ts`: organiza o funcionamento da partida.
- `backend/prisma/schema.prisma`: define as tabelas.
- `frontend/src/App.tsx`: controla as telas e chama a API.
- `frontend/src/components/`: quatro componentes tipados (Mascara, Teclado, Vidas e Ranking).
- `frontend/src/style.css`: cores e aparência do jogo.

## Captura de tela

Depois de abrir a aplicação, tire uma captura **real** e salve como
`docs/print-jogo.png`. Inclua esse arquivo no repositório antes de entregar.

## Entrega pelo Git

A avaliação exige **repositório Git com commits e as tags** `checkpoint-1`,
`checkpoint-2` e `checkpoint-3`. Não basta enviar somente um ZIP.
Faça cada tag depois da etapa correspondente (não antes). Envie o repositório
remoto e as tags conforme as orientações do professor.

`.gitignore` evita enviar `node_modules/`, `.env`, `*.db` e `dist/`.
A pasta `backend/prisma/migrations/` deve estar no Git.

## Diário de bordo e apresentação

Complete `docs/diario-de-bordo.md` com o que você realmente fez e as dúvidas
que apareceram. Registre também o uso de ferramentas de IA conforme o combinado
com o professor. Antes da defesa oral, treine a explicação dos arquivos principais
para conseguir mostrar e alterar o código com segurança.
