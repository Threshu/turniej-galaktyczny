<template>
  <section class="wrapper w-100 d-flex">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <template v-if="current_question_id && !loader">
      <v-col class="table-section px-10">
        <v-data-table
          :headers="headers"
          :items="players_to_display"
          style="background-color: transparent; color: white"
          class="custom_table_class"
          no-data-text="Brak zapisanych zawodników"
          :height="'85vh'"
          :loading="loader"
          loading-text="Pobieranie zawodników"
          items-per-page="-1"
          hide-default-header
          :fixed-header="true"
        >
          <template #top>
            <div class="w-100 text-center font-bold header-label pb-10">PUNKTACJA</div>
          </template>
          <template #headers></template>
          <template #bottom></template>
          <template v-slot:item="{ item, index }">
            <tr>
              <td>{{ index + 1 }}</td>
              <td style="width: 50%">
                {{ item.nick }}
              </td>
              <td>{{ item.points }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col class="question-section px-10">
        <div class="w-100 text-center label font-bold">PYTANIE</div>
        <div class="w-100 d-flex justify-content-center">
          <v-btn
            class="ma-2"
            icon
            color="primaryLight"
            size="80"
            v-for="number in 3"
            :key="number"
            ><span
              :class="{
                'diff-btn-active':
                  current_question_type === number && current_question_id != null,
              }"
              style="font-size: 35px"
              >{{ number }}</span
            ></v-btn
          >
        </div>
        <div class="w-100 h-50 px-2 pt-5">
          <v-card color="primaryLight" class="h-100 questionBox">
            <transition name="question" mode="out-in">
              <div class="d-flex flex-column h-100 justify-content-center">
                <transition name="answer" mode="out-in">
                  <div
                    v-if="current_question_type === EASY && current_question_id != null"
                  >
                    <div class="title pa-5 pt-0 text-center">
                      {{ current_question_text }}
                    </div>
                    <div class="w-100 d-flex justify-content-space-evenly title">
                      <template v-for="(answer, index) in current_question_answers">
                        <v-col
                          v-if="index === 0"
                          class="text-right mr-10"
                          :class="{
                            'answer-correct':
                              current_question_show_answer && answer.correct,
                          }"
                        >
                          <div>{{ answer.text }}</div>
                        </v-col>
                        <v-col
                          v-if="index === 1"
                          class="text-left ml-10"
                          :class="{
                            'answer-correct':
                              current_question_show_answer && answer.correct,
                          }"
                        >
                          <div>{{ answer.text }}</div>
                        </v-col>
                      </template>
                    </div>
                  </div>
                  <div
                    v-else-if="
                      current_question_type === NORMAL && current_question_id != null
                    "
                  >
                    <div class="title pa-5 pt-0 text-center">
                      {{ current_question_text }}
                    </div>
                    <div class="d-flex flex-column">
                      <v-col
                        v-for="(answer, index) in current_question_answers"
                        class="text-center py-0"
                      >
                        <div
                          class="subtitle"
                          :class="{
                            'answer-correct':
                              current_question_show_answer && answer.correct,
                          }"
                        >
                          {{ alphabet[index] }}. {{ answer.text }}
                        </div>
                      </v-col>
                    </div>
                  </div>
                  <div
                    v-else-if="
                      current_question_type === HARD && current_question_id != null
                    "
                  >
                    <div class="title pa-5 pt-0 text-center">
                      {{ current_question_text }}
                    </div>
                    <div class="w-100 text-center title mt-5 px-3">
                      <transition name="answer" mode="out-in">
                        <span class="font-bold" v-if="current_question_show_answer">{{
                          current_question_correct_answer
                        }}</span>
                        <span v-else />
                      </transition>
                    </div>
                  </div>
                  <div
                    v-else-if="current_question_id == null"
                    class="title pa-5 pt-0 text-center"
                  >
                    Pytanie nie zostało wczytane
                  </div>
                </transition>
              </div>
            </transition>
          </v-card>
        </div>
      </v-col>
    </template>
    <template v-else-if="!loader">
      <div class="w-100 d-flex align-items-center">
        <Ratings class="justify-content-center" @close="$emit('changePage', 'main')" />
      </div>
    </template>
  </section>
</template>
<script>
import Ratings from "../MainPage/Ratings.vue";
import { projectFirestore } from "../../firebase/config";
export default {
  components: {
    Ratings,
  },
  data() {
    return {
      gameId: "x4SieVrmpZ2TLV7BKA7O",
      currentGame: null,
      currentQuestion: null,
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      headers: [{ value: "number" }, { value: "nick" }, { value: "points" }],
      loader: true,
      EASY: 1,
      NORMAL: 2,
      HARD: 3,
    };
  },
  computed: {
    players_to_display() {
      return this.currentGame?.players ?? [];
    },
    current_question_id() {
      return this.currentGame?.questionId;
    },
    current_question_show_answer() {
      return this.currentGame?.showAnswer;
    },
    current_question_type() {
      return this.currentQuestion?.type;
    },
    current_question_text() {
      return this.currentQuestion?.question;
    },
    current_question_answers() {
      const answers = this.currentQuestion?.answers;
      return answers.map((answer) => {
        return {
          correct: answer === this.current_question_correct_answer,
          text: answer,
        };
      });
    },
    current_question_correct_answer() {
      return this.currentQuestion?.correctAnswer;
    },
  },
  async mounted() {
    this.loader = true;
    await this.listenCurrentGame();
    this.loader = false;
  },
  watch: {
    current_question_id: {
      immediate: true,
      async handler() {
        if (this.current_question_id == null) return;
        await this.getCurrentQuestion();
      },
    },
  },
  methods: {
    async listenCurrentGame() {
      await projectFirestore
        .collection("game")
        .doc(this.gameId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            this.currentGame = { ...doc.data(), id: doc.id };
          }
        });
    },
    async getCurrentQuestion() {
      const result = await projectFirestore
        .collection("questions")
        .doc(this.current_question_id)
        .get();
      if (result == null) return;
      this.currentQuestion = result.data();
    },
  },
};
</script>
