<template>
  <div style="position: relative" class="w-100 h-100">
    <div>
      <div class="w-100 d-flex px-4 difficult-lvl">
        <v-spacer /><span style="margin-right: 40px">Poziom trudności</span>
      </div>
      <v-card class="mx-3" color="primaryLight">
        <v-card-title>
          <div class="w-100 d-flex">
            <v-col cols="4" class="pa-0"></v-col>
            <v-col
              cols="4"
              class="align-items-center d-flex justify-content-center pa-0"
              style="font-size: 63px"
              >Pytania</v-col
            >
            <v-col cols="4" class="pa-0 d-flex">
              <v-spacer />
              <v-btn
                class="ma-2"
                icon
                color="primary"
                size="80"
                v-for="number in 3"
                :key="number"
                @click="activeDiffBtn = number"
                ><span :class="{'diff-btn-active': activeDiffBtn === number}" style="font-size: 35px">{{ number }}</span></v-btn
              >
            </v-col>
          </div>
        </v-card-title>
      </v-card>

      <div class="w-100 mt-15 text-center">
        <span style="font-size: 47px">Czy w Żabce można zjeść hot doga?</span>
      </div>
      <div class="w-80 mt-15 pb-15 text-center d-flex justify-content-space-evenly answer-btns m-auto">
        <div style="font-size: 47px">Tak</div>
        <div style="font-size: 47px">Nie</div>
      </div>
      <div class="w-80 mt-15 text-center d-flex justify-content-space-evenly answer-btns m-auto">
        <div style="font-size: 47px">Pokaż odpowiedź</div>
      </div>
    </div>
    <div class="roll-wrapper roll-right">
      <Dice />
    </div>
    <div class="roll-wrapper roll-left">
      <v-btn
        class="ma-2"
        icon
        color="primaryLight"
        size="100"
        @click="$emit('changePage', 'main')"
        ><v-icon size="65">mdi-arrow-left</v-icon></v-btn
      >
    </div>
  </div>
</template>
<script>
import Dice from "../Dice.vue";

export default {
  components: { Dice },
  emits: ["changePage"],
  data(){
    return {
      activeDiffBtn: 1
    }
  }
};
</script>
<style lang="scss">
@import "../../../styles/variables.scss";

.roll-wrapper {
  position: absolute;
  bottom: 5px;
}

.roll-right {
  right: 5px;
  transform: translate(-100%, -50%);
}

.roll-left {
  left: 5px;
  transform: translate(0%, -25%);
}

.difficult-lvl {
  font-size: 29px;
}

.diff-btn-active {
  font-weight: bold;
  font-size: 50px !important;
  text-shadow: 0 0 5px $white;
}

.answer-btns div:hover {
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 0 5px $white;
}
</style>
