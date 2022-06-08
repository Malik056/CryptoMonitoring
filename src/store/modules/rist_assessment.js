import { getRequest } from "../../utils/api.js";

const state = {
  assessmentTree: {},
  question: {},
  previous: null
};

const getters = {
  getAssessments: state => state.assessmentTree,
  assessment: state => state.question,
};

const actions = {
  getAssessments({ commit }) {
    getRequest({ pathAndQuery: "assessment" }).then(async res => {
      commit("assessemntSuccess", await res.json());
    });
  }
};

const mutations = {
  assessemntSuccess: (state, resp) => {
    state.assessmentTree = resp;
    state.question = resp;
  },
  question: (state, value) => {
    state.question = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
