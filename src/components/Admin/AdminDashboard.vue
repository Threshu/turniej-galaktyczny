<template>
  <div class="w-100 wrapper d-flex admin-dashboard">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <v-col class="table-section">
      <v-data-table
        :headers="headers"
        :items="scores"
        style="background-color: transparent; color: white"
        class="elevation-10 custom_table_class"
        no-data-text="Brak zapisanych zawodników"
        :height="'70vh'"
        items-per-page="-1"
        hide-default-header
        :fixed-header="true"
      >
        <template #top>
          <div class="w-100 text-center font-bold header-label pb-10">PUNKTACJA</div>
          </template>
        <template #headers></template>
        <template #bottom>
          <v-btn class="mt-3" color="primary" @click="addNewRecord">
            Dodaj zawodnika
          </v-btn>
        </template>

        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td style="width: 50%;">
              <v-text-field
                v-model="item.nick"
                hide-details
                dense
              ></v-text-field></td>
            <td>{{ item.score }}</td>
            <td class="text-center">
              <v-btn icon small @click="changeScore(item, 1)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon small @click="changeScore(item, -1)" class="mx-5">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn icon @click="deleteRecord(item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <v-col class="question-section">
      <div class="w-100 text-center label font-bold">PYTANIE</div>
      <div class="w-100 d-flex justify-content-center">
        <v-btn
          class="ma-2"
          icon
          color="primaryLight"
          size="80"
          v-for="number in 3"
          :key="number"
          @click="activeDiffBtn = number"
          ><span
            :class="{ 'diff-btn-active': activeDiffBtn === number }"
            style="font-size: 35px"
            >{{ number }}</span
          ></v-btn
        >
      </div>
      <div class="w-100 h-50 px-2 pt-5">
        <v-card color="primaryLight" class="h-100">
          Jak przygotować hot doga dla klienta?
        </v-card>
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeDiffBtn: 1,
      headers: [
        { text: "Nr", value: "number" },
        { text: "Imię i nazwisko", value: "nick" },
        { text: "Punkty", value: "score", width: '5%' },
        { text: "Akcje", value: "actions", sortable: false, width: '20%' },
      ],
      scores: [
        // Przykładowe dane
        { nick: "Jan Kowalski", score: 0 },
        { nick: "Anna Nowak", score: 0 },
        // Tutaj możesz dodać więcej rekordów
      ],
    };
  },

  methods: {
    addNewRecord() {
      this.scores.push({ nick: "", score: 0 });
    },
    deleteRecord(item) {
      const index = this.scores.indexOf(item);
      if (index > -1) {
        this.scores.splice(index, 1);
      }
    },
    changeScore(item, value) {
      item.score += value;
    },
  },
};
</script>

<style lang="scss">
.admin-dashboard {
  .table-section {
    .header-label {
      font-size: 37px;
    }

    td {
      font-size: 45px;
    }

    .custom_table_class tbody td {
      border-bottom: thin solid white !important
    }
  }

  .question-section {
    .label {
      font-size: 49px;
    }
  }
}
</style>
