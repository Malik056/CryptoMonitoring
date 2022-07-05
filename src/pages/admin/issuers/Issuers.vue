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
    <va-card class="xs12 loading" v-if="isAllLoading">
      <div class="flex md12 xs12">
        <va-progress-bar indeterminate>Loading</va-progress-bar>
      </div>
    </va-card>
    <markup-table
      v-else
      :headings="headings"
      :query="query"
      :initialPage="1"
      :key="tableKey"
      :items="getIssuers"
      :filterKey="filterKey"
      :labels="labels"
      :objId="objKey"
      @clicked="onItemSelected"
    ></markup-table>
  </div>
  <!-- <modal-full-screen @close="closeDetailsDialog" v-if="fullScreenModalShow">
    <template #body>
      <issuer-details
        @close="closeDetailsDialog"
        :issuer="params"
      ></issuer-details>
    </template>
    <template #footer>
      <div style="display: none"></div>
    </template>
  </modal-full-screen> -->
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
import { mapGetters } from "vuex";
import { UPDATE_ISSUERS } from "@/store/actions/issuers";
// import ModalFullScreen from "../../../components/modals/ModalFullScreen";
// import IssuerDetails from "./IssuerDetails";

export default {
  name: "issuers",
  components: {
    MarkupTable,
    // ModalFullScreen,
    // IssuerDetails,
  },
  data() {
    return {
      term: "",
      searchQuery: "",
      objKey: "DID",
      filterKey: "Entity Name",
      // fullScreenModalShow: false,
      params: null,
    };
  },
  computed: {
    ...mapGetters(["getIssuers", "isLoading", 'isTrustRegistryLoading']),
    tableKey() {
      return this.query + this.getIssuers.toString();
    },
    query() {
      return this.term;
    },
    labels() {
      return ["Entity Name", "Country", "LEI"];
    },
    headings() {
      return [
        this.$t("issuers.tableHeaders.name"),
        this.$t("issuers.tableHeaders.country"),
        "LEI"
      ];
    },
  },
  created() {
    this.$store.dispatch(UPDATE_ISSUERS);
  },
  methods: {
    isAllLoading() {
      return this.isLoading || this.isTrustRegistryLoading;
    },
    onItemSelected(value) {
      this.$router.push({
        name: "issuerDetails",
        params: { issuer: JSON.stringify(value) },
      });
    },
    // closeDetailsDialog() {
      // this.fullScreenModalShow = false;
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
