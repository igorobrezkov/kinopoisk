<script setup lang="ts">
defineProps({
  text: String,
});
</script>


<template>
  <button class="btn__accent" type="button"> {{ text }}</button>
</template>

<style scoped>
</style>