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
                  src="../../../assets/asset_logo.png"
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
                {{$t('assets.details.title')}}
              </h2>
            </div>
            <div class="m2">
              <label>{{$t('assets.details.name')}}</label>
              <p>{{ assetData["CryptoAssetName"] }}</p>
            </div>
            <div class="m1">
              <label>{{$t('assets.details.emittingBody')}}</label>
              <p>
                <a href="" @click.prevent="openIssuer(assetData)">{{
                  assetData["EmittingBody"]
                }}</a>
              </p>
            </div>
            <div class="m1">
              <div class="row">
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.country')}}</label>
                  <p>{{ assetData["Country"] }}</p>
                </div>
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.type')}}</label>
                  <p>{{ assetData["CryptoAssetType"] }}</p>
                </div>
              </div>
            </div>
            <div class="m1">
              <div class="row">
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.symbol')}}</label>
                  <p>{{ assetData["CryptoAssetSymbol"] }}</p>
                </div>
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.quantityOfTokens')}}</label>
                  <p>{{ assetData["QuantityofTokens"] }}</p>
                </div>
              </div>
            </div>
            <div class="m3">
              <h2 v-bind:style="{ color: colors.primary }">
                {{$t('assets.details.transparency.title')}}
              </h2>
            </div>
            <div class="m1">
              <div class="row">
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.transparency.authorizedCustomerType')}}</label>
                  <p>
                    {{
                      assetData["Transparency"]["AuthorizedCustomersType"]
                    }}&nbsp;
                  </p>
                </div>
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.transparency.incompatibleCustomerType')}}</label>
                  <p>
                    {{ assetData["Transparency"]["IncompatibleCustomerTypes"] }}
                  </p>
                </div>
              </div>
            </div>
            <div class="m1">
              <div class="row">
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.transparency.distributionStrategy')}}</label>
                  <p>{{ assetData["Transparency"]["DistributionStrategy"] }}</p>
                </div>
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.transparency.traderID')}}</label>
                  <p>{{ assetData["Transparency"]["TraderID"] }}</p>

                </div>
              </div>
            </div>
            <div class="m1">
              <div class="row">
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.transparency.referenceMarket')}}</label>
                  <p>{{ assetData["Transparency"]["ReferenceMarket"] }}</p>
                </div>
                <div class="flex md6 sm6 xs6">
                  <label>{{$t('assets.details.transparency.updatedAt')}}</label>
                  <p>{{ assetData["Transparency"]["Timestamp"] }}</p>
                </div>
              </div>
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

export default {
  props: {
    asset: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      logo: process.env.BASE_URL,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      assetData: JSON.parse(this.asset),
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
    openIssuer(asset) {
      const issuers = this.getIssuers;
      let foundIssuer;
      for (let i = 0; i < issuers.length; i++) {
        const element = issuers[i];
        if (element.id === asset.EmittingBodyId) {
          foundIssuer = element;
        }
      }
      if (foundIssuer) {
        this.$router.push({
          name: "issuerDetails",
          params: { issuer: JSON.stringify(foundIssuer) },
        });
      }
    },

    onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    ...mapGetters([["getIssuers"]]),
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
  overflow-x: hidden;
}
.main-container {
  height: 80vh;
  font-family: Avenir;
  font-size: 24px;
  height: 40rem;
  padding: 0;
  margin-top: 2vh;
  /* Center vertically and horizontally */
  display: flex;
  justify-content: center;
  align-items: center;
}

.vertical-center {
  margin: 0px 40px;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.v-line {
  height: 60vh;
  width: 1px;
  padding: 0px;
}

.image {
  width: 15vw;
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
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: #999999;
  font-family: "Source Sans Pro";
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
div {
  padding-left: 10px;
}
</style>
