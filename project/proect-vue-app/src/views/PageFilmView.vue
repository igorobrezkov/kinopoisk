<script setup lang='ts'>
import PageFilm from "../components/PageFilm.vue";
import FilmDescription from "../components/FilmDescription.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute()
const id = route.path.replace("/film/", "");
const dataFilm = ref();
let promiseId = new Promise<Number>((resolve, reject) => {
  let success = () => {
       return parseInt(id)
    };
    if (success()) {
        resolve(success()); 
    } else {
        reject("Произошла ошибка!"); 
    }
});



const changeFilm = (val: any) => {
  dataFilm.value = val;
}
</script>



<template>
  <section class="film-detail">
    <div class="container">
      <PageFilm :showBtn="false" :idFilm="promiseId" @film-data="changeFilm"/>
      <FilmDescription :dataFilmDesc="dataFilm"/>
    </div>
  </section>
</template>

