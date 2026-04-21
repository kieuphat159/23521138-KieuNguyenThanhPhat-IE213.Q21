import React from 'react';
import { Link } from 'react-router-dom';
import { getMovieById } from '../services/movieService';

export default function Movie(props) {
  const { id } = props.match.params;
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    setMovie(getMovieById(id));
  }, [id]);

  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <h2>{movie.title} ({movie.year})</h2>
      <Link to={`/movies/${movie.id}/review`} className="btn btn-secondary mb-3">Add Review</Link>
      <h4>Reviews</h4>
      {(!movie.reviews || movie.reviews.length === 0) && <p>No reviews yet.</p>}
      <ul className="list-group">
        {(movie.reviews || []).map((r, idx) => (
          <li key={idx} className="list-group-item">
            <strong>{r.name}</strong> ({r.rating}/5)
            <p>{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
