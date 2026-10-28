import type { CSSProperties } from "react";
import { nomesStatus } from "../../utils/formatar";
import styles from "./StatBars.module.css";

interface StatBarsProps {
  valores: number[];
  // Valor que enche a barra inteira; 180 cobre quase todos os Pokémon
  maximo?: number;
  cor?: string;
  // Texto extra no fim de cada barra (ex: "Forte"), usado no Team Builder
  niveis?: string[];
}

function StatBars({ valores, maximo = 180, cor, niveis }: StatBarsProps) {
  // Passa a cor para o CSS através da variável --bar-color
  const estilo = { "--bar-color": cor } as CSSProperties;

  return (
    <dl className={styles.stats} style={cor ? estilo : undefined}>
      {valores.map((valor, indice) => (
        <div className={styles.row} key={nomesStatus[indice]}>
          <dt>{nomesStatus[indice]}</dt>
          <dd>
            <span className={styles.value}>{valor}</span>
            <span className={styles.track}>
              <span
                className={styles.fill}
                style={{ width: `${Math.min(100, (valor / maximo) * 100)}%` }}
              />
            </span>
            {niveis && <span className={styles.extra}>{niveis[indice]}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default StatBars;
