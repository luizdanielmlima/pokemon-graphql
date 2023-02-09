// Models based on the PokeAPI data:
export interface PokemonType {
    name: string;
    url: string;
}

export interface NameUrl {
    name: string;
    url: string;
}

// added the mainType, it's used for the list "order by" functionality ;-)
export interface PokemonDetailType {
    abilities?: any[];
    base_experience?: number;
    forms?: any[];
    game_indices?: any[];
    height?: number;
    held_items?: any[];
    id?: number;
    is_default?: true
    location_area_encounters?: string;
    moves?: any[];
    name?: string;
    order?: number;
    past_types?: any[];
    species?: NameUrl;
    sprites?: Sprite;
    stats?: StatItem[];
    mainType?: string;
    types?: Type[];
    weight?: number;
}

// Specific Types for the Pokemon Details:
export interface AbilityItem {
    ability?: NameUrl;
    is_hidden?: boolean;
    slot?: number;
}

export interface MoveItem {
    move?: NameUrl;
    versioin_group_details?: any;
}

export interface MoveDetails {
    accuracy: number;
    contest_combos: any;
    contest_effect: any;
    contest_type: NameUrl;
    damage_class: NameUrl;
    effect_chance: number;
    effect_changes: any;
    effect_entries: any;
    flavor_text_entries: FlavorTextEntry[];
    generation: NameUrl
    id: number;
    learned_by_pokemon: any;
    machines: any;
    meta: any;
    name: string;
    names: any;
    past_values: any;
    power: number;
    pp: number;
    priority: number;
    stat_changes: any;
    super_contest_effect: any;
    target: NameUrl;
    type: NameUrl;
}

export interface Type {
    slot?: number;
    type: NameUrl;
}

export interface StatItem {
    base_stat?: number;
    effort?: number;
    stat?: NameUrl;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: NameUrl;
    version_group: NameUrl;
}

export interface Sprite {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

// Props Type
export interface PokemonPageItemProps {
    data: PokemonDetailType | null;
  }