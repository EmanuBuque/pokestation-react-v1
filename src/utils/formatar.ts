import type { Pokemon, PokemonRarity } from "../types/pokemon";

export const nomesStatus = [
  "HP",
  "Ataque",
  "Defesa",
  "Ataque esp.",
  "Defesa esp.",
  "Velocidade",
] as const;

const nomesRaridade: Record<PokemonRarity, string> = {
  Comum: "Comum",
  Incomum: "Incomum",
  Raro: "Raro",
  "épico": "Épico",
  Lendario: "Lendário",
  Mitico: "Mítico",
};

const coresRaridade: Record<PokemonRarity, string> = {
  Comum: "var(--rarity-comum)",
  Incomum: "var(--rarity-incomum)",
  Raro: "var(--rarity-raro)",
  "épico": "var(--rarity-epico)",
  Lendario: "var(--rarity-lendario)",
  Mitico: "var(--rarity-mitico)",
};

export function pegarNomeRaridade(raridade: PokemonRarity): string {
  return nomesRaridade[raridade];
}

export function pegarCorRaridade(raridade: PokemonRarity): string {
  return coresRaridade[raridade];
}

// 25 vira "#0025"
export function formatarNumero(id: number): string {
  return `#${String(id).padStart(4, "0")}`;
}

// "mr-mime" vira "Mr Mime"
export function formatarNome(nome: string): string {
  return nome
    .split("-")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

// Imagem grande (arte oficial) do Pokémon, pelo número da Pokédex
export function imagemGrande(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function somarStatus(pokemon: Pokemon): number {
  return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
}
