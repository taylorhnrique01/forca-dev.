-- Tabelas do jogo da forca.
CREATE TABLE "palavras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "categoria" TEXT NOT NULL
);

CREATE TABLE "partidas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jogador" TEXT NOT NULL,
    "palavra_id" INTEGER NOT NULL,
    "letras_tentadas" TEXT NOT NULL DEFAULT '',
    "erros" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'em_andamento',
    "pontos" INTEGER NOT NULL DEFAULT 0,
    "criada_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalizada_em" DATETIME,
    CONSTRAINT "partidas_palavra_id_fkey" FOREIGN KEY ("palavra_id") REFERENCES "palavras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "palavras_texto_key" ON "palavras"("texto");
