import { useState } from "react";
import { z } from "zod";
import { PokemonColecaoSchema, type PokemonColecao } from "../types/pokemon";

export const LIMITE_COLECAO = 25;

const CHAVE_COLECAO = "colecao-salva";
const ERRO_CARREGAR = "Não foi possível carregar a coleção.";
const ERRO_SALVAR = "Não foi possível salvar a coleção.";

interface EstadoColecao {
    colecao: PokemonColecao[];
    erro: string;
}

function carregarColecao(): EstadoColecao {
    try {
        const colecaoSalva = localStorage.getItem(CHAVE_COLECAO);

        if (!colecaoSalva) {
            return { colecao: [], erro: "" };
        }

        // Confere se o que estava salvo ainda é uma coleção válida
        const validacao = z.array(PokemonColecaoSchema).safeParse(JSON.parse(colecaoSalva));

        if (validacao.success) {
            return { colecao: validacao.data, erro: "" };
        }

        return { colecao: [], erro: ERRO_CARREGAR };
    } catch {
        return { colecao: [], erro: ERRO_CARREGAR };
    }
}

export function useCollection() {
    const [estado, setEstado] = useState(carregarColecao);

    // Retorna true se conseguiu salvar no localStorage
    function salvarColecao(novaColecao: PokemonColecao[]): boolean {
        try {
            localStorage.setItem(CHAVE_COLECAO, JSON.stringify(novaColecao));
            setEstado({ colecao: novaColecao, erro: "" });
            return true;
        } catch {
            setEstado({ colecao: estado.colecao, erro: ERRO_SALVAR });
            return false;
        }
    }

    // Retorna uma mensagem de erro, ou null se deu tudo certo
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

        if (!salvarColecao([...estado.colecao, novoPokemon])) {
            return ERRO_SALVAR;
        }

        return null;
    }

    function removerPokemon(id: number) {
        salvarColecao(estado.colecao.filter((pokemon) => pokemon.id !== id));
    }

    return {
        colecao: estado.colecao,
        erroColecao: estado.erro,
        adicionarPokemon,
        removerPokemon,
    };
}
