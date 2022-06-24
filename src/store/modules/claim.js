import { CLAIM_ISSUER, INFO_CLAIMED } from "../actions/claim.js";
import { getSmartContract } from "../../utils/api.js";
import issuersAbi from "@/data/abis/issuerabi.json";

const state = {
  claimingInfo: false,
  claimedInfo: {}
};

const getters = {
  isClaiming: state => {
    return state.claimingInfo;
  },
  getClaimedInfo: state => {
    return state.claimedInfo;
  }
};

const actions = {
  [CLAIM_ISSUER]: async ({ commit, state }, { issuerDAPP, userPK }) => {
    commit(CLAIM_ISSUER);
    if (
      state.claimedInfo[issuerDAPP] &&
      state.claimedInfo[issuerDAPP][userPK]
    ) {
      commit("stopLoading");
      return state.claimedInfo[issuerDAPP][userPK];
    }
    const contract = getSmartContract({ address: issuerDAPP, abi: issuersAbi });
    const result = await contract.methods.claims(userPK).call();
    const claimedCA = result.claimedCA;
    const active = result.active;
    const details = result.details;
    const timestamp = result.timestamp;
    const result2 = { claimedCA, active, details, timestamp };
    commit(INFO_CLAIMED, {
      userPK,
      scAddress: issuerDAPP,
      result: result2,
    });
    return result2;
  }
};

const mutations = {
  [CLAIM_ISSUER]: state => {
    state.claimingInfo = true;
  },
  [INFO_CLAIMED]: (state, { userPK, scAddress, result }) => {
    state.claimingInfo = false;
    if (!state.claimedInfo[scAddress]) {
      state.claimedInfo[scAddress] = {};
    }
    state.claimedInfo[scAddress][userPK] = result;
  },
  stopLoading: state => {
    state.claimingInfo = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
