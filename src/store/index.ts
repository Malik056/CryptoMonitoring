import { createStore } from 'vuex'
import user from "./modules/user";
import auth from "./modules/auth";
import issuers from "./modules/issuers";
import registry from "./modules/trust_registry";


export const server = "http://csb.certit.eu/";
export const blockChainAddress = "http://51.38.226.91:8545";

export default createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  modules: {
    user,
    auth,
    issuers,
    registry
  },
  // state: {

  // },
  // mutations: {
  //   updateSidebarCollapsedState(state, isSidebarMinimized) {
  //     state.isSidebarMinimized = isSidebarMinimized
  //   },
  //   changeUserName(state, newUserName) {
  //     state.userName = newUserName
  //   }
  // },
})
