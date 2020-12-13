import popularTagsApi from '@/api/popularTags';

const state = {
  data: null,
  isLoading: false,
  error: null
};

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] getFeedPopularTagsStart',
  getPopularTagsSuccess: '[popularTags] getFeedPopularTagsSuccess',
  getPopularTagsFailure: '[popularTags] getFeedPopularTags'
};

export const actionTypes = {
  getPopularTags: '[popularTags] PopularTags'
};

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getPopularTagsFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getPopularTagsStart);
      popularTagsApi
        .getPopularTags()
        .then(tags => {
          context.commit(mutationTypes.getPopularTagsSuccess, tags);
          resolve(tags);
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagsFailure);
        });
    });
  }
};

export default {
  state,
  actions,
  mutations
};
