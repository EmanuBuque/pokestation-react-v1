import { useState } from "react";
import type { PokemonColecao } from "../types/pokemon";
import { lerJSONLocalStorage, salvarJSONLocalStorage } from "../utils/localStorage";

const CHAVE_COLECAO = "colecao-salva";
const LIMITE_COLECAO = 25;
const ERRO_CARREGAR = "Não foi possível carregar a coleção.";
const ERRO_SALVAR = "Não foi possível salvar a coleção.";

interface EstadoColecao {
    colecao: PokemonColecao[];
    erro: string;
}

function carregarColecao(): EstadoColecao {
    const resultado = lerJSONLocalStorage(CHAVE_COLECAO);

    if (resultado.status === "error") {
        return { colecao: [], erro: ERRO_CARREGAR };
    }

    if (resultado.status === "success" && Array.isArray(resultado.value)) {
        return { colecao: resultado.value, erro: "" };
    }

    return { colecao: [], erro: "" };
}

export function useCollection() {
    const [estado, setEstado] = useState(carregarColecao);

    function adicionarPokemon(novoPokemon: PokemonColecao): string | null {
        if (estado.colecao.length >= LIMITE_COLECAO) {
            return "Sua coleção está cheia!";
        }

        const jaTem = estado.colecao.some(
            (pokemon) => pokemon.id === novoPokemon.id
        );

        if (jaTem) {
            return "Você já tem este Pokémon!";
        }

        const novaColecao = [...estado.colecao, novoPokemon];

        if (!salvarJSONLocalStorage(CHAVE_COLECAO, novaColecao)) {
            setEstado((atual) => ({ ...atual, erro: ERRO_SALVAR }));
            return ERRO_SALVAR;
        }

        setEstado({ colecao: novaColecao, erro: "" });
        return null;
    }

    function removerPokemon(id: number): void {
        const novaColecao = estado.colecao.filter(
            (pokemon) => pokemon.id !== id
        );

        if (!salvarJSONLocalStorage(CHAVE_COLECAO, novaColecao)) {
            setEstado((atual) => ({ ...atual, erro: ERRO_SALVAR }));
            return;
        }

        setEstado({ colecao: novaColecao, erro: "" });
    }

    return {
        colecao: estado.colecao,
        erroColecao: estado.erro,
        adicionarPokemon,
        removerPokemon,
    };
}
