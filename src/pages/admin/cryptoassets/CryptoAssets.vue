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
    <va-card class="xs12 loading" v-if="isLoading">
      <div class="flex md12 xs12">
        <va-progress-bar indeterminate>Loading</va-progress-bar>
      </div>
    </va-card>
    <markup-table
      v-else
      :headings="headings"
      :labels="labels"
      :query="query"
      :initialPage="1"
      :key="tableKey"
      :items="getAssets"
      :objId="objKey"
      :filterKey="filterKey"
      @clicked="onItemSelected"
    ></markup-table>
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
import CryptoAssets from "@/data/tables/markup-table/assets.json";
import { mapGetters } from "vuex";
import { UPDATE_ISSUERS } from '@/store/actions/issuers';

export default {
  name: "crypto_assets",
  components: {
    MarkupTable,
  },
  data() {
    return {
      term: "",
      cryptoAssets: CryptoAssets.assets,
      labels: ["CryptoAssetName", "EmittingBody", "Country", "CryptoAssetType"],
      objKey: "CryptoAssetName",
      filterKey: "CryptoAssetName",
    };
  },
  computed: {
    ...mapGetters(["getAssets", "isLoading"]),
    tableKey() {
      return this.query + this.getAssets.toString();
    },
    query() {
      return this.term;
    },
    headings() {
      return ["Name", "Emitting Body", "Country", "Asset Type"];
    },
  },
  created() {
    this.$store.dispatch(UPDATE_ISSUERS);
  },
  methods: {
    onItemSelected(value) {
      this.$router.push({
        name: "assetDetails",
        params: { asset: JSON.stringify(value) },
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
.loading {
  padding: 1rem;
}
</style>
