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
        <template #bottom>
          <v-btn class="mt-3" color="primaryLight" @click="addNewRecord">
            Dodaj zawodnika
          </v-btn>
        </template>

        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td style="width: 50%">
              <v-text-field
                v-model="item.nick"
                hide-details
                :rules="[required]"
                dense
                @input="updateGame"
              >
                <template v-slot:prepend-inner>
                  <v-icon
                    :color="item.nick !== '' ? 'primaryLight' : undefined"
                    :icon="item.nick !== '' ? 'mdi-check-bold' : 'mdi-alert-circle'"
                  />
                </template>
              </v-text-field>
            </td>
            <td>{{ item.points }}</td>
            <td class="text-center">
              <v-btn color="primaryLight" icon @click="changeScore(item, 1)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                color="primaryLight"
                icon
                @click="changeScore(item, -1)"
                class="mx-5"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn color="primaryLight" icon @click="deleteRecord(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div class="w-100 d-flex mt-5">
        <v-col class="d-flex justify-content-center align-items-center">
          <v-btn color="primaryLight" :loading="startLoader" rounded @click="startGame"
            >Rozpocznij grę</v-btn
          >
        </v-col>
        <v-col class="d-flex justify-content-center align-items-center">
          <v-btn color="primaryLight" :loading="endLoader" rounded @click="endGame"
            >Zakończ grę</v-btn
          >
        </v-col>
      </div>
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
          @click="getQuestion(number)"
          ><span
            :class="{ 'diff-btn-active': activeDiffBtn === number }"
            style="font-size: 35px"
            >{{ number }}</span
          ></v-btn
        >
      </div>
      <div class="w-100 h-50 px-2 pt-5">
        <v-card color="primaryLight" class="h-100 questionBox">
          <transition name="question" mode="out-in">
            <template v-if="gameStarted">
              <div class="d-flex flex-column h-100 justify-content-center">
                <transition name="answer" mode="out-in">
                  <div
                    v-if="activeDiffBtn === EASY && random_question_correct_type === EASY"
                  >
                    <div class="title pa-5 pt-0 text-center">
                      {{ random_question_text }}
                    </div>
                    <div class="w-100 d-flex justify-content-space-evenly title">
                      <v-col
                        v-for="answer in random_question_answers"
                        class="text-center"
                      >
                        <div>{{ answer }}</div>
                      </v-col>
                    </div>
                    <div class="w-100 text-center title mt-5 px-3">
                      Odpowiedź:
                      <span class="font-bold">{{ random_question_correct_answer }}</span>
                    </div>
                  </div>
                  <div
                    v-else-if="
                      activeDiffBtn === NORMAL && random_question_correct_type === NORMAL
                    "
                  >
                    <div class="title pa-5 pt-0 text-center">
                      {{ random_question_text }}
                    </div>
                    <div class="d-flex flex-column">
                      <v-col
                        v-for="(answer, index) in random_question_answers"
                        class="text-center"
                      >
                        <div class="subtitle">{{ alphabet[index] }}. {{ answer }}</div>
                      </v-col>
                    </div>
                    <div class="w-100 text-center title mt-5 px-3">
                      Odpowiedź:
                      <span class="font-bold">{{ random_question_correct_answer }}</span>
                    </div>
                  </div>
                  <div v-else>
                    <div class="title pa-5 pt-0 text-center">
                      {{ random_question_text }}
                    </div>
                    <div class="w-100 text-center title mt-5 px-3">
                      Odpowiedź:
                      <span class="font-bold">{{ random_question_correct_answer }}</span>
                    </div>
                  </div>
                </transition>
              </div>
            </template>
            <template v-else>
              <div class="title pa-5 text-center">
                Rozpocznij grę, aby zobaczyć pytanie. Pamiętaj o wyborze trudności
                pytania!
              </div>
            </template>
          </transition>
        </v-card>
      </div>
      <div class="w-100 d-flex justify-content-center mt-5">
        <transition name="question" mode="out-in">
          <template v-if="!showAnswer">
            <v-btn color="primaryLight" rounded @click="showAnswerFn">Pokaż odpowiedź</v-btn>
          </template>
          <template v-else>
            <v-btn color="error" rounded @click="showAnswerFn">Ukryj odpowiedź</v-btn>
          </template>
        </transition>
      </div>
    </v-col>
  </div>
</template>

