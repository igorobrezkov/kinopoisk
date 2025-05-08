<script setup lang="ts">
import PageFilm from "../components/PageFilm.vue";
import Top10 from "./TopView.vue";
import { getRandomFilm } from "../api/random";
const randomFilm = getRandomFilm();

const getId = () => {
  return randomFilm.then((res) => {
    return res?.data.id;
  });
};
</script>
<template>
  <section class="main">
    <div class="container">
      <PageFilm :showBtn="true" :idFilm="getId()" />
    </div>
  </section>
  <Top10 />
</template>