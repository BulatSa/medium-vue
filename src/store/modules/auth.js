const state = {
  isSubmiting: false
};

const mutations = {
  registerStart(state) {
    state.isSubmiting = true;
  }
};

export default {
  state,
  mutations
};
