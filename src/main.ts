import Vue from "vue";
import App from "./App.vue";
import VuetifyDialog from 'vuetify-dialog';
import VueMoment from 'vue-moment';
import * as moment from 'moment';
import vuetify from './plugins/vuetify';
import router from '@/router'

import 'vuetify-dialog/dist/vuetify-dialog.css';

import { zhTW } from './helpers/moment-locale';

moment.locale('zh-Hant-my-settings', zhTW);
moment.defineLocale('zh-Hant', { parentLocale: 'zh-TW' });

Vue.use(VueMoment, { moment });

Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
