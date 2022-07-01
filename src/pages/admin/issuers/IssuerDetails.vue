<template>
  <div class="main-container">
    <va-card>
      <div class="row align--center">
        <!-- <div class="flex md2 xs2 align-left">
          <button
            class="btn-back"
            type="button"
            @click="close"
            aria-label="Close modal"
          >
            <va-icon class="material-icons" color="primary" size="large">arrow_back</va-icon>
          </button>
        </div> -->
        <div class="flex md12 xs12 align-center">
          <h2>{{ $t("issuers.issuerDetails.title") }}</h2>
        </div>
        <!-- <div class="flex md2 xs2"></div> -->
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="row">
        <div class="flex md6 sm12 xs12">
          <label>{{ $t("issuers.issuerDetails.name") }}</label>
          <p>{{ issuerData["Entity Name"] }}</p>
        </div>
        <div class="flex md6 sm12 xs12">
          <label>{{ $t("issuers.issuerDetails.type") }}</label>
          <p v-if="!isTrustRegistryLoading">
            {{ getType() }}
          </p>
          <p v-else>
            <va-progress-circle indeterminate />
          </p>
        </div>
      </div>
      <div class="row">
        <div class="flex">
          <label>{{ $t("DID") }}</label>
          <p>{{ issuerData["DID"] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="flex lg6 md12">
          <label>LEI</label>
          <p>{{ issuerData["LEI"] }}</p>
        </div>
        <div class="flex lg6 md12">
          <label>{{ $t("issuers.issuerDetails.country") }}</label>
          <p>{{ $t(issuerData["Country"]) }}</p>
        </div>
      </div>
    </va-card>
    <br />
    <va-card class="align-center">
      <h2>{{ $t("issuers.issuerDetails.claimsAndWDRequest") }}</h2>
    </va-card>
    <div class="row">
      <div class="flex md6 xs6 lg3">
        <va-card :color="colors.primary" style="padding: 0px">
          <va-card-content style="padding: 10px 4px 10px 4px">
            <p class="text--center" style="color: white; margin: 0px">
              {{$t('issuers.issuerDetails.managed')}}
            </p>
            <h3 class="display-2 mb-1 text--center" style="color: white">
              {{ issuerData["managedClaims"] }}
            </h3>
            <p class="text--center" style="color: white">
              {{ $t("Claims") }}
            </p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex md6 xs6 lg3">
        <va-card :color="colors.info" style="padding: 0px">
          <va-card-content style="padding: 10px 4px 10px 4px">
            <p class="text--center" style="color: white; margin: 0px">
              {{$t('issuers.issuerDetails.total')}}
            </p>
            <h3 class="display-2 mb-1 text--center" style="color: white">
              {{ issuerData["totalClaims"] }}
            </h3>
            <p class="text--center" style="color: white">
              {{ $t("Claims") }}
            </p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex md6 xs6 lg3">
        <va-card :color="colors.danger" style="padding: 0px">
          <va-card-content style="padding: 10px 4px 10px 4px">
            <p class="text--center" style="color: white; margin: 0px">
              {{$t('issuers.issuerDetails.managed')}}
            </p>
            <h3 class="display-2 mb-1 text--center" style="color: white">
              {{ issuerData["managedWDR"] }}
            </h3>
            <p class="text--center" style="color: white">
              {{ $t("WD Requests") }}
            </p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex md6 xs6 lg3">
        <va-card :color="colors.warning" style="padding: 0px">
          <va-card-content style="padding: 10px 4px 10px 4px">
            <p class="text--center" style="color: white; margin: 0px">
              {{$t('issuers.issuerDetails.total')}}
            </p>
            <h3 class="display-2 mb-1 text--center" style="color: white">
              {{ issuerData["totalWDR"] }}
            </h3>
            <p class="text--center" style="color: white">
              {{ $t("WD Requests") }}
            </p>
          </va-card-content>
        </va-card>
      </div>


    </div>
    <br />
    <va-card class="align-center">
      <h2>{{ $t("issuers.issuerDetails.assetsTitle") }}</h2>
    </va-card>
    <br />
    <div class="asset-container">
      <asset-container
        class="mr-4"
        v-for="(asset, index) in issuerData['Cryptos'] ?? []"
        v-bind:key="index"
        :asset="asset"
        @click="openAsset(asset)"
      ></asset-container>
    </div>
  </div>
</template>

<script>
import { useColors } from "vuestic-ui";
import { mapGetters } from "vuex";
import AssetContainer from "../issuers/AssetContainer";
export default {
  name: "claimDetails",
  components: {
    AssetContainer,
  },
  props: {
    issuer: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      logo: process.env.BASE_URL,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      issuerData: JSON.parse(this.issuer),
      modalShown: false,
    };
  },
  watch: {
    windowHeight(newHeight, oldHeight) {
      console.log(`it changed to ${newHeight} from ${oldHeight}`);
    },
    windowWidth(newWidth, oldWidth) {
      console.log(`width changed to ${newWidth} from ${oldWidth}`);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    getType() {
      const hashedReg = this.getHashedRegistry;
      const address = this.issuerData.issuerAddress;
      console.log("HashedReg: ", hashedReg);
      console.log("address: ", address);
      if(!this.getHashedRegistry) {
        return "NIL";
      }
      return this.getHashedRegistry[this.issuerData.address??""]?.marketInfrastructureType ?? "NIL";
    },
    close() {
      this.$emit("close");
    },
    openAsset(asset) {
      // const assetList = this.getAssets;
      // let foundAsset;
      // for (let i = 0; i < assetList.length; i++) {
      //   const element = assetList[i];
      //   if (element.id === asset.id) {
      //     foundAsset = element;
      //   }
      // }
      // if (foundAsset) {
        this.$router.push({
          name: "assetDetails",
          params: { asset: JSON.stringify(asset) },
        });
      // }
    },
    onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    ...mapGetters(["getAssets", "getHashedRegistry", "isTrustRegistryLoading"]),
    colors() {
      const { getColors } = useColors();
      const colors = getColors();
      return colors;
    },
  },
};
</script>

<style scoped>
.va-card {
  padding: 1rem 1rem;
  display: flex;
}

.align-center {
  text-align: center;
  align-content: center;
}

.main-container {
  font-family: "Avenir";
  font-size: 24px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.app-bar {
  display: flex;
  flex-direction: row;
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

p {
  font-size: 24px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
  font-family: "Source Sans Pro";
}

h2 {
  color: var(--va-primary);
}
h3 {
  font-weight: normal;
  font-size: 3rem;
  color: var(--va-primary);
}
.align-left {
  text-align: left;
}
.btn-back {
  border: none;
  background: transparent;
  text-align: right;
}
.asset-container {
  display: flex;
  flex-direction: row;
  overflow: scroll;
}
</style>
