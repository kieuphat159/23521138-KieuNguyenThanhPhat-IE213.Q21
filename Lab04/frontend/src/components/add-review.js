import React from 'react';
import { addReview, getMovieById } from '../services/movieService';

export default function AddReview(props) {
  const { id } = props.match.params;
  const [name, setName] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    const movie = getMovieById(id);
    if (!movie) {
      props.history.push('/');
    }
  }, [id, props.history]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!props.user) {
      alert('Please login to add a review');
      props.history.push('/login');
      return;
    }
    const review = { name: props.user.name || name || 'Anonymous', rating, text };
    addReview(id, review);
    props.history.push(`/movies/${id}`);
  }

  return (
    <div>
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <select className="form-select" value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Review</label>
          <textarea className="form-control" value={text} onChange={e => setText(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}
