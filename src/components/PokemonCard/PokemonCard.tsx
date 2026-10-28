import type { CSSProperties, ReactNode } from "react";
import type { Pokemon } from "../../types/pokemon";
import { coresTipos } from "../../constants/pokemonTypes";
import { imagemGrande, formatarNome, formatarNumero } from "../../utils/formatar";
import StatBars from "../StatBars/StatBars";
import TypeBadge from "../TypeBadge/TypeBadge";
import styles from "./PokemonCard.module.css";

interface PokemonCardProps {
  pokemon: Pokemon;
  children?: ReactNode;
}

// Card com os dados do Pokémon. A cor do tipo principal pinta o fundo da arte
function PokemonCard({ pokemon, children }: PokemonCardProps) {
  const cor = coresTipos[pokemon.types[0].type.name];
  const estilo = { "--entry-color": cor } as CSSProperties;

  return (
    <article className={styles.entry} style={estilo}>
      <div className={styles.art}>
        <span className={styles.number}>
          {String(pokemon.id).padStart(3, "0")}
        </span>
        <img src={imagemGrande(pokemon.id)} alt={formatarNome(pokemon.name)} />
      </div>

      <div className={styles.info}>
        <div className={styles.title}>
          <p className={styles.dex}>{formatarNumero(pokemon.id)}</p>
          <h2>{formatarNome(pokemon.name)}</h2>
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

export default PokemonCard;
