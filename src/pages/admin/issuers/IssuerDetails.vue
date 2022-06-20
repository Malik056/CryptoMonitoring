<template>
  <div class="main-container">
    <div
      v-bind:style="{
        width:
          windowWidth >= 768
            ? `${windowWidth * 0.8}px`
            : windowWidth >= 641
              ? `${windowWidth * 0.9}px`
              : `${windowWidth}px`,
      }"
      class="right-center"
    >
      <div class="row">
        <div class="flex lg10 md10 sm8 xs8"></div>
        <div class="flex lg2 md2 sm4 xs4 overflow-hidden">
          <img
            src="../../../assets/description.png"
            alt="../../../assets/description.png"
            width="300"
            height="300"
          />
        </div>
      </div>
    </div>
    <div
      v-bind:style="{
        width:
          windowWidth >= 768
            ? `${windowWidth * 0.8}px`
            : windowWidth >= 641
              ? `${windowWidth * 0.9}px`
              : `${windowWidth}px`,
      }"
      class="right-center"
    >
      <div class="overlay">
        <div class="row">
          <div v-show="windowWidth >= 768" class="flex md4">
            <div class="center">
              <p>
                <img
                  class="image"
                  src="../../../assets/issuer_logo.png"
                  alt=""
                />
              </p>
            </div>
          </div>
          <div v-show="windowWidth >= 768" class="flex md1 hide-sm-and-below">
            <div
              v-bind:style="{ backgroundColor: colors.primary }"
              class="v-line"
            ></div>
          </div>
          <div class="flex sm12 md7 xs12">
            <div>
              <h2 v-bind:style="{ color: colors.primary }">
                Issuer Information
              </h2>
            </div>
            <div class="m2">
              <label>Name</label>
              <p>{{ issuerData["Entity Name"] }}</p>
            </div>
            <div class="m1">
              <label>DID</label>
              <p>{{ issuerData["DID"] }}</p>
            </div>
            <div class="m1">
              <label>LEI</label>
              <p>{{ issuerData["LEI"] }}</p>
            </div>
            <div class="m1">
              <div class="row">
                <div class="flex md6 sm6 xs6">
                  <label>Country</label>
                  <p>{{ issuerData["Country"] }}</p>
                </div>
                <div class="flex md6 sm6 xs6">
                  <label>Type</label>
                  <p>{{ issuerData["Type"] }}</p>
                </div>
              </div>
            </div>
            <div class="m3">
              <h2 v-bind:style="{ color: colors.primary }">Crypto Assets</h2>
            </div>
            <br />
            <div class="assets-container">
              <asset-container
                class="asset-container"
                v-for="(asset, index) in issuerData['Cryptos'] ?? []"
                v-bind:key="index"
                :asset="asset"
                @click="openAsset(asset)"
              >
              </asset-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useColors } from "vuestic-ui";
import { mapGetters } from 'vuex';
import AssetContainer from "./AssetContainer";
export default {
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
.right-center {
  position: absolute;
}
.overflow-hidden {
  overflow: hidden;
}
.main-container {
  height: 80vh;
  font-family: "Avenir";
  font-size: 24px;
  height: 40rem;
  padding: 0;
  margin-top: 2vh;
  /* Center vertically and horizontally */
  display: flex;
  justify-content: center;
  align-items: center;
}
.assets-container {
  width: 100%;
  box-shadow: none !important;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  overflow: scroll;
}

asset-container {
  box-shadow: none !important;
}

.asset-container {
  margin-right: 40px;
}
.v-line {
  height: 60vh;
  width: 1px;
  padding: 0px;
}

.image {
  width: fit-content;
  height: 300px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
}

.row {
  margin: 0 !important;
  padding: 0 !important;
}

.flex {
  padding: 0 !important;
}

label {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 12px;
  font-weight: 700;
  height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: #999999;
  font-family: "Source Sans Pro";
}

h3 {
  margin: 0px !important;
  padding: 0px !important;
  margin-block-end: 0 !important;
  margin-block-start: 0 !important;
  font-size: 24px;
  font-weight: bold;
  height: 14px;
  color: black;
}
.m2 {
  margin-top: 2vh !important;
}

.m1 {
  margin-top: 1vh !important;
}
.m3 {
  margin-top: 5vh !important;
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
.overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
}
</style>
