<template>
  <div class="d-flex w-100 mh-75">
    <v-card class="w-80 ratings py-5" elevation="9" color="white">
      <v-btn
        elevation="0"
        color="primaryLight"
        icon
        class="close-btn"
        @click="$emit('close')"
      >
        <v-icon size="2.5vw">mdi-close</v-icon>
      </v-btn>
      <v-card-title class="text-center font-bold"> TOP 10 </v-card-title>
      <v-card-text class="w-100 m-auto my-2">
        <template v-if="!loader">
          <template v-if="players_to_display.length > 0">
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
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="num_pages"
              rounded="circle"
              elevation="10"
              active-color="primaryLight"
            />
          </div>
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
      page: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    num_pages() {
      return Math.ceil(this.players?.length / this.itemsPerPage);
    },
    players_to_display() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.assignPlaces([...this.players]).slice(start, end);
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
@import "../../../styles/variables.scss";
.ratings {
  color: $primary !important;
  box-shadow: 10px 10px 0 #43b649 !important;
  border-radius: 0 !important;

  .v-card-title {
    font-size: 3.3vw;
    line-height: normal !important;
  }

  .v-card-text {
    font-size: 1.7vw;
    line-height: 1.2;
    height: calc(100% - 200px);
  }
}
</style>
