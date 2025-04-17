<script setup lang="ts">
import { RouterLink } from "vue-router";
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
      <li class="header__item">
        <input
          class="header__serach"
          type="text"
          name="q"
          placeholder="Поиск"
        />
      </li>
    </ul>
  </nav>
</template>