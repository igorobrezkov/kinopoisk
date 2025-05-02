<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BtnAccent from "../components/BtnAccent.vue";
import Back from "../assets/images/svg-sprite/back.svg";
import { getMovie } from "../api/movie";
import { usePromise } from 'vue-promised'

const genreTitle = ref<string>('');
const getGenreTitle = (item: string) => {
   switch (item) {
          case 'history':           
            genreTitle.value = 'Историческое';
            break;
          case 'horror':
            genreTitle.value = 'Хоррор';
            break;
          case 'scifi':
            genreTitle.value = 'Фантастика';
            break;
          case 'stand-up':
            genreTitle.value = 'Cтендап';
            break;
          case 'fantasy':
            genreTitle.value = 'Фентэзи';
            break; 
          case 'drama':
            genreTitle.value = 'Драма';
            break; 
           case 'mystery':
            genreTitle.value = 'Мистика';
            break;  
          case 'family':
            genreTitle.value = 'Семейное';
            break; 
          case 'comedy':
            genreTitle.value = 'Комедия';
            break;  
           case 'romance':
            genreTitle.value = 'Романтика';
            break;  
          case 'music':
            genreTitle.value = 'Мюзикл';
            break;   
          case 'crime':
            genreTitle.value = 'Детектив';
            break;  
          case 'tv-movie':
            genreTitle.value = 'Телевизионные';
            break;
           case 'documentary':
            genreTitle.value = 'Документальные';
            break;
            case 'action':
            genreTitle.value = 'Динамические';
            break;
           case 'thriller':
            genreTitle.value = 'Триллер';
            break; 
          case 'western':
            genreTitle.value = 'Вестерн';
            break;  
          case 'animation':
            genreTitle.value = 'Анимационные';
            break;  
          case 'war':
            genreTitle.value = 'Военные';
            break;   
           case 'adventure':
            genreTitle.value = 'Приключения';
            break;                                                      
        }
}

let genreArr = ref();
function setGenreArr(val: any) {
  genreArr.value = val;
}

const route = useRoute();
const ganres = route.path.replace("/genres/", "");
getGenreTitle(ganres);

const countFilmsShow = ref<number>(10);

const genreDetail =  getMovie('genre='+ganres);

const arrFilms = computed(() => {
  let arrF;
  let arFsp: any;
  function getArrSort(arFsp: any) {
    return arFsp.sort((a: any, b: any)  => {
           if (a.tmdbRating < b.tmdbRating) {
          return -1;
         }
        return 0
        });
  }
  if (genreArr.value) {
    arrF = [...genreArr.value];
    arFsp = arrF.splice(0, Number(countFilmsShow.value));
    getArrSort(arFsp)
  }
  else {
    
    const promise = genreDetail.then(res => {
      if (res !== undefined) {
        arFsp =  res.data.splice(0, Number(countFilmsShow.value));
      }
        
      return getArrSort(arFsp)
    });
    return promise
  }
  
  return arFsp.sort((a: any, b: any)  => {
    if (a.rating < b.rating) {
      return -1;
    }
    return 0
  });
});

const promised = usePromise(genreDetail.then(
  res => {
    if( res !== undefined)
    return res.data
  }
))

const startPagination = countFilmsShow.value + countFilmsShow.value
const countFilms: any = () => {
  return (genreArr.value) ?  genreArr.value.length : startPagination;
}


const moreText: string = "Показать ещё";
const scrollHeightGenre = ref(0);

const showBtnMore = computed((): boolean => {
  if (countFilmsShow.value < countFilms()) {
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
  countFilmsShow.value = 11;
}
</script>

<template>
 
  <section class="genre">
    <div class="container">
      <router-link class="genre__link" to="/genres">
        <Back class="genre__back" />
        <h1 class="genre__title">{{ genreTitle }}</h1>
      </router-link>
      {{ setGenreArr(promised.data.value) }}
      <ul class="genre__list">
        <li class="genre__item"   v-for="film in arrFilms" :key="film.id">
          <router-link class="genre__link-item" :to="{ name: 'film', params: { id: film.id }}" >
            <img :src="film.posterUrl" />
          </router-link>
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