<script>
import { projectFirestore } from "../../firebase/config";
export default {
  data() {
    return {
      activeDiffBtn: 1,
      headers: [
        { value: "number" },
        { value: "nick" },
        { value: "points", width: "5%" },
        { value: "actions", width: "20%" },
      ],
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      scores: [{ nick: "", points: 0 }],
      questionsIds: [],
      questions: [],
      randomQuestion: null,
      gameId: "x4SieVrmpZ2TLV7BKA7O",
      loader: true,
      startLoader: false,
      endLoader: false,
      questionRandomId: null,
      gameStarted: false,
      EASY: 1,
      NORMAL: 2,
      HARD: 3,
      showAnswer: false,
    };
  },
  computed: {
    random_question_text() {
      return this.randomQuestion?.question;
    },
    random_question_answers() {
      return this.randomQuestion?.answers;
    },
    random_question_correct_answer() {
      return this.randomQuestion?.correctAnswer;
    },
    random_question_correct_type() {
      return this.randomQuestion?.type;
    },
  },
  async mounted() {
    this.loader = true;
    await this.getCurrentGame();
    await this.setQuestionConfig(this.EASY);
    this.loader = false;
  },
  methods: {
    async getCurrentGame() {
      const result = await projectFirestore.collection("game").doc(this.gameId).get();
      const game = result.data();
      this.scores = [...game.players];
    },
    async setQuestionConfig(difficultyLvl) {
      await this.getAllQuestions(difficultyLvl);
    },
    async getAllQuestions(difficultyLvl) {
      const querySnapshot = await projectFirestore
        .collection("questions")
        .where("type", "==", difficultyLvl)
        .get();
      this.questions = querySnapshot.docs.map((question) => {
        return { ...question.data(), id: question.id };
      });
    },
    setQuestionsIds() {
      this.questionsIds = this.questions.map((question) => question.id);
    },
    addNewRecord() {
      this.scores.push({ nick: "", points: 0 });
    },
    deleteRecord(item) {
      const index = this.scores.indexOf(item);
      if (index > -1) {
        this.scores.splice(index, 1);
      }
    },
    async changeScore(item, value) {
      if (item?.points === 0 && value === -1) return;
      item.points += value;
      await this.updateGame();
    },
    required(v) {
      return !!v || "Field is required";
    },
    async startGame() {
      this.startLoader = true;
      this.setQuestionsIds();
      this.getRandomQuestionId();
      await this.getRandomQuestion();
      await this.updateGame();
      setTimeout(() => {
        this.startLoader = false;
        this.gameStarted = true;
      }, 500);
    },
    async updateGame() {
      const gameDetails = {
        players: [...this.scores],
        questionId: this.questionRandomId,
        showAnswer: this.showAnswer,
      };
      const documentRef = projectFirestore.collection("game").doc(this.gameId);
      await documentRef.update(gameDetails);
    },
    async endGame() {
      await this.updateRatings();
      await this.resetGame();
      await this.saveEndGameData();
    },
    async saveEndGameData() {
      this.endLoader = true;
      const gameDetails = {
        players: [],
        questionId: null,
      };
      const documentRef = projectFirestore.collection("game").doc(this.gameId);
      await documentRef.update(gameDetails);
      setTimeout(() => {
        this.endLoader = false;
      }, 500);
    },
    async updateRatings() {
      const players = [...this.scores];
      if (!players?.length || players?.length === 0) return;
      const addPlayerPromises = players.map((player) => {
        if (player?.nick == null || player?.nick === "") return;
        return projectFirestore.collection("users").add(player);
      });
      await Promise.all(addPlayerPromises);
      this.scores = [];
    },
    async resetGame() {
      const gameDetails = {
        players: [],
        questionId: null,
        showAnswer: false,
      };
      const documentRef = projectFirestore.collection("game").doc(this.gameId);
      await documentRef.update(gameDetails);
      this.questionRandomId = null;
    },
    getRandomQuestionId() {
      if (!this.questionsIds.length) return;
      const randomIndex = Math.floor(Math.random() * this.questionsIds.length);
      this.questionRandomId = this.questionsIds[randomIndex];
    },
    async getRandomQuestion() {
      const result = await projectFirestore
        .collection("questions")
        .doc(this.questionRandomId)
        .get();
      if (result == null) return;
      this.randomQuestion = result.data();
    },
    async getQuestion(number) {
      this.activeDiffBtn = number;
      await this.setQuestionConfig(number);
      await this.updateGame();
    },
    async showAnswerFn() {
      this.showAnswer = !this.showAnswer;
      await this.updateGame();
    },
  },
};
</script>
