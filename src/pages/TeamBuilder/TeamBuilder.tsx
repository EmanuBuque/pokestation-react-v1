
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../../types/pokemon";
import { buscarPokemonPorNome } from "../../services/pokeApi";
import { calcularStatusEquipe } from "../../utils/teamBuilder";
import styles from "./TeamBuilder.module.css";

function spriteAnimado(pokemon: Pokemon): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
}

function TeamBuilder() {
    const [nomePokemon, setNomePokemon] = useState("");
    const [pokemonAtual, setPokemonAtual] = useState<Pokemon | null>(null);

    const [equipe, setEquipe] = useState<Pokemon[]>([]);
    const [mensagemErro, setMensagemErro] = useState("");
    const [carregando, setCarregando] = useState(false);

async function buscarPokemon() {
    setMensagemErro("");
    const busca = nomePokemon.trim().toLowerCase().replace(/\s+/g, "-");


    if (!busca) {
        setMensagemErro("Digite o nome de um Pokémon!");
        return;
    }

    setCarregando(true);
    try {
        const pokemon = await buscarPokemonPorNome(busca);
        setPokemonAtual(pokemon);
    } catch (erro) {
        setMensagemErro(erro instanceof Error ? erro.message : "Ocorreu um erro ao buscar o Pokémon.");
    } finally {
        setCarregando(false);
    }
}

function adicionarPokemon() {
    if (pokemonAtual) {
         const pokemonJaAdicionado = equipe.some(p => p.id === pokemonAtual.id);
        if (pokemonJaAdicionado) {
            setMensagemErro("Este Pokémon já está na equipe!");
            return;
        } 
        if (equipe.length >= 6) {
            setMensagemErro("A equipe já está completa! Remova um Pokémon antes de adicionar outro.");
            return;
        }
        setMensagemErro('');
        setEquipe((prevEquipe) => [...prevEquipe, pokemonAtual]);
        setPokemonAtual(null);
    }
}

function removerPokemon(id: number) {
    setMensagemErro('');
    setEquipe((equipeAtual) => equipeAtual.filter((pokemon) => pokemon.id !== id));
}

const statusEquipe = calcularStatusEquipe(equipe);
    return (
        <main className={styles["team-builder"]}>
    <Link to="/" className={styles["team-builder-back"]}>
      Voltar ao menu
    </Link>

    <header className={styles["team-builder-heading"]}>
      <span className={styles["team-builder-eyebrow"]}>
        POKÉSTATION / ÁREA DE MONTAGEM
      </span>
      <h1>Team Builder</h1>
    </header>

    <p className={styles["team-builder-description"]}>
      Monte sua equipe, compare atributos e descubra o poder do seu time.
    </p>


<form
  className={styles["team-builder-search"]}
  aria-busy={carregando}
  onSubmit={(e) => {
    e.preventDefault();
    buscarPokemon();
  }}
>
  <input
    type="text"
    value={nomePokemon}
    onChange={(e) => setNomePokemon(e.target.value)}
    placeholder="Digite o nome ou número do Pokémon..."
    aria-label="Nome ou número do Pokémon"
  />

  <button type="submit" disabled={carregando}>
    {carregando ? "Buscando..." : "Buscar"}
  </button>
</form>

            {mensagemErro && <p className={styles.erro} role="alert">{mensagemErro}</p>}
            {pokemonAtual && (
                <div className={styles["pokemon-atual"]}>
                 <div className={styles["pokemon-atual-image-frame"]}>
                   <span className={styles["team-builder-pokemon-number"]}>
                     N.º {String(pokemonAtual.id).padStart(3, "0")}
                   </span>
                   <img
                     src={spriteAnimado(pokemonAtual)}
                     alt={pokemonAtual.name}
                     onError={(event) => {
                       event.currentTarget.onerror = null;
                       event.currentTarget.src =
                         pokemonAtual.sprites.front_default ?? "";
                     }}
                   />
                 </div>
                  <h2>{pokemonAtual.name}</h2>
                   <p>HP:{pokemonAtual.stats[0].base_stat}</p>
                                <p>Ataque: {pokemonAtual.stats[1].base_stat}</p>
                                <p>Defesa: {pokemonAtual.stats[2].base_stat}</p>
                                <p>Ataque Especial: {pokemonAtual.stats[3].base_stat}</p>
                                <p>Defesa Especial: {pokemonAtual.stats[4].base_stat}</p>
                                <p>Velocidade: {pokemonAtual.stats[5].base_stat}</p>
                    <button onClick={adicionarPokemon}>Adicionar à Equipe</button>
                </div>
            )}
            <section className={styles.equipe}>
                <h2>Minha Equipe</h2>
                <p>Equipe: {equipe.length}/6</p>
                {equipe.length === 0 ? (
                    <p>A equipe está vazia.</p>
                ) : (
                    <ul>
                        {equipe.map((pokemon) => (
                            <li key={pokemon.id}>
                                <div className={styles["equipe-image-frame"]}>
                                    <img
                                        src={pokemon.sprites.front_default ?? ""}
                                        alt={pokemon.name}
                                    />
                                </div>
                                <p>{pokemon.name}</p>
                                <p>HP: {pokemon.stats[0].base_stat}</p>
                                <p>Ataque: {pokemon.stats[1].base_stat}</p>
                                <p>Defesa: {pokemon.stats[2].base_stat}</p>
                                <p>Ataque Especial: {pokemon.stats[3].base_stat}</p>
                                <p>Defesa Especial: {pokemon.stats[4].base_stat}</p>
                                <p>Velocidade: {pokemon.stats[5].base_stat}</p>
                                
<p>
    Poder Total: {
        pokemon.stats.reduce(
            (total, stat) => total + stat.base_stat,
            0
        )
    }
</p>

                               <button type="button" onClick={() => removerPokemon(pokemon.id)}>

    Remover
</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
       
{equipe.length > 0 && (
  <section className={styles["painel-status"]}>
    <h2>Status da Equipe</h2>

    <p>
      HP da Equipe: {statusEquipe.totalHP}{" "}
      <span className={styles[statusEquipe.statusHP]}>
        {statusEquipe.statusHP}
      </span>
    </p>

    <p>
      Ataque da Equipe: {statusEquipe.totalAtaque}{" "}
      <span className={styles[statusEquipe.statusAtaque]}>
        {statusEquipe.statusAtaque}
      </span>
    </p>

    <p>
      Defesa da Equipe: {statusEquipe.totalDefesa}{" "}
      <span className={styles[statusEquipe.statusDefesa]}>
        {statusEquipe.statusDefesa}
      </span>
    </p>

    <p>
      Ataque Especial: {statusEquipe.totalAtaqueEspecial}{" "}
      <span className={styles[statusEquipe.statusAtaqueEspecial]}>
        {statusEquipe.statusAtaqueEspecial}
      </span>
    </p>

    <p>
      Defesa Especial: {statusEquipe.totalDefesaEspecial}{" "}
      <span className={styles[statusEquipe.statusDefesaEspecial]}>
        {statusEquipe.statusDefesaEspecial}
      </span>
    </p>

    <p>
      Velocidade da Equipe: {statusEquipe.totalVelocidade}{" "}
      <span className={styles[statusEquipe.statusVelocidade]}>
        {statusEquipe.statusVelocidade}
      </span>
    </p>

    <p>
      Poder Total da Equipe: {statusEquipe.poderTotalEquipe}{" "}
      <span className={styles[statusEquipe.statusGeral]}>
        {statusEquipe.statusGeral}
      </span>
    </p>
  </section>
)}

        </main>
    );

}
export default TeamBuilder;
