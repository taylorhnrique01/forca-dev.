# Decisões do projeto

## 1. Guardar a palavra no servidor
- **Contexto:** o jogador não pode descobrir a resposta abrindo o navegador.
- **Decisão:** devolver só a máscara durante a partida.
- **Alternativa descartada:** enviar a palavra inteira e escondê-la com CSS.
- **Consequência:** cada letra precisa ser verificada na API, mas o jogo fica confiável.

## 2. Usar SQLite com Prisma
- **Contexto:** o jogo precisa guardar as palavras e o ranking entre execuções.
- **Decisão:** banco SQLite com Prisma ORM 6.19.3.
- **Alternativa descartada:** guardar tudo só em variáveis do React.
- **Consequência:** é preciso criar o banco com a migration e rodar o seed.

## 3. Fazer uma tela simples e centralizada
- **Contexto:** o jogador precisa achar os botões sem se perder na tela.
- **Decisão:** formulário de apelido no começo, palavra no centro, teclado embaixo e ranking ao final.
- **Alternativa descartada:** criar muitas telas e menus laterais.
- **Consequência:** menos elementos visuais e código mais fácil de apresentar.
