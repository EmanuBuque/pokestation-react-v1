import { useState } from "react";
import {
    PokemonSearchSchema,
    type Pokemon,
} from "../../types/pokemon";
import { buscarPokemonPorNome } from "../../services/pokeApi";
import {
    calcularStatusEquipe,
    classificarStatus,
    type NivelStatus,
} from "../../utils/teamBuilder";
import { nomeExibicao, poderTotal } from "../../utils/display";
import PageHeader from "../../components/PageHeader/PageHeader";
import SearchForm from "../../components/SearchForm/SearchForm";
import PokemonEntry from "../../components/PokemonEntry/PokemonEntry";
import StatBars from "../../components/StatBars/StatBars";
import TypeBadge from "../../components/TypeBadge/TypeBadge";
import buttons from "../../styles/buttons.module.css";
import styles from "./TeamBuilder.module.css";

const TAMANHO_EQUIPE = 6;

const rotulosNivel: Record<NivelStatus, string> = {
    fraco: "Fraco",
    mediano: "Mediano",
    forte: "Forte",
};

function TeamBuilder() {
    const [nomePokemon, setNomePokemon] = useState("");
    const [pokemonAtual, setPokemonAtual] = useState<Pokemon | null>(null);

    const [equipe, setEquipe] = useState<Pokemon[]>([]);
    const [mensagemErro, setMensagemErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function buscarPokemon() {
        setMensagemErro("");
        const validacaoBusca = PokemonSearchSchema.safeParse(nomePokemon);

        if (!validacaoBusca.success) {
            setMensagemErro(validacaoBusca.error.issues[0]?.message ?? "Busca inválida.");
            return;
        }

        setCarregando(true);
        try {
            const pokemon = await buscarPokemonPorNome(validacaoBusca.data);
            setPokemonAtual(pokemon);
        } catch (erro) {
            setMensagemErro(erro instanceof Error ? erro.message : "Ocorreu um erro ao buscar o Pokémon.");
        } finally {
            setCarregando(false);
        }
    }

    function adicionarPokemon() {
        if (!pokemonAtual) {
            return;
        }

        if (equipe.some((p) => p.id === pokemonAtual.id)) {
            setMensagemErro("Este Pokémon já está no time.");
            return;
        }

        if (equipe.length >= TAMANHO_EQUIPE) {
            setMensagemErro("O time já tem 6 Pokémon. Remova um para abrir uma vaga.");
            return;
        }

        setMensagemErro("");
        setEquipe((prevEquipe) => [...prevEquipe, pokemonAtual]);
        setPokemonAtual(null);
        setNomePokemon("");
    }

    function removerPokemon(id: number) {
        setMensagemErro("");
        setEquipe((equipeAtual) => equipeAtual.filter((pokemon) => pokemon.id !== id));
    }

    const statusEquipe = calcularStatusEquipe(equipe);
    const totais = [
        statusEquipe.totalHP,
        statusEquipe.totalAtaque,
        statusEquipe.totalDefesa,
        statusEquipe.totalAtaqueEspecial,
        statusEquipe.totalDefesaEspecial,
        statusEquipe.totalVelocidade,
    ];

    // A avaliação usa a média por Pokémon, projetada para um time completo,
    // assim um time com 2 Pokémon fortes não aparece como "fraco" só por estar incompleto
    const niveis = totais.map((total) =>
        classificarStatus(equipe.length ? (total / equipe.length) * TAMANHO_EQUIPE : 0)
    );
    const mediaPoder = equipe.length ? Math.round(statusEquipe.poderTotalEquipe / equipe.length) : 0;

    const vagas = Array.from({ length: TAMANHO_EQUIPE }, (_, indice) => equipe[indice]);
    const jaNoTime = pokemonAtual ? equipe.some((p) => p.id === pokemonAtual.id) : false;
    const timeCheio = equipe.length >= TAMANHO_EQUIPE;

    return (
        <div className={styles.teamBuilder}>
            <PageHeader
                titulo="Montar time"
                descricao="Busque Pokémon, adicione até 6 ao time e veja como a equipe se sai em cada atributo."
            >
                <p className={styles.counter}>
                    <strong>{equipe.length}</strong> de {TAMANHO_EQUIPE}
                </p>
            </PageHeader>

            <SearchForm
                valor={nomePokemon}
                carregando={carregando}
                aoMudar={setNomePokemon}
                aoBuscar={() => void buscarPokemon()}
            />

            {mensagemErro && <p className={styles.error} role="alert">{mensagemErro}</p>}

            {pokemonAtual && (
                <PokemonEntry key={pokemonAtual.id} pokemon={pokemonAtual}>
                    <button
                        className={buttons.primary}
                        type="button"
                        onClick={adicionarPokemon}
                        disabled={jaNoTime || timeCheio}
                    >
                        Adicionar ao time
                    </button>
                    {(jaNoTime || timeCheio) && (
                        <p className={styles.note}>
                            {jaNoTime ? "Este Pokémon já está no time." : "O time está completo."}
                        </p>
                    )}
                </PokemonEntry>
            )}

            <section className={styles.party} aria-labelledby="time-titulo">
                <h2 id="time-titulo">Seu time</h2>

                <ol className={styles.slots}>
                    {vagas.map((pokemon, indice) =>
                        pokemon ? (
                            <li className={styles.slot} key={pokemon.id}>
                                <img src={pokemon.sprites.front_default ?? ""} alt="" />
                                <div className={styles.slotInfo}>
                                    <h3>{nomeExibicao(pokemon.name)}</h3>
                                    <div className={styles.slotTypes}>
                                        {pokemon.types.map(({ type }) => (
                                            <TypeBadge key={type.name} tipo={type.name} />
                                        ))}
                                    </div>
                                    <p>Total base: <strong>{poderTotal(pokemon)}</strong></p>
                                </div>
                                <button
                                    className={`${buttons.quiet} ${styles.slotRemove}`}
                                    type="button"
                                    onClick={() => removerPokemon(pokemon.id)}
                                    aria-label={`Remover ${nomeExibicao(pokemon.name)} do time`}
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
                <section className={styles.summary} aria-labelledby="resumo-titulo">
                    <div className={styles.summaryHeading}>
                        <h2 id="resumo-titulo">Força do time</h2>
                        <p>
                            Soma de cada atributo no time. A barra enche conforme o time cresce,
                            e a avaliação considera a média por Pokémon.
                        </p>
                    </div>

                    <StatBars
                        valores={totais}
                        maximo={TAMANHO_EQUIPE * 150}
                        rotulos={(_, indice) => rotulosNivel[niveis[indice]]}
                    />

                    <dl className={styles.total}>
                        <div>
                            <dt>Total base do time</dt>
                            <dd>{statusEquipe.poderTotalEquipe}</dd>
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
