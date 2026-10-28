import {
  PokemonSchema,
  PokemonSpeciesSchema,
  type Pokemon,
  type PokemonRarity,
} from "../types/pokemon";
import { descobrirRaridade } from "../utils/rarity";

// Quantidade de Pokémon na Pokédex nacional (até a 9ª geração)
const TOTAL_POKEMON = 1025;

export async function buscarPokemonPorNome(nome: string): Promise<Pokemon> {
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

  if (!resposta.ok) {
    throw new Error("Pokémon não encontrado!");
  }

  const dados = await resposta.json();
  const validacao = PokemonSchema.safeParse(dados);

  if (!validacao.success) {
    throw new Error("A PokéAPI mandou dados inválidos.");
  }

  return validacao.data;
}

export async function buscarPokemonAleatorio(): Promise<{
  pokemon: Pokemon;
  raridade: PokemonRarity;
}> {
  const numeroAleatorio = Math.floor(Math.random() * TOTAL_POKEMON) + 1;

  // 1º pedido: os dados do Pokémon (nome, sprite, status)
  const pokemon = await buscarPokemonPorNome(String(numeroAleatorio));

  // 2º pedido: a espécie, que diz se ele é lendário, mítico e quão difícil é capturar
  const respostaEspecie = await fetch(pokemon.species.url);
  if (!respostaEspecie.ok) {
    throw new Error("Não foi possível carregar a espécie do Pokémon.");
  }

  const dadosEspecie = await respostaEspecie.json();
  const validacao = PokemonSpeciesSchema.safeParse(dadosEspecie);

  if (!validacao.success) {
    throw new Error("A PokéAPI mandou dados inválidos.");
  }

  return { pokemon, raridade: descobrirRaridade(validacao.data) };
}
