import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as moment from 'moment';
import Vue3Sanitize from 'vue-3-sanitize';
import router from '@/router';
import App from './App.vue';
import vuetify from './plugins/vuetify';

import { zhTW } from './helpers/moment-locale';

moment.locale('zh-Hant-my-settings', zhTW);
moment.defineLocale('zh-Hant', { parentLocale: 'zh-TW' });

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$moment = moment;

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(Vue3Sanitize);

app.mount('#app');
