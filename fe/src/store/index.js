import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allfiles: [],
    checked: [],
  },
  getters: {
    isChecked: (state) => (id) => {
      return state.checked.includes(id);
    },
    count: (state) => {
      return state.checked.length;
    },
    checkAll: (state) => {
      return state.checked.length === state.allfiles.length;
    },
    checked: (state) => {
      return state.checked;
    },
  },
  mutations: {
    reset(state) {
      state.checked = [];
    },
    all(state, payload) {
      for (let item of payload) {
        if (!state.allfiles.includes(item.md5)) {
          state.allfiles.push(item.md5);
        }
      }
    },

    handleSingle(state, payload) {
      let index = state.checked.indexOf(payload);
      if (index === -1) {
        state.checked.push(payload);
      } else {
        state.checked.splice(index, 1);
      }
      //   console.log(state.checked);
    },
  },
  actions: {},
});
