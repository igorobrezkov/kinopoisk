<script setup lang="ts">
import { getFavorites } from '../api/favorites/getFavorites';
import { usePromise } from 'vue-promised';
import { ref } from "vue";
import CloseFavirite from "../assets/images/svg-sprite/close_favorites.svg";
import { delFavorites } from "../api/favorites/delFavorites";
import { useFavoritesStore } from "../stores/favorites";
const { addFaforites } = useFavoritesStore();

const faforites = ref()
const delMyFavorites = async (id: string) => {
 await delFavorites(id);  
      faforites.value = getFavorites();
      addFaforites();
}

faforites.value = getFavorites();
const promised = usePromise(faforites)


const arrFilms = ref();
const setArrRavorites = (val: any) => {
  arrFilms.value = val;
}

const visClose = (id: string) => {
document.getElementById(id)?.classList.add("favorites__item--vis") 
}

const hidClose = (id: string) => {
 if (document.getElementById(id)?.classList.contains("favorites__item--vis")) {
  document.getElementById(id)?.classList.remove("favorites__item--vis") 
} 
}

console.log(promised.data);
</script>

<template>
 <section class="favorites">
   {{ setArrRavorites(promised.data.value) }}
  
     <ul class="favorites__list">
        <li class="favorites__item" :id="film?.id"  @mouseover="visClose(film?.id)" @mouseout="hidClose(film?.id)" :class="{'top-10__item--no-image': !film.backdropUrl && !film.posterUrl}" v-if="promised.data.value" v-for="(film, index) in arrFilms.data" :key="film?.id">
            <router-link :to="{ name: 'film', params: { id: film.id }}" class="top-10__link">
              <img class="top-10__img" v-if="film.posterUrl" :src="film.posterUrl" alt="" />
              <img class="top-10__img" v-else-if="film.backdropUrl" :src="film.backdropUrl" alt="" />
              <span v-else class="top10-desc"> {{ film.title }}</span>
          </router-link>
          <span class="favorites__close" @click="delMyFavorites(film?.id)"><CloseFavirite/></span>
        </li>
     </ul>
  
 </section>
</template>

<style scoped>
</style>


    
        