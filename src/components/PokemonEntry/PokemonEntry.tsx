import type { CSSProperties, ReactNode } from "react";
import type { Pokemon } from "../../types/pokemon";
import { coresTipos } from "../../constants/pokemonTypes";
import { arteOficial, nomeExibicao, numeroPokedex } from "../../utils/display";
import StatBars from "../StatBars/StatBars";
import TypeBadge from "../TypeBadge/TypeBadge";
import styles from "./PokemonEntry.module.css";

interface PokemonEntryProps {
  pokemon: Pokemon;
  children?: ReactNode;
}

// O "registro da Pokédex": a cor do tipo principal domina o painel da arte
function PokemonEntry({ pokemon, children }: PokemonEntryProps) {
  const cor = coresTipos[pokemon.types[0].type.name];
  const estilo = { "--entry-color": cor } as CSSProperties;

  return (
    <article className={styles.entry} style={estilo} aria-labelledby={`pokemon-${pokemon.id}`}>
      <div className={styles.art}>
        <span className={styles.number} aria-hidden="true">
          {String(pokemon.id).padStart(3, "0")}
        </span>
        <img
          src={arteOficial(pokemon)}
          alt=""
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = pokemon.sprites.front_default ?? "";
            event.currentTarget.classList.add(styles.pixel);
          }}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.title}>
          <p className={styles.dex}>{numeroPokedex(pokemon.id)}</p>
          <h2 id={`pokemon-${pokemon.id}`}>{nomeExibicao(pokemon.name)}</h2>
          <div className={styles.types}>
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} tipo={type.name} />
            ))}
          </div>
        </div>

        <dl className={styles.measures}>
          <div>
            <dt>Altura</dt>
            <dd>{(pokemon.height / 10).toLocaleString("pt-BR")} m</dd>
          </div>
          <div>
            <dt>Peso</dt>
            <dd>{(pokemon.weight / 10).toLocaleString("pt-BR")} kg</dd>
          </div>
          <div>
            <dt>Exp. base</dt>
            <dd>{pokemon.base_experience ?? "—"}</dd>
          </div>
        </dl>

        <StatBars valores={pokemon.stats.map((stat) => stat.base_stat)} cor={cor} />

        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </article>
  );
}

export default PokemonEntry;
