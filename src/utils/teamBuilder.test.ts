import { describe, expect, it } from "vitest";
import type { Pokemon } from "../types/pokemon";
import { avaliarAtributo, somarAtributos } from "./teamBuilder";

// Cria um Pokémon de mentira só com os status, que é o que importa aqui
function criarPokemon(status: number[]): Pokemon {
  return {
    id: 1,
    name: "teste",
    height: 1,
    weight: 1,
    base_experience: 1,
    species: { url: "" },
    sprites: { front_default: null },
    stats: status.map((valor) => ({ base_stat: valor, stat: { name: "" } })),
    types: [],
  };
}

describe("somarAtributos", () => {
  it("soma cada status de todos os Pokémon do time", () => {
    const time = [criarPokemon([10, 20, 30, 40, 50, 60]), criarPokemon([1, 2, 3, 4, 5, 6])];

    expect(somarAtributos(time)).toEqual([11, 22, 33, 44, 55, 66]);
  });

  it("retorna tudo zero com o time vazio", () => {
    expect(somarAtributos([])).toEqual([0, 0, 0, 0, 0, 0]);
  });
});

describe("avaliarAtributo", () => {
  it("avalia como se o time estivesse completo", () => {
    expect(avaliarAtributo(40, 1)).toBe("Fraco"); // 40 * 6 = 240
    expect(avaliarAtributo(80, 1)).toBe("Mediano"); // 80 * 6 = 480
    expect(avaliarAtributo(200, 2)).toBe("Forte"); // 100 * 6 = 600
  });

  it("retorna Fraco com o time vazio", () => {
    expect(avaliarAtributo(0, 0)).toBe("Fraco");
  });
});
