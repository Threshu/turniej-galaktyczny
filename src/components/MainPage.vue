<template>
  <div class="w-100 h-100 d-flex">
    <v-col
      cols="6"
      class="d-flex align-items-end justify-content-center flex-column"
    >
      <div
        v-for="btn in mainPageButtons"
        class="w-100 d-flex justify-content-end mr-10"
      >
        <v-btn
          class="main-page-btn font-bold text-white w-50"
          elevation="9"
          size="3vw"
          @click="changePage(btn)"
          >{{ btn.title }}</v-btn
        >
      </div>
    </v-col>
    <v-col cols="6" class="d-flex align-items-center justify-content-start">
      <transition name="fade" mode="out-in">
        <component :is="getComponent()" @close="selectedTab = null" />
      </transition>
    </v-col>
  </div>
</template>
<script>
import MainTitle from "./MainPage/MainTitle.vue";
import HowToPlay from "./MainPage/HowToPlay.vue";
import Ratings from "./MainPage/Ratings.vue";
import * as MAIN_PAGE_TABS from "../data/mainPageCards";
const TABS = {
  [MAIN_PAGE_TABS.MAIN_PAGE]: MainTitle,
  [MAIN_PAGE_TABS.HOW_TO_PLAY]: HowToPlay,
  [MAIN_PAGE_TABS.RATINGS]: Ratings,
};
export default {
  data() {
    return {
      selectedTab: null,
      mainPageButtons: [
        {
          title: "Jak grać",
          componentName: "howToPlay",
        },
        {
          title: "Ranking graczy",
          componentName: "ratings",
        },
        {
          title: "Pytania",
          componentName: "questions",
          emit: true,
        },
      ],
    };
  },
  methods: {
    getComponent() {
      if (this.selectedTab == null) return TABS["mainPage"];
      return TABS[this.selectedTab];
    },
    changePage(btn) {
      if (btn?.emit) return this.$emit("changePage", btn.componentName);
      this.selectedTab = btn.componentName;
    },
  },
};
</script>
<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.25s linear;
}

.fade-leave-to {
  transition: all 0.25s linear;
  opacity: 0;
}
</style>
