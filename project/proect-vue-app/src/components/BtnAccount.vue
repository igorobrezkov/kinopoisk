<script setup lang="ts">
import AccountEmail from "../assets/images/svg-sprite/Account_email.svg";
defineProps({
  componentName: String,
});
</script>

<template>
  <span class="account__btn">
      <AccountEmail class="account__svg-email" v-if="componentName == 'email'"/>
      <span v-else> {{ componentName }} </span>
  </span>
</template>

<style scoped>
.account__btn {
 background: rgba(255, 255, 255, 0.5);
 border-radius: 30px;
 font-weight: 700;
 font-size: 24px;
 line-height: 133%;
 display: flex;
 justify-content: center;
 align-items: center;
 width: 60px;
 height: 60px;
 color: #fff;
}

</style>