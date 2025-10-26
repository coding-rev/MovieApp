import { render, screen } from '@testing-library/react';
import MovieCard from '../../components/movies/MovieCard';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const mockMovie = {
  id: '1',
  title: 'Inception',
  year: 2010,
  genre: 'Sci-Fi',
  rating: 8.8,
  thumbnail: 'https://example.com/inception.jpg',
};

describe('MovieCard Component', () => {
  it('renders movie title, year, genre, and rating', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText(/8\.8/)).toBeInTheDocument();
  });

  it('renders thumbnail image', () => {
    render(<MovieCard movie={mockMovie} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockMovie.thumbnail);
    expect(img).toHaveAttribute('alt', mockMovie.title);
  });
});
