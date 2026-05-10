import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';

describe('Card', () => {
  it('renders pokemon name with capital first letter', () => {
    const item = {
      id: 1,
      name: 'bulbasaur',
      description: 'Primary ability: overgrow, Hidden ability: chlorophyll',
    };

    render(<Card item={item} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('renders pokemon description', () => {
    const item = {
      id: 1,
      name: 'bulbasaur',
      description: 'Primary ability: overgrow, Hidden ability: chlorophyll',
    };
    const description = screen.getByText(
      'Primary ability: overgrow, Hidden ability: chlorophyll'
    );
    render(<Card item={item} />);

    // expect(
    //   screen.getByText('Primary ability: overgrow, Hidden ability: chlorophyll')
    // ).toBeInTheDocument();

    expect(description).toBeInTheDocument();
  });
});
