import { z } from "zod";
import {
  PokemonSchema,
  PokemonSpeciesSchema,
  type Pokemon,
  type PokemonRarity,
} from "../types/pokemon";
import { descobrirRaridade } from "../utils/rarity";

// Quantidade de Pokémon na Pokédex nacional (até a 9ª geração)
const TOTAL_POKEMON = 1025;

function validarResposta<T>(
  schema: z.ZodType<T>,
  dados: unknown,
  recurso: string
): T {
  const resultado = schema.safeParse(dados);

  if (!resultado.success) {
    const camposInvalidos = resultado.error.issues
      .map((issue) => issue.path.join("."))
      .join(", ");
    throw new Error(
      `A PokéAPI retornou dados inválidos para ${recurso}: ${camposInvalidos}.`
    );
  }

  return resultado.data;
}

export async function buscarPokemonPorNome(nome: string): Promise<Pokemon> {
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

  if (!resposta.ok) {
    throw new Error("Pokémon não encontrado!");
  }

  const dados: unknown = await resposta.json();
  return validarResposta(PokemonSchema, dados, "o Pokémon");
}

export async function buscarPokemonAleatorio(): Promise<{
  pokemon: Pokemon;
  raridade: PokemonRarity;
}> {
  const numeroAleatorio = Math.floor(Math.random() * TOTAL_POKEMON) + 1;

  // 1º pedido: os dados do Pokémon (nome, sprite, atributos)
  const respostaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`);
  if (!respostaPokemon.ok) {
    throw new Error("Não foi possível buscar o Pokémon.");
  }
  const jsonPokemon: unknown = await respostaPokemon.json();
  const pokemon = validarResposta(PokemonSchema, jsonPokemon, "o Pokémon");

  // 2º pedido: a espécie, que diz se ele é lendário, mítico e quão difícil é capturar
  const respostaEspecie = await fetch(pokemon.species.url);
  if (!respostaEspecie.ok) {
    throw new Error("Não foi possível carregar a espécie do Pokémon.");
  }
  const jsonEspecie: unknown = await respostaEspecie.json();
  const especie = validarResposta(PokemonSpeciesSchema, jsonEspecie, "a espécie do Pokémon");

  return { pokemon, raridade: descobrirRaridade(especie) };
}