<script setup lang="ts" >
const arrFilmProperty = [
  { title: "Язык оригинала", desq: "Русский" },
  { title: "Бюджет", desq: "250 000 руб." },
  { title: "Выручка", desq: "2 835 000 руб." },
  { title: "Режиссёр", desq: "Игорь Масленников" },
  { title: "Продакшен", desq: "Ленфильм" },
  { title: "Награды", desq: "Топ-250, 33 место" },
];
</script>

<template>
  <h2 class="film-detail__title">О фильме</h2>
  <div class="film-detail__wrap">
    <ul class="film-detail__list">
      <li
        class="film-detail__item"
        v-for="(property, index) in arrFilmProperty"
        :key="index"
      >
        <span class="film-detail__name">{{ property.title }}</span>
        <span class="film-detail__separaror"></span>
        <span class="film-detail__desq">{{ property.desq }}</span>
      </li>
    </ul>
  </div>
</template> 


