import type { CSSProperties } from "react";
import type { PokemonRarity } from "../../types/pokemon";
import { corRaridade, rotuloRaridade } from "../../utils/display";
import styles from "./RarityTag.module.css";

interface RarityTagProps {
  raridade: PokemonRarity;
  variante?: "selo" | "texto";
}

// Lendário ganha um brilho dourado e Mítico um arco-íris, como na versão original
const efeitos: Partial<Record<PokemonRarity, string>> = {
  Lendario: styles.lendario,
  Mitico: styles.mitico,
};

function RarityTag({ raridade, variante = "selo" }: RarityTagProps) {
  const classes = [styles[variante], efeitos[raridade]].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      style={{ "--rarity": corRaridade(raridade) } as CSSProperties}
    >
      {rotuloRaridade(raridade)}
    </span>
  );
}

export default RarityTag;
