<template>
  <div class="w-100">
    <img src="@/assets/logo.png" class="fit-picture" v-if="shine" />
    <img src="@/assets/logo-shine.png" class="fit-picture" v-else />
    <v-switch v-model="shine" color="primary" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      shine: false,
    };
  },
};
</script>
<style>
.fit-picture {
  width: 100%;
}
</style>
