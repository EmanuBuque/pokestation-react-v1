import { describe, expect, it } from "vitest";
import type { Pokemon } from "../types/pokemon";
import { calcularStatusEquipe } from "./teamBuilder";

const NOMES_ATRIBUTOS = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

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
  it("retorna totais zero e status fraco para uma equipe vazia", () => {
    expect(calcularStatusEquipe([])).toEqual({
      totalHP: 0,
      totalAtaque: 0,
      totalDefesa: 0,
      totalAtaqueEspecial: 0,
      totalDefesaEspecial: 0,
      totalVelocidade: 0,
      poderTotalEquipe: 0,
      statusHP: "fraco",
      statusAtaque: "fraco",
      statusDefesa: "fraco",
      statusAtaqueEspecial: "fraco",
      statusDefesaEspecial: "fraco",
      statusVelocidade: "fraco",
      statusGeral: "fraco",
    });
  });

  it("soma os seis atributos de todos os Pokémon da equipe", () => {
    const resultado = calcularStatusEquipe([
      criarPokemon([150, 250, 300, 400, 500, 600]),
      criarPokemon([150, 300, 250, 100, 100, 50]),
    ]);

    expect(resultado).toMatchObject({
      totalHP: 300,
      totalAtaque: 550,
      totalDefesa: 550,
      totalAtaqueEspecial: 500,
      totalDefesaEspecial: 600,
      totalVelocidade: 650,
      poderTotalEquipe: 3150,
    });
  });

  it.each([
    [299, "fraco"],
    [300, "mediano"],
    [550, "mediano"],
    [551, "forte"],
  ] as const)("classifica HP de %i como %s", (hp, statusEsperado) => {
    const resultado = calcularStatusEquipe([
      criarPokemon([hp, 0, 0, 0, 0, 0]),
    ]);

    expect(resultado.statusHP).toBe(statusEsperado);
  });

  it.each([
    [1499, "fraco"],
    [1500, "mediano"],
    [2500, "mediano"],
    [2501, "forte"],
  ] as const)(
    "classifica poder total de %i como %s",
    (poderTotal, statusEsperado) => {
      const atributos = [poderTotal, 0, 0, 0, 0, 0];
      const resultado = calcularStatusEquipe([criarPokemon(atributos)]);

      expect(resultado.statusGeral).toBe(statusEsperado);
    }
  );
});
