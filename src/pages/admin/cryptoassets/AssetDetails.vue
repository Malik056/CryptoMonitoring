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
            <va-icon class="material-icons" color="primary" size="large">arrow_back</va-icon
            >
          </button>
        </div> -->
        <div class="flex md12 xs12 align-center">
          <h2>{{ $t("assets.details.title") }}</h2>
        </div>
        <!-- <div class="flex md2 xs2"></div> -->
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("assets.details.name") }}</label>
          <p>{{ issuerData["CryptoAssetName"] }}</p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("assets.details.type") }}</label>
          <p>{{ issuerData["CryptoAssetType"] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("assets.details.emittingBody") }}</label>
          <p>
            <a href="" @click.prevent="openIssuer(issuerData)">{{
              issuerData["EmittingBody"]
            }}</a>
          </p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.issuerDetails.country") }}</label>
          <p>{{ $t(issuerData["Country"]) }}</p>
        </div>
      </div>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("assets.details.symbol") }}</label>
          <p>{{ issuerData["CryptoAssetSymbol"] }}</p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("assets.details.quantityOfTokens") }}</label>
          <p>{{ issuerData["QuantityofTokens"] }}</p>
        </div>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="row align--center">
        <div class="flex md12 xs12 align-center">
          <h2>{{ $t("assets.details.transparency.title") }}</h2>
        </div>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{
            $t("assets.details.transparency.authorizedCustomerType")
          }}</label>
          <p>
            {{
              formatCustomerType(
                issuerData["Transparency"]["AuthorizedCustomersType"]
              )
            }}&nbsp;
          </p>
        </div>
        <div class="flex md6 xs12">
          <label>{{
            $t("assets.details.transparency.incompatibleCustomerType")
          }}</label>
          <p>
            {{
              formatCustomerType(
                issuerData["Transparency"]["IncompatibleCustomerTypes"]
              )
            }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{
            $t("assets.details.transparency.distributionStrategy")
          }}</label>
          <p
            v-if="!issuerData['Transparency']['DistributionStrategy'] ||issuerData['Transparency']['DistributionStrategy'] == ''">
            NIL
          </p>
          <p v-else>
            <a
              :href="
                linkify(issuerData['Transparency']['DistributionStrategy'])
              "
              target="_blank">{{ issuerData["Transparency"]["DistributionStrategy"] }}</a
            >
          </p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("assets.details.transparency.traderID") }}</label>
          <p>{{ issuerData["Transparency"]["TraderID"] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("assets.details.transparency.referenceMarket") }}</label>
          <p
            v-if="!issuerData['Transparency']['ReferenceMarket'] ||issuerData['Transparency']['ReferenceMarket'] == ''">
            NIL
          </p>
          <p v-else>
            <a
              :href="linkify(issuerData['Transparency']['ReferenceMarket'])"
              target="_blank">{{ issuerData["Transparency"]["ReferenceMarket"] }}</a
            >
          </p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("assets.details.transparency.updatedAt") }}</label>
          <p>
            {{
              new Date(
                issuerData["Transparency"]["Timestamp"] * 1000
              ).toLocaleDateString()
            }}
          </p>
        </div>
      </div>
    </va-card>
    <br />
  </div>
</template>

<script>
import { assetTypes } from "@/store";
import { useColors } from "vuestic-ui";
import { mapGetters } from "vuex";
export default {
  name: "assetDetails",
  components: {},
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
      issuerData: JSON.parse(this.asset),
      assetTypes: assetTypes,
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
    linkify(link) {
      if (!link.startsWith("http")) {
        return "http://" + link;
      }
      return link;
    },
    close() {
      this.$emit("close");
    },
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
    formatCustomerType(data) {
      if(!data || data === '') {
        return "NIL";
      }
      const list = data.split(",");
      for (let i = 0; i < list.length; i++) {
        list[i] = this.$t("customerTypes." + list[i].trim());
      }
      return list.join(", ");
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
.align-left {
  text-align: left;
}
.btn-back {
  border: none;
  background: transparent;
  text-align: right;
}
</style>
