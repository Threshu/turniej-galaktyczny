<template>
  <div class="d-flex w-100 h-75">
    <v-card
      class="w-80 ratings py-5"
      elevation="9"
      color="primaryLight"
      outlined
    >
      <v-btn
        elevation="0"
        color="primaryLight"
        icon
        class="close-btn"
        @click="$emit('close')"
      >
        <v-icon size="45">mdi-close</v-icon>
      </v-btn>
      <v-card-title class="text-center"> TOP 10 graczy </v-card-title>
      <v-card-text class="w-100 m-auto my-2">
        <template v-if="!loader">
          <v-row
            v-for="player in players_to_display"
            :key="player.id"
            class="pb-4 d-flex align-items-center"
            no-gutters
          >
            <v-col cols="2" class="w-100 text-center">
              <div v-text="`${player.place}.`" />
            </v-col>
            <v-col cols="8">
              <div v-text="player.nick" />
            </v-col>
            <v-col cols="2">
              <div class="font-bold" v-text="player.points" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <div
            class="w-100 h-100 d-flex justify-content-center align-items-center"
          >
            <v-progress-circular
              :size="70"
              :width="7"
              color="white"
              indeterminate
            />
          </div>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { projectFirestore } from "../../firebase/config";
export default {
  data() {
    return {
      loader: true,
      players: [],
    };
  },
  computed: {
    players_to_display() {
      const players = [...this.players];
      return this.assignPlaces(players).slice(0, 10);
    },
  },
  async mounted() {
    this.loader = true;
    const response = await projectFirestore.collection("users").get();
    this.players = response.docs.map((user) => {
      return { ...user.data(), id: user.id };
    });
    setTimeout(() => {
      this.loader = false;
    }, 500);
  },
  methods: {
    assignPlaces(players) {
      if (!Array.isArray(players)) return [];
      const sortedPlayers = [...players];
      sortedPlayers.sort((a, b) => b.points - a.points);
      let currentPlace = 1;
      for (let i = 0; i < sortedPlayers.length; i++) {
        if (i > 0 && sortedPlayers[i].points < sortedPlayers[i - 1].points) {
          currentPlace = i + 1;
        }
        sortedPlayers[i].place = currentPlace;
      }
      return sortedPlayers;
    },
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
    height: calc(100% - 200px);
  }
}
</style>
