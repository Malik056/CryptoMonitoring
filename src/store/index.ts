import { createStore } from 'vuex'
import user from "./modules/user";
import auth from "./modules/auth";
import issuers from "./modules/issuers";
import claims from "./modules/claim";
import withdrawals from "./modules/withdrawal";
import registry from "./modules/trust_registry";


export const server = "http://csb.certit.eu/";
export const blockChainAddress = "http://51.38.226.91:8545";
export const assetTypes = ["E-Money Token", "Security Token", "CryptoAsset","Utility Token","Asset Reference Token"];
export const marketInfrastructureType = ["TSSDLT (sistema di negoziazione e regolamento DLT)", "MTFDLT (sistema multilaterale di negoziazione DLT)" , "SSDLT (sistema di regolamento titoli DLT)"];
export const apiEndpoint = "http://csb.certit.eu";


export default createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  modules: {
    user,
    auth,
    issuers,
    registry,
    claims,
    withdrawals,
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
