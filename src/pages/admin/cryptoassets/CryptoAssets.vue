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
    ></markup-table>
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";

export default {
  name: "crypto_assets",
  components: {
    MarkupTable
  },
  data() {
    return {
      term: "",
      searchQuery: ""
    };
  },
  computed: {
    query() {
      return this.term;
    },
    headings() {
      return ["id", "name", "email", "country", "status"];
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.va-table {
  min-width: 90rem;
}
.va-card {
  padding: 0 1rem 0 1rem;
}
</style>
