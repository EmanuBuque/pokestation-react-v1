import { useState } from "react";
import type { Pokemon } from "../../types/pokemon";
import { buscarPokemonPorNome } from "../../services/pokeApi";
import { TAMANHO_EQUIPE, avaliarAtributo, somarAtributos } from "../../utils/teamBuilder";
import { formatarNome, somarStatus } from "../../utils/formatar";
import PageHeader from "../../components/PageHeader/PageHeader";
import SearchForm from "../../components/SearchForm/SearchForm";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import StatBars from "../../components/StatBars/StatBars";
import TypeBadge from "../../components/TypeBadge/TypeBadge";
import buttons from "../../styles/buttons.module.css";
import styles from "./TeamBuilder.module.css";

function TeamBuilder() {
    const [nomePokemon, setNomePokemon] = useState("");
    const [pokemonAtual, setPokemonAtual] = useState<Pokemon | null>(null);
    const [equipe, setEquipe] = useState<Pokemon[]>([]);
    const [mensagemErro, setMensagemErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function buscarPokemon() {
        const nome = nomePokemon.trim().toLowerCase().replaceAll(" ", "-");

        if (!nome) {
            setMensagemErro("Digite o nome ou número de um Pokémon.");
            return;
        }

        setMensagemErro("");
        setCarregando(true);

        try {
            const pokemon = await buscarPokemonPorNome(nome);
            setPokemonAtual(pokemon);
        } catch (erro) {
            if (erro instanceof Error) {
                setMensagemErro(erro.message);
            } else {
                setMensagemErro("Ocorreu um erro ao buscar o Pokémon.");
            }
        } finally {
            setCarregando(false);
        }
    }

    function adicionarPokemon() {
        if (!pokemonAtual) {
            return;
        }

        setMensagemErro("");
        setEquipe([...equipe, pokemonAtual]);
        setPokemonAtual(null);
        setNomePokemon("");
    }

    function removerPokemon(id: number) {
        setMensagemErro("");
        setEquipe(equipe.filter((pokemon) => pokemon.id !== id));
    }

    const totais = somarAtributos(equipe);
    const niveis = totais.map((total) => avaliarAtributo(total, equipe.length));

    let poderTotalEquipe = 0;
    for (const total of totais) {
        poderTotalEquipe += total;
    }
    const mediaPoder = equipe.length > 0 ? Math.round(poderTotalEquipe / equipe.length) : 0;

    // Sempre 6 vagas: as que não têm Pokémon ficam "undefined" e aparecem vazias
    const vagas: (Pokemon | undefined)[] = [];
    for (let i = 0; i < TAMANHO_EQUIPE; i++) {
        vagas.push(equipe[i]);
    }

    const jaNoTime = pokemonAtual ? equipe.some((pokemon) => pokemon.id === pokemonAtual.id) : false;
    const timeCheio = equipe.length >= TAMANHO_EQUIPE;

    return (
        <div className={styles.teamBuilder}>
            <PageHeader titulo="Montar time">
                <p className={styles.counter}>
                    <strong>{equipe.length}</strong> de {TAMANHO_EQUIPE}
                </p>
            </PageHeader>

            <SearchForm
                valor={nomePokemon}
                carregando={carregando}
                mudarTexto={setNomePokemon}
                buscar={buscarPokemon}
            />

            {mensagemErro && <p className={styles.error}>{mensagemErro}</p>}

            {pokemonAtual && (
                <PokemonCard key={pokemonAtual.id} pokemon={pokemonAtual}>
                    <button
                        className={buttons.primary}
                        type="button"
                        onClick={adicionarPokemon}
                        disabled={jaNoTime || timeCheio}
                    >
                        Adicionar ao time
                    </button>
                    {jaNoTime && <p className={styles.note}>Este Pokémon já está no time.</p>}
                    {!jaNoTime && timeCheio && <p className={styles.note}>O time está completo.</p>}
                </PokemonCard>
            )}

            <section className={styles.party}>
                <h2>Seu time</h2>

                <ol className={styles.slots}>
                    {vagas.map((pokemon, indice) =>
                        pokemon ? (
                            <li className={styles.slot} key={pokemon.id}>
                                <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
                                <div className={styles.slotInfo}>
                                    <h3>{formatarNome(pokemon.name)}</h3>
                                    <div className={styles.slotTypes}>
                                        {pokemon.types.map(({ type }) => (
                                            <TypeBadge key={type.name} tipo={type.name} />
                                        ))}
                                    </div>
                                    <p>Total base: <strong>{somarStatus(pokemon)}</strong></p>
                                </div>
                                <button
                                    className={`${buttons.quiet} ${styles.slotRemove}`}
                                    type="button"
                                    onClick={() => removerPokemon(pokemon.id)}
                                >
                                    Remover
                                </button>
                            </li>
                        ) : (
                            <li className={`${styles.slot} ${styles.slotVazio}`} key={`vaga-${indice}`}>
                                <span>Vaga {indice + 1}</span>
                            </li>
                        )
                    )}
                </ol>
            </section>

            {equipe.length > 0 && (
                <section className={styles.summary}>
                    <div className={styles.summaryHeading}>
                        <h2>Força do time</h2>
                        <p>
                            Soma de cada atributo no time. A barra enche conforme o time cresce,
                            e a avaliação considera a média por Pokémon.
                        </p>
                    </div>

                    <StatBars valores={totais} maximo={TAMANHO_EQUIPE * 150} niveis={niveis} />

                    <dl className={styles.total}>
                        <div>
                            <dt>Total base do time</dt>
                            <dd>{poderTotalEquipe}</dd>
                        </div>
                        <div>
                            <dt>Média por Pokémon</dt>
                            <dd>{mediaPoder}</dd>
                        </div>
                    </dl>
                </section>
            )}
        </div>
    );
}

export default TeamBuilder;
