import type { PokemonRarity, PokemonSpecies } from "../types/pokemon";

// capture_rate vai de 3 (muito difícil de capturar) a 255 (muito fácil).
// Quanto menor, mais raro.
export function descobrirRaridade(dados: PokemonSpecies): PokemonRarity {
    if (dados.is_mythical) return "Mitico";
    if (dados.is_legendary) return "Lendario";
    if (dados.capture_rate <= 35) return "épico";
    if (dados.capture_rate <= 100) return "Raro";
    if (dados.capture_rate <= 165) return "Incomum";

    return "Comum";
}
