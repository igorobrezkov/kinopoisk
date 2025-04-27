<script setup lang="ts" >

import { ref } from 'vue'
import LocaleCurrency from  'locale-currency';
const curency = ref<string | null>('USD');

const setCurrency = (val: string ) => {
  if (LocaleCurrency.getCurrency('ru_' + val.toUpperCase()) !== null) {
    curency.value = LocaleCurrency.getCurrency(val+'_'+val.toUpperCase())
  } 
}

const getCurrency = (): string | undefined => {
  return getgetCurrencyFormat()
}

const getgetCurrencyFormat = (): string | undefined => {
  if (curency.value !== null) {
    switch (curency.value) {
      case 'USD':
        return 'дол.';
      case 'RUB':
        return 'руб.'
      default:
       return ruLang.of(curency.value)     
    }
  }
}

  defineProps({
  dataFilmDesc: Object  ,
});


const languageNames =  new Intl.DisplayNames(['ru'], {
  type: 'language'
});


const ruLang = new Intl.DisplayNames("ru", { type: "currency" })


function moneyFormat(n: string) {
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
} 

function getMoney(v: string) {
  return moneyFormat(v).replace(',00', '')
}

 </script>

<template >
  <h2 class="film-detail__title" >О фильме</h2>
  <div class="film-detail__wrap">
    <ul class="film-detail__list" >
      <li class="film-detail__item" v-if="dataFilmDesc && dataFilmDesc.data?.language">
         {{ setCurrency(dataFilmDesc.data?.language) }}
        <span class="film-detail__name"> Язык оригинала </span>
        <span class="film-detail__separaror" ></span>
        <span class="film-detail__desq" >{{ languageNames.of(dataFilmDesc.data?.language) }}</span>     
      </li>
      <li class="film-detail__item" v-if="dataFilmDesc && dataFilmDesc.data?.budget">
        <span class="film-detail__name" > Бюджет </span>
        <span class="film-detail__separaror" ></span>
        <span class="film-detail__desq" >{{  getMoney(dataFilmDesc.data?.budget) }} {{ getCurrency() }}</span>     
      </li>
      <li class="film-detail__item" v-if="dataFilmDesc && dataFilmDesc.data?.revenue">
        <span class="film-detail__name" > Выручка </span>
        <span class="film-detail__separaror" ></span>
        <span class="film-detail__desq" >{{ getMoney(dataFilmDesc.data?.revenue) }} {{ getCurrency() }}</span>     
      </li>
      <li class="film-detail__item" v-if="dataFilmDesc && dataFilmDesc.data?.director">
        <span class="film-detail__name" > Режиссёр </span>
        <span class="film-detail__separaror"  ></span>
        <span class="film-detail__desq" >{{ dataFilmDesc.data?.director }}</span> 
      </li>
      <li class="film-detail__item" v-if="dataFilmDesc && dataFilmDesc.data?.production">
        <span class="film-detail__name" > Продакшен </span>
        <span class="film-detail__separaror"  ></span>
        <span class="film-detail__desq" >{{ dataFilmDesc.data?.production }}</span>
      </li>
      <li class="film-detail__item" v-if="dataFilmDesc && dataFilmDesc.data?.awardsSummary">
        <span class="film-detail__name" > Награды </span>
        <span class="film-detail__separaror"  ></span>
        <span class="film-detail__desq" >{{ dataFilmDesc.data?.awardsSummary }}</span> 
      </li>
       <li class="film-detail__item" v-if="dataFilmDesc && dataFilmDesc.data?.homepage">
        <span class="film-detail__name" > Домашняя страница </span>
        <span class="film-detail__separaror"  ></span>
        <a :href="dataFilmDesc.data?.homepage"  :title="dataFilmDesc.data?.title"><span class="film-detail__desq" > {{ dataFilmDesc.data?.homepage }}</span></a>     
      </li>
    </ul>
    <div class="film-detail__desc">
      <h2 class="film-detail__title film-detail__title--desc">Описание:  </h2>
      <p class="film__desc"  v-if="dataFilmDesc && dataFilmDesc.data?.plot">
          {{ dataFilmDesc.data?.plot }}
        </p>
    </div>
  </div>
</template> 


