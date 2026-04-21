import React from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/movieService';

export default function MoviesList() {
  const [movies] = React.useState(getMovies());

  return (
    <div>
      <h2>Movies</h2>
      {movies.map(m => (
        <div key={m.id} className="card movie-card">
          <div className="card-body">
            <h5 className="card-title">{m.title} ({m.year})</h5>
            <p className="card-text">Reviews: {m.reviews ? m.reviews.length : 0}</p>
            <Link to={`/movies/${m.id}`} className="btn btn-primary me-2">View</Link>
            <Link to={`/movies/${m.id}/review`} className="btn btn-secondary">Add Review</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
