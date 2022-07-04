import { getSmartContract } from "../../utils/api.js";
import { LOAD_SUCCESS, SET_ISSUER, UPDATE_ISSUERS, UPDATE_ISSUER_STATE } from "../actions/issuers.js";
import issuerList from "@/data/tables/markup-table/issuers_list.json";
import issuersAbi from "@/data/abis/issuerabi.json";
import assetsAbi from "@/data/abis/assetsabi.json";
import { i18n } from "@/translation/index.ts";
import { assetTypes } from "../index.ts";

const state = {
  issuers: [],
  hashedIssuers: {},
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
      if(!issuerObj.dapp) {continue;}
      const contract = getSmartContract({
        address: issuerObj.dapp,
        abi: issuersAbi
      });
      const methods = contract.methods;

      const name = await methods.institutionName().call();
      const country = await methods.institutionCountry().call();
      const did = await methods.institutionID().call();
      const lei = await methods.institutionLEI().call();
      const trackClaims0 = await methods.trackClaims(0).call();
      const trackClaims1 = await methods.trackClaims(1).call();
      const trackWDR0 = await methods.trackWDR(0).call();
      const trackWDR1 = await methods.trackWDR(1).call();
      console.log("Track Claims0: ", trackClaims0);
      console.log("Track Claims1: ", trackClaims1);
      console.log("Track WDR0: ", trackWDR0);
      console.log("Track WDR1: ", trackWDR1);
      const issuerData = {};
      issuerData["id"] = issuerObj.dapp;
      issuerData["DID"] = did;
      issuerData["address"] = issuerObj.address;
      issuerData["Entity Name"] = name;
      issuerData["Country"] = i18n.global.t("countries."+country);
      issuerData["LEI"] = lei;
      issuerData["Cryptos"] = [];
      issuerData["managedClaims"] = trackClaims0;
      issuerData["totalClaims"] = trackClaims1;
      issuerData["managedWDR"] = trackWDR0;
      issuerData["totalWDR"] = trackWDR1;
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
        crypto.CryptoAssetType = (crypto.CryptoAssetType || crypto.CryptoAssetType !== '') ? assetTypes[parseInt(crypto.CryptoAssetType)] : "NIL"
        crypto.CryptoAssetSymbol = await assetsMethods.symbol().call();
        crypto.CryptoAssetTotalSupply = await assetsMethods
          .totalSupply()
          .call();
        crypto.whitePaperHash = await assetsMethods.whitePaperHash().call();
        crypto.whitePaperToken = await assetsMethods.whitePaperToken().call();
        crypto.Country = i18n.global.t("countries."+country);
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
      commit(SET_ISSUER, {address: issuerData.address, obj: issuerData});
      fetchedIssuers.push(issuerData);
    }
    commit(LOAD_SUCCESS, { fetchedIssuers, fetchedAssets });
  },
  async smallOffer(context, {address, number}) {
    const sc = getSmartContract({address, abi: assetsAbi});
    const isSmallOffer = await sc.methods.smallOffer(parseInt(number)).call();
    console.log("isSmallOffer: ", isSmallOffer);
    return isSmallOffer;
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
  },
  [UPDATE_ISSUER_STATE]: (state, {address, active}) => {
    const obj = state.hashedIssuers[address];
    if(!obj) {
      return;
    }
    obj.active = active;
  },
  [SET_ISSUER]: (state, {address, obj}) => {
    state.hashedIssuers[address] = obj;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
