import { createStore } from 'vuex'
// import user from "./modules/user";
// import auth from "./modules/auth";

export const server = "http://csb.certit.eu/";

export default createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  // modules: {
  //   user,
  //   auth,
  // }
  state: {
    isSidebarMinimized: false,
    userName: localStorage.getItem('user') ?? 'Vasili S'
  },
  mutations: {
    updateSidebarCollapsedState(state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized
    },
    changeUserName(state, newUserName) {
      state.userName = newUserName
    }
  },
})
