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
          <h2>{{ $t("issuers.claimedDetails.title") }}</h2>
        </div>
        <!-- <div class="flex md2 xs2"></div> -->
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.claimedDetails.claimedCA") }}</label>
          <p>
            {{
              isEmptyOrNull(claimedInfoData["claimedCA"])
                ? "NIL"
                : claimedInfoData["claimedCA"]
            }}
          </p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.claimedDetails.active") }}</label>
          <p>
            {{
              isEmptyOrNull(claimedInfoData["active"])
                ? "NIL"
                : claimedInfoData["active"]
            }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.claimedDetails.details") }}</label>
          <p>
            {{
              isEmptyOrNull(claimedInfoData["details"])
                ? "NIL"
                : claimedInfoData["details"]
            }}
          </p>
        </div>
        <div class="flex md6 xs12">
          <label>{{ $t("issuers.claimedDetails.timestamp") }}</label>
          <p>
            {{
              isEmptyOrNull(claimedInfoData["timestamp"])
                ? "NIL"
                : new Date(claimedInfoData["timestamp"] * 1000).toLocaleDateString()
            }}
          </p>
        </div>
      </div>
    </va-card>
  </div>
</template>

<script>
import { useColors } from "vuestic-ui";
import { mapGetters } from "vuex";
export default {
  name: "claimDetails",
  components: {},
  props: {
    claimedInfo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      logo: process.env.BASE_URL,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      claimedInfoData: JSON.parse(this.claimedInfo),
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
