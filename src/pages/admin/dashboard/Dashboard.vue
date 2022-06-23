<template>
  <div class="dashboard">
    <dashboard-charts />
    <!-- <dashboard-info-block />
    <div class="row row-equal">
      <div class="flex xs12 lg6">
        <dashboard-tabs @submit="addAddressToMap" />
      </div>
      <div class="flex xs12 lg6">
        <dashboard-map ref="dashboardMap" />
      </div>
    </div>
    <div class="row">
      <div class="flex lg12 xs12">
        <dashboard-table></dashboard-table>
      </div>
    </div> -->
  </div>
</template>

<script>
import DashboardCharts from "./DashboardCharts";
// import DashboardInfoBlock from "./DashboardInfoBlock";
// import DashboardTabs from "./DashboardTabs";
// import DashboardMap from "./DashboardMap";
// import DashboardTable from "./DashboardTable";
import { UPDATE_ISSUERS } from "@/store/actions/issuers";
import { UPDATE_REGISTRY } from "@/store/actions/trust_registry";

export default {
  name: "dashboard",
  components: {
    DashboardCharts,
    // DashboardInfoBlock,
    // DashboardTabs,
    // DashboardMap,
    // DashboardTable,
  },
  created() {
    this.$store.dispatch(UPDATE_ISSUERS);
    this.$store.dispatch(UPDATE_REGISTRY);
  },
  methods: {
    addAddressToMap({ city, country }) {
      this.$refs.dashboardMap.addAddress({ city: city.text, country });
    },
  },
};
</script>

<style lang="scss">
.row-equal .flex {
  .va-card {
    height: 100%;
  }
}

.dashboard {
  .va-card {
    margin-bottom: 0 !important;
    &__title {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
