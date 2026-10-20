import { useState } from "react";
import type {
    Pokemon,
    PokemonColecao,
    PokemonRarity,
} from "../../types/pokemon.ts";
import { Link } from "react-router-dom";
import styles from "./Collector.module.css";
import { useCollection } from "../../hooks/useCollection";
import { buscarPokemonAleatorio } from "../../services/pokeApi";
import { classeDaRaridade } from "../../utils/rarity";
import pokeBall from "../../assets/poke-ball.png";

function Collector() {
    const [pokemonAtual, setPokemonAtual] = useState<Pokemon | null>(null);
    const [raridadeAtual, setRaridadeAtual] = useState<PokemonRarity>("Comum");
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemAdicionado, setMensagemAdicionado] = useState("");
    const [carregando, setCarregando] = useState(false);

    const { colecao, erroColecao, adicionarPokemon: guardarNaColecao } = useCollection();

    async function buscarPokemon() {
        setMensagemAdicionado("");
        setMensagemErro("");
        setCarregando(true);

        try {
            const resultado = await buscarPokemonAleatorio();
            setPokemonAtual(resultado.pokemon);
            setRaridadeAtual(resultado.raridade);
        } catch (erro) {
            setPokemonAtual(null);
            setRaridadeAtual("Comum");

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
        setMensagemAdicionado("");
        setMensagemErro("");

        if (!pokemonAtual) {
            setMensagemErro("Gire um Pokémon primeiro!");
            return;
        }

        const pokemonSalvo: PokemonColecao = {
            id: pokemonAtual.id,
            name: pokemonAtual.name,
            sprite: pokemonAtual.sprites.front_default,
            raridade: raridadeAtual,
        };

        const erro = guardarNaColecao(pokemonSalvo);

        if (erro) {
            setMensagemErro(erro);
        } else {
            setMensagemAdicionado(`${pokemonAtual.name} foi adicionado à coleção!`);
        }
    }

    const erroParaExibir = mensagemErro || erroColecao;

    return (
        <main className={styles.collector}>
            <div className={styles["collector-stars"]} aria-hidden="true">
                <span className={`${styles["collector-star"]} ${styles["collector-star--1"]}`} />
                <span className={`${styles["collector-star"]} ${styles["collector-star--2"]}`} />
                <span className={`${styles["collector-star"]} ${styles["collector-star--3"]}`} />
                <span className={`${styles["collector-star"]} ${styles["collector-star--4"]}`} />
                <span className={`${styles["collector-star"]} ${styles["collector-star--5"]}`} />
                <span className={`${styles["collector-star"]} ${styles["collector-star--6"]}`} />
            </div>

            <Link to="/" className={styles["collector-back"]}>
                Voltar ao menu
            </Link>

            <header className={styles["collector-heading"]}>
                <span className={styles["collector-eyebrow"]}>
                    POKÉSTATION · ÁREA DE CAPTURA
                </span>

                <h1 className={styles["collector-title"]}>
                    Giro de Pokémon
                </h1>
            </header>

            <section
                className={styles["collector-game"]}
                aria-label="Giro de Pokémon"
            >
                <div className={styles["collector-controls"]}>
                    <div className={styles["painel-controle"]}>
                        <p className={styles["collector-count"]}>
                            Coleção
                            <strong>{colecao.length}/25</strong>
                        </p>

                        <div
                            className={styles["collector-progress"]}
                            role="progressbar"
                            aria-label="Progresso da coleção"
                            aria-valuemin={0}
                            aria-valuemax={25}
                            aria-valuenow={colecao.length}
                        >
                            <span
                                style={{
                                    width: `${(colecao.length / 25) * 100}%`,
                                }}
                            />
                        </div>
                    </div>

                    <button
                        className={styles["collector-spin-button"]}
                        type="button"
                        onClick={buscarPokemon}
                        disabled={carregando}
                    >
                        {carregando ? "Girando..." : "Girar Pokémon"}
                    </button>
                </div>

                <div
                    className={`${styles["collector-display"]} ${
                        pokemonAtual ? styles["collector-display--result"] : ""
                    }`}
                    aria-live="polite"
                    aria-busy={carregando}
                >
                    {carregando && (
                        <div className={styles["collector-loading"]}>
                            <span className={styles["collector-loader"]} />
                            <p>Preparando seu próximo encontro...</p>
                        </div>
                    )}

                    {!carregando && !pokemonAtual && !erroParaExibir && (
                        <div className={styles["collector-empty"]}>
                            <img
                                className={styles["collector-ball"]}
                                src={pokeBall}
                                alt=""
                                aria-hidden="true"
                            />
                            <h2>Pronto para descobrir?</h2>
                            <p>Seu próximo Pokémon está a um giro de distância.</p>
                        </div>
                    )}

                    {!carregando && pokemonAtual && (
                        <article className={styles["pokemon-card"]}>
                            <div className={styles["collector-card-label"]}>
                                POKÉMON ENCONTRADO
                            </div>

                            <div className={styles["collector-sprite-panel"]}>
                                <img
                                    className={styles["pokemon-card-image"]}
                                    src={pokemonAtual.sprites.front_default ?? ""}
                                    alt={`Sprite de ${pokemonAtual.name}`}
                                />
                            </div>

                            <div className={styles.resultado}>
                                <h2 className={styles["pokemon-name"]}>
                                    {pokemonAtual.name}
                                </h2>

                                <p className={`${styles["pokemon-rarity"]} ${styles[classeDaRaridade(raridadeAtual)]}`}>
                                    <span className={styles["pokemon-rarity-text"]}>
                                        {raridadeAtual}
                                    </span>
                                </p>

                                <button
                                    className={styles["pokemon-add-button"]}
                                    type="button"
                                    onClick={adicionarPokemon}
                                    disabled={colecao.length >= 25}
                                >
                                    Adicionar à coleção
                                </button>

                                {mensagemAdicionado && (
                                    <p className={styles["collector-success-message"]}>
                                        {mensagemAdicionado}
                                    </p>
                                )}
                            </div>
                        </article>
                    )}

                    {erroParaExibir && (
                        <p className={styles["collector-error-message"]} role="alert">
                            {erroParaExibir}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Collector;