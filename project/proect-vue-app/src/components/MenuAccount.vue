<script setup lang="ts">
import { RouterLink } from "vue-router";
import Favorite from "../assets/images/svg-sprite/favorite.svg";
import User from "../assets/images/svg-sprite/user.svg";
</script>

<template>
   <ul class="account__list">
      <li class="account__item">
        <router-link to="/account/favorites" class="account__link">
          <Favorite /> Избранные фильмы 
         </router-link>
      </li>
      <li class="account__item">
        <router-link to="/account/settings" class="account__link">
         <User /> Настройка аккаунта
          </router-link>
      </li>
    </ul>
</template>

