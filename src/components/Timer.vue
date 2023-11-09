<template>
  <v-col class="d-flex justify-content-center align-items-center">
    <template v-if="!loader">
      <v-icon
        icon="mdi-timer-outline"
        size="x-large"
        :class="{ pulse: timeLeft <= 0 }"
      />
      <span class="font-bold timer ml-3" :class="{ pulse: timeLeft <= 0 }">{{
        time
      }}</span>
    </template>
    <template v-else>
      <v-progress-circular
        :size="50"
        :width="7"
        color="primaryLight"
        indeterminate
      />
    </template>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      loader: true,
    };
  },
  props: {
    time: {
      type: String,
      default: "--:--",
    },
    timeLeft: {
      type: Number,
    },
  },
  mounted() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>

<style></style>
