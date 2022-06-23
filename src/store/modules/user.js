import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import { apiCall } from "../../utils/api";
import { AUTH_LOGOUT } from "../actions/auth";

const state = {
  isSidebarMinimized: false,
  userName: localStorage.getItem("user") ?? "Vasili S"
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
  isSidebarMinimized: state => state.isSidebarMinimized
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    apiCall({ url: "user/me" })
      .then(resp => {
        commit(USER_SUCCESS, resp);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  updateSidebarCollapsedState(state, isSidebarMinimized) {
    state.isSidebarMinimized = isSidebarMinimized;
  },
  changeUserName(state, newUserName) {
    state.userName = newUserName;
  }
  // [USER_REQUEST]: state => {
  //   state.status = "loading";
  // },
  // [USER_SUCCESS]: (state, resp) => {
  //   state.status = "success";
  //   Vue.set(state, "profile", resp);
  // },
  // [USER_ERROR]: state => {
  //   state.status = "error";
  // },
  // [AUTH_LOGOUT]: state => {
  //   state.profile = {};
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};
