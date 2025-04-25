<script setup lang="ts">
import { ref, watch } from "vue";
import Rating from "./Rating.vue";
import BtnAccent from "./BtnAccent.vue";
import BtnDefault from "./BtnDefault.vue";
import BtnCircle from "./BtnCircle.vue";
import { getMovieId } from "../api/movieId"
import { usePromise } from 'vue-promised';
import { getRandomFilm } from "../api/random";
const valueBtnAccent = ref("Трейлер");
const valueBtnDefault = ref("О фильме");
const favorite = "favorite";
const cinemaGuide = "cinema-guide";

const props = defineProps({
  showBtn: Boolean,
  idFilm:  Promise<Number> ,
});

let promised = ref();
const film = async (id: Promise<Number>) => {
  async function oF(strId: string) {
      const res = await getMovieId(strId);
    let obj: { id: number | undefined; title: string | undefined; posterUrl: string | undefined; plot: string | undefined; tmdbRating: string | undefined; releaseYear: string | undefined; runtime: string | undefined;} =
      { id: undefined, title: undefined, posterUrl: undefined, plot: undefined, tmdbRating: undefined, releaseYear: undefined, runtime: undefined };
    //console.log(res);
    let entries = Object.entries(res?.data);
    for (let [key, val] of entries) {
      switch (key) {
        case 'id':
          obj = Object.assign(obj, { id: val });
          break;
        case 'title':
          obj = Object.assign(obj, { title: val });
          break;
        case 'backdropUrl':
          obj = Object.assign(obj, { posterUrl: val });
          break;
        case 'plot':
          obj = Object.assign(obj, { plot: val });
          break;
        case 'releaseYear':
          obj = Object.assign(obj, { releaseYear: val });
          break;  
        case 'tmdbRating':
          if (typeof val == 'number')
          obj = Object.assign(obj, { tmdbRating: val.toString() });
          break;
        case 'runtime':
          const toHoursAndMinutes = (TotalMinutes: number) => {
          const minutes = TotalMinutes % 60;
          const hours = Math.floor(TotalMinutes / 60);
    
          return `${(hours)} ч ${(minutes)} мин`
          }
          if (typeof val == 'number') {
            const nVal: number = val;
            obj = Object.assign(obj, { runtime: toHoursAndMinutes(nVal) });
          }
          break;    
      }

    }
    return obj;
  }
      const res_1 = await id;
      const strId_1 = res_1.toString();
      return await oF(strId_1);
}


const goRandomFilm = (idF: Promise<Number> | undefined) => {
   if (idF !== undefined ) {
     return usePromise(film(idF))
     }
}
const goNewFilm = async () => {
  const randomFilm = getRandomFilm();

const getId = async() => {
  return randomFilm.then(res => {
  console.log(res)
  return res?.data.id;
})
}
  promised.value = goRandomFilm(await getId());
 
  console.log(promised)
}

 promised.value = goRandomFilm(props.idFilm)

const showBtnDefault = ref(false);
if (props.showBtn) {
  showBtnDefault.value = props.showBtn;
}
</script>
<template>
  <div class="film" >
    <div class="film__wrap">
      <div class="film__content" >
        <ul class="rating" >
          <li class="rating__item">
            <Rating v-if="promised" :rating="promised.data?.tmdbRating"/>
          </li>
          <li class="rating__item">{{ promised.data?.releaseYear }}</li> 
          <li class="rating__item">детектив</li>
          <li class="rating__item">{{ promised.data?.runtime }}</li> 
        </ul>
        <h1 class="film__title" v-if="promised"> {{ promised.data?.title }} </h1>
        <p class="film__desc" v-if="promised">
          {{ promised.data?.plot }}
        </p>
        <ul class="film__navigation">
          <li class="film__item">
            <BtnAccent :text="valueBtnAccent" />
          </li>
          <li class="film__item">
            <BtnDefault
              :text="valueBtnDefault"
              :filmId="1"
              v-if="showBtnDefault"
            />
          </li>
          <li class="film__item">
            <BtnCircle :componentName="favorite" />
          </li>
          <li class="film__item s">
            <BtnCircle :componentName="cinemaGuide" v-if="showBtnDefault" @click="goNewFilm"/>
          </li>
        </ul>
      </div>
      <div class="film__item">
        <img v-if="promised"
          class="film__preview-img"
          :src="promised.data?.posterUrl"
          :alt="promised.data?.title"
        />
      </div>
    </div>
  </div>
</template>