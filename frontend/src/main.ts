//External Dependencies import
import { createApp } from 'vue';

//Local Dependencies Import
import App from './App.vue';
import router from './router';
import socketIO from './socketio';

//Imports default CSS
import './style/index.css';

//Creates a vue app and initializes the router & socketio
const app = createApp(App);
app.use(router);
app.use(socketIO);
app.mount('#app');
