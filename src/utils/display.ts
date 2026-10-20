import type { Pokemon, PokemonRarity } from "../types/pokemon";

export const nomesStatus = [
  "HP",
  "Ataque",
  "Defesa",
  "Ataque esp.",
  "Defesa esp.",
  "Velocidade",
] as const;

const rotulosRaridade: Record<PokemonRarity, string> = {
  Comum: "Comum",
  Incomum: "Incomum",
  Raro: "Raro",
  "épico": "Épico",
  Lendario: "Lendário",
  Mitico: "Mítico",
};

const variaveisRaridade: Record<PokemonRarity, string> = {
  Comum: "var(--rarity-comum)",
  Incomum: "var(--rarity-incomum)",
  Raro: "var(--rarity-raro)",
  "épico": "var(--rarity-epico)",
  Lendario: "var(--rarity-lendario)",
  Mitico: "var(--rarity-mitico)",
};

export function rotuloRaridade(raridade: PokemonRarity): string {
  return rotulosRaridade[raridade];
}

export function corRaridade(raridade: PokemonRarity): string {
  return variaveisRaridade[raridade];
}

export function numeroPokedex(id: number): string {
  return `#${String(id).padStart(4, "0")}`;
}

export function nomeExibicao(nome: string): string {
  return nome
    .split("-")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

export function arteOficial(pokemon: Pokemon): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
}

export function poderTotal(pokemon: Pokemon): number {
  return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
}
