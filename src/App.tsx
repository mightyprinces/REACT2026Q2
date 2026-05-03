import { Component, type ReactNode } from 'react';

import './App.css';
import Search from './components/Search/Search';
import Results from './components/Results';
import type { CardType, PokemonListItem } from './types';

type State = {
  items: CardType[];
  isLoading: boolean;
  error: string;
}

export default class App extends Component<object, State> {
  state: State = {
    items: [],
    isLoading: false,
    error: '',
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
        let items: CardType[];

        // на случай если у покемоной нет какой-то ability
        const primaryAbility = data.abilities[0]?.ability.name ?? 'unknown';
        const hiddenAbility = data.abilities[1]?.ability.name ?? 'none';

        if ('results' in data) {
          items = data.results.map((pokemon: PokemonListItem, index: number) => ({
            id: index + 1,
            name: pokemon.name,
            description: `
              Primary ability: ${primaryAbility}, 
              Hidden ability: ${hiddenAbility}`
          }));
        } else {
          items = [
            {
              id: data.id,
              name: data.name,
              description: `
              Primary ability: ${primaryAbility}, 
              Hidden ability: ${hiddenAbility}`
            },
          ];
        }

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

  render(): ReactNode {
    return (
      <>
        <h1>Let&apos;s search for Pokemon</h1>
        <Search onSearch={this.handleSearch} />
        <Results
          items={this.state.items}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
      </>
    )
  }

}
