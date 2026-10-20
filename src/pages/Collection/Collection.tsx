import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { LIMITE_COLECAO, PokemonRaritySchema } from "../../types/pokemon";
import { corRaridade, nomeExibicao, rotuloRaridade } from "../../utils/display";
import PageHeader from "../../components/PageHeader/PageHeader";
import RarityTag from "../../components/RarityTag/RarityTag";
import buttons from "../../styles/buttons.module.css";
import styles from "./Collection.module.css";

function Collection() {
    const {
        colecao,
        erroColecao,
        removerPokemon,
    } = useCollection();

    const vagas = Array.from({ length: LIMITE_COLECAO }, (_, indice) => colecao[indice]);

    // Da mais rara para a mais comum, só as raridades que aparecem na coleção
    const contagem = PokemonRaritySchema.options
        .map((raridade) => ({
            raridade,
            total: colecao.filter((pokemon) => pokemon.raridade === raridade).length,
        }))
        .filter((item) => item.total > 0);

    return (
        <div className={styles.collection}>
            <PageHeader
                titulo="Minha coleção"
                descricao={`Os Pokémon que você guardou no Colecionar. A caixa tem ${LIMITE_COLECAO} vagas.`}
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
                <ul className={styles.legend} aria-label="Pokémon por raridade">
                    {contagem.map(({ raridade, total }) => (
                        <li key={raridade} style={{ "--rarity": corRaridade(raridade) } as CSSProperties}>
                            {rotuloRaridade(raridade)} <strong>{total}</strong>
                        </li>
                    ))}
                </ul>
            )}

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

                {colecao.length > 0 && colecao.length < LIMITE_COLECAO && (
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
