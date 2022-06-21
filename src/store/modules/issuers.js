import { getSmartContract } from "../../utils/api.js";
import { LOAD_SUCCESS, UPDATE_ISSUERS } from "../actions/issuers.js";
import issuerList from "@/data/tables/markup-table/issuers_list.json";
import issuersAbi from "@/data/abis/issuerabi.json";
import assetsAbi from "@/data/abis/assetsabi.json";

const state = {
  issuers: [],
  cryptoAssets: [],
  issuersPage: 0,
  cryptoAssetsPage: 0,
  loading: false
};

const getters = {
  getIssuers: state => {
    return state.issuers;
  },
  isLoading: state => {
    return state.loading && state.issuers.length == 0;
  },
  getAssets: state => state.cryptoAssets,
  getIssuerPage: state => state.issuersPage,
  getAssetsPage: state => state.cryptoAssetsPage
};

const actions = {
  [UPDATE_ISSUERS]: async ({ commit, state }) => {
    if (state.loading) {
      return;
    }
    commit(UPDATE_ISSUERS);
    const issuers = issuerList.issuers;
    const fetchedIssuers = [];
    const fetchedAssets = [];
    for (let i = 0; i < issuers.length; i++) {
      const issuerObj = issuers[i];
      const abi1 = issuersAbi;
      console.log(abi1);
      const contract = getSmartContract({
        address: issuerObj.dapp,
        abi: issuersAbi
      });
      const methods = contract.methods;

      const name = await methods.institutionName().call();
      const country = await methods.institutionCountry().call();
      const did = await methods.institutionID().call();
      const lei = await methods.institutionLEI().call();
      const issuerData = {};
      issuerData["id"] = issuerObj.dapp;
      issuerData["DID"] = did;
      issuerData["Entity Name"] = name;
      issuerData["Country"] = country;
      issuerData["LEI"] = lei;
      issuerData["Cryptos"] = [];
      const tokens = issuerObj.tokens;
      for (let i = 0; i < tokens.length; i++) {
        const assetsContract = getSmartContract({
          abi: assetsAbi,
          address: tokens[i]
        });
        const assetsMethods = assetsContract.methods;
        const crypto = {};
        crypto.id = tokens[i];
        crypto.CryptoAssetName = await assetsMethods.name().call();
        crypto.CryptoAssetType = await assetsMethods.tokenType().call();
        crypto.CryptoAssetSymbol = await assetsMethods.symbol().call();
        crypto.CryptoAssetTotalSupply = await assetsMethods
          .totalSupply()
          .call();
        crypto.Country = country;
        crypto.EmittingBody = name;
        crypto.EmittingBodyId = issuerObj.dapp;
        const transparency = {};
        const transparencyDetails = await assetsMethods
          .transparencyDetails()
          .call();
        transparency.AuthorizedCustomersType = transparencyDetails.clientType;

        transparency.DistributionStrategy =
          transparencyDetails.distributionStrategyURL;
        transparency.ReferenceMarket = transparencyDetails.referenceMarketURL;
        transparency.IncompatibleCustomerTypes =
          transparencyDetails.incompatibleClients;
        transparency.TraderID = transparencyDetails.traderID;
        transparency.Timestamp = transparencyDetails.lastUpdate;
        crypto.Transparency = transparency;
        crypto.QuantityofTokens = crypto.CryptoAssetTotalSupply;
        issuerData["Cryptos"].push(crypto);
        fetchedAssets.push(crypto);
      }
      fetchedIssuers.push(issuerData);
    }
    commit(LOAD_SUCCESS, { fetchedIssuers, fetchedAssets });
  }
};

const mutations = {
  [UPDATE_ISSUERS]: state => {
    state.loading = true;
  },
  [LOAD_SUCCESS]: (state, data) => {
    state.loading = false;
    state.issuers = data.fetchedIssuers;
    state.cryptoAssets = data.fetchedAssets;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
