import { useState } from "react";
import { z } from "zod";
import { PokemonSchema, type Pokemon } from "../types/pokemon";

const CHAVE_FAVORITOS = "pokemon-favoritos";
const ERRO_CARREGAR = "Não foi possível carregar os Pokémon favoritos.";
const ERRO_SALVAR = "Não foi possível salvar os Pokémon favoritos.";

interface EstadoFavoritos {
  favoritos: Pokemon[];
  erro: string;
}

function carregarFavoritos(): EstadoFavoritos {
  try {
    const favoritosSalvos = localStorage.getItem(CHAVE_FAVORITOS);

    if (!favoritosSalvos) {
      return { favoritos: [], erro: "" };
    }

    // Confere se o que estava salvo ainda é uma lista de Pokémon válida
    const validacao = z.array(PokemonSchema).safeParse(JSON.parse(favoritosSalvos));

    if (validacao.success) {
      return { favoritos: validacao.data, erro: "" };
    }

    return { favoritos: [], erro: ERRO_CARREGAR };
  } catch {
    return { favoritos: [], erro: ERRO_CARREGAR };
  }
}

export function useFavorites() {
  const [estado, setEstado] = useState(carregarFavoritos);

  function salvarFavoritos(novosFavoritos: Pokemon[]) {
    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novosFavoritos));
      setEstado({ favoritos: novosFavoritos, erro: "" });
    } catch {
      setEstado({ favoritos: estado.favoritos, erro: ERRO_SALVAR });
    }
  }

  function adicionarFavorito(pokemonAtual: Pokemon) {
    const jaExiste = estado.favoritos.some(
      (pokemon) => pokemon.id === pokemonAtual.id
    );

    if (jaExiste) {
      return;
    }

    salvarFavoritos([...estado.favoritos, pokemonAtual]);
  }

  function removerFavorito(id: number) {
    salvarFavoritos(estado.favoritos.filter((pokemon) => pokemon.id !== id));
  }

  return {
    favoritos: estado.favoritos,
    erroFavoritos: estado.erro,
    adicionarFavorito,
    removerFavorito,
  };
}
