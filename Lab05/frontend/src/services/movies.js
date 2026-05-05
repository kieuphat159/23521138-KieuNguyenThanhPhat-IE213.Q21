import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1/movies'
});

class MovieDataService {
  getAll(page = 0) {
    return api.get(`?page=${page}`);
  }

  get(id) {
    return api.get(`/id/${id}`);
  }

  find(query, by = 'title', page = 0) {
    return api.get(`?${by}=${encodeURIComponent(query)}&page=${page}`);
  }

  createReview(data) {
    return api.post('/review', data);
  }

  updateReview(data) {
    return api.put('/review', data);
  }

  deleteReview(data) {
    return api.delete('/review', { data });
  }

  getRatings() {
    return api.get('/ratings');
  }
}

export default new MovieDataService();