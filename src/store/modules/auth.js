import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmiting: false,
  currentUser: null,
  validationErrors: false,
  isLoggedIn: null
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed'
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmiting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmiting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailed](state, payload) {
    state.isSubmiting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmiting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmiting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailed](state, payload) {
    state.isSubmiting = false;
    state.validationErrors = payload;
  }
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.registerFailed,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.loginStart);
      authApi
        .login(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.loginFailed,
            result.response.data.errors
          );
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
