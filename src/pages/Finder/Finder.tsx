import { useState } from "react";
import type { Pokemon } from "../../types/pokemon";
import { PokemonSearchSchema } from "../../types/pokemon";
import { buscarPokemonPorNome } from "../../services/pokeApi";
import { useFavorites } from "../../hooks/useFavorites";
import { nomeExibicao } from "../../utils/display";
import PageHeader from "../../components/PageHeader/PageHeader";
import SearchForm from "../../components/SearchForm/SearchForm";
import PokemonEntry from "../../components/PokemonEntry/PokemonEntry";
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

  return (
    <div className={styles.finder}>
      <PageHeader
        titulo="Buscar Pokémon"
        descricao="Digite um nome ou número da Pokédex para ver tipo, medidas e atributos base."
      />

      <SearchForm
        valor={nomePokemon}
        carregando={carregando}
        aoMudar={setNomePokemon}
        aoBuscar={() => void buscarPokemon()}
      >
        {(pokemonAtual || nomePokemon) && (
          <button className={buttons.quiet} type="button" onClick={limparResultado}>
            Limpar
          </button>
        )}
      </SearchForm>

      {(mensagemErro || erroFavoritos) && (
        <p className={styles.error} role="alert">
          {mensagemErro || erroFavoritos}
        </p>
      )}

      <div className={styles.result} aria-live="polite">
        {pokemonAtual ? (
          <PokemonEntry key={pokemonAtual.id} pokemon={pokemonAtual}>
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
          </PokemonEntry>
        ) : (
          !mensagemErro && (
            <p className={styles.hint}>
              Experimente <strong>charizard</strong>, <strong>gengar</strong> ou o número <strong>133</strong>.
            </p>
          )
        )}
      </div>

      <section className={styles.favorites} aria-labelledby="favoritos-titulo">
        <div className={styles.favoritesHeading}>
          <h2 id="favoritos-titulo">Favoritos</h2>
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
                  <span>{nomeExibicao(pokemon.name)}</span>
                </button>

                <button
                  className={styles.favoriteRemove}
                  type="button"
                  onClick={() => removerFavorito(pokemon.id)}
                  aria-label={`Remover ${nomeExibicao(pokemon.name)} dos favoritos`}
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
