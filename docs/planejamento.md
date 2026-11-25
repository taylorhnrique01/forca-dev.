# Planejamento do jogo Forca Dev

## Objetivo

Criar uma forca de termos de programação, com cadastro de partidas,
palpites, cálculo de pontos e ranking. Primeiro vem a lógica; depois a API;
por último, o visual.

## O que será salvo no banco

**Palavra**

| Campo | Tipo | Para que serve |
|---|---|---|
| id | Int | Identificador |
| texto | String | Palavra secreta em maiúsculas |
| categoria | String | JavaScript, TypeScript ou React |

**Partida**

| Campo | Tipo | Para que serve |
|---|---|---|
| id | Int | Número da partida |
| jogador | String | Apelido de quem joga |
| palavraId | Int | Liga a partida à palavra |
| letrasTentadas | String | Letras já usadas |
| erros | Int | Erros cometidos |
| status | String | em_andamento, vitoria ou derrota |
| pontos | Int | Pontos do jogador |
| criadaEm | DateTime | Início |
| finalizadaEm | DateTime? | Fim (pode ser vazio) |

## Rotas da API

| Método | Caminho | Uso |
|---|---|---|
| POST | /api/partidas | Iniciar jogo |
| GET | /api/partidas/:id | Buscar o estado atual |
| POST | /api/partidas/:id/palpites | Enviar uma letra |
| GET | /api/ranking | Ver top 10 |

## Tipos TypeScript

- **StatusPartida**: `em_andamento`, `vitoria` ou `derrota`.
- **EstadoPartida**: id, jogador, categoria, mascara, letrasTentadas,
  vidasRestantes, status, pontos e palavra (null durante a partida).
- **ItemRanking**: jogador, pontos, palavra e finalizadaEm.

## Ordem do desenvolvimento

1. Preparar pastas e dependências.
2. Modelar o banco com Prisma e cadastrar as palavras.
3. Programar as regras do jogo e os testes.
4. Fazer as rotas com Fastify e validar entradas com Zod.
5. Fazer a interface com React e conectar à API.
6. Conferir o ranking, erros e funcionamento completo.
7. Atualizar documentos e fazer os commits/checkpoints no Git.

## Ideia do visual

Usar uma página simples e centralizada, com fundo grafite. A área da palavra
fica sobre um painel claro, lembrando uma folha. O ranking aparece embaixo,
para não misturar com a área principal do jogo.
