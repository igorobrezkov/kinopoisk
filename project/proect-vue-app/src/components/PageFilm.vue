<script setup lang="ts">
import { ref } from "vue";
import Rating from "./Rating.vue";
import BtnAccent from "./BtnAccent.vue";
import BtnDefault from "./BtnDefault.vue";
import BtnCircle from "./BtnCircle.vue";
const valueBtnAccent = ref("Трейлер");
const valueBtnDefault = ref("О фильме");
const favorite = "favorite";
const cinemaGuide = "cinema-guide";
const props = defineProps({
  showBtn: Boolean,
});

const showBtnDefault = ref(false);
if (props.showBtn) {
  showBtnDefault.value = props.showBtn;
}
</script>
<template>
  <div class="film">
    <div class="film__wrap">
      <div class="film__content">
        <ul class="rating">
          <li class="rating__item">
            <Rating />
          </li>
          <li class="rating__item">1979</li>
          <li class="rating__item">детектив</li>
          <li class="rating__item">1 ч 7 мин</li>
        </ul>
        <h1 class="film__title">Шерлок Холмс и доктор Ватсон: Знакомство</h1>
        <p class="film__desc">
          Увлекательные приключения самого известного сыщика всех времен
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
          <li class="film__item">
            <BtnCircle :componentName="cinemaGuide" v-if="showBtnDefault" />
          </li>
        </ul>
      </div>
      <div class="film__item">
        <img
          class="film__preview-img"
          src="../assets/images/sherlock.jpg"
          alt="Шерлок Холмс и доктор Ватсон: Знакомство"
        />
      </div>
    </div>
  </div>
</template>