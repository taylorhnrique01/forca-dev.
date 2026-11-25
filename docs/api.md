# Documentação da API — Forca Dev

Base: `http://localhost:3333/api`. Todos os erros retornam `{ "erro": "mensagem" }`.

## POST /api/partidas

**Entrada (JSON):**
```json
{ "jogador": "aluno" }
```

**Sucesso 201:**
```json
{
  "id": 1,
  "jogador": "aluno",
  "categoria": "JavaScript",
  "mascara": "_______",
  "letrasTentadas": [],
  "vidasRestantes": 6,
  "status": "em_andamento",
  "pontos": 0,
  "palavra": null
}
```

A categoria e a máscara dependem da palavra sorteada. O exemplo acima considera uma
palavra de 7 letras, como PROMISE.

**Erros:** 400 (jogador não informado ou fora de 3–20 caracteres);
500 (erro interno ou banco sem palavras).

## GET /api/partidas/:id

**Entrada:** ID numérico positivo na URL. Não tem corpo JSON.

**Sucesso 200:** mesmo formato `EstadoPartida` do exemplo anterior, com os valores atuais.

**Erros:** 400 (ID inválido), 404 (partida não encontrada).

## POST /api/partidas/:id/palpites

**Entrada (JSON):**
```json
{ "letra": "p" }
```

**Sucesso 200**, considerando o exemplo da palavra PROMISE:
```json
{
  "id": 1,
  "jogador": "aluno",
  "categoria": "JavaScript",
  "mascara": "P______",
  "letrasTentadas": ["P"],
  "vidasRestantes": 6,
  "status": "em_andamento",
  "pontos": 0,
  "palavra": null
}
```

**Erros:** 400 (letra diferente de A–Z ou ID inválido),
404 (partida inexistente), 409 (letra repetida ou partida já encerrada).

## GET /api/ranking

**Entrada:** não tem corpo JSON.

**Sucesso 200:** lista das 10 vitórias com mais pontos. Exemplo:
```json
[
  {
    "jogador": "aluno",
    "pontos": 75,
    "palavra": "PROMISE",
    "finalizadaEm": "2026-11-14T20:30:00.000Z"
  }
]
```

Lista vazia `[]` se ninguém venceu. Em empate, aparece primeiro quem terminou antes.

## Segurança e regras
- O campo `palavra` é `null` enquanto o jogo não termina.
- Cada erro consome uma das seis vidas.
- Palpite repetido retorna 409 sem consumir vidas.
- Vitória: `vidas restantes × 10 + letras diferentes × 5`. Derrota: 0.
