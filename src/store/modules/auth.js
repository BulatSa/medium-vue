import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmiting: false,
  currentUser: null,
  validationErrors: false,
  isLoggedIn: null
};

const mutations = {
  registerStart(state) {
    state.isSubmiting = true;
    state.validationErrors = null;
  },
  registerSuccess(state, payload) {
    state.isSubmiting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  registerFailed(state, payload) {
    state.isSubmiting = false;
    state.validationErrors = payload;
  }
};

const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      context.commit('registerStart');
      authApi
        .register(credentials)
        .then(response => {
          context.commit('registerSuccess', response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit('registerFailed', result.response.data.errors);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
