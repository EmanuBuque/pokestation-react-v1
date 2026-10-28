import type { CSSProperties } from "react";
import type { PokemonRarity } from "../../types/pokemon";
import { pegarCorRaridade, pegarNomeRaridade } from "../../utils/formatar";
import styles from "./RarityTag.module.css";

interface RarityTagProps {
  raridade: PokemonRarity;
  // "selo" = etiqueta colorida, "texto" = só o texto colorido
  variante?: "selo" | "texto";
}

function RarityTag({ raridade, variante = "selo" }: RarityTagProps) {
  let classe = styles[variante];

  // Lendário ganha um brilho dourado e Mítico um arco-íris
  if (raridade === "Lendario") {
    classe += " " + styles.lendario;
  }
  if (raridade === "Mitico") {
    classe += " " + styles.mitico;
  }

  const estilo = { "--rarity": pegarCorRaridade(raridade) } as CSSProperties;

  return (
    <span className={classe} style={estilo}>
      {pegarNomeRaridade(raridade)}
    </span>
  );
}

export default RarityTag;
