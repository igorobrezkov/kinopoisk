<script setup lang="ts">
import { RouterLink } from "vue-router";
import SearchHeader from "./SearchHeader.vue";
import CloseSearch from "../assets/images/svg-sprite/search_close.svg"

import { ref } from 'vue'

const visClose = ref(false)
const isVis = ref(true)

const clearInput = () => {
  isVis.value = false
}

</script>


<template>
  <nav class="header__nav">
    <ul class="header__list">
      <li class="header__item">
        <router-link to="/" class="header__link"> Главная </router-link>
      </li>
      <li class="header__item">
        <router-link to="/genres" class="header__link" > Жанры </router-link>
      </li>
      <li class="header__item header__item--search">
        <SearchHeader  @search-close="val => visClose = val"  @is-vis="val => isVis = val" :closeClick="isVis"/>
        <CloseSearch  class="header__search-close" v-show="visClose" @click="clearInput"/>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .header__item--search {
    position: relative;
  }
  .header__search-close {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-40%, -50%);
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
</style>
