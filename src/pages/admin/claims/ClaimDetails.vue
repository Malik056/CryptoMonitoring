<template>
  <div class="main-container">
    <va-card>
      <div class="row align--center">
        <div class="flex md2 xs2 align-left">
          <button
            class="btn-back"
            type="button"
            @click="close"
            aria-label="Close modal"
          >
            <va-icon class="material-icons" color="primary" size="large" >arrow_back</va-icon>
          </button>
        </div>
        <div class="flex md8 xs8 align-center">
          <h2>{{ $t("issuers.issuerDetails.title") }}</h2>
        </div>
        <div class="flex md2 xs2"></div>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.issuerDetails.name") }}</label>
          <p>{{ issuerData["Entity Name"] }}</p>
        </div>
        <div class="flex md3 xs6">
          <label>{{ $t("issuers.issuerDetails.type") }}</label>
          <p>
            {{ (issuerData["Type"] ?? "") === "" ? "NIL" : issuerData["Type"] }}
          </p>
        </div>
        <div class="flex md3 xs6">
          <label>{{ $t("issuers.issuerDetails.country") }}</label>
          <p>{{ issuerData["Country"] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="flex">
          <label>{{ $t("DID") }}</label>
          <p>{{ issuerData["DID"] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="flex md6 xs12">
          <label>LEI</label>
          <p>{{ issuerData["LEI"] }}</p>
        </div>
      </div>
    </va-card>
    <br />
    <va-card class="align-center">
      <h2>{{ $t("issuers.issuerDetails.assetsTitle") }}</h2>
    </va-card>
    <br />
    <asset-container
      v-for="(asset, index) in issuerData['Cryptos'] ?? []"
      v-bind:key="index"
      :asset="asset"
      @click="openAsset(asset)"
    ></asset-container>
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
    close() {
      this.$emit("close");
    },
    openAsset(asset) {
      const assetList = this.getAssets;
      let foundAsset;
      for (let i = 0; i < assetList.length; i++) {
        const element = assetList[i];
        if (element.id === asset.id) {
          foundAsset = element;
        }
      }
      if (foundAsset) {
        this.$router.push({
          name: "assetDetails",
          params: { asset: JSON.stringify(foundAsset) },
        });
      }
    },
    onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    ...mapGetters([["getAssets"]]),
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
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
  font-family: "Source Sans Pro";
}

h2 {
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
</style>
