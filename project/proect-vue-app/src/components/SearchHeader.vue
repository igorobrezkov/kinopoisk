<script setup lang="ts">
import { ref,  watch } from "vue"
import { getMovie } from "../api/movie"
import { getStyle, toHoursAndMinutes, genre,  genreTitleSearh } from "../api/function"

import Rating from "./Rating.vue";
 const resArResult = ref();
const arrLength = ref(false);
const inputValue = ref('');
const emits = defineEmits(['search-close', 'is-vis']);
const props = defineProps({
  closeClick: Boolean
})

watch(props, () => {
  if (props.closeClick === false)
    resArResult.value = [];
  emits('is-vis', true);
    inputValue.value = ''
})

const addGenre = (arr: any) => {
 genreTitleSearh.value = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].genres) {
      for (let j = 0; j < arr[i].genres.length; j++) {
        genre(arr[i].genres[j], true)
      }
    }
    arr[i].genresRu = genreTitleSearh.value.join(', ')
     genreTitleSearh.value = []
  }
}

const setArrLength = () => {
  if (resArResult.value.length > 0) arrLength.value = true
  else return arrLength.value = false
}

watch(resArResult, (val) => {
  addGenre(val);
  setArrLength();
  emits('search-close', arrLength.value)
})



const searchFilms = (event: any) => {
   resArResult.value = []
  if (event.target.value.length > 1) {
   setTimeout(() => {
    getMovie('title=' + event.target.value).then(
      res => {
        if (res !== undefined) {
          resArResult.value = res?.data;
        }
      })
  }, 300)
 }
  else resArResult.value = []  
 }
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
             <li class="search__item" v-for="(item, index) in resArResult" v-show="index < 5" :key="item.id" >
                <router-link class="genre__link-item" :to="{path: '/film/'+item.id}" >
               <div class="search__wrap">
                  <img class="search__img" v-show="item.posterUrl" :src="item.posterUrl" alt="">
                  <div class="search__desc">
                      <ul class="search__list-info">
                    <li class="search__item-info"><Rating :rating="item.tmdbRating.toFixed(1)" :class="getStyle(item.tmdbRating)" class="search__rating"/></li>
                    <li class="search__item-info search__item-info--release">{{ item.releaseYear }}</li> 
                        {{ genre(item.genres) }}
                    <li class="search__item-info search__item-info--genres">{{ item.genresRu }}</li>
                    <li class="search__item-info search__item-info--runtime">{{toHoursAndMinutes(item.runtime) }}</li>                    
                  </ul>
                  <h3 class="search__title"> {{ item.title }}</h3>
                  </div>
                </div>
                </router-link>
             </li>
        </ul>
</template>

<style scoped>
.search__img {
  width: 40px;
  height: 52px;
}
.search__wrap {
  display: flex;
  gap: 0 16px;
}
.search__desc {
  display: flex;
  flex-direction: column;
  gap: 8px 0;
}
 .search__list {
  margin: 0;
  padding: 0;
  border-radius: 8px;
  padding: 8px;
  width: 559px;
  position: absolute;
  top: 60px;
  right: 0;
  background: #393b3c;
  z-index: 9;
 }
 .search__list-info {
  display: flex;
  gap: 0 12px;
  margin: 0;
  padding: 0;
  list-style: none;
 }
.search__item {
 padding: 20px 8px;
 transition:  border .3s;
}
.search__item:hover {
 cursor: pointer;
 border: 1px solid rgba(255, 255, 255, 0.5);
 border-radius: 6px
}
.search__title {
 margin: 0;
 font-weight: 700;
 font-size: 18px;
 line-height: 133%;
 color: #fff
}
.search__rating {
 padding: 2px 8px;
 height: 20px;
}
.search__item-info--release,
.search__item-info--genres,
.search__item-info--runtime {
font-weight: 400;
font-size: 14px;
line-height: 143%;
color: rgba(255, 255, 255, 0.7);
}

.yelow {
    background-color: #A59400;
  }
  .green {
    background-color: #308e21;
  }
  .gray {
    background-color: #777777;
  }
  .red {
    background-color: #C82020;
  }
</style>