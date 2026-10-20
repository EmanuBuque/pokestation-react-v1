
import { useState } from "react";
import type { CSSProperties } from "react";
import type { Pokemon } from "../../types/pokemon";
import styles from "./Finder.module.css";
import tailPikachu from "../../assets/tail_pikachu.png";
import { Link } from "react-router-dom";
import { nomesTipos } from "../../constants/pokemonTypes";
import { PokemonSearchSchema } from "../../types/pokemon";
import { buscarPokemonPorNome } from "../../services/pokeApi";
import { useFavorites } from "../../hooks/useFavorites";

const coresTipos: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

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
    const validacaoBusca = PokemonSearchSchema.safeParse(nomePokemon);

    if (!validacaoBusca.success) {
      setMensagemErro(validacaoBusca.error.issues[0]?.message ?? "Busca inválida.");
      return;
    }

    const nome = validacaoBusca.data;
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

  const tipoPrincipal = pokemonAtual?.types[0]?.type.name;

  const corTipo = tipoPrincipal
    ? coresTipos[tipoPrincipal] ?? "#D93630"
    : "#D93630";

  const estiloPokemon = {
    "--pokemon-type": corTipo,
  } as CSSProperties;

  const spriteAnimado = pokemonAtual
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonAtual.id}.gif`
    : "";

  return (
    <main className={styles.finder}>
      <div className={styles["finder-window"]}>
        <Link to="/" className={styles["finder-back"]}>
          Voltar ao menu
        </Link>

        <div className={styles["finder-heading"]}>
          <span className={styles["finder-eyebrow"]}>
            POKÉSTATION / ÁREA DE PESQUISA
          </span>

          <h1>Finder</h1>

          <img
            className={styles["finder-tail"]}
            src={tailPikachu}
            alt=""
            aria-hidden="true"
          />
        </div>

        <p className={styles["finder-description"]}>
          Encontre seu próximo Pokémon. Consulte informações e guarde seus
          favoritos.
        </p>

        <div className={styles["search-area"]}>
          <input
            type="text"
            value={nomePokemon}
            onChange={(event) => setNomePokemon(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !carregando) {
                void buscarPokemon();
              }
            }}
            placeholder="Ex: pikachu"
            aria-label="Nome do Pokémon"
          />

          <div className={styles["search-buttons"]}>
            <button
              type="button"
              onClick={() => void buscarPokemon()}
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
          <p className={styles["error-message"]} role="alert">
            {mensagemErro || erroFavoritos}
          </p>
        )}

        {pokemonAtual && (
          <div
            className={styles["pokemon-result"]}
            style={estiloPokemon}
            key={pokemonAtual.id}
          >
            <div className={styles["pokemon-image-frame"]}>
              <span className={styles["pokemon-number"]}>
                N.º {String(pokemonAtual.id).padStart(3, "0")}
              </span>

              <img
                className={styles["pokemon-image"]}
                src={spriteAnimado}
                alt={pokemonAtual.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src =
                    pokemonAtual.sprites.front_default ?? "";
                }}
              />

              <span className={styles["pokemon-scanline"]} aria-hidden="true" />
            </div>

            <div className={styles["pokemon-info"]}>
              <p className={styles["pokemon-name"]}>
                <strong>Nome:</strong> {pokemonAtual.name}
              </p>

              <div className={styles["pokemon-type-row"]}>
                <strong>Tipo:</strong>

                <div className={styles["pokemon-types"]}>
                  {pokemonAtual.types.map(({ type }) => (
                    <span
                      className={`${styles["type-badge"]} type-${type.name}`}
                      key={type.name}
                    >
                      {nomesTipos[type.name] ?? type.name}
                    </span>
                  ))}
                </div>
              </div>

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
                {pokemonAtual.base_experience ?? "—"}
              </p>
            </div>

            <button
              className={styles["favorite-button"]}
              type="button"
              onClick={() => adicionarFavorito(pokemonAtual)}
              disabled={pokemonJaEfavorito}
            >
              {pokemonJaEfavorito ? "Favoritado" : "Favoritar"}
            </button>
          </div>
        )}

        <section className={styles["favorites-section"]}>
          <h2>Meus favoritos</h2>

          {favoritos.length === 0 ? (
            <p>Você ainda não tem Pokémon favorito. Que tal encontrar um?</p>
          ) : (
            <ul className={styles["favorites-grid"]}>
              {favoritos.map((pokemon) => (
                <li className={styles["favorite-card"]} key={pokemon.id}>
                  <img
                    src={pokemon.sprites.front_default ?? ""}
                    alt={pokemon.name}
                  />

                  <span>{pokemon.name}</span>

                  <button
                    type="button"
                    onClick={() => removerFavorito(pokemon.id)}
                    aria-label={`Remover ${pokemon.name} dos favoritos`}
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
