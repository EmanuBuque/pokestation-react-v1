import type { Pokemon } from "../types/pokemon";

export const TAMANHO_EQUIPE = 6;

// Soma cada atributo de todos os Pokémon do time.
// A PokéAPI sempre manda os atributos nesta ordem:
// 0 HP, 1 Ataque, 2 Defesa, 3 Ataque especial, 4 Defesa especial, 5 Velocidade.
// Exemplo de retorno: [300, 250, 280, 200, 220, 310]
export function somarAtributos(equipe: Pokemon[]): number[] {
  const totais = [0, 0, 0, 0, 0, 0];

  for (const pokemon of equipe) {
    pokemon.stats.forEach((stat, indice) => {
      totais[indice] += stat.base_stat;
    });
  }

  return totais;
}

// Avalia um atributo do time como se ele já estivesse completo.
// Exemplo: 2 Pokémon somando 200 de HP têm média 100;
// num time de 6 isso daria 600, que é "Forte".
// Assim um time incompleto não aparece como "Fraco" só por ter poucos Pokémon.
export function avaliarAtributo(total: number, quantidadeNoTime: number): string {
  if (quantidadeNoTime === 0) {
    return "Fraco";
  }

  const totalComTimeCompleto = (total / quantidadeNoTime) * TAMANHO_EQUIPE;

  if (totalComTimeCompleto < 300) {
    return "Fraco";
  }

  if (totalComTimeCompleto <= 550) {
    return "Mediano";
  }

  return "Forte";
}
