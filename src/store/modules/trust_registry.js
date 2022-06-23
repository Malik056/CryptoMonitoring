import { getSmartContract } from "../../utils/api.js";
import registryAbi from "@/data/abis/trust_registryabi.json";
import issuerList from "@/data/tables/markup-table/issuers_list.json";
import {
  REGISTRY_LOAD_SUCCESS,
  UPDATE_REGISTRY
} from "../actions/trust_registry.js";

const state = {
  trustRegistryData: [],
  page: 0,
  loading: false
};

const getters = {
  getRegistry: state => {
    return state.trustRegistryData;
  },
  isTrustRegistryLoading: state => {
    return state.loading && state.trustRegistryData.length == 0;
  },
  getTrustRegistryPage: state => state.page
};

const actions = {
  [UPDATE_REGISTRY]: async ({ commit, state }) => {
    if (state.loading) {
      return;
    }
    commit(UPDATE_REGISTRY);
    const registries = [];
    const contract = getSmartContract({
      address: "0x4118dEf0C4b335f6B0acF6fE1743c0B24F48ad94",
      abi: registryAbi
    });
    const methods = contract.methods;
    const issuers = issuerList.issuers;
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
      registryDataObj.marketInfrastructureType = issuingInstitution.marketInfrastructureType;
      registryDataObj.ownerPAName = ownerPAName;
      registryDataObj.ownerPAPK = ownerPAPK;
      registries.push(registryDataObj);
    }

    commit(REGISTRY_LOAD_SUCCESS, registries);
  }
};

const mutations = {
  [UPDATE_REGISTRY]: state => {
    state.loading = true;
  },
  [REGISTRY_LOAD_SUCCESS]: (state, data) => {
    state.loading = false;
    state.trustRegistryData = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
