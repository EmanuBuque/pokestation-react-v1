import { useState } from "react";
import {
  PokemonFavoritosSchema,
  PokemonSchema,
  type Pokemon,
} from "../types/pokemon";
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

  if (resultado.status === "error") {
    return { favoritos: [], erro: ERRO_CARREGAR };
  }

  const validacao = PokemonFavoritosSchema.safeParse(resultado.value);

  if (!validacao.success) {
    return { favoritos: [], erro: ERRO_CARREGAR };
  }

  return { favoritos: validacao.data, erro: "" };
}

export function useFavorites() {
  const [estado, setEstado] = useState(carregarFavoritos);

  function adicionarFavorito(pokemonAtual: Pokemon | null) {
    if (!pokemonAtual) {
      return;
    }

    const pokemonValidado = PokemonSchema.safeParse(pokemonAtual);

    if (!pokemonValidado.success) {
      setEstado((atual) => ({ ...atual, erro: ERRO_SALVAR }));
      return;
    }

    const jaExiste = estado.favoritos.some(
      (pokemon) => pokemon.id === pokemonValidado.data.id
    );

    if (jaExiste) {
      return;
    }

    const novosFavoritos = [...estado.favoritos, pokemonValidado.data];

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
