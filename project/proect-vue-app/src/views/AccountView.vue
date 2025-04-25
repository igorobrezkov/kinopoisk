<script setup lang="ts">
import MenuAccount from "../components/MenuAccount.vue";
import router from "../router/router";
import { checked } from "../api/checkedAuthorized"; 
import { logOut } from "../api/logout";
import BtnAccent from "../components/BtnAccent.vue";
const BtnAccentValue = "Выйти из аккаунта";

function  routerChecked() {
  const check = checked();
check.then(data => {
  if(data !== "Войти") {
     router.push({ name: 'favorites' });
  }
  else {
     router.push({ name: 'main' });
  }
})
}
routerChecked();

const exitAuth = () => {
  logOut();
  router.push({ name: 'main' });
}

</script>

<template>
  <section class="account">
   <div class="container">
     <h1 class="account__title">
        Мой аккаунт
     </h1>
     <MenuAccount />
     <div class="account__wrapper wrapper">
       <router-view/>
     </div>
     <BtnAccent :text="BtnAccentValue" @click="exitAuth"/>
   </div>
  </section>
</template>