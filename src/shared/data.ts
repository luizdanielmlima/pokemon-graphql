import axios from 'axios';
import localForage from "localforage";
import { PokemonDetailType, PokemonType } from './model';

export const pokeAPIBaseURL = 'https://pokeapi.co/api/v2';

export const hasLocalData = async () => {
    // removeLocalDB(); // *** TEST ONLY  ***, leave this commented!!

    const localPokemonsData = await getFromLocalDB() as PokemonDetailType[];

    let hasLocalData = true;
    if (!localPokemonsData || localPokemonsData.length === 0) {
      hasLocalData = false;
    }

    return hasLocalData;
}

export const getAllPokemonsData = (limit: number): any => {
  let allPokemonURLs:string[] = [];

  const result = getPokemonsBasicData(limit).then(response => {
    const pokemonsBasicData =
    response && response.data && response.data.results
    ? response.data.results
    : [];
    
    // saves this info to show on limit input ;-)
    localStorage.setItem('maxNumOfPokemons', response?.data.count);

    if (pokemonsBasicData && pokemonsBasicData.length > 0) {
        pokemonsBasicData.forEach((pokemon:PokemonType) => {
          const pokemonURL = `${pokeAPIBaseURL}/pokemon/${pokemon.name}`;
          allPokemonURLs.push(pokemonURL);
        });

        const fullData = getAsyncPokemonsData(allPokemonURLs).then(rawData => {
          const pokemonsData = rawData.map(item => item.data);
          saveToLocalDB(pokemonsData);
          return pokemonsData;
        });
        return fullData;
    }
  });

  return result;
}

export const getAsyncPokemonsData = async (urls: string[]) => {
  let allPromises:any[] = [];
  urls.forEach(url => {
    const promise = axios.get(url);
    allPromises.push(promise);
  });
  const fullData = await Promise.all(allPromises);
  return fullData;
}

export const getPokemonsBasicData = async (limit: number) => {
    const data = await axios
      .get(
        `${pokeAPIBaseURL}/pokemon?limit=${limit}`,
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    // Returns an array of Pokemons with name and url of each Pokemon
    return data;
}

export const getPokemon = async (id: string) => {
  const pokemonURL = `${pokeAPIBaseURL}/pokemon/${id}`;
  const data = await axios
    .get(pokemonURL)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  // Returns the Pokemon full data
  return data;
}

export const saveToLocalDB = (data: any) => {
  localForage.setItem('pokemonDB', data)
  .then( (value) => {
    // console.log('local DB found:', value);
  }).catch( (err) => {
    console.log('Error saving on local DB!');
    return err;
  });
}

export const removeLocalDB = () => {
  localForage.removeItem('pokemonDB')
    .then( (value) => {
      // console.log('DB removed!', value);
    }).catch( (err) => {
      console.log('Error saving on local DB!');
      return err;
    });
}

export const getFromLocalDB = async() => {
  try {
    const value = await localForage.getItem('pokemonDB');
    return value;
  } catch (err) {
      console.log(err);
      return err;
  }
}

export const getPokemonMove = async(url: string) => {
  try {
    const fullData = await axios.get(url);
    return fullData;
  } catch (err) {
      console.log(err);
  }
}

export const saveQueryLimitOnLS = (limit: number) => {
  localStorage.setItem('queryLimit', limit.toString());
}

export const getQueryLimitOnLS = () => {
  const lsLimit = localStorage.getItem('queryLimit');
  return lsLimit;
}
