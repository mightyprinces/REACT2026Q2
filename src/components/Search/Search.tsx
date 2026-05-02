import { Component, type ReactNode } from 'react';
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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value
    })
  };

  handleSubmit = () => {
    const trimmedValue = this.state.value.trim();
    localStorage.setItem('searchTerm', trimmedValue);
    this.props.onSearch(trimmedValue);
  }

  render(): ReactNode {
    return (
      <form className={styles.search}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        <button
          type="submit"
          disabled={!this.state.value.trim()}
          onClick={this.handleSubmit}
        >
          Search
        </button>
      </form>
    )
  }

}
