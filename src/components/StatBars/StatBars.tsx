import type { CSSProperties } from "react";
import { nomesStatus } from "../../utils/display";
import styles from "./StatBars.module.css";

interface StatBarsProps {
  valores: number[];
  // Valor que enche a barra inteira; 180 cobre quase todos os Pokémon sem achatar os comuns
  maximo?: number;
  cor?: string;
  rotulos?: (valor: number, indice: number) => string | undefined;
}

function StatBars({ valores, maximo = 180, cor, rotulos }: StatBarsProps) {
  const estilo = cor ? ({ "--bar-color": cor } as CSSProperties) : undefined;

  return (
    <dl className={styles.stats} style={estilo}>
      {valores.map((valor, indice) => {
        const extra = rotulos?.(valor, indice);

        return (
          <div className={styles.row} key={nomesStatus[indice]}>
            <dt>{nomesStatus[indice]}</dt>
            <dd>
              <span className={styles.value}>{valor}</span>
              <span className={styles.track} aria-hidden="true">
                <span
                  className={styles.fill}
                  style={{ width: `${Math.min(100, (valor / maximo) * 100)}%` }}
                />
              </span>
              {extra && <span className={styles.extra}>{extra}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export default StatBars;
