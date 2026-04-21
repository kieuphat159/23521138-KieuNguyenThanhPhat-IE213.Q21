const STORAGE_KEY = 'lab04_movies_v1';

const sampleMovies = [
  { id: '1', title: 'The Shawshank Redemption', year: 1994, reviews: [] },
  { id: '2', title: 'The Godfather', year: 1972, reviews: [] },
  { id: '3', title: 'The Dark Knight', year: 2008, reviews: [] }
];

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleMovies));
    return sampleMovies.slice();
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleMovies));
    return sampleMovies.slice();
  }
}

function save(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

export function getMovies() {
  return load();
}

export function getMovieById(id) {
  const movies = load();
  return movies.find(m => m.id === id) || null;
}

export function addReview(movieId, review) {
  const movies = load();
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return false;
  movie.reviews = movie.reviews || [];
  movie.reviews.push(review);
  save(movies);
  return true;
}
