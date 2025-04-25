<script setup lang='ts'>
import PageFilm from "../components/PageFilm.vue";
import FilmDescription from "../components/FilmDescription.vue";
import { useRoute } from "vue-router";
const route = useRoute()
const id = route.path.replace("/film/", "");
let promiseId = new Promise<Number>((resolve, reject) => {
  let success = () => {
       return parseInt(id)
    };
    if (success()) {
        resolve(success()); // Успешное выполнение
    } else {
        reject("Произошла ошибка!"); // Ошибка
    }
});
console.log(promiseId)
</script>

<template>
  <section class="film-detail">
    <div class="container">
      <PageFilm :showBtn="false" :idFilm="promiseId"/>
      <FilmDescription />
    </div>
  </section>
</template>

