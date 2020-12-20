import articleApi from '@/api/article';

const state = {
  data: null,
  isLoading: false,
  error: null
};

export const mutationTypes = {
  getArtcileStart: '[article] getArticleStart',
  getArtcileSuccess: '[article] getArticleSuccess',
  getArtcileFailure: '[article] getArticleFailure',
  deleteArtcileStart: '[article] deleteArticleStart',
  deleteArtcileSuccess: '[article] deleteArticleSuccess',
  deleteArtcileFailure: '[article] deleteArticleFailure'
};

export const actionTypes = {
  getArticle: '[article] Get Article',
  deleteArticle: '[article] Delete Article'
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
  },
  [mutationTypes.deleteArtcileStart]() {},
  [mutationTypes.deleteArtcileSuccess]() {},
  [mutationTypes.deleteArtcileFailure]() {}
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
  },
  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteArtcileStart, slug);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArtcileSuccess);
          resolve();
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArtcileFailure);
        });
    });
  }
};

export default {
  state,
  actions,
  mutations
};
