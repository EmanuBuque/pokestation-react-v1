import { useState } from "react";
import type { Pokemon } from "../types/pokemon";

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

    const dados: unknown = JSON.parse(favoritosSalvos);

    if (Array.isArray(dados)) {
      return { favoritos: dados, erro: "" };
    }

    return { favoritos: [], erro: ERRO_CARREGAR };
  } catch {
    return { favoritos: [], erro: ERRO_CARREGAR };
  }
}

export function useFavorites() {
  const [estado, setEstado] = useState(carregarFavoritos);

  function adicionarFavorito(pokemonAtual: Pokemon | null) {
    if (!pokemonAtual) {
      return;
    }

    const jaExiste = estado.favoritos.some(
      (pokemon) => pokemon.id === pokemonAtual.id
    );

    if (jaExiste) {
      return;
    }

    const novosFavoritos = [...estado.favoritos, pokemonAtual];

    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novosFavoritos));
    } catch {
      setEstado((atual) => ({ ...atual, erro: ERRO_SALVAR }));
      return;
    }

    setEstado({ favoritos: novosFavoritos, erro: "" });
  }

  function removerFavorito(id: number) {
    const novosFavoritos = estado.favoritos.filter(
      (pokemon) => pokemon.id !== id
    );

    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novosFavoritos));
    } catch {
      setEstado((atual) => ({ ...atual, erro: ERRO_SALVAR }));
      return;
    }

    setEstado({ favoritos: novosFavoritos, erro: "" });
  }

  return {
    favoritos: estado.favoritos,
    erroFavoritos: estado.erro,
    adicionarFavorito,
    removerFavorito,
  };
}
