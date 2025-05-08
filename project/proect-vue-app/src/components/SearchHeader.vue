<script setup lang="ts">
import { ref, watch } from "vue";
import { getMovie } from "../api/movie";
import {
  getStyle,
  toHoursAndMinutes,
  genre,
  genreTitleSearh,
} from "../api/function";

import Rating from "./Rating.vue";
const resArResult = ref();
const arrLength = ref(false);
const inputValue = ref("");
const emits = defineEmits(["search-close", "is-vis", "input-value"]);
const props = defineProps({
  closeClick: Boolean,
});

watch(props, () => {
  if (props.closeClick === false) resArResult.value = [];
  emits("is-vis", true);
  inputValue.value = "";
});

watch(inputValue, (inputVal) => {
  if (inputVal.length > 0) {
    emits("input-value", true);
  } else if (inputVal.length < 1) {
    emits("input-value", false);
  }
});

const addGenre = (arr: any) => {
  genreTitleSearh.value = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].genres) {
      for (let j = 0; j < arr[i].genres.length; j++) {
        genre(arr[i].genres[j], true);
      }
    }
    arr[i].genresRu = genreTitleSearh.value.join(", ");
    genreTitleSearh.value = [];
  }
};

const setArrLength = () => {
  if (resArResult.value.length > 0) arrLength.value = true;
  else return (arrLength.value = false);
};

watch(resArResult, (val) => {
  addGenre(val);
  setArrLength();
  emits("search-close", arrLength.value);
});

const searchFilms = (event: any) => {
  resArResult.value = [];
  if (event.target.value.length > 1) {
    setTimeout(() => {
      getMovie("title=" + event.target.value).then((res) => {
        if (res !== undefined) {
          resArResult.value = res?.data;
        }
      });
    }, 300);
  } else resArResult.value = [];
};
</script>

<template>
  <input
    class="header__serach"
    type="text"
    name="q"
    placeholder="Поиск"
    @input="searchFilms"
    v-model="inputValue"
  />
  <ul class="search__list" v-show="arrLength">
    <li
      class="search__item"
      v-for="(item, index) in resArResult"
      v-show="index < 5"
      :key="item.id"
    >
      <router-link class="genre__link-item" :to="{ path: '/film/' + item.id }">
        <div class="search__wrap">
          <img
            class="search__img"
            v-show="item.posterUrl"
            :src="item.posterUrl"
            alt=""
          />
          <div class="search__desc">
            <ul class="search__list-info">
              <li class="search__item-info">
                <Rating
                  :rating="item.tmdbRating.toFixed(1)"
                  :class="getStyle(item.tmdbRating)"
                  class="search__rating"
                />
              </li>
              <li class="search__item-info search__item-info--release">
                {{ item.releaseYear }}
              </li>
              {{
                genre(item.genres)
              }}
              <li class="search__item-info search__item-info--genres">
                {{ item.genresRu }}
              </li>
              <li class="search__item-info search__item-info--runtime">
                {{ toHoursAndMinutes(item.runtime) }}
              </li>
            </ul>
            <h3 class="search__title">{{ item.title }}</h3>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
</style>