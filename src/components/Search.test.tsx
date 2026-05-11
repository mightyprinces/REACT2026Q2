import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Search from './Search';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders empty input when there is no saved search term', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('renders saved search term from localStorage', () => {
    const onSearch = vi.fn();

    localStorage.setItem('searchTerm', 'pikachu');

    render(<Search onSearch={onSearch} />);

    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('calls onSearch with trimmed input value on submit', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    await user.type(screen.getByRole('textbox'), '  charmander  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledWith('charmander');
    expect(localStorage.getItem('searchTerm')).toBe('charmander');
  });

  it('does not call onSearch when submitted value is the same as saved value', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    localStorage.setItem('searchTerm', 'pikachu');

    render(<Search onSearch={onSearch} />);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).not.toHaveBeenCalled();
    expect(localStorage.getItem('searchTerm')).toBe('pikachu');
  });
});
