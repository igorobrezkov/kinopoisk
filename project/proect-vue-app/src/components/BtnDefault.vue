<script setup lang="ts">

import { useRouter } from "vue-router";
const props = defineProps({
  text: String,
  filmId: Number,
});

const router = useRouter();
const routeToPush = () => {
  router.push("film/" + props.filmId);
};
</script>


<template>
  <button class="btn__default" type="button" @click="routeToPush">
    {{ text }}</button
  >
</template>

<style scoped>
</style>