<script setup lang="ts">
import { RouterLink } from "vue-router";
import SearchHeader from "./SearchHeader.vue";
import CloseSearch from "../assets/images/svg-sprite/search_close.svg"
import { onMounted, ref, watch } from 'vue'
import { useAuthorizedStore } from "../stores/autorized";
import { storeToRefs } from "pinia";
const { authData } = storeToRefs(useAuthorizedStore());

const visClose = ref(false);
const visInput = ref(false);
const isVis = ref(true);
const widthScreen = ref();
const searchVis = ref(true);
const isMobile = ref(false);

const clearInput = () => {
  isVis.value = false;
  setTimeout(() => {
    if (window.outerWidth <= 590) {
      searchVis.value = false;
      visClose.value = false;
      visInput.value = false; 
     }
     
  }, 300)
 
}

window.addEventListener('resize', () => {
  widthScreen.value = window.outerWidth
});


const resizeMenu = (screen: number) => {
  const main = document.querySelector('.header__link--main');
  const genres = document.querySelector('.header__link--genres'); 
  const entey = document.querySelector('.header__link--account');
  const enteyD = document.querySelector('.header__link--default');
  const search = document.querySelector('.header__item--search input');
  
   
  if (screen <= 590) {
    if (main !== null) {
      main.textContent = '';
    }   
    if (genres !== null) {
      genres.textContent = '';
    } 
    if (entey !== null) {
      entey.textContent = '';
    }  

    if (enteyD !== null) {
      enteyD.textContent = '';
    }  

    if (search !== null) {
      searchVis.value = false
      isMobile.value = true
    }  
  }
  else if (screen > 590) {
    if (main !== null) {
    
      main.textContent = 'Главная';
    }
    if (genres !== null) {
      genres.textContent = 'Жанры';
    }

    if (entey !== null) {
      entey.textContent = 'Войти';
    } 

    if (search !== null) {
      searchVis.value = true
      isMobile.value = false
    }

    if (enteyD !== null) {
      enteyD.textContent = authData.value.surname;
    }  
   } 
}

watch(widthScreen, (screen) => {
  resizeMenu(screen), { immediate: true }
})

onMounted (() => {
  resizeMenu(window.outerWidth)
})


const searchMobileGo = () => {
  searchVis.value = true; 
  if (isMobile.value) {
    visClose.value = true
  }
  
}

</script>


<template>
  <nav class="header__nav">
    <ul class="header__list">
      <li class="header__item">
        <router-link to="/" class="header__link header__link--main"> Главная </router-link>
      </li>
      <li class="header__item">
        <router-link to="/genres" class="header__link header__link--genres" > Жанры </router-link>
      </li>
      <li class="header__item header__item--search" @click="searchMobileGo">
        <SearchHeader  @search-close="val => visClose = val"  @is-vis="val => isVis = val" @input-value="val => visInput = val" :closeClick="isVis" v-if="searchVis" />
        <CloseSearch  class="header__search-close" v-show="visClose || visInput" @click="clearInput" />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
</style>
