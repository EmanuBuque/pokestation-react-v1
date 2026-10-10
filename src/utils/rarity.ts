import type { PokemonSpecies } from "../types/pokemon";

export function descobrirRaridade(dados: PokemonSpecies): string {
    if (dados.is_mythical) return "Mitico";
    if (dados.is_legendary) return "Lendario";
    if (dados.capture_rate <= 35) return "épico";
    if (dados.capture_rate <= 100) return "Raro";
    if (dados.capture_rate <= 165) return "Incomum";

    return "Comum";
}

export function classeDaRaridade(raridade: string): string {
    switch (raridade) {
        case "Comum":
            return "pokemon-rarity--common";
        case "Incomum":
            return "pokemon-rarity--uncommon";
        case "Raro":
            return "pokemon-rarity--rare";
        case "épico":
            return "pokemon-rarity--epic";
        case "Lendario":
            return "pokemon-rarity--legendary";
        case "Mitico":
            return "pokemon-rarity--mythical";
        default:
            return "pokemon-rarity--common";
    }
}