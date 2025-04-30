import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createManager } from '@vue-youtube/core';

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(createManager());

app.mount('#app');



