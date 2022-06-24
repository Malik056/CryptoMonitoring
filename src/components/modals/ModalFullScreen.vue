<script>
import { mapGetters } from "vuex";
export default {
  name: "Modal",
  data() {
    return {
      mobileBreakPointPX: 640,
      tabletBreakPointPX: 768,
      isMobile: false,
      isTablet: false,
      sidebarMinimizedWidth: "4rem",
      sidebarWidth: "16rem",
      modalTop: "4rem",
    };
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  computed: {
    ...mapGetters(["isSidebarMinimized"]),
  },
  methods: {
    close() {
      this.$emit("close");
    },
    checkIsTablet() {
      return window.innerWidth <= this.tabletBreakPointPX;
    },
    checkIsMobile() {
      return window.innerWidth <= this.mobileBreakPointPX;
    },
    onResize() {
      this.isMobile = this.checkIsMobile();
      this.isTablet = this.checkIsTablet();
      if (this.isTablet) {
        this.modalTop = "6.5rem";
      } else {
        this.modalTop = "4rem";
      }
      this.sidebarMinimizedWidth = this.isMobile ? 0 : "4rem";
      this.sidebarWidth = this.isMobile ? 0 : "16rem";
    },
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div
      class="modal-backdrop"
      :style="{
        left: isSidebarMinimized ? sidebarMinimizedWidth : sidebarWidth,
        top: modalTop,
      }"
    >
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <section class="modal-body" id="modalDescription">
          <slot name="body"> This is the default body! </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #F6F7F6;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  /* padding: 20px 10px; */
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

.btn-green {
  color: white;
  border: 1px solid;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
