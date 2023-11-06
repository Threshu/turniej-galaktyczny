<template>
  <div style="position: relative" class="w-100 h-100 bg-white questions-page">
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
                @click="changeDiffLvl(number)"
                ><span
                  :class="{ 'diff-btn-active': activeDiffBtn === number }"
                  style="font-size: 35px"
                  >{{ number }}</span
                ></v-btn
              >
            </v-col>
          </div>
        </v-card-title>
      </v-card>

      <div class="d-flex flex-column h-100 justify-content-center mt-15">
        <transition name="answer" mode="out-in">
          <div v-if="current_question_type === EASY">
            <div class="question-text pa-5 pt-0 text-center">
              {{ current_question_text }}
            </div>
            <div class="w-100 d-flex justify-content-space-evenly answer-text">
              <template v-for="(answer, index) in current_question_answers">
                <v-col
                  v-if="index === 0"
                  class="text-right mr-10"
                  :class="{ 'bad-answer': !answer.correct && showAnswer }"
                >
                  <div>{{ answer.text }}</div>
                </v-col>
                <v-col
                  v-if="index === 1"
                  class="text-left ml-10"
                  :class="{ 'bad-answer': !answer.correct && showAnswer }"
                >
                  <div>{{ answer.text }}</div>
                </v-col>
              </template>
            </div>
          </div>
          <div v-else-if="current_question_type === NORMAL">
            <div class="question-text pa-5 pt-0 text-center">
              {{ current_question_text }}
            </div>
            <div class="d-flex flex-column answer-text">
              <v-col
                v-for="(answer, index) in current_question_answers"
                class="text-center py-0"
                :class="{ 'bad-answer': !answer.correct && showAnswer }"
              >
                <div class="question-subtitle">
                  {{ alphabet[index] }}. {{ answer.text }}
                </div>
              </v-col>
            </div>
          </div>
          <div v-else-if="current_question_type === HARD">
            <div class="question-text pa-5 pt-0 text-center">
              {{ current_question_text }}
            </div>
            <div class="w-100 text-center answer-text mt-5 px-3">
              <transition name="answer" mode="out-in">
                <span class="font-bold" v-if="showAnswer">{{
                  current_question_correct_answer
                }}</span>
                <span v-else />
              </transition>
            </div>
          </div>
          <div
            v-else-if="current_question_text == null"
            class="question-text pa-5 pt-0 text-center answer-text"
          >
            <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
          </div>
        </transition>
        <div class="w-25 mt-15 m-auto answer-btn">
          <v-btn
            size="5vw"
            class="font-bold"
            rounded
            block
            color="primaryLight"
            @click="showAnswer = true"
            >Pokaż odpowiedź</v-btn
          >
        </div>
      </div>
    </div>
    <div class="roll-wrapper roll-right">
      <Dice @roll="roll" />
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
import { projectFirestore } from "../../firebase/config";

export default {
  components: { Dice },
  //emits: ["changePage"],
  data() {
    return {
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      activeDiffBtn: 1,
      questions: null,
      randomQuestion: null,
      EASY: 1,
      NORMAL: 2,
      HARD: 3,
      showAnswer: false,
    };
  },
  async mounted() {
    await this.getAllQuestions();
    this.getRandomQuestion();
  },
  computed: {
    current_question_type() {
      return this.randomQuestion?.type;
    },
    current_question_text() {
      return this.randomQuestion?.question;
    },
    current_question_answers() {
      const answers = this.randomQuestion?.answers;
      return answers.map((answer) => {
        return {
          correct: answer === this.current_question_correct_answer,
          text: answer,
        };
      });
    },
    current_question_correct_answer() {
      return this.randomQuestion?.correctAnswer;
    },
  },
  methods: {
    async getAllQuestions() {
      const querySnapshot = await projectFirestore
        .collection("questions")
        .where("type", "==", this.activeDiffBtn)
        .get();
      this.questions = querySnapshot.docs.map((question) => {
        return { ...question.data(), id: question.id };
      });
    },
    getRandomQuestion() {
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.randomQuestion = this.questions[randomIndex];
    },
    async roll() {
      const randomOneToThree = Math.floor(Math.random() * 3) + 1;
      await this.changeDiffLvl(randomOneToThree);
    },
    async changeDiffLvl(number) {
      this.showAnswer = false;
      this.activeDiffBtn = number;
      await this.getAllQuestions();
      this.getRandomQuestion();
    },
  },
};
</script>
<style lang="scss">
@import "../../../styles/variables.scss";

.questions-page {
  .answer-btn {
    font-size: 1.8vw;
  }

  .bad-answer {
    color: lightgray;
  }

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

  .question-text {
    font-weight: bold;
    color: $primary;
    font-size: 45px;
  }

  .answer-text {
    font-weight: bold;
    color: $primaryLight;
    font-size: 45px;
  }

  .question-subtitle {
    font-size: 35px;
  }
}
</style>
