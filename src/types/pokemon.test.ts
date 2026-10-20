import { describe, expect, it } from "vitest";
import {
  LIMITE_COLECAO,
  PokemonColecaoListaSchema,
  PokemonFavoritosSchema,
  PokemonRaritySchema,
  PokemonSchema,
  PokemonSearchSchema,
  PokemonSpeciesSchema,
} from "./pokemon";

function criarPokemon(id = 25) {
  return {
    id,
    name: "pikachu",
    height: 4,
    weight: 60,
    base_experience: 112,
    species: { url: "https://pokeapi.co/api/v2/pokemon-species/25/" },
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/pikachu.png",
    },
    stats: [
      { base_stat: 35, stat: { name: "hp" } },
      { base_stat: 55, stat: { name: "attack" } },
      { base_stat: 40, stat: { name: "defense" } },
      { base_stat: 50, stat: { name: "special-attack" } },
      { base_stat: 50, stat: { name: "special-defense" } },
      { base_stat: 90, stat: { name: "speed" } },
    ],
    types: [
      {
        slot: 1,
        type: {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/",
        },
      },
    ],
  };
}

function criarPokemonColecao(id = 25) {
  return {
    id,
    name: "pikachu",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/pikachu.png",
    raridade: "Comum",
  };
}

describe("PokemonSchema", () => {
  it("aceita um Pokémon no formato esperado pela aplicação", () => {
    expect(PokemonSchema.safeParse(criarPokemon()).success).toBe(true);
  });

  it("rejeita atributos ausentes, fora de ordem e tipos desconhecidos", () => {
    const semAtributos = { ...criarPokemon(), stats: [] };
    const atributosForaDeOrdem = {
      ...criarPokemon(),
      stats: [...criarPokemon().stats].reverse(),
    };
    const tipoDesconhecido = {
      ...criarPokemon(),
      types: [
        {
          slot: 1,
          type: {
            name: "unknown",
            url: "https://pokeapi.co/api/v2/type/999/",
          },
        },
      ],
    };

    expect(PokemonSchema.safeParse(semAtributos).success).toBe(false);
    expect(PokemonSchema.safeParse(atributosForaDeOrdem).success).toBe(false);
    expect(PokemonSchema.safeParse(tipoDesconhecido).success).toBe(false);
  });
});

describe("PokemonSpeciesSchema", () => {
  it("aceita dados válidos e rejeita taxas de captura fora do intervalo", () => {
    const especie = {
      is_mythical: false,
      is_legendary: false,
      capture_rate: 45,
    };

    expect(PokemonSpeciesSchema.safeParse(especie).success).toBe(true);
    expect(
      PokemonSpeciesSchema.safeParse({ ...especie, capture_rate: 256 }).success
    ).toBe(false);
  });
});

describe("schemas de dados persistidos", () => {
  it("rejeita favoritos malformados ou com IDs duplicados", () => {
    expect(PokemonFavoritosSchema.safeParse([criarPokemon()]).success).toBe(
      true
    );
    expect(
      PokemonFavoritosSchema.safeParse([{ id: 25 }, criarPokemon()]).success
    ).toBe(false);
    expect(
      PokemonFavoritosSchema.safeParse([
        criarPokemon(25),
        criarPokemon(25),
      ]).success
    ).toBe(false);
  });

  it("limita coleção a 25 itens únicos com raridade válida", () => {
    expect(PokemonColecaoListaSchema.safeParse([criarPokemonColecao()]).success)
      .toBe(true);
    expect(
      PokemonColecaoListaSchema.safeParse(
        Array.from({ length: LIMITE_COLECAO + 1 }, (_, id) =>
          criarPokemonColecao(id + 1)
        )
      ).success
    ).toBe(false);
    expect(
      PokemonColecaoListaSchema.safeParse([
        criarPokemonColecao(25),
        criarPokemonColecao(25),
      ]).success
    ).toBe(false);
    expect(
      PokemonColecaoListaSchema.safeParse([
        { ...criarPokemonColecao(), raridade: "ultra-raro" },
      ]).success
    ).toBe(false);
  });

  it("aceita apenas os valores de raridade usados pela aplicação", () => {
    expect(PokemonRaritySchema.safeParse("épico").success).toBe(true);
    expect(PokemonRaritySchema.safeParse("Ultra raro").success).toBe(false);
  });
});

describe("PokemonSearchSchema", () => {
  it("normaliza espaços e maiúsculas para o formato da PokéAPI", () => {
    expect(PokemonSearchSchema.parse("  Mr Mime  ")).toBe("mr-mime");
  });

  it("rejeita busca vazia e caracteres fora do formato aceito", () => {
    expect(PokemonSearchSchema.safeParse("   ").success).toBe(false);
    expect(PokemonSearchSchema.safeParse("../pikachu").success).toBe(false);
  });
});
