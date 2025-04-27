<script setup lang="ts">
defineProps({
  text: String,
});
</script>


<template>
  <span class="btn__accent" type="button"> {{ text }}</span>
</template>

<style scoped>
.btn__accent {
  border-radius: 28px;
  padding: 16px 48px;
  background: #67a5eb;
  font-weight: 700;
  font-size: 18px;
  line-height: 133%;
  color: #fff;
  transition: background-color .3s;

  &:hover {
    background-color: #45526E;
  }
}
.btn__accent:hover {
  cursor: pointer;
}
</style>