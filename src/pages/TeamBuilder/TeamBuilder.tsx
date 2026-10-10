
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../../types/pokemon";
import { buscarPokemonPorNome } from "../../services/pokeApi";
import "./TeamBuilder.css";


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

function CalcularEquipe() {
    const totalHP = equipe.reduce(
        (total, pokemon) => total + pokemon.stats[0].base_stat,
        0
    );
    const totalAtaque = equipe.reduce(
        (total, pokemon) => total + pokemon.stats[1].base_stat,
        0
    );

    const totalDefesa = equipe.reduce(
        (total, pokemon) => total + pokemon.stats[2].base_stat,
        0
    );

    const totalAtaqueEspecial = equipe.reduce(
        (total, pokemon) => total + pokemon.stats[3].base_stat,
        0
    );

    const totalDefesaEspecial = equipe.reduce(
        (total, pokemon) => total + pokemon.stats[4].base_stat,
        0
    );

    const totalVelocidade = equipe.reduce(
        (total, pokemon) => total + pokemon.stats[5].base_stat,
        0
    );

    const poderTotalEquipe =
    totalHP +
    totalAtaque +
    totalDefesa +
    totalAtaqueEspecial +
    totalDefesaEspecial +
    totalVelocidade;

const statusHP = classificarStatus(totalHP);
const statusAtaque = classificarStatus(totalAtaque);
const statusDefesa = classificarStatus(totalDefesa);
const statusAtaqueEspecial = classificarStatus(totalAtaqueEspecial);
const statusDefesaEspecial = classificarStatus(totalDefesaEspecial);
const statusVelocidade = classificarStatus(totalVelocidade);
const statusGeral = classificarPoderTotal(poderTotalEquipe);
    
   return {
    totalHP,
    totalAtaque,
    totalDefesa,
    totalAtaqueEspecial,
    totalDefesaEspecial,
    totalVelocidade,
    poderTotalEquipe,
    statusHP,
    statusAtaque,
    statusDefesa,
    statusAtaqueEspecial,
    statusDefesaEspecial,
    statusVelocidade,
    statusGeral
};




}

function classificarStatus(valor: number) {
    
    if(valor<300){
        return 'fraco';
    }
    else if(valor<=550){
        return 'mediano';
    }

    else {
        return 'forte';
    }
}

function classificarPoderTotal(valor: number) {
    if(valor<1500){
        return 'fraco';
    }
    else if(valor<=2500){
        return 'mediano';
    }

    else {
        return 'forte';
    }


}
const statusEquipe = CalcularEquipe();
    return (
        <main className="team-builder">
    <Link to="/" className="team-builder-back">
      Voltar ao menu
    </Link>

    <header className="team-builder-heading">
      <span className="team-builder-eyebrow">
        POKÉSTATION / ÁREA DE MONTAGEM
      </span>
      <h1>Team Builder</h1>
    </header>

    <p className="team-builder-description">
      Monte sua equipe, compare atributos e descubra o poder do seu time.
    </p>


<form
  className="team-builder-search"
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

            {mensagemErro && <p className="erro" role="alert">{mensagemErro}</p>}
            {pokemonAtual && (
                <div className="pokemon-atual">
                 <img src={pokemonAtual.sprites.front_default ?? "/placeholder.png"} alt={pokemonAtual.name} />
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
            <section className="equipe">
                <h2>Minha Equipe</h2>
                <p>Equipe: {equipe.length}/6</p>
                {equipe.length === 0 ? (
                    <p>A equipe está vazia.</p>
                ) : (
                    <ul>
                        {equipe.map((pokemon) => (
                            <li key={pokemon.id}>
                                <img src={pokemon.sprites.front_default ?? "/placeholder.png"} alt={pokemon.name} />
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
  <section className="painel-status">
    <h2>Status da Equipe</h2>

    <p>
      HP da Equipe: {statusEquipe.totalHP}{" "}
      <span className={statusEquipe.statusHP}>
        {statusEquipe.statusHP}
      </span>
    </p>

    <p>
      Ataque da Equipe: {statusEquipe.totalAtaque}{" "}
      <span className={statusEquipe.statusAtaque}>
        {statusEquipe.statusAtaque}
      </span>
    </p>

    <p>
      Defesa da Equipe: {statusEquipe.totalDefesa}{" "}
      <span className={statusEquipe.statusDefesa}>
        {statusEquipe.statusDefesa}
      </span>
    </p>

    <p>
      Ataque Especial: {statusEquipe.totalAtaqueEspecial}{" "}
      <span className={statusEquipe.statusAtaqueEspecial}>
        {statusEquipe.statusAtaqueEspecial}
      </span>
    </p>

    <p>
      Defesa Especial: {statusEquipe.totalDefesaEspecial}{" "}
      <span className={statusEquipe.statusDefesaEspecial}>
        {statusEquipe.statusDefesaEspecial}
      </span>
    </p>

    <p>
      Velocidade da Equipe: {statusEquipe.totalVelocidade}{" "}
      <span className={statusEquipe.statusVelocidade}>
        {statusEquipe.statusVelocidade}
      </span>
    </p>

    <p>
      Poder Total da Equipe: {statusEquipe.poderTotalEquipe}{" "}
      <span className={statusEquipe.statusGeral}>
        {statusEquipe.statusGeral}
      </span>
    </p>
  </section>
)}

        </main>
    );

}
export default TeamBuilder;
