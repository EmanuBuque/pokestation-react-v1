import { useState } from "react";
import type { Pokemon } from "../../types/pokemon";
import "./Finder.css";
import tailPikachu from "../../assets/tail_pikachu.png";
import { Link } from "react-router-dom";
import { nomesTipos } from "../../constants/pokemonTypes";
import { buscarPokemonPorNome } from "../../services/pokeApi";
import { useFavorites } from "../../hooks/useFavorites";

function Finder() {
  const [nomePokemon, setNomePokemon] = useState("");
  const [pokemonAtual, setPokemonAtual] = useState<Pokemon | null>(null);
  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const {
    favoritos,
    erroFavoritos,
    adicionarFavorito,
    removerFavorito,
  } = useFavorites();

  async function buscarPokemon() {
    const nome = nomePokemon.trim().toLowerCase();
    setNomePokemon("");

    if (!nome) {
      setMensagemErro("Digite o nome de um Pokémon!");
      return;
    }

    setCarregando(true);

    try {
      const dados = await buscarPokemonPorNome(nome);
      setPokemonAtual(dados);
      setMensagemErro("");
    } catch (erro) {
      setPokemonAtual(null);

      if (erro instanceof Error) {
        setMensagemErro(erro.message);
      } else {
        setMensagemErro("Ocorreu um erro ao buscar o Pokémon.");
      }
    } finally {
      setCarregando(false);
    }
  }

  function limparResultado() {
    setPokemonAtual(null);
    setNomePokemon("");
    setMensagemErro("");
  }

  const pokemonJaEfavorito = pokemonAtual
    ? favoritos.some((pokemon) => pokemon.id === pokemonAtual.id)
    : false;

  return (
    <main className="finder">
      <div className="finder-window">
        <Link to="/" className="finder-back">
          Voltar ao menu
        </Link>

        <div className="finder-heading">
          <span className="finder-eyebrow">
            POKÉSTATION / ÁREA DE PESQUISA
          </span>

          <h1>Finder</h1>

          <img
            className="finder-tail"
            src={tailPikachu}
            alt=""
            aria-hidden="true"
          />
        </div>

        <p className="finder-description">
          Encontre seu próximo Pokémon. Consulte informações e guarde seus
          favoritos.
        </p>

        <div className="search-area">
          <input
            type="text"
            value={nomePokemon}
            onChange={(event) => setNomePokemon(event.target.value)}
            placeholder="Ex: pikachu"
          />

          <div className="search-buttons">
            <button
              type="button"
              onClick={buscarPokemon}
              disabled={carregando}
            >
              {carregando ? "Buscando..." : "Buscar Pokémon"}
            </button>

            <button type="button" onClick={limparResultado}>
              Limpar
            </button>
          </div>
        </div>

        {(mensagemErro || erroFavoritos) && (
          <p className="error-message" role="alert">
            {mensagemErro || erroFavoritos}
          </p>
        )}

        {pokemonAtual && (
          <div className="pokemon-result">
            <img
              className="pokemon-image"
              key={pokemonAtual.id}
              src={pokemonAtual.sprites.front_default ?? ""}
              alt={pokemonAtual.name}
            />

            <div className="pokemon-info">
              <p>
                <strong>Nome:</strong> {pokemonAtual.name}
              </p>

              <p>
                <strong>Tipo:</strong>{" "}
                {pokemonAtual.types
                  .map(({ type }) => nomesTipos[type.name])
                  .join("/")}
              </p>

              <p>
                <strong>Altura:</strong>{" "}
                {(pokemonAtual.height / 10).toFixed(1)} m
              </p>

              <p>
                <strong>Peso:</strong>{" "}
                {(pokemonAtual.weight / 10).toFixed(1)} kg
              </p>

              <p>
                <strong>Experiência Base:</strong>{" "}
                {pokemonAtual.base_experience}
              </p>
            </div>

            <button
              className="favorite-button"
              type="button"
              onClick={() => adicionarFavorito(pokemonAtual)}
              disabled={pokemonJaEfavorito}
            >
              {pokemonJaEfavorito ? "Favoritado" : "Favoritar"}
            </button>
          </div>
        )}

        <section className="favorites-section">
          <h2>Meus favoritos</h2>

          {favoritos.length === 0 ? (
            <p>Você ainda não tem pokémons favoritos :(</p>
          ) : (
            <ul className="favorites-grid">
              {favoritos.map((pokemon) => (
                <li className="favorite-card" key={pokemon.id}>
                  <img
                    src={pokemon.sprites.front_default ?? ""}
                    alt={pokemon.name}
                  />

                  <span>{pokemon.name}</span>

                  <button
                    type="button"
                    onClick={() => removerFavorito(pokemon.id)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default Finder;