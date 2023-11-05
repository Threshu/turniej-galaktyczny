<template>
  <div class="d-flex w-100 h-75">
    <v-card class="w-80 ratings py-5" elevation="9" color="primaryLight" outlined>
      <v-btn elevation="0" color="primaryLight" icon class="close-btn" @click="$emit('close')">
          <v-icon size="45">mdi-close</v-icon>
        </v-btn>
      <v-card-title class="text-center">
        TOP 10 graczy
      </v-card-title>
      <v-card-text class="w-100 m-auto my-2">
        <v-row v-for="player in players" :key="player.place" class="pb-4 d-flex align-items-center" no-gutters>
          <v-col cols="2" class="w-100 text-center">
            <div v-text="`${player.place}.`"/>
          </v-col>
          <v-col cols="8">
            <div v-text="player.nick"/>
          </v-col>
          <v-col cols="2">
            <div class="font-bold" v-text="player.points"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      players: [
        { nick: "Kasia Kowalska", place: 1, points: 100 },
        { nick: "Jan Nowak", place: 2, points: 97 },
        { nick: "Kasia Nowak", place: 3, points: 83 },
        { nick: "Jan Kowalski", place: 4, points: 81 },
        { nick: "Kasia Kowalska", place: 5, points: 79 },
        { nick: "Jan Nowak", place: 6, points: 77 },
        { nick: "Kasia Nowak", place: 7, points: 69 },
        { nick: "Jan Kowalski", place: 8, points: 63 },
        { nick: "Kasia Nowak", place: 9, points: 60 },
        { nick: "Kasia Kowalska", place: 10, points: 55 },
      ],
    };
  },
};
</script>
<style lang="scss">
.ratings {
  .v-card-title {
    font-size: 53px;
    line-height: normal !important;
  }

  .v-card-text {
    font-size: 30px;
    line-height: 1.2;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
