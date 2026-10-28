import { useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { LIMITE_COLECAO, useCollection } from "../../hooks/useCollection";
import { PokemonRaritySchema, type PokemonColecao, type PokemonRarity } from "../../types/pokemon";
import { pegarCorRaridade, formatarNome, pegarNomeRaridade } from "../../utils/formatar";
import PageHeader from "../../components/PageHeader/PageHeader";
import RarityTag from "../../components/RarityTag/RarityTag";
import buttons from "../../styles/buttons.module.css";
import styles from "./Collection.module.css";

function Collection() {
    const { colecao, erroColecao, removerPokemon } = useCollection();

    // "todos" ou uma raridade, ex: "Raro"
    const [filtro, setFiltro] = useState<PokemonRarity | "todos">("todos");

    // Quantos Pokémon de cada raridade existem na coleção (só as que tem pelo menos 1)
    const contagem: { raridade: PokemonRarity; total: number }[] = [];
    for (const raridade of PokemonRaritySchema.options) {
        const total = colecao.filter((pokemon) => pokemon.raridade === raridade).length;
        if (total > 0) {
            contagem.push({ raridade, total });
        }
    }

    // Se o último Pokémon da raridade filtrada for removido, volta para "Todos"
    let filtroAtivo = filtro;
    if (!contagem.some((item) => item.raridade === filtro)) {
        filtroAtivo = "todos";
    }

    // Sem filtro: mostra as 25 vagas (as vazias ficam "undefined").
    // Com filtro: mostra só os Pokémon daquela raridade.
    let vagas: (PokemonColecao | undefined)[] = [];
    if (filtroAtivo === "todos") {
        for (let i = 0; i < LIMITE_COLECAO; i++) {
            vagas.push(colecao[i]);
        }
    } else {
        vagas = colecao.filter((pokemon) => pokemon.raridade === filtroAtivo);
    }

    return (
        <div className={styles.collection}>
            <PageHeader titulo="Minha coleção">
                <p className={styles.counter}>
                    <strong>{colecao.length}</strong> / {LIMITE_COLECAO}
                </p>
            </PageHeader>

            {erroColecao && <p className={styles.error}>{erroColecao}</p>}

            {contagem.length > 0 && (
                <div className={styles.filters}>
                    <button
                        type="button"
                        className={styles.filter}
                        aria-pressed={filtroAtivo === "todos"}
                        onClick={() => setFiltro("todos")}
                    >
                        Todos <strong>{colecao.length}</strong>
                    </button>

                    {contagem.map(({ raridade, total }) => (
                        <button
                            key={raridade}
                            type="button"
                            className={`${styles.filter} ${styles.filterRarity}`}
                            style={{ "--rarity": pegarCorRaridade(raridade) } as CSSProperties}
                            aria-pressed={filtroAtivo === raridade}
                            onClick={() => setFiltro(raridade)}
                        >
                            {pegarNomeRaridade(raridade)} <strong>{total}</strong>
                        </button>
                    ))}
                </div>
            )}

            <div className={styles.boxWrap}>
                <ol className={styles.box}>
                    {vagas.map((pokemon, indice) => {
                        if (!pokemon) {
                            return <li key={`vaga-${indice}`} className={`${styles.slot} ${styles.empty}`} />;
                        }

                        let classeVaga = styles.slot;
                        if (pokemon.raridade === "Lendario") {
                            classeVaga += " " + styles.slotLendario;
                        }
                        if (pokemon.raridade === "Mitico") {
                            classeVaga += " " + styles.slotMitico;
                        }

                        return (
                            <li
                                key={pokemon.id}
                                className={classeVaga}
                                style={{ "--rarity": pegarCorRaridade(pokemon.raridade) } as CSSProperties}
                            >
                                {pokemon.sprite ? (
                                    <img src={pokemon.sprite} alt={pokemon.name} />
                                ) : (
                                    <span className={styles.noSprite}>Sem imagem</span>
                                )}
                                <h2 className={styles.name}>{formatarNome(pokemon.name)}</h2>
                                <RarityTag raridade={pokemon.raridade} variante="texto" />
                                <button
                                    type="button"
                                    className={buttons.quiet}
                                    onClick={() => removerPokemon(pokemon.id)}
                                >
                                    Remover
                                </button>
                            </li>
                        );
                    })}
                </ol>

                {filtroAtivo === "todos" && colecao.length > 0 && colecao.length < LIMITE_COLECAO && (
                    <p className={styles.freeSlots}>
                        {LIMITE_COLECAO - colecao.length} vagas livres
                    </p>
                )}

                {colecao.length === 0 && (
                    <div className={styles.emptyState}>
                        <h2>A caixa está vazia</h2>
                        <p>Procure Pokémon no Colecionar e guarde os que quiser manter.</p>
                        <Link to="/collector" className={buttons.primary}>
                            Ir para o Colecionar
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Collection;
