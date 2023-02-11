import { createContext } from 'react';

import { PokemonDetailType } from '../shared/model';

export const mainContext = createContext<{
    curPokemon: PokemonDetailType | null;
    setCurPokemon: (data: PokemonDetailType) => void;
} | null>(null);