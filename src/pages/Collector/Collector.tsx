import { useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { Pokemon, PokemonColecao, PokemonRarity } from "../../types/pokemon";
import { LIMITE_COLECAO, useCollection } from "../../hooks/useCollection";
import { buscarPokemonAleatorio } from "../../services/pokeApi";
import { pegarCorRaridade, formatarNome, formatarNumero } from "../../utils/formatar";
import PageHeader from "../../components/PageHeader/PageHeader";
import RarityTag from "../../components/RarityTag/RarityTag";
import TypeBadge from "../../components/TypeBadge/TypeBadge";
import pokeBall from "../../assets/pokeball.webp";
import buttons from "../../styles/buttons.module.css";
import styles from "./Collector.module.css";

function Collector() {
    const [pokemonAtual, setPokemonAtual] = useState<Pokemon | null>(null);
    const [raridadeAtual, setRaridadeAtual] = useState<PokemonRarity>("Comum");
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemAdicionado, setMensagemAdicionado] = useState("");
    const [carregando, setCarregando] = useState(false);

    const { colecao, erroColecao, adicionarPokemon } = useCollection();

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

    function guardarPokemon() {
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

        const erro = adicionarPokemon(pokemonSalvo);

        if (erro) {
            setMensagemErro(erro);
        } else {
            setMensagemAdicionado(`${formatarNome(pokemonAtual.name)} foi guardado na sua coleção.`);
        }
    }

    const erroNaTela = mensagemErro || erroColecao;
    const colecaoCheia = colecao.length >= LIMITE_COLECAO;
    const jaGuardado = pokemonAtual ? colecao.some((pokemon) => pokemon.id === pokemonAtual.id) : false;

    // O card muda de cor (e ganha efeito) conforme a raridade do Pokémon encontrado
    const temPokemon = pokemonAtual !== null && !carregando;
    let classeCard = styles.stage;

    if (temPokemon) {
        classeCard += " " + styles.stageResult;

        if (raridadeAtual === "Lendario") {
            classeCard += " " + styles.stageLendario;
        }
        if (raridadeAtual === "Mitico") {
            classeCard += " " + styles.stageMitico;
        }
    }

    const estiloCard = { "--rarity": pegarCorRaridade(raridadeAtual) } as CSSProperties;

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
                    <div className={styles.progressTrack}>
                        <span style={{ width: `${(colecao.length / LIMITE_COLECAO) * 100}%` }} />
                    </div>
                </div>
            </PageHeader>

            <section className={classeCard} style={temPokemon ? estiloCard : undefined}>
                {carregando && (
                    <div className={styles.center}>
                        <img className={styles.ballShake} src={pokeBall} alt="" />
                        <p>Procurando...</p>
                    </div>
                )}

                {!carregando && !pokemonAtual && (
                    <div className={styles.center}>
                        <img className={styles.ball} src={pokeBall} alt="" />
                        <h2>Nenhum Pokémon por perto</h2>
                        <p>Procure um para ver qual aparece e qual é a raridade dele.</p>
                    </div>
                )}

                {temPokemon && (
                    <article className={styles.encounter} key={pokemonAtual.id}>
                        <img
                            className={styles.sprite}
                            src={pokemonAtual.sprites.front_default ?? ""}
                            alt={`Sprite de ${formatarNome(pokemonAtual.name)}`}
                        />

                        <div className={styles.encounterInfo}>
                            <RarityTag raridade={raridadeAtual} />
                            <h2>{formatarNome(pokemonAtual.name)}</h2>
                            <p className={styles.dex}>{formatarNumero(pokemonAtual.id)}</p>
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
                    onClick={buscarPokemon}
                    disabled={carregando}
                >
                    {pokemonAtual ? "Procurar outro" : "Procurar Pokémon"}
                </button>

                {temPokemon && (
                    <button
                        className={buttons.primary}
                        type="button"
                        onClick={guardarPokemon}
                        disabled={colecaoCheia || jaGuardado}
                    >
                        {jaGuardado ? "Já está na coleção" : "Guardar na coleção"}
                    </button>
                )}
            </div>

            {mensagemAdicionado && (
                <p className={styles.success}>
                    {mensagemAdicionado} <Link to="/collection">Ver coleção</Link>
                </p>
            )}

            {colecaoCheia && !mensagemAdicionado && (
                <p className={styles.note}>
                    Sua coleção está cheia. <Link to="/collection">Remova um Pokémon</Link> para guardar outro.
                </p>
            )}

            {erroNaTela && (
                <p className={styles.error}>
                    {erroNaTela}
                </p>
            )}
        </div>
    );
}

export default Collector;
