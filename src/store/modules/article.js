import articleApi from '@/api/article';

const state = {
  data: null,
  isLoading: false,
  error: null
};

export const mutationTypes = {
  getArtcileStart: '[article] getArticleStart',
  getArtcileSuccess: '[article] getArticleSuccess',
  getArtcileFailure: '[article] getArticleFailure'
};

export const actionTypes = {
  getArticle: '[article] Get Article'
};

const mutations = {
  [mutationTypes.getArtcileStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArtcileSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArtcileFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArtcileStart, slug);
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getArtcileSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArtcileFailure);
        });
    });
  }
};

export default {
  state,
  actions,
  mutations
};
