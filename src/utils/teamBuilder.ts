import type { Pokemon } from "../types/pokemon";

export type NivelStatus = "fraco" | "mediano" | "forte";

export const TAMANHO_EQUIPE = 6;

export interface StatusEquipe {
  totalHP: number;
  totalAtaque: number;
  totalDefesa: number;
  totalAtaqueEspecial: number;
  totalDefesaEspecial: number;
  totalVelocidade: number;
  poderTotalEquipe: number;
}

// Soma um atributo de todos os Pokémon do time.
// O índice segue a ordem da PokéAPI: 0 HP, 1 Ataque, 2 Defesa,
// 3 Ataque especial, 4 Defesa especial, 5 Velocidade.
function somarAtributo(equipe: Pokemon[], indice: number): number {
  return equipe.reduce((total, pokemon) => total + pokemon.stats[indice].base_stat, 0);
}

export function calcularStatusEquipe(equipe: Pokemon[]): StatusEquipe {
  const totalHP = somarAtributo(equipe, 0);
  const totalAtaque = somarAtributo(equipe, 1);
  const totalDefesa = somarAtributo(equipe, 2);
  const totalAtaqueEspecial = somarAtributo(equipe, 3);
  const totalDefesaEspecial = somarAtributo(equipe, 4);
  const totalVelocidade = somarAtributo(equipe, 5);

  return {
    totalHP,
    totalAtaque,
    totalDefesa,
    totalAtaqueEspecial,
    totalDefesaEspecial,
    totalVelocidade,
    poderTotalEquipe:
      totalHP +
      totalAtaque +
      totalDefesa +
      totalAtaqueEspecial +
      totalDefesaEspecial +
      totalVelocidade,
  };
}

// Avalia um atributo do time como se ele já estivesse completo.
// Exemplo: 2 Pokémon somando 200 de HP têm média 100;
// num time de 6 isso daria 600, que é "forte".
// Assim um time incompleto não aparece como "fraco" só por ter poucos Pokémon.
export function avaliarAtributo(total: number, quantidadeNoTime: number): NivelStatus {
  if (quantidadeNoTime === 0) {
    return "fraco";
  }

  const totalComTimeCompleto = (total / quantidadeNoTime) * TAMANHO_EQUIPE;

  if (totalComTimeCompleto < 300) {
    return "fraco";
  }

  if (totalComTimeCompleto <= 550) {
    return "mediano";
  }

  return "forte";
}
