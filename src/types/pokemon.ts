import { z } from "zod";

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

export type PokemonTypeName = z.infer<typeof PokemonTypeNameSchema>;

const PokemonStatNames = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
] as const;

export const PokemonStatSchema = z.object({
  base_stat: z.number().int().nonnegative(),
  stat: z.object({
    name: z.enum(PokemonStatNames),
  }),
});

const PokemonStatsSchema = z
  .array(PokemonStatSchema)
  .length(6)
  .refine(
    (stats) =>
      stats.every(
        (stat, index) =>
          stat.stat.name === PokemonStatNames[index]
      ),
    "Os atributos do Pokémon estão fora da ordem esperada."
  );

export const PokemonSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  height: z.number().int().nonnegative(),
  weight: z.number().int().nonnegative(),
  base_experience: z.number().int().nonnegative().nullable(),
  species: z.object({
    url: z.string().url(),
  }),
  sprites: z.object({
    front_default: z.string().url().nullable(),
  }),
  stats: PokemonStatsSchema,
  types: z
    .array(
      z.object({
        slot: z.number().int().positive(),
        type: z.object({
          name: PokemonTypeNameSchema,
          url: z.string().url(),
        }),
      })
    )
    .min(1)
    .max(2),
});

export const PokemonSpeciesSchema = z.object({
  is_mythical: z.boolean(),
  is_legendary: z.boolean(),
  capture_rate: z.number().int().min(0).max(255),
});

export const PokemonRaritySchema = z.enum([
  "Mitico",
  "Lendario",
  "épico",
  "Raro",
  "Incomum",
  "Comum",
]);

export const PokemonColecaoSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  sprite: z.string().url().nullable(),
  raridade: PokemonRaritySchema,
});

export const LIMITE_COLECAO = 25;

export const PokemonFavoritosSchema = z
  .array(PokemonSchema)
  .refine(
    (favoritos) =>
      new Set(favoritos.map((pokemon) => pokemon.id)).size === favoritos.length,
    "A lista de favoritos contém Pokémon duplicados."
  );

export const PokemonColecaoListaSchema = z
  .array(PokemonColecaoSchema)
  .max(LIMITE_COLECAO)
  .refine(
    (colecao) =>
      new Set(colecao.map((pokemon) => pokemon.id)).size === colecao.length,
    "A coleção contém Pokémon duplicados."
  );

export const PokemonSearchSchema = z
  .string()
  .trim()
  .min(1, "Digite o nome ou número de um Pokémon.")
  .transform((value) => value.toLowerCase().replace(/\s+/g, "-"))
  .pipe(
    z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Digite um nome ou número de Pokémon válido."
      )
  );

export type PokemonStat = z.infer<typeof PokemonStatSchema>;
export type Pokemon = z.infer<typeof PokemonSchema>;
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
export type PokemonRarity = z.infer<typeof PokemonRaritySchema>;
export type PokemonColecao = z.infer<typeof PokemonColecaoSchema>;
