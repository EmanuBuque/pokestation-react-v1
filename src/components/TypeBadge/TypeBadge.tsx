import type { CSSProperties } from "react";
import type { PokemonTypeName } from "../../types/pokemon";
import { coresTipos, nomesTipos } from "../../constants/pokemonTypes";
import styles from "./TypeBadge.module.css";

interface TypeBadgeProps {
  tipo: PokemonTypeName;
}

function TypeBadge({ tipo }: TypeBadgeProps) {
  const estilo = { "--type-color": coresTipos[tipo] } as CSSProperties;

  return (
    <span className={styles.badge} style={estilo}>
      {nomesTipos[tipo]}
    </span>
  );
}

export default TypeBadge;
