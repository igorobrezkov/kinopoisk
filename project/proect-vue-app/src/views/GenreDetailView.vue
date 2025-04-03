<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BtnAccent from "../components/BtnAccent.vue";
import Back from "../assets/images/svg-sprite/back.svg";
const route = useRoute();
const arrGanresTitle = [
  "Драма",
  "Комедия",
  "Детектив",
  "Семейное",
  "Историческое",
  "Триллер",
  "Фантастика",
  "Приключения",
];
const genreArr = [
  { img: "/src/assets/images/top1.png", rating: 1, id: 1 },
  { img: "/src/assets/images/top2.png", rating: 2, id: 2 },
  { img: "/src/assets/images/top3.png", rating: 3, id: 3 },
  { img: "/src/assets/images/top4.png", rating: 4, id: 4 },
  { img: "/src/assets/images/top5.png", rating: 5, id: 5 },
  { img: "/src/assets/images/top6.png", rating: 6, id: 6 },
  { img: "/src/assets/images/top7.png", rating: 7, id: 7 },
  { img: "/src/assets/images/top8.png", rating: 8, id: 8 },
  { img: "/src/assets/images/top9.png", rating: 9, id: 9 },
  { img: "/src/assets/images/top10.png", rating: 10, id: 11 },

  { img: "/src/assets/images/top1.png", rating: 1, id: 12 },
  { img: "/src/assets/images/top2.png", rating: 2, id: 13 },
  { img: "/src/assets/images/top3.png", rating: 3, id: 14 },
  { img: "/src/assets/images/top4.png", rating: 4, id: 15 },
  { img: "/src/assets/images/top5.png", rating: 5, id: 16 },
  { img: "/src/assets/images/top6.png", rating: 6, id: 17 },
  { img: "/src/assets/images/top7.png", rating: 7, id: 18 },
  { img: "/src/assets/images/top8.png", rating: 8, id: 19 },
  { img: "/src/assets/images/top9.png", rating: 9, id: 20 },
  { img: "/src/assets/images/top10.png", rating: 10, id: 21 },

  { img: "/src/assets/images/top1.png", rating: 1, id: 121 },
  { img: "/src/assets/images/top2.png", rating: 2, id: 131 },
  { img: "/src/assets/images/top3.png", rating: 3, id: 141 },
  { img: "/src/assets/images/top4.png", rating: 4, id: 151 },
  { img: "/src/assets/images/top5.png", rating: 5, id: 161 },
  { img: "/src/assets/images/top6.png", rating: 6, id: 171 },
  { img: "/src/assets/images/top7.png", rating: 7, id: 181 },
  { img: "/src/assets/images/top8.png", rating: 8, id: 191 },
  { img: "/src/assets/images/top9.png", rating: 9, id: 201 },
  { img: "/src/assets/images/top10.png", rating: 10, id: 111 },

  { img: "/src/assets/images/top1.png", rating: 1, id: 1212 },
  { img: "/src/assets/images/top2.png", rating: 2, id: 1312 },
  { img: "/src/assets/images/top3.png", rating: 3, id: 1412 },
  { img: "/src/assets/images/top4.png", rating: 4, id: 1512 },
  { img: "/src/assets/images/top5.png", rating: 5, id: 1612 },
  { img: "/src/assets/images/top6.png", rating: 6, id: 1712 },
  { img: "/src/assets/images/top7.png", rating: 7, id: 1812 },
  { img: "/src/assets/images/top8.png", rating: 8, id: 1912 },
  { img: "/src/assets/images/top9.png", rating: 9, id: 2012 },
  { img: "/src/assets/images/top10.png", rating: 10, id: 1112 },
];
const ganres = Number(route.path.replace("/genres/", ""));

const ganresTitle = ref(arrGanresTitle[ganres - 1]);

const countFilmsShow = ref<number>(10);
const arrFilms = computed((): { img: string; rating: number; id: number }[] => {
  const arrF = [...genreArr];
  const arFsp = arrF.splice(0, Number(countFilmsShow.value));

  return arFsp.sort((a, b)  => {
    if (a.rating < b.rating) {
      return -1;
    }
    return 0
  });
});
const countFilms: number = genreArr.length;
const moreText: string = "Показать ещё";
const scrollHeightGenre = ref(0);

const showBtnMore = computed((): boolean => {
  if (countFilmsShow.value < countFilms) {
    return true;
  }
  return false;
});

const paginationScrioll = () => {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight
  ) {
    scrollHeightGenre.value = window.scrollY;
  } else if (scrollHeightGenre.value - window.scrollY >= 400) {
    scrollHeightGenre.value = window.scrollY;
  } else if (window.scrollY <= 1) {
    scrollHeightGenre.value = 0;
  }
};

onMounted(() => {
  window.addEventListener("scroll", paginationScrioll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", paginationScrioll);
});

watch(scrollHeightGenre, (newVal, oldVal) => {
  if (newVal > oldVal) {
    moreFilmsShowPlus();
  } else if (newVal < oldVal && newVal !== 0 && countFilmsShow.value > 10) {
    moreFilmsShowMinus();
  } else if (newVal == 0) {
    moreFilmsShow();
  }
});

function moreFilmsShowPlus() {
  countFilmsShow.value += 10;
}
function moreFilmsShowMinus() {
  countFilmsShow.value -= 10;
}
function moreFilmsShow() {
  countFilmsShow.value = 10;
}
</script>

<template>
  <section class="genre">
    <div class="container">
      <router-link class="genre__link" to="/genres">
        <Back class="genre__back" />
        <h1 class="genre__title">{{ ganresTitle }}</h1>
      </router-link>

      <ul class="genre__list">
        <li class="genre__item" v-for="film in arrFilms" :key="film.id">
          <img :src="film.img" />
        </li>
      </ul>
      <div class="genre__btnMore">
        <BtnAccent
          v-if="showBtnMore"
          :text="moreText"
          @click="moreFilmsShowPlus"
        />
      </div>
    </div>
  </section>
</template>
