import React from 'react';

export default function Login(props) {
  const [name, setName] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const user = { name: name || 'Guest' };
    props.login(user);
    props.history.push('/movies');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
}
