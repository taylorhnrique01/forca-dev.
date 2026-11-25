import { z } from 'zod';

export const novaPartidaSchema = z.object({
  jogador: z.string().trim().min(3).max(20)
});

export const palpiteSchema = z.object({
  letra: z.string()
    .regex(/^[a-zA-Z]$/, 'Envie uma única letra de A a Z')
    .transform((l) => l.toUpperCase())
});

export const idSchema = z.object({
  id: z.coerce.number().int().positive()
});
