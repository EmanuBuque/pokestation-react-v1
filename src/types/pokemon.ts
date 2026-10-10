
export type PokemonTypeName =
    | "normal"
    | "fire"
    | "water"
    | "electric"
    | "grass"
    | "ice"
    | "fighting"
    | "poison"
    | "ground"
    | "flying"
    | "psychic"
    | "bug"
    | "rock"
    | "ghost"
    | "dragon"
    | "dark"
    | "steel"
    | "fairy";

export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;

    species: {
        url: string;
    };

    sprites: {
        front_default: string | null;
    };

    stats: PokemonStat[];

    types: {
        slot: number;
        type: {
            name: PokemonTypeName;
            url: string;
        };
    }[];
}

export interface PokemonSpecies {
    is_mythical: boolean;
    is_legendary: boolean;
    capture_rate: number;
}

export interface PokemonColecao {
    id: number;
    name: string;
    sprite: string | null;
    raridade: string;
}
