import { useState } from "react";
import type { CSSProperties } from "react";
import type {
    Pokemon,
    PokemonColecao,
    PokemonRarity,
} from "../../types/pokemon.ts";
import { Link } from "react-router-dom";
import { LIMITE_COLECAO } from "../../types/pokemon.ts";
import { useCollection } from "../../hooks/useCollection";
import { buscarPokemonAleatorio } from "../../services/pokeApi";
import { corRaridade, nomeExibicao, numeroPokedex, rotuloRaridade } from "../../utils/display";
import PageHeader from "../../components/PageHeader/PageHeader";
import TypeBadge from "../../components/TypeBadge/TypeBadge";
import pokeBall from "../../assets/Nova pasta/Poké_Ball_icon.svg.webp";
import buttons from "../../styles/buttons.module.css";
import styles from "./Collector.module.css";

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
            setMensagemErro("Procure um Pokémon primeiro.");
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
            setMensagemAdicionado(`${nomeExibicao(pokemonAtual.name)} foi guardado na sua coleção.`);
        }
    }

    const erroParaExibir = mensagemErro || erroColecao;
    const colecaoCheia = colecao.length >= LIMITE_COLECAO;
    const jaGuardado = pokemonAtual ? colecao.some((p) => p.id === pokemonAtual.id) : false;

    const estiloPalco = pokemonAtual && !carregando
        ? ({ "--rarity": corRaridade(raridadeAtual) } as CSSProperties)
        : undefined;

    return (
        <div className={styles.collector}>
            <PageHeader
                titulo="Colecionar"
                descricao="Cada busca traz um Pokémon aleatório entre os 1.025 da Pokédex. Quanto mais difícil de capturar, mais raro ele é."
            >
                <div className={styles.progress}>
                    <p>
                        <strong>{colecao.length}</strong> de {LIMITE_COLECAO} na coleção
                    </p>
                    <div
                        className={styles.progressTrack}
                        role="progressbar"
                        aria-label="Progresso da coleção"
                        aria-valuemin={0}
                        aria-valuemax={LIMITE_COLECAO}
                        aria-valuenow={colecao.length}
                    >
                        <span style={{ width: `${(colecao.length / LIMITE_COLECAO) * 100}%` }} />
                    </div>
                </div>
            </PageHeader>

            <section
                className={`${styles.stage} ${estiloPalco ? styles.stageResult : ""}`}
                style={estiloPalco}
                aria-label="Encontro"
                aria-live="polite"
                aria-busy={carregando}
            >
                {carregando && (
                    <div className={styles.center}>
                        <img className={styles.ballShake} src={pokeBall} alt="" />
                        <p>Procurando…</p>
                    </div>
                )}

                {!carregando && !pokemonAtual && (
                    <div className={styles.center}>
                        <img className={styles.ball} src={pokeBall} alt="" />
                        <h2>Nenhum Pokémon por perto</h2>
                        <p>Procure um para ver qual aparece e qual é a raridade dele.</p>
                    </div>
                )}

                {!carregando && pokemonAtual && (
                    <article className={styles.encounter} key={pokemonAtual.id}>
                        <img
                            className={styles.sprite}
                            src={pokemonAtual.sprites.front_default ?? ""}
                            alt={`Sprite de ${nomeExibicao(pokemonAtual.name)}`}
                        />

                        <div className={styles.encounterInfo}>
                            <p className={styles.rarity}>{rotuloRaridade(raridadeAtual)}</p>
                            <h2>{nomeExibicao(pokemonAtual.name)}</h2>
                            <p className={styles.dex}>{numeroPokedex(pokemonAtual.id)}</p>
                            <div className={styles.types}>
                                {pokemonAtual.types.map(({ type }) => (
                                    <TypeBadge key={type.name} tipo={type.name} />
                                ))}
                            </div>
                        </div>
                    </article>
                )}
            </section>

            <div className={styles.actions}>
                <button
                    className={pokemonAtual ? buttons.secondary : buttons.primary}
                    type="button"
                    onClick={() => void buscarPokemon()}
                    disabled={carregando}
                >
                    {pokemonAtual ? "Procurar outro" : "Procurar Pokémon"}
                </button>

                {pokemonAtual && !carregando && (
                    <button
                        className={buttons.primary}
                        type="button"
                        onClick={adicionarPokemon}
                        disabled={colecaoCheia || jaGuardado}
                    >
                        {jaGuardado ? "Já está na coleção" : "Guardar na coleção"}
                    </button>
                )}
            </div>

            {mensagemAdicionado && (
                <p className={styles.success} role="status">
                    {mensagemAdicionado} <Link to="/collection">Ver coleção</Link>
                </p>
            )}

            {colecaoCheia && !mensagemAdicionado && (
                <p className={styles.note}>
                    Sua coleção está cheia. <Link to="/collection">Remova um Pokémon</Link> para guardar outro.
                </p>
            )}

            {erroParaExibir && (
                <p className={styles.error} role="alert">
                    {erroParaExibir}
                </p>
            )}
        </div>
    );
}

export default Collector;
