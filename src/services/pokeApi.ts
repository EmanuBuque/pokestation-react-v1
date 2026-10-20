import { z } from "zod";
import {
  PokemonSchema,
  PokemonSpeciesSchema,
  type Pokemon,
  type PokemonRarity,
} from "../types/pokemon";
import { descobrirRaridade } from "../utils/rarity";

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
    const aleatorio = Math.floor(Math.random() * 1025) + 1;

    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${aleatorio}`);
    if (!resposta.ok) {
        throw new Error("Não foi possível buscar o Pokémon.");
    }
    const respostaPokemon: unknown = await resposta.json();
    const dados = validarResposta(PokemonSchema, respostaPokemon, "o Pokémon");

    const respostaSpecies = await fetch(dados.species.url);
    if (!respostaSpecies.ok) {
        throw new Error("Não foi possível carregar a espécie do Pokémon.");
    }
    const respostaEspecie: unknown = await respostaSpecies.json();
    const dadosSpecies = validarResposta(
      PokemonSpeciesSchema,
      respostaEspecie,
      "a espécie do Pokémon"
    );

    const raridade = descobrirRaridade(dadosSpecies);

    return { pokemon: dados, raridade };
}