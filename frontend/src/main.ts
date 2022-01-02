//External Dependencies import
import { createApp } from 'vue';

//Local Dependencies Import
import App from './App.vue';
import router from './router';

//Imports default CSS
import './style/index.css';

//Creates a vue app and initializes the router
createApp(App).use(router).mount('#app');
