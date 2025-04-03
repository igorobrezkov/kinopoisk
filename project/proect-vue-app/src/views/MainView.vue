<script setup lang="ts">
import PageFilm from "../components/PageFilm.vue";
import Top10 from "./TopView.vue";
</script>

<template>
  <section class="main">
    <div class="container">
      <PageFilm :showBtn="true" />
    </div>
  </section>
  <Top10 />
</template>