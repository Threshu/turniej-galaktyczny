<template>
  <transition name="route" mode="out-in">
    <component
      :is="getComponent()"
      @changePage="changePage"
      :show-game-btn="showGameBtn"
    />
  </transition>
</template>
<script>
import MainPage from "./components/MainPage.vue";
import Questions from "./components/Questions/Questions.vue";
import NewGame from "./components/NewGame/NewGame.vue";
import * as PAGES from "./data/pages";
const TABS = {
  [PAGES.MAIN]: MainPage,
  [PAGES.QUESTIONS]: Questions,
  [PAGES.NEW_GAME]: NewGame,
};
export default {
  props: {
    showGameBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedTab: "main",
    };
  },
  methods: {
    getComponent() {
      if (this.selectedTab == null) return TABS["main"];
      return TABS[this.selectedTab];
    },
    changePage(page) {
      this.selectedTab = page;
    },
  },
};
</script>
<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
