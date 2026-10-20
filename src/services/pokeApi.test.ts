import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buscarPokemonAleatorio, buscarPokemonPorNome } from "./pokeApi";

function criarPokemon() {
  return {
    id: 25,
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

function respostaJson(dados: unknown): Response {
  return new Response(JSON.stringify(dados), { status: 200 });
}

describe("serviço da PokéAPI", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("valida e retorna os dados do Pokémon por nome", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(respostaJson(criarPokemon()));

    await expect(buscarPokemonPorNome("pikachu")).resolves.toMatchObject({
      id: 25,
      name: "pikachu",
    });
  });

  it("falha explicitamente quando a resposta do Pokémon é inválida", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      respostaJson({ id: 25, name: "pikachu" })
    );

    await expect(buscarPokemonPorNome("pikachu")).rejects.toThrow(
      "A PokéAPI retornou dados inválidos para o Pokémon"
    );
  });

  it("valida Pokémon e espécie ao buscar um Pokémon aleatório", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    vi.mocked(fetch)
      .mockResolvedValueOnce(respostaJson(criarPokemon()))
      .mockResolvedValueOnce(
        respostaJson({
          is_mythical: false,
          is_legendary: false,
          capture_rate: 45,
        })
      );

    await expect(buscarPokemonAleatorio()).resolves.toMatchObject({
      pokemon: { id: 25, name: "pikachu" },
      raridade: "Raro",
    });
  });

  it("falha explicitamente quando os dados da espécie são inválidos", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    vi.mocked(fetch)
      .mockResolvedValueOnce(respostaJson(criarPokemon()))
      .mockResolvedValueOnce(
        respostaJson({
          is_mythical: false,
          is_legendary: false,
          capture_rate: 300,
        })
      );

    await expect(buscarPokemonAleatorio()).rejects.toThrow(
      "A PokéAPI retornou dados inválidos para a espécie do Pokémon"
    );
  });
});
