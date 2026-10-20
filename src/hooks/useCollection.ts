import { useState } from "react";
import {
    LIMITE_COLECAO,
    PokemonColecaoListaSchema,
    PokemonColecaoSchema,
    type PokemonColecao,
} from "../types/pokemon";
import { lerJSONLocalStorage, salvarJSONLocalStorage } from "../utils/localStorage";

const CHAVE_COLECAO = "colecao-salva";
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

    if (resultado.status === "success") {
        const validacao = PokemonColecaoListaSchema.safeParse(resultado.value);

        if (!validacao.success) {
            return { colecao: [], erro: ERRO_CARREGAR };
        }

        return { colecao: validacao.data, erro: "" };
    }

    return { colecao: [], erro: "" };
}

export function useCollection() {
    const [estado, setEstado] = useState(carregarColecao);

    function adicionarPokemon(novoPokemon: PokemonColecao): string | null {
        const pokemonValidado = PokemonColecaoSchema.safeParse(novoPokemon);

        if (!pokemonValidado.success) {
            setEstado((atual) => ({ ...atual, erro: ERRO_SALVAR }));
            return ERRO_SALVAR;
        }

        if (estado.colecao.length >= LIMITE_COLECAO) {
            return "Sua coleção está cheia!";
        }

        const jaTem = estado.colecao.some(
            (pokemon) => pokemon.id === pokemonValidado.data.id
        );

        if (jaTem) {
            return "Você já tem este Pokémon!";
        }

        const novaColecao = [...estado.colecao, pokemonValidado.data];

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
