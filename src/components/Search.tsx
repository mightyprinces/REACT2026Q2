import {
  type ChangeEvent,
  type SyntheticEvent,
  useState
} from 'react';

type Props = {
  onSearch: (value: string) => void;
};

export default function Search({ onSearch }: Props) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem('searchTerm') ?? '';
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = value.trim();
    const savedSearch = localStorage.getItem('searchTerm') ?? '';

    if (trimmedValue === savedSearch) {
      return;
    }

    localStorage.setItem('searchTerm', trimmedValue);
    onSearch(trimmedValue);
  }

  return (
    <section>
      <form
        className='search'
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
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
