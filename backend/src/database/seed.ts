import { prisma } from './prisma';

// Lista com três categorias, cada palavra em maiúsculas e sem acentos.
const palavras: [string, string][] = [
  ['PROMISE', 'JavaScript'],
  ['CALLBACK', 'JavaScript'],
  ['BOOLEAN', 'JavaScript'],
  ['ASYNC', 'JavaScript'],
  ['AWAIT', 'JavaScript'],
  ['CLOSURE', 'JavaScript'],
  ['OBJECT', 'JavaScript'],
  ['TEMPLATE', 'JavaScript'],
  ['INTERFACE', 'TypeScript'],
  ['GENERICS', 'TypeScript'],
  ['UNION', 'TypeScript'],
  ['ENUM', 'TypeScript'],
  ['UNKNOWN', 'TypeScript'],
  ['NEVER', 'TypeScript'],
  ['TUPLA', 'TypeScript'],
  ['NUMBER', 'TypeScript'],
  ['COMPONENTE', 'React'],
  ['PROPS', 'React'],
  ['ESTADO', 'React'],
  ['RENDER', 'React'],
  ['HOOK', 'React'],
  ['CONTEXTO', 'React'],
  ['FRAGMENTO', 'React'],
  ['EFFECT', 'React']
];

async function prepararBanco() {
  for (const [texto, categoria] of palavras) {
    await prisma.palavra.upsert({
      where: { texto },
      update: { categoria },
      create: { texto, categoria }
    });
  }
  console.log(`Palavras cadastradas: ${await prisma.palavra.count()}`);
}

prepararBanco()
  .catch((erro: unknown) => { console.error(erro); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); });
