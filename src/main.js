// Plugins
import {registerPlugins} from '@/plugins'
import router from "@/router";
// Components
import App from './App.vue'

// Composables
import {createApp} from 'vue'
import {createPinia} from "pinia";


const app = createApp(App);

registerPlugins(app);

app.use(router).use(createPinia()).mount('#app');
