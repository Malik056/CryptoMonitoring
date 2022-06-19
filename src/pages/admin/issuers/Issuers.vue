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
      :items="getIssuers"
      :filterKey="filterKey"
      :labels="labels"
      :objId="objKey"
      @clicked="onItemSelected"
    ></markup-table>
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
import { mapGetters } from "vuex";
import { UPDATE_ISSUERS } from '@/store/actions/issuers';

export default {
  name: "issuers",
  components: {
    MarkupTable,
  },
  data() {
    return {
      term: "",
      searchQuery: "",
      objKey: "DID",
      filterKey: "Entity Name",
    };
  },
  computed: {
    ...mapGetters(["getIssuers"]),
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
    this.$store.dispatch(UPDATE_ISSUERS);
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
