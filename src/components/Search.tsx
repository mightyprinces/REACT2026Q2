import {
  Component,
  type ReactNode,
  type ChangeEvent,
  type SyntheticEvent
} from 'react';

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
    const savedSearch = localStorage.getItem('searchTerm') ?? '';

    if (trimmedValue === savedSearch) {
      return;
    }

    localStorage.setItem('searchTerm', trimmedValue);
    this.props.onSearch(trimmedValue);
  }

  render(): ReactNode {
    return (
      <section>
        <form
          className='search'
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
          <button
            type="submit"
            className='searchButton'
          >
            Search
          </button>
        </form>
        <p className='searchExampleText'>example: bulbasaur, ivysaur</p>
      </section>

    )
  }

}
