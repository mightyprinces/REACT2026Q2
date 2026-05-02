import { Component, type ReactNode } from 'react';

import './App.css'
import Search from './components/Search/Search'

export default class App extends Component {
  handleSearch = (value: string) => {
    console.log('App делает поиск:', value);
  }

  render(): ReactNode {
    return (
      <>
        <h1>Let&apos;s search for Pokemon</h1>

        <section id="search">
          <Search onSearch={this.handleSearch}></Search>

        </section>

        <section id="results">

        </section>
      </>
    )
  }

}
