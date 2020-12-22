import articleApi from '@/api/article';

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null
};

export const mutationTypes = {
  updateArticleStart: '[updateArticle] Update Article Start',
  updateArticleSuccess: '[updateArticle] Update Article Success',
  updateArticleFailure: '[updateArticle] Update Article Failure',

  getApdateArticleStart: '[getUpdateArticle] Get Article Start',
  getApdateArticleSuccess: '[getUpdateArticle] Get Article Success',
  getApdateArticleFailure: '[getUpdateArticle] Get Article Failure'
};

export const actionTypes = {
  updateArticle: '[updateArticle] Update article',
  getArticle: '[updateArticle] Get article'
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getApdateArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getApdateArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getApdateArticleFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  [actionTypes.updateArticle](context, {slug, articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateArticleStart);
      articleApi
        .updateArticle(slug, articleInput)
        .then(article => {
          context.commit(mutationTypes.updateArticleSuccess, article);
          resolve(article);
        })
        .catch(result => {
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getApdateArticleStart);
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getApdateArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getApdateArticleFailure);
        });
    });
  }
};

export default {
  state,
  actions,
  mutations
};
