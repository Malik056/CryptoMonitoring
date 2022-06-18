<template>
  <div>
    <va-card class="mb-4">
      <div class="row align--center mb-1">
        <div class="flex xs12 sm12">
          <va-input
            class="ma-0"
            :placeholder="$t('tables.searchByName')"
            v-model="term"
            @input="search"
            removable
          >
            <template #append>
              <va-button>
                <va-icon name="search" />
              </va-button>
            </template>
          </va-input>
        </div>
      </div>
    </va-card>
    <markup-table
      :headings="headings"
      :query="query"
      :initialPage="1"
      :key="query"
      :items="issuersList"
      :filterKey="filterKey"
      :labels="labels"
      :objId="objKey"
      @clicked="onItemSelected"
    ></markup-table>
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
import issuersAbi from "@/data/abis/issuerabi.json";
import assetsAbi from "@/data/abis/assetsabi.json";
import issuers from "@/data/tables/markup-table/issuers_list.json";
import Web3 from "web3";

export default {
  name: "issuers",
  components: {
    MarkupTable,
  },
  data() {
    return {
      term: "",
      searchQuery: "",
      issuersList: [],
      objKey: "DID",
      filterKey: "Entity Name",
    };
  },
  computed: {
    query() {
      return this.term;
    },
    labels() {
      return ["DID", "Entity Name", "Country"];
    },
    headings() {
      return ["DID", "Entity Name", "Country"];
    },
  },
  async created() {
    const issuersList = issuers.issuers;
    const web3 = new Web3("http://51.38.226.91:8545");
    for (let i = 0; i < issuersList.length; i++) {
      const issuerObj = issuersList[i];
      const myContract = new web3.eth.Contract(issuersAbi, issuerObj.dapp);
      // const assetsContract = new web3.eth.Contract(
      //   assetsAbi,
      //   issuerObj.address
      // );
      // const assetsMethods = assetsContract.methods;
      const methods = myContract.methods;
      console.log(methods);
      // console.log(assetsMethods);
      const issuerData = {};
      console.log(`IssuerData[${i}]`, issuerData);
      const name = await methods.institutionName().call();
      const country = await methods.institutionCountry().call();
      const did = await methods.institutionID().call();
      const lei = await methods.institutionLEI().call();
      // const tokensIssues = await methods.tokensIssued(issuerObj.address).call();
      issuerData["DID"] = did;
      issuerData["Entity Name"] = name;
      issuerData["Country"] = country;
      issuerData["LEI"] = lei;
      issuerData["Cryptos"] = [];
      const tokens = issuerObj.tokens;
      for (let i = 0; i < tokens.length; i++) {
        const assetsContract = new web3.eth.Contract(assetsAbi, tokens[i]);
        const assetsMethods = assetsContract.methods;
        const crypto = {};
        crypto.CryptoAssetName = await assetsMethods.name().call();
        crypto.CryptoAssetType = await assetsMethods.tokenType().call();
        crypto.CryptoAssetSymbol = await assetsMethods.symbol().call();
        crypto.CryptoAssetTotalSupply = await assetsMethods
          .totalSupply()
          .call();
        issuerData["Cryptos"].push(crypto);
        console.log("Assets Methods: ", assetsMethods);
      }
      this.issuersList.push(issuerData);
    }
  },
  methods: {
    onItemSelected(value) {
      this.$router.push({
        name: "issuerDetails",
        params: { issuer: JSON.stringify(value) },
      });
    },
  },
};
</script>

<style lang="scss">
.va-table {
  min-width: 100%;
}
.va-card {
  padding: 0 1rem 0 1rem;
}
</style>
