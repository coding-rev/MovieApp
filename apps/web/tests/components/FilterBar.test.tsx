import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../../components/movies/FilterBar';
import { vi } from 'vitest';
import { createQueryClientWrapper } from '../utils/testWrapper'; 

// --- Mock next/navigation ---
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// --- Mock useMovies hook ---
vi.mock('@hooks/Queries/useMovies', () => ({
  useMovies: () => ({
    getGenres: {
      data: ['Action', 'Comedy', 'Drama'],
    },
  }),
}));

describe('FilterBar Component', () => {
  let setFilterQueryMock: (query: string) => void;

  beforeEach(() => {
    setFilterQueryMock = vi.fn();
    render(
      createQueryClientWrapper(<FilterBar setFilterQuery={setFilterQueryMock} />)
    );
  });

  it('renders Filter button', () => {
    const button = screen.getByText(/Filter/i);
    expect(button).toBeInTheDocument();
  });

  it('renders genre select with options', () => {
    const genreSelect = screen.getByRole('combobox', { name: /Genre/i });
    fireEvent.click(genreSelect);

    expect(screen.getByRole('option', { name: 'Select Genre' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Comedy' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Drama' })).toBeInTheDocument();
  });

  it('resets filters when Reset button is clicked', () => {
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    const genreSelect = screen.getByRole('combobox', { name: /Genre/i }) as HTMLSelectElement;
    expect(genreSelect.value).toBe(''); // defaultFilters
  });

  it('applies filters when Apply button is clicked', () => {
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    expect(setFilterQueryMock).toHaveBeenCalledWith(expect.any(String));
  });
});
