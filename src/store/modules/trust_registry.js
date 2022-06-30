import { getSmartContract } from "../../utils/api.js";
import registryAbi from "@/data/abis/trust_registryabi.json";
import issuerList from "@/data/tables/markup-table/issuers_list.json";
import {
  CHANGE_ISSUER_STATE,
  REGISTRY_LOAD_SUCCESS,
  SET_CONTRACT,
  UPDATE_REGISTRY
} from "../actions/trust_registry.js";
import Web3 from "web3";
import { blockChainAddress, marketInfrastructureType } from "../index";

const state = {
  trustRegistryData: [],
  page: 0,
  loading: false,
  trustRegistryContract: null
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
    commit(SET_CONTRACT, contract);
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
      registryDataObj.marketInfrastructureType = issuingInstitution.marketInfrastructureType == 0 ? marketInfrastructureType[0] : marketInfrastructureType[issuingInstitution.marketInfrastructureType-1];
      registryDataObj.ownerPAName = ownerPAName;
      registryDataObj.ownerPAPK = ownerPAPK;
      registries.push(registryDataObj);
    }

    commit(REGISTRY_LOAD_SUCCESS, registries);
  },
  [CHANGE_ISSUER_STATE]: async (state, { enable, address }) => {
    const contract = getSmartContract({
      address: "0x4118dEf0C4b335f6B0acF6fE1743c0B24F48ad94",
      abi: registryAbi
    });
    const web3 = new Web3(blockChainAddress);
    const account = web3.eth.accounts.privateKeyToAccount(
      "0xc8dcd2e6e15635db81aff322328890b44c72907bb907ca224072835d202eedfe"
    );
    const gas = 5000000;
    let trx;
    if (enable) {
      trx = contract.methods.enableIssuer(address);
    } else {
      trx = contract.methods.disableIssuer(address);
    }
    debugger;
    console.log(trx);
    const signedTrx = await account.signTransaction({
      from: account.address,
      gas,
      data: await trx.encodeABI(),
      value: 0
    });
    const result = await web3.eth.sendSignedTransaction(
      signedTrx.rawTransaction
    );
    console.log(result);
    // const tra = {
    //   data: encodedABI,
    //   gas
    // };
    // contract.defaultAccount = account.address;

    // const tx = new Tx(tra);
    // tx.sign(key);
    // const signedTrx = await account.signTransaction(tra);
    // const receipt = await web3.eth.sendSignedTransaction(signedTrx);
    // console.log(receipt);
    // const result2 = await web3.eth.sendSignedTransaction(signedTrx);
    // console.log(result2);

    // if (enable) {
    //   const result = await contract.methods.enableIssuer(address).call();
    //   console.log(result);
    // } else {
    //   debugger;
    //   const obj = await contract.methods.disableIssuer(address);
    //   debugger;
    //   const obj2 = obj.call();
    //   const signedTrx = await account.signTransaction(obj);
    //   console.log(signedTrx);
    //   const result = await web3.eth.sendSignedTransaction(signedTrx);
    //   console.log(result);
    // }
  }
};

const mutations = {
  [UPDATE_REGISTRY]: state => {
    state.loading = true;
  },
  [REGISTRY_LOAD_SUCCESS]: (state, data) => {
    state.loading = false;
    state.trustRegistryData = data;
  },
  [SET_CONTRACT]: (state, contract) => {
    state.trustRegistryContract = contract;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
