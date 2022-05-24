<template>
  <div>
    <va-card class="xs12">
      <div style="overflow: scroll">
        <table class="va-table va-table--striped va-table--hoverable">
          <thead>
            <tr>
              <th v-for="heading in headings" :key="heading">
                {{ heading }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user[id]" v-on:click="onClickUser(user)">
              <td v-for="heading in dataKeys" :key="heading">
                {{ user[heading] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row justify--end mt-2">
        <div class="flex">
          <va-pagination
            v-model="currentPage"
            :pages="rows"
            :visible-pages="3"
          />
        </div>
      </div>
    </va-card>
  </div>
</template>

<script>
import data from "@/data/tables/markup-table/data.json";

export default {
  props: {
    headings: {
      type: [Array, null],
    },
    query: {
      type: [String, null, undefined],
    },
    labels: {
      type: [Array, null, undefined],
    },
    items: {
      type: [Array, undefined, null],
    },
    initialPage: {
      type: Number,
      required: false,
      default: 1,
    },
    filterKey: {
      type: String,
      required: false,
      default: "name",
    },
    objId: {
      type: String,
      required: false,
      default: "id",
    },
  },
  data() {
    return {
      data: this.items ?? data,
      pageSize: 12,
      currentPage: this.initialPage,
      dataKeys: this.labels ?? this.headings,
    };
  },
  computed: {
    users() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return [...this.filterData()].slice(startIndex, endIndex);
    },
    rows() {
      const data = this.filterData();
      const quotient = parseInt(data.length / this.pageSize);
      const remainder = data.length % this.pageSize;
      return remainder == 0 ? quotient : quotient + 1;
    },
  },
  methods: {
    onClickUser(user) {
      return this.$emit('clicked', user);
    },
    filterData() {
      return this.data.filter((value) => {
        return (
          value[this.filterKey]
            ?.toLowerCase()
            ?.includes(this.query?.toLowerCase() ?? "") ?? []
        );
      });
    },
    getStatusColor(status) {
      if (status === "paid") {
        return "success";
      }

      if (status === "processing") {
        return "info";
      }

      return "danger";
    },
  },
};
</script>

<style lang="scss">
.table {
  overflow: auto;
  height: 60vh;
  width: 10vw;
}
.red {
  background: red;
}
.blue {
  background: blue;
}
</style>
