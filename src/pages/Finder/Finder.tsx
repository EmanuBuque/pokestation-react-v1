import { useState } from "react";
import type { Pokemon } from "../../types/pokemon";
import { buscarPokemonPorNome } from "../../services/pokeApi";
import { useFavorites } from "../../hooks/useFavorites";
import { formatarNome } from "../../utils/formatar";
import PageHeader from "../../components/PageHeader/PageHeader";
import SearchForm from "../../components/SearchForm/SearchForm";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import buttons from "../../styles/buttons.module.css";
import styles from "./Finder.module.css";

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
    // "Mr Mime" vira "mr-mime", que é o formato que a PokéAPI espera
    const nome = nomePokemon.trim().toLowerCase().replaceAll(" ", "-");

    if (!nome) {
      setMensagemErro("Digite o nome ou número de um Pokémon.");
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
    <div className={styles.finder}>
      <PageHeader titulo="Buscar Pokémon" />

      <SearchForm
        valor={nomePokemon}
        carregando={carregando}
        mudarTexto={setNomePokemon}
        buscar={buscarPokemon}
      >
        {(pokemonAtual || nomePokemon) && (
          <button className={buttons.quiet} type="button" onClick={limparResultado}>
            Limpar
          </button>
        )}
      </SearchForm>

      {(mensagemErro || erroFavoritos) && (
        <p className={styles.error}>
          {mensagemErro || erroFavoritos}
        </p>
      )}

      <div className={styles.result}>
        {pokemonAtual ? (
          <PokemonCard key={pokemonAtual.id} pokemon={pokemonAtual}>
            {pokemonJaEfavorito ? (
              <button
                className={buttons.secondary}
                type="button"
                onClick={() => removerFavorito(pokemonAtual.id)}
              >
                Remover dos favoritos
              </button>
            ) : (
              <button
                className={buttons.primary}
                type="button"
                onClick={() => adicionarFavorito(pokemonAtual)}
              >
                Favoritar
              </button>
            )}
          </PokemonCard>
        ) : (
          !mensagemErro && (
            <p className={styles.hint}>
              Experimente <strong>charizard</strong>, <strong>gengar</strong> ou o número <strong>133</strong>.
            </p>
          )
        )}
      </div>

      <section className={styles.favorites}>
        <div className={styles.favoritesHeading}>
          <h2>Favoritos</h2>
          <p>
            {favoritos.length === 0
              ? "Os Pokémon que você favoritar aparecem aqui."
              : `${favoritos.length} salvos neste navegador. Clique em um para abrir.`}
          </p>
        </div>

        {favoritos.length > 0 && (
          <ul className={styles.favoritesList}>
            {favoritos.map((pokemon) => (
              <li
                key={pokemon.id}
                className={pokemon.id === pokemonAtual?.id ? styles.favoriteAtivo : undefined}
              >
                <button
                  className={styles.favoriteOpen}
                  type="button"
                  onClick={() => {
                    setPokemonAtual(pokemon);
                    setMensagemErro("");
                  }}
                >
                  <img src={pokemon.sprites.front_default ?? ""} alt="" />
                  <span>{formatarNome(pokemon.name)}</span>
                </button>

                <button
                  className={styles.favoriteRemove}
                  type="button"
                  onClick={() => removerFavorito(pokemon.id)}
                  aria-label={`Remover ${formatarNome(pokemon.name)} dos favoritos`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Finder;
