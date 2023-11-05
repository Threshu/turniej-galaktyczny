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
      mainPageButtons: [
        {
          title: "Nowa gra",
        },
        {
          title: "Jak grać",
        },
        {
          title: "Ranking graczy",
        },
        {
          title: "Pytania",
        },
      ],
    };
  },
};
</script>
<style>
.title-main {
  font-size: 148px;
  line-height: 0.6;
  letter-spacing: 5px;
}

.subtitle-main {
  font-size: 64px;
  letter-spacing: 10px;
}
</style>
