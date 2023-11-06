<template>
  <div>
    <span v-text="tournament" class="title-main font-bold d-block" />
    <span v-text="galactic" class="subtitle-main font-bold d-block" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tournament: "TURNIEJ",
      galactic: "GALAKTYCZNY",
    };
  },
};
</script>
<style lang="scss">
@import "../../../styles/variables.scss";
.title-main {
  font-size: 7.7vw;
  line-height: 0.6;
  color: $primaryLight;
}

.subtitle-main {
  font-size: 3.3vw;
  color: $primaryLight;
}
</style>
