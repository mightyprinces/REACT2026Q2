export const createFetchResponse = (data: unknown, ok = true) => {
  return {
    ok,
    json: () => Promise.resolve(data),
  } as Response;
};

export const pokemonListResponse = {
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
  ],
};

export const bulbasaurDetailsResponse = {
  id: 1,
  name: 'bulbasaur',
  abilities: [
    {
      ability: {
        name: 'overgrow',
      },
    },
    {
      ability: {
        name: 'chlorophyll',
      },
    },
  ],
};

export const pikachuDetailsResponse = {
  id: 25,
  name: 'pikachu',
  abilities: [
    {
      ability: {
        name: 'static',
      },
    },
    {
      ability: {
        name: 'lightning-rod',
      },
    },
  ],
};
