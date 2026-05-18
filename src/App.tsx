import { useEffect, useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import type { CardType, PokemonListItem } from './types';

export default function App() {
  const [items, setItems] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const loadPokemon = (searchTerm: string): Promise<CardType[]> => {
    const url = (searchTerm)
      ? `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      : `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }

        return response.json();
      })
      .then((data) => {
        if ('results' in data) {
          return Promise.all(
            data.results.map((pokemon: PokemonListItem) =>
              fetch(pokemon.url)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('Failed to load pokemon details');
                  }

                  return response.json();
                })
                .then((details) => {
                  const primaryAbility = details.abilities[0]?.ability.name ?? 'unknown';
                  const hiddenAbility = details.abilities[1]?.ability.name ?? 'none';

                  return {
                    id: details.id,
                    name: details.name,
                    description: `
                Primary ability: ${primaryAbility}, 
                Hidden ability: ${hiddenAbility}`,
                  };
                })
            )
          );
        }

        const primaryAbility = data.abilities[0]?.ability.name ?? 'unknown';
        const hiddenAbility = data.abilities[1]?.ability.name ?? 'none';

        return [
          {
            id: data.id,
            name: data.name,
            description: `
        Primary ability: ${primaryAbility}, 
        Hidden ability: ${hiddenAbility}`,
          },
        ];
      })
  }

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchTerm') ?? '';
    loadPokemon(savedSearch)
      .then((items: CardType[]) => {
        setItems(items);
        setError('');
      })
      .catch((error) => {
        setItems([]);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setError('');
    loadPokemon(value)
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        setItems([]);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleErrorBoundary = () => {
    setShouldThrowError(true);
  }

  if (shouldThrowError) {
    throw new Error('Simulated application error');
  }

  return (
    <>
      <h1>Let&apos;s search for Pokemon</h1>
      <Search onSearch={handleSearch} />
      <Results
        items={items}
        isLoading={isLoading}
        error={error}
      />
      <button
        type="button"
        className='errorBoundaryButton'
        onClick={handleErrorBoundary}
      >
        Error Boundary Button
      </button>
    </>
  )
}
