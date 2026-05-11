import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from './CardList';

describe('CardList', () => {
  const items = [
    {
      id: 1,
      name: 'bulbasaur',
      description: 'Primary ability: overgrow',
    },
    {
      id: 2,
      name: 'ivysaur',
      description: 'Primary ability: chlorophyll',
    },
  ];

  it('renders', () => {
    render(<CardList items={items} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  })

  it('renders pokemon descriptions', () => {
    render(<CardList items={items} />);

    expect(screen.getByText('Primary ability: overgrow')).toBeInTheDocument();
    expect(screen.getByText('Primary ability: chlorophyll')).toBeInTheDocument();
  });

  it('renders an empty list when items array is empty', () => {
    const { container } = render(<CardList items={[]} />);

    expect(container.querySelector('ul')).toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(0);
  });
})