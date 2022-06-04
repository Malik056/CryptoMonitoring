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
import issuers from "@/data/tables/markup-table/issuers.json";

export default {
  name: "issuers",
  components: {
    MarkupTable,
  },
  data() {
    return {
      term: "",
      searchQuery: "",
      issuersList: issuers.issuers,
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
  methods: {
    onItemSelected(value) {
      this.$router.push({name: 'issuerDetails', params: {issuer: JSON.stringify(value)}})
    }
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
