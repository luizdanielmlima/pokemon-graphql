// ApolloClient setup
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Instantiate required constructor fields
const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: 'https://graphqlpokemon.favware.tech/v7',

  // Provide some optional constructor fields
  name: 'graphql-pokemon-client',
  version: '1.0',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
