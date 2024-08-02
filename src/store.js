import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCategory: '',
    sortOrder: '',
  },
  mutations: {
    setCategory(state, category) {
      state.selectedCategory = category;
    },
    setSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
  },
  actions: {
    updateCategory({ commit }, category) {
      commit('setCategory', category);
    },
    updateSortOrder({ commit }, sortOrder) {
      commit('setSortOrder', sortOrder);
    },
  },
});
