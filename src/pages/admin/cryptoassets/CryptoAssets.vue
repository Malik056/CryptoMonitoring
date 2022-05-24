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
      :labels="labels"
      :query="query"
      :initialPage="1"
      :key="query"
      :items="cryptoAssets"
      :objId="objKey"
      :filterKey="filterKey"
      @clicked="onItemSelected"
    ></markup-table>
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
import CryptoAssets from "@/data/tables/markup-table/assets.json";

export default {
  name: "crypto_assets",
  components: {
    MarkupTable
  },
  data() {
    return {
      term: "",
      cryptoAssets: CryptoAssets.assets,
      labels: ["CryptoAssetName", "EmittingBody", "Country", "CryptoAssetType"],
      objKey: "CryptoAssetName",
      filterKey: "CryptoAssetName"
    };
  },
  computed: {

    query() {
      return this.term;
    },
    headings() {
      return ["Name", "Emitting Body", "Country", "Asset Type"];
    }
  },
  methods: {
    onItemSelected(value) {
      this.$router.push({name: 'assetDetails', params: {asset: JSON.stringify(value)}})
    }
  }
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
