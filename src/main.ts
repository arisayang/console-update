import Vue from 'vue';
import VuetifyDialog from 'vuetify-dialog';
import VueSanitize from 'vue-sanitize';
import VueMoment from 'vue-moment';
import * as moment from 'moment';
import router from '@/router';
import App from './App.vue';
import vuetify from './plugins/vuetify';

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

Vue.use(VueSanitize);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
