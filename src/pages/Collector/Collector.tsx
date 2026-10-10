import { useState } from "react";
import type { Pokemon, PokemonColecao } from "../../types/pokemon.ts";
import { Link } from "react-router-dom";
import "./Collector.css";
import { useCollection } from "../../hooks/useCollection";
import { buscarPokemonAleatorio } from "../../services/pokeApi";
import { classeDaRaridade } from "../../utils/rarity";

function Collector() {
    const [pokemonAtual, setPokemonAtual] = useState<Pokemon | null>(null);
    const [raridadeAtual, setRaridadeAtual] = useState("");
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
            setRaridadeAtual("");

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
        <main className="collector">
            <Link to="/" className="collector-back">
                Voltar ao menu
            </Link>

            <header className="collector-heading">
                <span className="collector-eyebrow">
                    POKÉSTATION · ÁREA DE CAPTURA
                </span>

                <h1 className="collector-title">
                    Giro de Pokémon
                </h1>
            </header>

            <section
                className="collector-game"
                aria-label="Giro de Pokémon"
            >
                <div className="collector-controls">
                    <div className="painel-controle">
                        <p className="collector-count">
                            Coleção
                            <strong>{colecao.length}/25</strong>
                        </p>

                        <div
                            className="collector-progress"
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
                        className="collector-spin-button"
                        type="button"
                        onClick={buscarPokemon}
                        disabled={carregando}
                    >
                        {carregando ? "Girando..." : "Girar Pokémon"}
                    </button>
                </div>

                <div
                    className={`collector-display ${
                        pokemonAtual ? "collector-display--result" : ""
                    }`}
                    aria-live="polite"
                    aria-busy={carregando}
                >
                    {carregando && (
                        <div className="collector-loading">
                            <span className="collector-loader" />
                            <p>Preparando seu próximo encontro...</p>
                        </div>
                    )}

                    {!carregando && !pokemonAtual && !erroParaExibir && (
                        <div className="collector-empty">
                            <div className="collector-ball" />
                            <h2>Pronto para descobrir?</h2>
                            <p>Seu próximo Pokémon está a um giro de distância.</p>
                        </div>
                    )}

                    {!carregando && pokemonAtual && (
                        <article className="pokemon-card">
                            <div className="collector-card-label">
                                POKÉMON ENCONTRADO
                            </div>

                            <div className="collector-sprite-panel">
                                <img
                                    className="pokemon-card-image"
                                    src={pokemonAtual.sprites.front_default ?? ""}
                                    alt={`Sprite de ${pokemonAtual.name}`}
                                />
                            </div>

                            <div className="resultado">
                                <h2 className="pokemon-name">
                                    {pokemonAtual.name}
                                </h2>

                                <p className={`pokemon-rarity ${classeDaRaridade(raridadeAtual)}`}>
                                    <span className="pokemon-rarity-text">
                                        {raridadeAtual}
                                    </span>
                                </p>

                                <button
                                    className="pokemon-add-button"
                                    type="button"
                                    onClick={adicionarPokemon}
                                    disabled={colecao.length >= 25}
                                >
                                    Adicionar à coleção
                                </button>

                                {mensagemAdicionado && (
                                    <p className="collector-success-message">
                                        {mensagemAdicionado}
                                    </p>
                                )}
                            </div>
                        </article>
                    )}

                    {erroParaExibir && (
                        <p className="collector-error-message" role="alert">
                            {erroParaExibir}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Collector;