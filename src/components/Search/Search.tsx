import {
  Component,
  type ReactNode,
  type ChangeEvent,
  type SyntheticEvent
} from 'react';

import styles from './Search.module.scss'

type Props = {
  onSearch: (value: string) => void;
};

type State = {
  value: string;
};


export default class Search extends Component<Props, State> {
  state = {
    value: '',
  }

  componentDidMount() {
    const savedSearch = localStorage.getItem('searchTerm') ?? '';
    this.setState({ value: savedSearch });
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value
    })
  };

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = this.state.value.trim();

    localStorage.setItem('searchTerm', trimmedValue);
    this.props.onSearch(trimmedValue);
  }

  render(): ReactNode {
    return (
      <section>
        <form
          className={styles.search}
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
          <button
            type="submit"
            disabled={!this.state.value.trim()}
          >
            Search
          </button>
        </form>
        <p className={styles.searchExampleText}>example: bulbasaur, ivysaur</p>
      </section>

    )
  }

}
