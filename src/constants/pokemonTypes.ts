import type { PokemonTypeName } from "../types/pokemon";

export const nomesTipos: Record<PokemonTypeName, string> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Grama",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terrestre",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
};

// Tons escurecidos das cores oficiais, para texto branco legível em cima
export const coresTipos: Record<PokemonTypeName, string> = {
  normal: "#7a7962",
  fire: "#c94f1f",
  water: "#3168c4",
  electric: "#957200",
  grass: "#3b7f2f",
  ice: "#2f7e81",
  fighting: "#a01f23",
  poison: "#7f3282",
  ground: "#8a6827",
  flying: "#6c55b5",
  psychic: "#bb2f61",
  bug: "#687810",
  rock: "#776723",
  ghost: "#563f78",
  dragon: "#5024c2",
  dark: "#4d3d33",
  steel: "#61617c",
  fairy: "#a04a77",
};
