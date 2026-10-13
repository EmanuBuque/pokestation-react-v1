import type { Pokemon } from "../types/pokemon";

type NivelStatus = "fraco" | "mediano" | "forte";

export interface StatusEquipe {
  totalHP: number;
  totalAtaque: number;
  totalDefesa: number;
  totalAtaqueEspecial: number;
  totalDefesaEspecial: number;
  totalVelocidade: number;
  poderTotalEquipe: number;
  statusHP: NivelStatus;
  statusAtaque: NivelStatus;
  statusDefesa: NivelStatus;
  statusAtaqueEspecial: NivelStatus;
  statusDefesaEspecial: NivelStatus;
  statusVelocidade: NivelStatus;
  statusGeral: NivelStatus;
}

function classificarStatus(valor: number): NivelStatus {
  if (valor < 300) {
    return "fraco";
  }

  if (valor <= 550) {
    return "mediano";
  }

  return "forte";
}

function classificarPoderTotal(valor: number): NivelStatus {
  if (valor < 1500) {
    return "fraco";
  }

  if (valor <= 2500) {
    return "mediano";
  }

  return "forte";
}

export function calcularStatusEquipe(equipe: Pokemon[]): StatusEquipe {
  const totalHP = equipe.reduce(
    (total, pokemon) => total + pokemon.stats[0].base_stat,
    0
  );
  const totalAtaque = equipe.reduce(
    (total, pokemon) => total + pokemon.stats[1].base_stat,
    0
  );
  const totalDefesa = equipe.reduce(
    (total, pokemon) => total + pokemon.stats[2].base_stat,
    0
  );
  const totalAtaqueEspecial = equipe.reduce(
    (total, pokemon) => total + pokemon.stats[3].base_stat,
    0
  );
  const totalDefesaEspecial = equipe.reduce(
    (total, pokemon) => total + pokemon.stats[4].base_stat,
    0
  );
  const totalVelocidade = equipe.reduce(
    (total, pokemon) => total + pokemon.stats[5].base_stat,
    0
  );

  const poderTotalEquipe =
    totalHP +
    totalAtaque +
    totalDefesa +
    totalAtaqueEspecial +
    totalDefesaEspecial +
    totalVelocidade;

  return {
    totalHP,
    totalAtaque,
    totalDefesa,
    totalAtaqueEspecial,
    totalDefesaEspecial,
    totalVelocidade,
    poderTotalEquipe,
    statusHP: classificarStatus(totalHP),
    statusAtaque: classificarStatus(totalAtaque),
    statusDefesa: classificarStatus(totalDefesa),
    statusAtaqueEspecial: classificarStatus(totalAtaqueEspecial),
    statusDefesaEspecial: classificarStatus(totalDefesaEspecial),
    statusVelocidade: classificarStatus(totalVelocidade),
    statusGeral: classificarPoderTotal(poderTotalEquipe),
  };
}