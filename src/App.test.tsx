import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import {
  bulbasaurDetailsResponse,
  createFetchResponse,
  pikachuDetailsResponse,
  pokemonListResponse,
} from './test-utils/pokemonMocks';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('fetches pokemon list on initial render when search term is empty', async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock
      .mockResolvedValueOnce(createFetchResponse(pokemonListResponse))
      .mockResolvedValueOnce(createFetchResponse(bulbasaurDetailsResponse));

    render(<App />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      );
    });
  });

  it('renders pokemon card after successful list loading', async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock
      .mockResolvedValueOnce(createFetchResponse(pokemonListResponse))
      .mockResolvedValueOnce(createFetchResponse(bulbasaurDetailsResponse));

    render(<App />);

    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText(/Primary ability: overgrow/)).toBeInTheDocument();
    expect(screen.getByText(/Hidden ability: chlorophyll/)).toBeInTheDocument();
  });

  it('fetches saved pokemon from localStorage on initial render', async () => {
    const fetchMock = vi.mocked(fetch);

    localStorage.setItem('searchTerm', 'pikachu');

    fetchMock.mockResolvedValueOnce(createFetchResponse(pikachuDetailsResponse));

    render(<App />);

    expect(await screen.findByText('Pikachu')).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });

  it('renders error message when pokemon request fails', async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock.mockResolvedValueOnce(createFetchResponse({}, false));

    render(<App />);

    expect(await screen.findByText('Pokemon not found')).toBeInTheDocument();
  });

  it('renders error boundary fallback when error button is clicked', async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock
      .mockResolvedValueOnce(createFetchResponse(pokemonListResponse))
      .mockResolvedValueOnce(createFetchResponse(bulbasaurDetailsResponse));

    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    screen.getByRole('button', { name: 'Error Boundary Button' }).click();

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });

});
