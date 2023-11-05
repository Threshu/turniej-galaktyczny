<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Illegal move</h1>

      <div class="py-14" />
      <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
  <template v-slot:item.1>
    <v-card title="Step One" flat>1</v-card>
  </template>

  <template v-slot:item.2>
    <v-card title="Step Two" flat>2</v-card>
  </template>

  <template v-slot:item.3>
    <v-card title="Step Three" flat>    <section>
  </section></v-card>
  </template>
</v-stepper>
    </v-responsive>
  </v-container>
</template>

<script>

</script>
