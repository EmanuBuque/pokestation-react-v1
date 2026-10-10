import { useState } from "react";
import type { PokemonColecao } from "../types/pokemon";

const CHAVE_COLECAO = "colecao-salva";
const LIMITE_COLECAO = 25;
const ERRO_CARREGAR = "Não foi possível carregar a coleção.";
const ERRO_SALVAR = "Não foi possível salvar a coleção.";

interface EstadoColecao {
    colecao: PokemonColecao[];
    erro: string;
}

function carregarColecao(): EstadoColecao {
    try {
        const colecaoSalva = localStorage.getItem(CHAVE_COLECAO);

        if (colecaoSalva) {
            const dados: unknown = JSON.parse(colecaoSalva);

            if (Array.isArray(dados)) {
                return { colecao: dados, erro: "" };
            }
        }

        return { colecao: [], erro: "" };
    } catch {
        return { colecao: [], erro: ERRO_CARREGAR };
    }
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

        try {
            localStorage.setItem(CHAVE_COLECAO, JSON.stringify(novaColecao));
        } catch {
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

        try {
            localStorage.setItem(CHAVE_COLECAO, JSON.stringify(novaColecao));
        } catch {
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
