import { z } from "zod";

// Os schemas do Zod conferem se os dados que chegam (da API ou do localStorage)
// têm o formato certo. Os tipos do TypeScript são gerados a partir deles com z.infer.

export const PokemonTypeNameSchema = z.enum([
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
]);

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  base_experience: z.number().nullable(),
  species: z.object({
    url: z.string(),
  }),
  sprites: z.object({
    front_default: z.string().nullable(),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({
        name: z.string(),
      }),
    })
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: PokemonTypeNameSchema,
        url: z.string(),
      }),
    })
  ),
});

export const PokemonSpeciesSchema = z.object({
  is_mythical: z.boolean(),
  is_legendary: z.boolean(),
  capture_rate: z.number(),
});

// Da mais rara para a mais comum
export const PokemonRaritySchema = z.enum([
  "Mitico",
  "Lendario",
  "épico",
  "Raro",
  "Incomum",
  "Comum",
]);

export const PokemonColecaoSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprite: z.string().nullable(),
  raridade: PokemonRaritySchema,
});

export type PokemonTypeName = z.infer<typeof PokemonTypeNameSchema>;
export type Pokemon = z.infer<typeof PokemonSchema>;
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
export type PokemonRarity = z.infer<typeof PokemonRaritySchema>;
export type PokemonColecao = z.infer<typeof PokemonColecaoSchema>;
