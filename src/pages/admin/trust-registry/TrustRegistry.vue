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
      :addButtonText="'buttons.addIssuer'"
      @clicked="onItemSelected"
      @addItemClicked="onOpenForm"
    ></markup-table>
    <modal v-if="showModal" @close="onCancel">
      <template #header>
        {{ newModal ? $t("modal.addIssuer") : $t("modal.updateIssuer") }}
      </template>
      <template #body>
        <va-form ref="form" style="width: 100%">
          <div class="row">
            <div class="flex xs-12 md-6 align-content--start">
              <va-input
                class="mb-4"
                :label="$t('trustRegistry.modal.name')"
                v-model="selectedObj.issuerName"
                :readonly="!newModal"
                :rules="newModal ? [required] : []"
              />
            </div>
            <div class="flex xs-12 md-6 align-content--start">
              <va-input
                class="mb-4"
                :label="$t('trustRegistry.modal.competentAuth')"
                v-model="selectedObj.competentAuth"
                :readonly="!newModal"
                :rules="newModal ? [required] : []"
              />
            </div>
          </div>
          <va-input
            class="mb-4"
            :label="$t('trustRegistry.modal.address')"
            v-model="selectedObj.issuerAddress"
            :readonly="!newModal"
            :rules="newModal ? [required] : []"
          />
          <va-input
            class="mb-4"
            :label="$t('trustRegistry.modal.id')"
            v-model="selectedObj.issuerID"
            :readonly="!newModal"
            :rules="newModal ? [required] : []"
          />
          <va-input
            class="mb-4"
            :label="$t('trustRegistry.modal.pk')"
            v-model="selectedObj.issuerPK"
            :readonly="!newModal"
            :rules="newModal ? [required] : []"
          />
          <div class="row">
            <div class="flex xs-12 md-6 align-content--start">
              <div>
                <label>{{ $t("trustRegistry.modal.offeror") }}</label>
                <va-button-toggle
                  :toggle-color="colors.primary"
                  :color="colors.secondary"
                  v-model="selectedObj.offeror"
                  :options="options"
                  @input="onChangeValue"
                  size="small"
                  :rounded="false"
                  :disabled="newModal ? false : true"
                />
              </div>
            </div>
            <div class="flex xs-12 md-6 align-content--start">
              <div>
                <label>{{ $t("trustRegistry.modal.active") }}</label>
                <va-button-toggle
                  :toggle-color="colors.primary"
                  :color="colors.secondary"
                  v-model="selectedObj.active"
                  :options="options"
                  @input="onChangeValue"
                  :rounded="false"
                  size="small"
                />

                <label
                  v-if="activeError"
                  style="font-weight: normal"
                  :style="{ color: colors.danger }"
                >
                  {{ $t("errorMessages.required") }}
                </label>
              </div>
            </div>
          </div>
          <va-input
            class="mb-4 mt-4"
            :label="$t('trustRegistry.modal.marketInfraType')"
            v-model="selectedObj.marketInfraType"
            :readonly="!newModal"
            :rules="newModal ? [required] : []"
          />
          <va-input
            class="mb-4 mt-4"
            :label="$t('trustRegistry.modal.ownerName')"
            v-model="selectedObj.ownerPAName"
            :readonly="!newModal"
            :rules="newModal ? [required] : []"
          />
          <va-input
            class="mb-4 mt-4"
            :label="$t('trustRegistry.modal.ownerPK')"
            v-model="selectedObj.ownerPAPK"
            :readonly="!newModal"
            :rules="newModal ? [required] : []"
          />
          <div class="row">
            <div class="flex">
              <va-button @click="onCancel" outline>{{
                $t("buttons.cancel")
              }}</va-button>
            </div>
            <div class="flex">
              <va-button
                @click="saveIssuer"
                outline
                :disabled="newModal ? false : !updateAvailable">{{
                newModal ? $t("buttons.create") : $t("buttons.update")
              }}</va-button>
            </div>
          </div>
        </va-form>
      </template>
      <template #footer>
        <div></div>
      </template>
    </modal>
  </div>
</template>

<script>
import MarkupTable from "../../admin/tables/markup-tables/MarkupTables";
import { mapGetters } from "vuex";
import { UPDATE_ISSUERS } from "@/store/actions/issuers";
import { UPDATE_REGISTRY } from "@/store/actions/trust_registry";
import Modal from "./TestDialog.vue";
import { useColors } from "vuestic-ui";

export default {
  name: "trust_registry",
  components: {
    MarkupTable,
    Modal,
  },
  data() {
    return {
      term: "",
      showModal: false,
      activeError: false,
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      labels: ["issuerName", "competentAuth", "active"],
      objKey: "issuerName",
      filterKey: "issuerName",
      newModal: false,
      selectedObj: {},
      originalObj: {},
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
    colors() {
      const { getColors } = useColors();
      const colors = getColors();
      return colors;
    },
    updateAvailable() {
      const keys = Object.keys(this.selectedObj);
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (this.selectedObj[key] != this.originalObj[key]) {
          return true;
        }
      }
      return false;
    },
  },
  created() {
    this.$store.dispatch(UPDATE_ISSUERS);
    this.$store.dispatch(UPDATE_REGISTRY);
  },
  methods: {
    onCancel() {
      this.showModal = false;
      this.activeError = false;
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
      if (!this.selectedObj.offeror) {
        this.activeError = true;
        valid = false;
      } else {
        this.activeError = false;
      }
      if (!valid) {
        return;
      }
      if (this.newModal) {
        valid = !!this.selectedObj.offeror;
        if (!valid) {
          this.activeError = true;
          return;
        }
      } else {
        console.log("Update");
      }
    },
    onChangeValue() {
      this.activeError = false;
    },
    onOpenForm() {
      this.showModal = true;
      console.log("Opening popup");
      this.selectedObj = {
        issuerName: "",
        competentAuth: "",
        active: false,
        issuerID: "",
        issuerPK: "",
        offeror: false,
        marketInfrastructureType: "",
        ownerPAName: "",
        ownerPAPK: "",
      };
      this.newModal = true;
      this.$refs.issuerModal.show();
    },
    onItemSelected(obj) {
      this.selectedObj = { ...obj };
      this.originalObj = obj;
      this.newModal = false;
      this.modalHeight = "100%";
      this.modalDisplay = "none";
      this.showModal = "true";
      // this.$refs.issuerModal.show();
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
label {
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: #999999;
  font-family: "Source Sans Pro";
}
</style>
