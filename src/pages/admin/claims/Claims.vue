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
      :query="query"
      :initialPage="1"
      :key="tableKey"
      :items="getIssuers"
      :filterKey="filterKey"
      :labels="labels"
      :objId="objKey"
      @clicked="onItemSelected"
    ></markup-table>
    <modal v-if="modalShown" @close="closeDialog">
      <template #header><div></div></template>
      <template #body>
        <va-form ref="form" style="width: 20rem">
          <va-input
            class="mb-4 mt-4"
            :label="$t('modal.requestingPersonPK')"
            v-model="address"
            :rules="[required]"
          >
          </va-input>
          <div class="row">
            <div class="flex">
              <va-button @click="onCancel" outline>{{
                $t("buttons.cancel")
              }}</va-button>
            </div>
            <div class="flex">
              <va-button @click="submit" outline>{{
                $t("buttons.ok")
              }}</va-button>
            </div>
          </div>
        </va-form>
      </template>
      <template #footer><div></div></template>
    </modal>
    <!-- <modal-full-screen @close="closeDetailsDialog" v-if="fullScreenModalShow">
      <template #body>
        <claim-details @close="closeDetailsDialog"
          :issuer="params"
        ></claim-details>
      </template>
      <template #header>
        <div style="display: none"></div>
      </template>
      <template #footer>
        <div style="display: none"></div>
      </template>
    </modal-full-screen> -->
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
import { mapGetters } from "vuex";
import { UPDATE_ISSUERS } from "@/store/actions/issuers";
import { CLAIM_ISSUER } from "@/store/actions/claim";
import Modal from "../../../components/modals/Modal";
// import ModalFullScreen from "../../../components/modals/ModalFullScreen";
// import ClaimDetails from "./ClaimDetails";

export default {
  name: "claims",
  components: {
    MarkupTable,
    Modal,
    // ModalFullScreen,
    // ClaimDetails,
  },
  data() {
    return {
      term: "",
      searchQuery: "",
      objKey: "DID",
      filterKey: "Entity Name",
      modalShown: false,
      // fullScreenModalShow: false,
      address: "",
      selectedItem: null,
    };
  },
  computed: {
    ...mapGetters(["getIssuers", "isLoading", "isClaiming", "getClaimedInfo"]),
    tableKey() {
      return this.query + this.getIssuers.toString();
    },
    query() {
      return this.term;
    },
    labels() {
      return ["DID", "Entity Name", "Country"];
    },
    headings() {
      return [
        "DID",
        this.$t("issuers.tableHeaders.name"),
        this.$t("issuers.tableHeaders.country"),
      ];
    },
  },
  created() {
    this.$store.dispatch(UPDATE_ISSUERS);
  },
  methods: {
    async submit() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }
      const claimedResult = await this.$store.dispatch(
        CLAIM_ISSUER,
        {issuerDAPP: this.selectedItem.id, userPK: this.address}
      );
      this.$router.push({
        name: "claimInfo",
        params: { claimedInfo: JSON.stringify(claimedResult) },
      });

    },
    onCancel() {
      this.closeDialog();
    },
    onItemSelected(value) {
      this.selectedItem = value;
      this.modalShown = true;
      this.address = "";
    },
    closeDialog() {
      this.modalShown = false;
      this.address = "";
    },
    required(value) {
      if (!value || value.isEmpty) {
        return this.$t("errorMessages.required");
      }
      return true;
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
