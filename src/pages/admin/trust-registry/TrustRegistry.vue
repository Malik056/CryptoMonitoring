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
    <va-card class="xs12 loading" v-if="isTrustRegistryLoading">
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
      :items="getRegistry"
      :objId="objKey"
      :filterKey="filterKey"
      :showAddButton="true"
      @clicked="onItemSelected"
      @addItemClicked="onOpenForm"
    ></markup-table>
    <va-modal :title="'Add Issuer'" ref="addItem" stateful blur>
      <div>
        <va-form ref="form">
          <va-input
            class="mb-4"
            label="Name"
            v-model="inputValue"
            :rules="inputRules"
          />
        </va-form>
      </div>
    </va-modal>
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
import CryptoAssets from "@/data/tables/markup-table/assets.json";
import { mapGetters } from "vuex";
import { UPDATE_ISSUERS } from "@/store/actions/issuers";
import { UPDATE_REGISTRY } from "@/store/actions/trust_registry";

export default {
  name: "trust_registry",
  components: {
    MarkupTable,
  },
  data() {
    return {
      term: "",
      cryptoAssets: CryptoAssets.assets,
      labels: ["issuerName", "competentAuth", "active"],
      objKey: "issuerName",
      filterKey: "issuerName",
    };
  },
  computed: {
    ...mapGetters(["getRegistry", "isTrustRegistryLoading"]),
    tableKey() {
      return this.query + this.getRegistry.toString();
    },
    query() {
      return this.term;
    },
    headings() {
      return ["Issuer Name", "Competent Authority", "Active"];
    },
  },
  created() {
    this.$store.dispatch(UPDATE_ISSUERS);
    this.$store.dispatch(UPDATE_REGISTRY);
  },
  methods: {
    onOpenForm() {
      console.log("Opening popup")
      this.$refs.addItem.show();
    }
    // onItemSelected(value) {
    // this.$router.push({
    //   name: "assetDetails",
    //   params: { asset: JSON.stringify(value) },
    // });
    // },
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
