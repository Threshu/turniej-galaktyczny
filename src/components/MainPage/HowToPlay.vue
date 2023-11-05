<template>
  <div class="d-flex w-100 h-75">
    <v-card class="w-80 how-to-play py-5" elevation="9" color="primaryLight" outlined>
      <v-btn elevation="0" color="primaryLight" icon class="close-btn" @click="$emit('close')">
          <v-icon size="45">mdi-close</v-icon>
        </v-btn>
      <v-card-title class="text-center">
        Jak grać
      </v-card-title>
      <v-card-text>
        <v-row v-for="rule in rules" :key="rule.number" class="py-5 d-flex align-items-center" no-gutters>
          <v-col cols="2" class="w-100 text-center">
            <div class="rule-number" v-text="rule.number"/>
          </v-col>
          <v-col cols="10">
            <div class="rule-text" v-text="rule.text"/>
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
      rules: [
        { text: "Rzuć kostką i wybierz gracza, który wykona ruch zgodny z rzutem - masz na to tylko 10 sekund!", number: 1 },
        { text: "Gracz przechodzi na wskazane pole i odpowiada na pytanie z kategorii zgodnej z cyfrą Żappsa.", number: 2 },
        { text: "Udzielił dobrej odpowiedzi? Świetnie, zgarnia tyle punktów ile na polu wskazuje Żapps!", number: 3 },
        { text: "Następny w kolejności gracz rzuca kostką i wybiera gracza...", number: 4 },
        { text: "Uważajcie na strzałki! Potrafią zrobić psikusa...", number: 5 },
        { text: "Gra kończy się kiedy na planszy pozostanie 1 gracz lub po upływie 20 minut.", number: 6 },
      ],
    };
  },
};
</script>
<style lang="scss">
.how-to-play {
  .v-card-title {
    font-size: 53px;
    line-height: normal !important;
  }

  .rule-number {
    font-size: 70px;
  }

  .rule-text {
    font-size: 21px;
    line-height: 1.3;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
