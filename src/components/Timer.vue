<template>
  <v-col class="d-flex justify-content-center align-items-center">
    <v-icon
      icon="mdi-timer-outline"
      size="x-large"
      :class="{ pulse: timeLeft <= 0 && intervalId == null }"
    />
    <span
      class="font-bold timer ml-3"
      :class="{ pulse: timeLeft <= 0 && intervalId == null }"
      >{{ time }}</span
    >
  </v-col>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: "--:--",
    },
    timeLeft: {
      type: Number,
    },
    intervalId: {
      type: Number,
    },
  },
};
</script>

<style></style>
