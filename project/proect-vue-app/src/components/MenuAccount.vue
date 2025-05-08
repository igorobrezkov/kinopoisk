<script setup lang="ts">
import { RouterLink } from "vue-router";
import Favorite from "../assets/images/svg-sprite/favorite.svg";
import User from "../assets/images/svg-sprite/user.svg";
import { ref, onMounted, watch } from "vue";
const textFavorite = ref('Избранные фильмы');
const textSettings = ref('Настройка аккаунта')
const widthScreen = ref();
const resizeMenu = (screen: number) => {
  if (screen <= 992) {
    textFavorite.value = 'Избранное';
    textSettings.value = 'Настройки';
  }

  else if (screen > 992) {
    textFavorite.value = 'Избранные фильмы';
    textSettings.value = 'Настройка аккаунта';
  }

}

window.addEventListener('resize', () => {
  widthScreen.value = window.outerWidth
});

onMounted (() => {
  resizeMenu(window.outerWidth)
})

watch(widthScreen, (screen) => {
  resizeMenu(screen), { immediate: true }
})
</script>

<template>
   <ul class="account__list">
      <li class="account__item">
        <router-link to="/account/favorites" class="account__link">
          <Favorite /> {{ textFavorite }} 
         </router-link>
      </li>
      <li class="account__item">
        <router-link to="/account/settings" class="account__link">
         <User />  {{ textSettings }}
          </router-link>
      </li>
    </ul>
</template>

