import { useState } from "react";
import type { Pokemon } from "../types/pokemon";
import { lerJSONLocalStorage, salvarJSONLocalStorage } from "../utils/localStorage";

const CHAVE_FAVORITOS = "pokemon-favoritos";
const ERRO_CARREGAR = "Não foi possível carregar os Pokémon favoritos.";
const ERRO_SALVAR = "Não foi possível salvar os Pokémon favoritos.";

interface EstadoFavoritos {
  favoritos: Pokemon[];
  erro: string;
}

function carregarFavoritos(): EstadoFavoritos {
  const resultado = lerJSONLocalStorage(CHAVE_FAVORITOS);

  if (resultado.status === "missing") {
    return { favoritos: [], erro: "" };
  }

  if (
    resultado.status === "error" ||
    !Array.isArray(resultado.value)
  ) {
    return { favoritos: [], erro: ERRO_CARREGAR };
  }

  return { favoritos: resultado.value, erro: "" };
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

    if (!salvarJSONLocalStorage(CHAVE_FAVORITOS, novosFavoritos)) {
      setEstado((atual) => ({ ...atual, erro: ERRO_SALVAR }));
      return;
    }

    setEstado({ favoritos: novosFavoritos, erro: "" });
  }

  function removerFavorito(id: number) {
    const novosFavoritos = estado.favoritos.filter(
      (pokemon) => pokemon.id !== id
    );

    if (!salvarJSONLocalStorage(CHAVE_FAVORITOS, novosFavoritos)) {
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
