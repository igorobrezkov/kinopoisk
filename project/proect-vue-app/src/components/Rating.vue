<script setup lang="ts">
import Star from "../assets/images/svg-sprite/star_white.svg";
 defineProps({
   rating: String,
})
</script>

<template>
  <div class="rating" >
    <div class="rating__wrap">
      <Star class="rating_star" />
      <span class="rating__desc"> {{ rating }} </span>
    </div>
  </div>
</template>

<style scoped>
.rating {
  border-radius: 16px;
  padding: 4px 12px;
  height: 32px;
  background: #308e21;
  display: flex;
  align-items: center;
}
.rating__wrap {
  display: flex;
  gap: 0 4px;
  align-items: center;
}

.rating_star {
  width: 16px;
  height: 16px;
}
.rating__desc {
  font-weight: 700;
  font-size: 18px;
  line-height: 133%;
  color: #fff;
}
.search__rating .rating__desc {
 font-weight: 700;
 font-size: 12px;
 line-height: 133%;
 color: #fff;
}
.search__rating .rating_star{
  width: 10px;
  height: 10px;
}
</style>