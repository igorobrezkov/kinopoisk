<script setup lang="ts">
import { ref } from "vue";
import { useAuthorizedStore } from "../stores/autorized"; 
import AccountBtn from "../components/BtnAccount.vue"
const { authData } = useAuthorizedStore();
const dataAccount = Object.entries(authData);

let fio: string = '';
let sName = ref<string>('');
let fName = ref<string>('');
let sfName = ref<string>('');

let email: string = '';
const propsEmail = ref('email');
for (let [key, val] of dataAccount) {
 if (key === 'name')
  {
  fio += val; 
  fName.value += fio.charAt(0);
  }

 if (key === 'surname')
 {
  sName.value += val;
  sName.value = sName.value.charAt(0)
  fio += ' ' + val;
 }

  if (key === 'email')
  {
    email += val;
 } 
}
sfName.value = fName.value + sName.value;
</script>

<template>
 
 <ul class="account-settings__list account-settings">
   <li class="account-settings__item item">
    <AccountBtn :componentName = "sfName"/>
     <p class="item__wrap">
      <span class="account-settings__fio-title">
         Имя Фамилия
      </span>
      <span class="account-settings__fio-desc">
          {{ fio }}
      </span>
      </p> 
   </li>
   <li class="account-settings__item item">
    <AccountBtn :componentName = "propsEmail" />
    <p class="item__wrap">
      <span class="account-settings__fio-title">
         Электронная почта
      </span>
      <span class="account-settings__fio-desc">
          {{ email }}
      </span>
      </p>
   </li>
 </ul>
</template>