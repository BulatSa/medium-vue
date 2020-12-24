import axios from '@/api/axios';

const register = credential => {
  return axios.post('/users', {user: credential});
};

const login = credential => {
  return axios.post('/users/login', {user: credential});
};

const getCurrentUser = () => {
  return axios.get('/user');
};

const updateCurrentUser = currentUserInput => {
  return axios
    .put('/user', {user: currentUserInput})
    .then(response => response.data.user);
};

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser
};
