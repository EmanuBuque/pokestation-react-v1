import type { Pokemon, PokemonSpecies } from "../types/pokemon";
import { descobrirRaridade } from "../utils/rarity";

export async function buscarPokemonPorNome(nome: string): Promise<Pokemon> {
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

  if (!resposta.ok) {
    throw new Error("Pokémon não encontrado!");
  }

  const dados: Pokemon = await resposta.json();
  return dados;
}

export async function buscarPokemonAleatorio(): Promise<{ pokemon: Pokemon; raridade: string }> {
    const aleatorio = Math.floor(Math.random() * 1025) + 1;

    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${aleatorio}`);
    if (!resposta.ok) {
        throw new Error("Não foi possível buscar o Pokémon.");
    }
    const dados: Pokemon = await resposta.json();

    const respostaSpecies = await fetch(dados.species.url);
    if (!respostaSpecies.ok) {
        throw new Error("Não foi possível carregar a espécie do Pokémon.");
    }
    const dadosSpecies: PokemonSpecies = await respostaSpecies.json();

    const raridade = descobrirRaridade(dadosSpecies);

    return { pokemon: dados, raridade };
}