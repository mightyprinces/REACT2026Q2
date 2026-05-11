import { Component, type ReactNode } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import type { CardType, PokemonListItem } from './types';

type State = {
  items: CardType[];
  isLoading: boolean;
  error: string;
  shouldThrowError: boolean;
}

export default class App extends Component<object, State> {
  state: State = {
    items: [],
    isLoading: false,
    error: '',
    shouldThrowError: false,
  }

  componentDidMount() {
    const savedSearch = localStorage.getItem('searchTerm') ?? '';
    this.fetchPokemon(savedSearch);
  }

  fetchPokemon = (searchTerm: string) => {
    this.setState({
      isLoading: true,
      error: '',
    });

    const url = (searchTerm)
      ? `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      : `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

    fetch(url)
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
      .then((items: CardType[]) => {
        this.setState({
          items,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          items: [],
          error: error.message,
          isLoading: false,
        });
      });

  }

  handleSearch = (value: string) => {
    localStorage.setItem('searchTerm', value);
    this.fetchPokemon(value);
  }

  handleErrorBoundary = () => {
    this.setState({
      shouldThrowError: true,
    });
  }

  render(): ReactNode {
    if (this.state.shouldThrowError) {
      throw new Error('Simulated application error');
    }

    return (
      <>
        <h1>Let&apos;s search for Pokemon</h1>
        <Search onSearch={this.handleSearch} />
        <Results
          items={this.state.items}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
        <button
          type="button"
          className='errorBoundaryButton'
          onClick={this.handleErrorBoundary}
        >
          Error Boundary Button
        </button>
      </>
    )
  }

}
