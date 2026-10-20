import { describe, expect, it } from "vitest";
import type { Pokemon } from "../types/pokemon";
import { avaliarAtributo, calcularStatusEquipe } from "./teamBuilder";

const NOMES_ATRIBUTOS = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
] as const;

function criarPokemon(atributos: number[]): Pokemon {
  return {
    id: 1,
    name: "pokemon-teste",
    height: 10,
    weight: 100,
    base_experience: 50,
    species: { url: "" },
    sprites: { front_default: null },
    stats: atributos.map((base_stat, index) => ({
      base_stat,
      stat: { name: NOMES_ATRIBUTOS[index] },
    })),
    types: [],
  };
}

describe("calcularStatusEquipe", () => {
  it("retorna totais zero para uma equipe vazia", () => {
    expect(calcularStatusEquipe([])).toEqual({
      totalHP: 0,
      totalAtaque: 0,
      totalDefesa: 0,
      totalAtaqueEspecial: 0,
      totalDefesaEspecial: 0,
      totalVelocidade: 0,
      poderTotalEquipe: 0,
    });
  });

  it("soma os seis atributos de todos os Pokémon da equipe", () => {
    const resultado = calcularStatusEquipe([
      criarPokemon([150, 250, 300, 400, 500, 600]),
      criarPokemon([150, 300, 250, 100, 100, 50]),
    ]);

    expect(resultado).toEqual({
      totalHP: 300,
      totalAtaque: 550,
      totalDefesa: 550,
      totalAtaqueEspecial: 500,
      totalDefesaEspecial: 600,
      totalVelocidade: 650,
      poderTotalEquipe: 3150,
    });
  });
});

describe("avaliarAtributo", () => {
  it("considera fraco um time vazio", () => {
    expect(avaliarAtributo(0, 0)).toBe("fraco");
  });

  it.each([
    [299, "fraco"],
    [300, "mediano"],
    [550, "mediano"],
    [551, "forte"],
  ] as const)("com o time completo, classifica %i como %s", (total, esperado) => {
    expect(avaliarAtributo(total, 6)).toBe(esperado);
  });

  it("projeta a média de um time incompleto para 6 Pokémon", () => {
    // 2 Pokémon com 100 de média viram 600 num time de 6
    expect(avaliarAtributo(200, 2)).toBe("forte");
    // 3 Pokémon com 65 de média viram 390
    expect(avaliarAtributo(195, 3)).toBe("mediano");
  });
});
