import { getSmartContract } from "../../utils/api.js";
import issuersAbi from "@/data/abis/issuerabi.json";
import { WITHDRAWAL_DONE, WITHDRAW_ISSUER } from "../actions/withdrawal.js";

const state = {
  withdrawing: false,
  withdrawRequests: {}
};

const getters = {
  isWithdrawing: state => {
    return state.withdrawing;
  },
  getWithdrawalInfo: state => {
    return state.withdrawRequests;
  }
};

const actions = {
  [WITHDRAW_ISSUER]: async ({ commit, state }, { issuerDAPP, userPK }) => {
    commit(WITHDRAW_ISSUER);
    if (
      state.withdrawRequests[issuerDAPP] &&
      state.withdrawRequests[issuerDAPP][userPK]
    ) {
      commit("stopLoading");
      return state.withdrawRequests[issuerDAPP][userPK];
    }
    const contract = getSmartContract({ address: issuerDAPP, abi: issuersAbi });
    const result = await contract.methods.wRequests(userPK).call();
    const claimedWR = result.claimedWR;
    const active = result.active;
    const details = result.details;
    const timestamp = result.timestamp;
    const result2 = { claimedWR, active, details, timestamp };
    commit(WITHDRAWAL_DONE, {
      userPK,
      scAddress: issuerDAPP,
      result: result2
    });
    return result2;
  }
};

const mutations = {
  [WITHDRAW_ISSUER]: state => {
    state.withdrawing = true;
  },
  [WITHDRAWAL_DONE]: (state, { userPK, scAddress, result }) => {
    state.claimingInfo = false;
    if (!state.withdrawRequests[scAddress]) {
      state.withdrawRequests[scAddress] = {};
    }
    state.withdrawRequests[scAddress][userPK] = result;
  },
  stopLoadingRequest: state => {
    state.withdrawing = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
