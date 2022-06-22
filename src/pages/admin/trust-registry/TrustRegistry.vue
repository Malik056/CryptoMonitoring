<template>
  <div class="main-container">
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
    <div v-if="showModal" :style="{ display: modalDisplay }">
      <div class="row" style="position: relative">
        <va-card class="md6 flex"> </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
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
      showModal: false,
      offerorError: false,
      options: [
        { label: "Yes", value: 0 },
        { label: "No", value: 0 },
      ],
      labels: ["issuerName", "competentAuth", "active"],
      objKey: "issuerName",
      filterKey: "issuerName",
      newModal: false,
      selectedObj: {},
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
    onCancel() {
      this.modalHeight = "0%";
      this.modalDisplay = "block";
    },
    required(value) {
      if (!value || value.isEmpty) {
        return this.$t("errorMessages.required");
      }
      return true;
    },
    saveIssuer() {
      console.log("Saving Issuer");
      let valid = this.$refs.form.validate();

      if (!valid) {
        return;
      }
      if (this.newModal) {
        valid = !!this.selectedObj.offeror;
        if (!valid) {
          this.offerorError = true;
          return;
        }
      } else {
        this.modalHeight = "0%";
        this.modalDisplay = "none";
        console.log("Update");
      }
    },
    onChangeValue() {
      this.offerorError = false;
    },
    onOpenForm() {
      // this.$emit('openModal');
      this.showModal = true;
      return;
      // console.log("Opening popup");
      // this.selectedObj = {
      //   issuerName: "",
      //   competentAuth: "",
      //   active: false,
      //   issuerID: "",
      //   issuerPK: "",
      //   offeror: false,
      //   marketInfrastructureType: "",
      //   ownerPAName: "",
      //   ownerPAPK: "",
      // };
      // this.newModal = true;
      // // this.modalHeight = "100%";
      // // this.modalDisplay = "block";
      // this.$refs.addItem.show();
    },
    onItemSelected(obj) {
      this.selectedObj = obj;
      this.newModal = false;
      this.modalHeight = "100%";
      this.modalDisplay = "none";
      // this.$refs.addItem.show();
    },
  },
};
</script>

<style style="scss">
.main-container {
  font-family: Avenir;
}
.va-table {
  min-width: 100%;
}
.va-card {
  padding: 0 1rem 0 1rem;
}
.loading {
  padding: 1rem;
}
.label {
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: #999999;
  font-family: "Source Sans Pro";
}
</style>
