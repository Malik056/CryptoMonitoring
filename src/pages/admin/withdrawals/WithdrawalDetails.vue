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
            <va-icon class="material-icons" color="primary" size="large"
              >arrow_back</va-icon
            >
          </button>
        </div> -->
        <div class="flex md12 xs12 align-center">
          <h2>{{ $t("issuers.withdrawalDetails.title") }}</h2>
        </div>
        <!-- <div class="flex md2 xs2"></div> -->
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.withdrawalDetails.claimedWR") }}</label>
          <p>
            {{
              isEmptyOrNull(withdrawalInfoData["claimedWR"])
                ? "NIL"
                : withdrawalInfoData["claimedWR"]
            }}
          </p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.withdrawalDetails.active") }}</label>
          <p>
            {{
              isEmptyOrNull(withdrawalInfoData["active"])
                ? "NIL"
                : withdrawalInfoData["active"]
            }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.withdrawalDetails.details") }}</label>
          <p>
            {{
              isEmptyOrNull(withdrawalInfoData["details"])
                ? "NIL"
                : withdrawalInfoData["details"]
            }}
          </p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.withdrawalDetails.timestamp") }}</label>
          <p>
            {{
              isEmptyOrNull(withdrawalInfoData["timestamp"])
                ? "NIL"
                : new Date(withdrawalInfoData["timestamp"] * 1000).toLocaleDateString()
            }}
          </p>
        </div>
      </div>
    </va-card>
  </div>
</template>

<script>
import { useColors } from "vuestic-ui";
export default {
  name: "withdrawalInfo",
  components: {},
  props: {
    withdrawalInfo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      logo: process.env.BASE_URL,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      withdrawalInfoData: JSON.parse(this.withdrawalInfo),
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
    onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
    isEmptyOrNull(value) {
      if (!value || value == "") {
        return true;
      }
      return false;
    },
  },
  computed: {
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
