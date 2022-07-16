import { getRequest, getSmartContract, postRequest, sendTrx } from "../../utils/api.js";
import registryAbi from "@/data/abis/trust_registryabi.json";
// import issuerList from "@/data/tables/markup-table/issuers_list.json";
import {
  ADD_NEW_ISSUER,
  ADD_TO_HASH,
  CHANGE_ISSUER_STATE,
  REGISTRY_LOAD_SUCCESS,
  SET_CONTRACT,
  UPDATE_REGISTRY
} from "../actions/trust_registry.js";
import { marketInfrastructureType } from "../index";
import { UPDATE_ISSUER_STATE } from "../actions/issuers.js";

const state = {
  trustRegistryData: [],
  hashedRegistryData: {},
  page: 0,
  loading: false,
  trustRegistryContract: null
};

const getters = {
  getRegistry: state => {
    return state.trustRegistryData;
  },
  getHashedRegistry: state => {
    return state.hashedRegistryData;
  },
  isTrustRegistryLoading: state => {
    return state.loading && state.trustRegistryData.length == 0;
  },
  getTrustRegistryPage: state => state.page
};

const actions = {
  [UPDATE_REGISTRY]: async ({ commit, state, rootState }) => {
    if (state.loading) {
      return;
    }
    commit(UPDATE_REGISTRY);
    const registries = [];
    const contract = getSmartContract({
      address: "0x399EB5F63BaD5018bB4F082277D948519DF0cdaC",
      abi: registryAbi
    });
    commit(SET_CONTRACT, contract);
    const methods = contract.methods;
    const issuers = rootState.issuers.issuersList.issuers;
    for (let i = 0; i < issuers.length; i++) {
      const issuer = issuers[i];
      const issuingInstitution = await methods
        .issuingInstitution(issuer.address)
        .call();
      const ownerPAName = await methods.ownerPA_Name().call();
      const ownerPAPK = await methods.ownerPA_PK().call();
      const registryDataObj = {};
      registryDataObj.issuerAddress = issuer.address;
      registryDataObj.issuerName = issuingInstitution.issuerName;
      registryDataObj.competentAuth = issuingInstitution.competentAuth;
      registryDataObj.active = issuingInstitution.active;
      registryDataObj.issuerID = issuingInstitution.issuerID;
      registryDataObj.issuerPK = issuingInstitution.issuerPK;
      registryDataObj.offeror = issuingInstitution.offeror;
      registryDataObj.marketInfrastructureType =
        issuingInstitution.marketInfrastructureType == 0
          ? marketInfrastructureType[0]
          : marketInfrastructureType[
              issuingInstitution.marketInfrastructureType - 1
            ];
      registryDataObj.ownerPAName = ownerPAName;
      registryDataObj.ownerPAPK = ownerPAPK;
      registries.push(registryDataObj);
      commit(ADD_TO_HASH, registryDataObj);
    }

    commit(REGISTRY_LOAD_SUCCESS, registries);
  },
  [CHANGE_ISSUER_STATE]: async (context, { enable, address, callback }) => {
    const trx = await sendTrx({
      path: `issuer/${address}/${enable ? "enable" : "disable"}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    });
    if (trx) {
      if (trx.status == 200) {
        callback(true);
        context.commit(CHANGE_ISSUER_STATE, {
          address: address,
          enabled: enable
        });
        context.commit(UPDATE_ISSUER_STATE, { address, active: enable });
        return;
      }
    }
    callback(false);
  },
  [ADD_NEW_ISSUER]: async ({ commit, state, rootState }, { issuer, callback }) => {
    const trx = await sendTrx({
      path: "issuer",
      method: "post",
      body: JSON.stringify(issuer),
      headers: { "Content-Type": "application/json" }
    });

    if(trx && trx.status == 200) {
      const issuerObj = {
        address: issuer.issuerAddress,
        did: issuer.issuerID,
        dapp: issuer.dapp,
      };
      rootState.issuers.commit(ADD_NEW_ISSUER, issuerObj);
      await postRequest({
        pathAndQuery: "addIssuers",
        body: rootState.issuers.state.issuersList,
      })
      return true;
    }
    else {
      return false;
    }
  }
};

const mutations = {
  [ADD_TO_HASH]: (state, obj) => {
    state.hashedRegistryData[obj.issuerAddress] = obj;
  },
  [UPDATE_REGISTRY]: state => {
    state.loading = true;
  },
  [REGISTRY_LOAD_SUCCESS]: (state, data) => {
    state.loading = false;
    state.trustRegistryData = data;
  },
  [SET_CONTRACT]: (state, contract) => {
    state.trustRegistryContract = contract;
  },
  [CHANGE_ISSUER_STATE]: (state, { address, enabled }) => {
    state.hashedRegistryData[address].active = enabled;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
