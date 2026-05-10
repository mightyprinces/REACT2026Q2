import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Results from './Results';

describe('Results', () => {
  it('renders loading state', () => {
    render(<Results items={[]} isLoading={true} error="" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Results items={[]} isLoading={false} error="Pokemon not found" />);

    expect(screen.getByText('Pokemon not found')).toBeInTheDocument();
  });

  it('renders pokemon cards', () => {
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

    render(<Results items={items} isLoading={false} error="" />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });
});
