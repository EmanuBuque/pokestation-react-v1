import { useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { LIMITE_COLECAO, PokemonRaritySchema, type PokemonRarity } from "../../types/pokemon";
import { corRaridade, nomeExibicao, rotuloRaridade } from "../../utils/display";
import PageHeader from "../../components/PageHeader/PageHeader";
import RarityTag from "../../components/RarityTag/RarityTag";
import buttons from "../../styles/buttons.module.css";
import styles from "./Collection.module.css";

type FiltroRaridade = PokemonRarity | "todos";

function Collection() {
    const {
        colecao,
        erroColecao,
        removerPokemon,
    } = useCollection();

    const [filtro, setFiltro] = useState<FiltroRaridade>("todos");

    // Da mais rara para a mais comum, só as raridades que aparecem na coleção
    const contagem = PokemonRaritySchema.options
        .map((raridade) => ({
            raridade,
            total: colecao.filter((pokemon) => pokemon.raridade === raridade).length,
        }))
        .filter((item) => item.total > 0);

    // Se o último Pokémon da raridade filtrada for removido, volta para "Todos"
    const filtroAtivo: FiltroRaridade = contagem.some((item) => item.raridade === filtro)
        ? filtro
        : "todos";

    // Com filtro, a caixa mostra só os Pokémon daquela raridade, sem as vagas vazias
    const vagas = filtroAtivo === "todos"
        ? Array.from({ length: LIMITE_COLECAO }, (_, indice) => colecao[indice])
        : colecao.filter((pokemon) => pokemon.raridade === filtroAtivo);

    return (
        <div className={styles.collection}>
            <PageHeader
                titulo="Minha coleção"
            >
                <p className={styles.counter}>
                    <strong>{colecao.length}</strong> / {LIMITE_COLECAO}
                </p>
            </PageHeader>

            {erroColecao && (
                <p className={styles.error} role="alert">
                    {erroColecao}
                </p>
            )}

            {contagem.length > 0 && (
                <div className={styles.filters} role="group" aria-label="Filtrar por raridade">
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
                            style={{ "--rarity": corRaridade(raridade) } as CSSProperties}
                            aria-pressed={filtroAtivo === raridade}
                            onClick={() => setFiltro(raridade)}
                        >
                            {rotuloRaridade(raridade)} <strong>{total}</strong>
                        </button>
                    ))}
                </div>
            )}

            {/* Só para leitores de tela: os botões já mostram as contagens na tela */}
            <p className="visually-hidden" role="status">
                {filtroAtivo !== "todos" && `Mostrando ${vagas.length} de ${colecao.length} Pokémon.`}
            </p>

            <div className={styles.boxWrap}>
                <ol className={styles.box} aria-label="Caixa da coleção">
                    {vagas.map((pokemon, indice) =>
                        pokemon ? (
                            <li
                                key={pokemon.id}
                                className={[
                                    styles.slot,
                                    pokemon.raridade === "Lendario" && styles.slotLendario,
                                    pokemon.raridade === "Mitico" && styles.slotMitico,
                                ].filter(Boolean).join(" ")}
                                style={{ "--rarity": corRaridade(pokemon.raridade) } as CSSProperties}
                            >
                                {pokemon.sprite ? (
                                    <img src={pokemon.sprite} alt="" />
                                ) : (
                                    <span className={styles.noSprite}>Sem imagem</span>
                                )}
                                <h2 className={styles.name}>{nomeExibicao(pokemon.name)}</h2>
                                <RarityTag raridade={pokemon.raridade} variante="texto" />
                                <button
                                    type="button"
                                    className={buttons.quiet}
                                    onClick={() => removerPokemon(pokemon.id)}
                                    aria-label={`Remover ${nomeExibicao(pokemon.name)} da coleção`}
                                >
                                    Remover
                                </button>
                            </li>
                        ) : (
                            <li key={`vaga-${indice}`} className={`${styles.slot} ${styles.empty}`}>
                                <span className="visually-hidden">Vaga livre</span>
                            </li>
                        )
                    )}
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
